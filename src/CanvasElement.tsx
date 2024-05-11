import { useEffect, useRef } from "react";
import { Canvas } from "./Canvas";

export const CanvasElement = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef!.current.width = 600;
      canvasRef!.current.height = 700;
      const canvas = new Canvas(canvasRef!.current);
      canvas.init();
    }
  }, []);

  return (
    <canvas
      style={{
        border: "1px solid red",
        width: "600px",
        height: "700px",
        top: "0",
        left: "25%",
        position: "absolute",
      }}
      ref={canvasRef}
    />
  );
};
