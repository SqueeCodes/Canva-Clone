import Image from "next/image";
import { AlertTriangle } from "lucide-react";

import { cn } from "../../../lib/utils";

import { ActiveTool, Editor } from "../types";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ScrollArea } from "../../../components/ui/scroll-area"
import { Button } from "../../../components/ui/button";
import { useRemoveBg } from "../../ai/api/use-remove-background";
import { usePaywall } from "../../subscriptions/hooks/use-paywall";
import { TbCrown } from "react-icons/tb";


interface RemoveBgSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const RemoveBgSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: RemoveBgSidebarProps) => {
  const { shouldBlock, triggerPaywall } = usePaywall();
  const mutation = useRemoveBg();

  const selectedObject = editor?.selectedObjects[0];

  // @ts-ignore
  const imageSrc = selectedObject?._originalElement?.currentSrc;

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onClick = () => {
    if (shouldBlock) {
      triggerPaywall();
      return;
    }

    mutation.mutate({
      image: imageSrc,
    }, {
      onSuccess: ({ data }) => {
        editor?.addImage(data);
      },
    });
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "remove-bg" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Background removal"
        description="Remove background from image using AI"
      />
      {!imageSrc && (
        <div className="flex flex-col gap-y-4 items-center justify-center flex-1">
          <AlertTriangle className="size-4 text-muted-foreground" />
          <p className="text-muted-foreground text-xs">
            Feature not available for this object
          </p>
        </div>
      )}
      {imageSrc && (
        <ScrollArea>
          <div className="p-4 space-y-4">
            <div className={cn(
              "relative aspect-square rounded-md overflow-hidden transition bg-muted",
              mutation.isPending && "opacity-50",
            )}>
              <Image
                src={imageSrc}
                fill
                alt="Image"
                className="object-cover"
              />
            </div>
            <Button
              disabled={mutation.isPending}
              onClick={onClick}
              className="w-full"
            >
              Remove background
              <TbCrown  className="size-5  text-yellow-500 z-[10] translate-x-2"/>
            </Button>
          </div>
        </ScrollArea>
      )}
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
