import { SHAPES, tDrawDataItem } from "./Canvas";
import { drawRectungleComponent } from "./Rectungle";
import { drawTriangleComponent } from "./Triangle";

export const sliceGatedByEdges = (gates: number[], edgesCount: number) => {
  const slicedGates = [];
  let currentStep = 0;
  while (currentStep * edgesCount <= gates.length - 1) {
    slicedGates.push(gates.slice(currentStep * edgesCount, currentStep * edgesCount + edgesCount));
    currentStep += 1;
  }
  return slicedGates;
};

//Canvas functions

export function drawGateText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number) {
  ctx.beginPath();
  ctx.font = "12px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(text, x, y);
  ctx.closePath();
}
export const drawTriangleOnCanvas = (
  ctx: CanvasRenderingContext2D,
  color: string,
  points: { x: number; y: number }[],
) => {
  const [p1, p2, p3] = points;
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.lineTo(p3.x, p3.y);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
};
export const drawRectOnCanvas = (ctx: CanvasRenderingContext2D, color: string, points: { x: number; y: number }[]) => {
  const [p1, p2, p3, p4] = points;
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.lineTo(p3.x, p3.y);
  ctx.lineTo(p4.x, p4.y);
  ctx.fill();
  ctx.closePath();
};

export const defineDrawShapeFunction = (shape: SHAPES) => {
  return shape === SHAPES.TRIANGLE ? drawTriangleOnCanvas : drawRectOnCanvas;
};
const defineDataFunction = (shape: SHAPES) => {
  return shape === SHAPES.TRIANGLE ? drawTriangleComponent : drawRectungleComponent;
};

//Get Coordinates Function
export type tGatePoints = { name: string; points: number[] };
export type tDataForDraw = {
  shape: SHAPES;
  shapePoints: { x: number; y: number }[];
  gates: tGatePoints[];
};

export const getDataForDraw = (element: tDrawDataItem): tDataForDraw => {
  const currentFunction = defineDataFunction(element.shape);

  const { gates, shapePoints } = currentFunction(
    element.gates,
    element.startCoordinates[0],
    element.startCoordinates[1],
    element.rotateAngle,
    element.extraAngles,
  );
  return {
    shape: element.shape,
    shapePoints,
    gates,
  };
};
