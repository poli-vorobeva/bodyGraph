import { useEffect, useRef } from "react";
import { Canvas } from "./Canvas";
import { useSelector } from "react-redux";
import { RootState } from "./slices";
import { CANVAS_WIDTH } from "./constants";

export const CanvasElement = () => {
  const canvasRef = useRef(null);
  const gatesRelations = useSelector((state: RootState) => state.graph.gateRelations);
  const gatePaths = useSelector((state: RootState) => state.graph.gatePaths);
  const activeGates = useSelector((state: RootState) => state.graph.activeGates);
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef!.current.width = CANVAS_WIDTH;
      canvasRef!.current.height = 700;
      const canvas = new Canvas(canvasRef!.current, gatesRelations, gatePaths, activeGates);
      canvas.init();
    }
  }, [activeGates]);

  return (
    <canvas
      style={{
        border: "1px solid red",
        width: `${CANVAS_WIDTH}px`,
        height: "700px",
        top: "0",
        left: "25%",
        position: "absolute",
      }}
      ref={canvasRef}
    />
  );
};
