import { getGatesCoordinates } from "../../functions/functions";
import {
  getCenterCoordinates,
  getTriangleVertexesBySingle,
  rotateTriangleCoordinates,
} from "../../functions/mathFunctions";
import { tDrawDataItem } from "../constants";
const DEFAULT_ANGLE = 60;
const INNER_TRIANGLE_SCALE = 0.55;
const SHAPE_SIDES_COUNT = 3;

const getTrianglePoints = (
  x: number,
  y: number,
  angle1: number,
  angle2: number,
  rotateAngle: number,
  edgeLenght: number,
  scale: number,
) => {
  const [[p1x, p1y], [p2x, p2y]] = getTriangleVertexesBySingle(angle1, angle2, x, y, edgeLenght, scale);
  const center = getCenterCoordinates(x, p1x, p2x, y, p1y, p2y);
  return { points: rotateTriangleCoordinates(x, p1x, p2x, y, p1y, p2y, rotateAngle, center), center };
};

export const getTriangleData = ({
  shape,
  gates,
  startCoordinates,
  edgeWidth,
  rotateAngle,
  extraAngles,
}: tDrawDataItem) => {
  const angle1 = extraAngles ? extraAngles[0] : DEFAULT_ANGLE;
  const angle2 = extraAngles ? extraAngles[1] : DEFAULT_ANGLE;
  const extraOffsetX = extraAngles ? 15 : 5;
  const { points } = getTrianglePoints(
    startCoordinates[0],
    startCoordinates[1],
    angle1,
    angle2,
    rotateAngle,
    edgeWidth,
    1,
  );
  const { points: iPoints } = getTrianglePoints(
    startCoordinates[0] - extraOffsetX,
    startCoordinates[1] + 30,
    angle1,
    angle2,
    rotateAngle,
    edgeWidth,
    INNER_TRIANGLE_SCALE,
  );

  const gatesCoords = getGatesCoordinates(shape, SHAPE_SIDES_COUNT, gates, iPoints);
  return { gates: gatesCoords, shapePoints: points };
};
