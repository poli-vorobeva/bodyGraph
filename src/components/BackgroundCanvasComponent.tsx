import { useEffect, useRef } from "react";
import { BackgroundCanvas } from "../canvasComponents/backgroundCanvas/BackgroundCanvas";
import classes from "./Canvas.module.scss";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../canvasComponents/constants";
export const BackgroundCanvasElement = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = CANVAS_WIDTH;
      canvasRef.current.height = CANVAS_HEIGHT;
      const canvas = new BackgroundCanvas(canvasRef!.current);
      canvas.init();
    }
  }, []);

  return <canvas className={classes.canvas} ref={canvasRef} />;
};
