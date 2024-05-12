import { useEffect, useRef } from "react";
import { Canvas } from "../canvasComponents/Canvas";
import { useSelector } from "react-redux";
import { RootState } from "../slices";
import classes from "./Canvas.module.scss";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../canvasComponents/constants";
export const CanvasElement = () => {
  const renderCount = useRef(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gatesRelations = useSelector((state: RootState) => state.graph.gateRelations);
  const gatePaths = useSelector((state: RootState) => state.graph.gatePaths);
  const activeGates = useSelector((state: RootState) => state.graph.activeGates);
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = CANVAS_WIDTH;
      canvasRef.current.height = CANVAS_HEIGHT;
      const canvas = new Canvas(canvasRef!.current, gatesRelations, gatePaths, activeGates);
      canvas.init(renderCount.current <= 2);
    }
  }, [activeGates]);
  return <canvas className={classes.canvas} ref={canvasRef} />;
};
