import { useEffect, useRef } from "react";
import { BackgroundCanvas } from "../canvasComponents/backgroundCanvas/BackgroundCanvas";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../canvasComponents/constants";

export const BackgroundCanvasElement = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef!.current.width = CANVAS_WIDTH;
      canvasRef!.current.height = CANVAS_HEIGHT;
      const canvas = new BackgroundCanvas(canvasRef!.current);
      canvas.init();
    }
  }, []);

  return (
    <canvas
      style={{
        border: "1px solid red",
        width: `${CANVAS_WIDTH}px`,
        background: "black",
        height: "700px",
        top: "0",
        left: "25%",
        position: "absolute",
      }}
      ref={canvasRef}
    />
  );
};
