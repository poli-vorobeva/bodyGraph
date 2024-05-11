import { drawRectungleComponent } from "./Rectungle";
import { drawTriangleComponent } from "./Triangle";
import { SHAPES, tDrawDataItem } from "./constants";
import { calcPointsOnEdge } from "./mathFunctions";

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

export function drawGateText(ctx: CanvasRenderingContext2D, name: number, x: number, y: number) {
  ctx.beginPath();
  ctx.font = "12px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(`${name}`, x, y);
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
export type tGatePoints = { name: number; points: number[] };
export type tDataForDraw = {
  shape: SHAPES;
  shapePoints: { x: number; y: number }[];
  gates: tGatePoints[];
};

export const getDataForDraw = (element: tDrawDataItem): tDataForDraw => {
  const currentFunction = defineDataFunction(element.shape);

  const { gates, shapePoints } = currentFunction(
    element.shape,
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

export const getGatesCoordinates = (
  shape: SHAPES,
  sidesCount: number,
  gates: number[],
  innerPoints: { x: number; y: number }[],
) => {
  const elInEdge = Math.floor(gates.length / sidesCount);
  const slicedGates = sliceGatedByEdges(gates, elInEdge);
  const gatesPoints: tGatePoints[] = [];
  for (let i = 0; i < slicedGates.length; i++) {
    const secontPointIndex = i + 1 < slicedGates.length ? i + 1 : 0;
    const firstPoint = { ...innerPoints[i] };
    const secondPoint = { ...innerPoints[secontPointIndex] };
    if (slicedGates[i].length === 3 && shape === SHAPES.RECTANGLE) {
      if (firstPoint.x < secondPoint.x) {
        firstPoint.x += 15;
      }
      if (firstPoint.x > secondPoint.x) {
        firstPoint.x -= 10;
      }
      if (firstPoint.y > secondPoint.y) {
        firstPoint.y -= 15;
      }
      if (firstPoint.y < secondPoint.y) {
        firstPoint.y += 15;
        secondPoint.y += 5;
      }
    }
    const edgeBreakPoints = calcPointsOnEdge(
      shape,
      firstPoint.x,
      secondPoint.x,
      firstPoint.y,
      secondPoint.y,
      slicedGates[i].length,
    );
    slicedGates[i].forEach((g, index) => {
      gatesPoints.push({ name: g, points: edgeBreakPoints[index] });
    });
  }
  return gatesPoints;
};
