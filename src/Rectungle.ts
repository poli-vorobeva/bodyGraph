import { sliceGatedByEdges, tGatePoints } from "./functions";
import { RECTANGLE_EDGE_LENGHT, calcPointsOnEdgeRect, getPointRotateCoord } from "./mathFunctions";

const getRectPoints = (x: number, y: number, edgeLenght: number, rotateAngle: number) => {
  const startPoints = [
    [x, y],
    [x + edgeLenght, y],
    [x + edgeLenght, y + edgeLenght],
    [x, y + edgeLenght],
  ];
  const center = getRectCenterCoords(startPoints);
  return startPoints.map((point) => {
    return getPointRotateCoord(point[0], point[1], rotateAngle, center[0], center[1]);
  });
};

const getRectCenterCoords = (points: number[][]) => {
  return points
    .reduce(
      (acc, point) => {
        point.forEach((coord, index) => {
          acc[index] += coord;
        });
        return acc;
      },
      [0, 0],
    )
    .map((sumCoord) => sumCoord / 4);
};

export const drawRectungleComponent = (gates: number[], sX: number, sY: number, rotateAngle: number) => {
  const points = getRectPoints(sX, sY, RECTANGLE_EDGE_LENGHT, rotateAngle);
  const innerOffset = 14;
  const iPoints = getRectPoints(
    sX + innerOffset - 6,
    sY + innerOffset + 6,
    RECTANGLE_EDGE_LENGHT - innerOffset * 2,
    rotateAngle,
  );
  // drawRectOnCanvas(ctx, "black", points);

  // drawRectOnCanvas(ctx, "unset", iPoints);

  const drawEdges = (gates: number[], innerPoints: { x: number; y: number }[]) => {
    const elsInSlice = Math.ceil(gates.length / 4);
    const slicedGates = sliceGatedByEdges(gates, elsInSlice);
    const gatesPoints: tGatePoints[] = [];
    for (let i = 0; i < slicedGates.length; i++) {
      const secontPointIndex = i + 1 <= slicedGates.length - 1 ? i + 1 : 0;
      const edgeBreakPoints = calcPointsOnEdgeRect(
        innerPoints[i].x,
        innerPoints[secontPointIndex].x,
        innerPoints[i].y,
        innerPoints[secontPointIndex].y,
        slicedGates[i].length,
      );
      slicedGates[i].forEach((g, index) => {
        gatesPoints.push({ name: `${g}`, points: edgeBreakPoints[index] });

        /* ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillText(`${g}`, edgeBreakPoints[index][0], edgeBreakPoints[index][1]); */
      });
    }
    return {
      shapePoints: points,
      gates: gatesPoints,
    };
  };
  return drawEdges(gates, iPoints);
};
