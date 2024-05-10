import { tGatePoints } from "./DataItem";
import { sliceGatedByEdges } from "./functions";
import {
  calcPointsOnEdge,
  getCenterCoordinates,
  getTriangleVertexesBySingle,
  rotateTriangleCoordinates,
} from "./mathFunctions";
const DEFAULT_ANGLE = 60;

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
  gates: number[],
  sX: number,
  sY: number,
  rotateAngle: number,
  extraAngles?: [number, number],
) => {
  const angle1 = extraAngles ? extraAngles[0] : DEFAULT_ANGLE;
  const angle2 = extraAngles ? extraAngles[1] : DEFAULT_ANGLE;
  const { points } = getTrianglePoints(sX, sY, angle1, angle2, rotateAngle, 1);
  // drawTriangleOnCanvas(ctx, "black", points[0].x, points[1].x, points[2].x, points[0].y, points[1].y, points[2].y);

  const { points: iPoints } = getTrianglePoints(sX, sY + 30, angle1, angle2, rotateAngle, 0.55);
  // drawTriangleOnCanvas(ctx, "", iPoints[0].x, iPoints[1].x, iPoints[2].x, iPoints[0].y, iPoints[1].y, iPoints[2].y);

  const drawEdges = (gates: number[], innerTrianglePoints: { x: number; y: number }[]) => {
    const elInEdge = Math.floor(gates.length / 3);
    const slicedGates = sliceGatedByEdges(gates, elInEdge);
    const gatesPoints: tGatePoints[] = [];
    for (let i = 0; i < slicedGates.length; i++) {
      const secontPointIndex = i + 1 < slicedGates.length ? i + 1 : 0;
      const edgeBreakPoints = calcPointsOnEdge(
        innerTrianglePoints[i].x,
        innerTrianglePoints[secontPointIndex].x,
        innerTrianglePoints[i].y,
        innerTrianglePoints[secontPointIndex].y,
        slicedGates[i].length,
      );
      slicedGates[i].forEach((g, index) => {
        // ctx.beginPath();
        // ctx.fillStyle = "white";
        gatesPoints.push({ name: g, points: edgeBreakPoints[index] });
        // ctx.fillText(`${g}`, edgeBreakPoints[index][0], edgeBreakPoints[index][1]);
      });
    }
    return {
      shapePoints: points,
      gates: gatesPoints,
    };
  };
  return drawEdges(gates, iPoints);
};
