import { getReactungleData } from "../canvasComponents/shapes/Rectungle";
import { getTriangleData } from "../canvasComponents/shapes/Triangle";
import { COLORS, FONT_SIZE, SHAPES, SHAPES_EDGES_COUNT, tDrawDataItem } from "../canvasComponents/constants";
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

export function drawGateText(ctx: CanvasRenderingContext2D, name: number, x: number, y: number, isActive: boolean) {
  ctx.beginPath();
  ctx.font = `${FONT_SIZE}px Arial`;
  ctx.fillStyle = isActive ? COLORS.WHITE : COLORS.LIGHTGREY;
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
  return shape === SHAPES.TRIANGLE ? getTriangleData : getReactungleData;
};

//Get Coordinates Function
export type tGatePoints = { name: number; points: number[] };
export type tDataForDraw = {
  shape: SHAPES;
  color: COLORS;
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
    element.edgeWidth,
    element.rotateAngle,
    element.extraAngles,
  );
  return {
    shape: element.shape,
    color: element.color,
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
    if (slicedGates[i].length === SHAPES_EDGES_COUNT.TRIANGLE && shape === SHAPES.RECTANGLE) {
      if (firstPoint.x < secondPoint.x) {
        firstPoint.x += 10;
        //secondPoint.x -= 10;
      }
      if (firstPoint.x > secondPoint.x) {
        firstPoint.x -= 15;
        secondPoint.x -= 10;
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
      firstPoint.x,
      secondPoint.x,
      firstPoint.y,
      secondPoint.y,
      slicedGates[i].length,
    );
    slicedGates[i].forEach((g, index) => {
      //там где активные ворота
      gatesPoints.push({ name: g, points: edgeBreakPoints[index] });
    });
  }
  return gatesPoints;
};
