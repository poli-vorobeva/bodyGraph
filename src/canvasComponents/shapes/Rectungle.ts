import { SHAPES_EDGES_COUNT, tDrawDataItem } from "../constants";
import { getGatesCoordinates } from "../../functions/functions";
import { getPointRotateCoord } from "../../functions/mathFunctions";

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
    .map((sumCoord) => sumCoord / SHAPES_EDGES_COUNT.RECTANGLE);
};

export const getReactungleData = ({ shape, gates, startCoordinates, edgeWidth, rotateAngle }: tDrawDataItem) => {
  const points = getRectPoints(startCoordinates[0], startCoordinates[1], edgeWidth, rotateAngle);
  const innerOffset = 14;
  const iPoints = getRectPoints(
    startCoordinates[0] + innerOffset - 4,
    startCoordinates[1] + innerOffset + 4,
    edgeWidth - innerOffset * 2,
    rotateAngle,
  );

  const gatesCoords = getGatesCoordinates(shape, SHAPES_EDGES_COUNT.RECTANGLE, gates, iPoints);
  return { gates: gatesCoords, shapePoints: points };
};
