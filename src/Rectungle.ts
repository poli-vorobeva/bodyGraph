import { SHAPES } from "./Canvas";
import { getGatesCoordinates } from "./functions";
import { RECTANGLE_EDGE_LENGHT, getPointRotateCoord } from "./mathFunctions";

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
export const RECT_SIDES_COUNT = 4;

export const drawRectungleComponent = (shape: SHAPES, gates: number[], sX: number, sY: number, rotateAngle: number) => {
  const points = getRectPoints(sX, sY, RECTANGLE_EDGE_LENGHT, rotateAngle);
  const innerOffset = 14;
  const iPoints = getRectPoints(
    sX + innerOffset - 6,
    sY + innerOffset + 6,
    RECTANGLE_EDGE_LENGHT - innerOffset * 2,
    rotateAngle,
  );

  const gatesCoords = getGatesCoordinates(shape, RECT_SIDES_COUNT, gates, iPoints);
  return { gates: gatesCoords, shapePoints: points };
};
