

import { ActiveTool, Editor } from "@/features/editor/types";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FillColorSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const FillColorSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: FillColorSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onChange = (value: string) => {editor?.changeFillColor(value)}

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        // @ts-ignore
        activeTool === "fill" 
        ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Fill coolor"
        description="Add fill color to your element"
      />
      <ScrollArea>
        <div className="p-4 space-y-6">

          
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};