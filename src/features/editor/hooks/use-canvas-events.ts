import { fabric } from "fabric";
import { useEffect } from "react";

interface useCanvasEventsProps {
  canvas: fabric.Canvas | null;
  setSelectedObjects: (objects: fabric.Object[]) => void;
}

export const useCanvasEvents = ({
  canvas,
  setSelectedObjects
}: useCanvasEventsProps) => {
  useEffect(() => {
    if (canvas) {
      canvas.on("selection:created", (e) => {
        console.log("selection:created");
        setSelectedObjects(e.selected || []);
      });
      canvas.on("selection:updated", (e) => {
        console.log("selection:updated");
        setSelectedObjects(e.selected || [])
      });
      canvas.on("selection:cleared", () => {
        console.log("selection:cleared");
        setSelectedObjects([])
      });
    }

    return () => {
      if (canvas) {
        canvas.off("selection:created");
        canvas.off("selection:updated");
        canvas.off("selection:cleared");
      }
    };
  }, [canvas,
    setSelectedObjects // <- not needed

  ]);
};