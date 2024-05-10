import { sliceGatedByEdges } from "./functions";
import {
  calcPointsOnEdge,
  getCenterCoordinates,
  getTriangleVertexesBySingle,
  rotateTriangleCoordinates,
} from "./mathFunctions";

const drawTriangleOnCanvas = (
  ctx: CanvasRenderingContext2D,
  color: string,
  x1: number,
  x2: number,
  x3: number,
  y1: number,
  y2: number,
  y3: number,
) => {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
};
const getTrianglePoints = (
  x: number,
  y: number,
  angle1: number,
  angle2: number,
  rotateAngle: number,
  scale: number,
) => {
  const [[p1x, p1y], [p2x, p2y]] = getTriangleVertexesBySingle(angle1, angle2, x, y, scale);
  const center = getCenterCoordinates(x, p1x, p2x, y, p1y, p2y);

  return { points: rotateTriangleCoordinates(x, p1x, p2x, y, p1y, p2y, rotateAngle, center), center };
};
export const drawTriangleComponent = (
  ctx: CanvasRenderingContext2D,
  gates: number[],
  sX: number,
  sY: number,
  rotateAngle: number,
) => {
  const { points } = getTrianglePoints(sX, sY, 60, 60, rotateAngle, 1);
  drawTriangleOnCanvas(ctx, "black", points[0].x, points[1].x, points[2].x, points[0].y, points[1].y, points[2].y);

  const { points: iPoints } = getTrianglePoints(sX, sY + 30, 60, 60, rotateAngle, 0.65);
  drawTriangleOnCanvas(ctx, "", iPoints[0].x, iPoints[1].x, iPoints[2].x, iPoints[0].y, iPoints[1].y, iPoints[2].y);

  const drawEdges = (gates: number[], innerTrianglePoints: { x: number; y: number }[]) => {
    const elInEdge = Math.floor(gates.length / 3);
    const slicedGates = sliceGatedByEdges(gates, elInEdge);

    for (let i = 0; i < slicedGates.length; i++) {
      const secontPointIndex = i + 1 < slicedGates.length ? i + 1 : 0;
      //  console.log(i, secontPointIndex, "%%%%%%%%%%%%");
      const edgeBreakPoints = calcPointsOnEdge(
        innerTrianglePoints[i].x,
        innerTrianglePoints[secontPointIndex].x,
        innerTrianglePoints[i].y,
        innerTrianglePoints[secontPointIndex].y,
        slicedGates[i].length,
      );
      slicedGates[i].forEach((g, index) => {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillText(`${g}`, edgeBreakPoints[index][0], edgeBreakPoints[index][1]);
      });
    }
  };
  drawEdges(gates, iPoints);
};
