import { drawTriangleComponent } from "./Triangle";
import { sliceGatedByEdges } from "./functions";
import { calcPointsOnEdgeRect, getPointRotateCoord } from "./mathFunctions";

enum SHAPES {
  TRIANGLE = "triangle",
  RECTANGLE = "rectangle",
}
type tDrawDataItem = {
  title: string;
  shape: SHAPES;
  gates: number[];
  rotateAngle: number;
  startCoordinates: number[];
};

const drawData = (width: number, height: number): tDrawDataItem[] => {
  return [
    {
      title: "Head",
      shape: SHAPES.TRIANGLE,
      gates: [1, 2, 3, 4, 5, 6],
      rotateAngle: 0,
      startCoordinates: [Math.floor(width / 2), 0],
    },
    {
      title: "Midgle9",
      shape: SHAPES.RECTANGLE,
      gates: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      rotateAngle: 900,
      startCoordinates: [Math.floor(width / 2) / 2, Math.floor(height / 2) / 2],
    },

    {
      title: "Midgle12",
      shape: SHAPES.RECTANGLE,
      gates: [34, 5, 66, 87, 2, 5, 9, 8, 7, 10, 11, 12],
      rotateAngle: 10,
      startCoordinates: [Math.floor(width / 2) / 2, Math.floor(height / 2)],
    },
    {
      title: "Foot",
      shape: SHAPES.TRIANGLE,
      gates: [34, 5, 66, 87, 2, 5, 9, 8, 7],
      rotateAngle: 300,
      startCoordinates: [Math.floor(width / 2), Math.floor(height / 2)],
    },
  ];
};
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

const drawRectOnCanvas = (ctx: CanvasRenderingContext2D, color: string, points: { x: number; y: number }[]) => {
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
const drawRectungleComponent = (
  ctx: CanvasRenderingContext2D,
  gates: number[],
  sX: number,
  sY: number,
  rotateAngle: number,
) => {
  const edgeLenght = 100;
  const points = getRectPoints(sX, sY, edgeLenght, rotateAngle);
  const innerOffset = 10;
  const iPoints = getRectPoints(sX + innerOffset, sY + innerOffset, edgeLenght - innerOffset * 2, rotateAngle);
  drawRectOnCanvas(ctx, "black", points);

  drawRectOnCanvas(ctx, "unset", iPoints);

  const drawEdges = (gates: number[], innerPoints: { x: number; y: number }[]) => {
    /////////////////////////////////////////////////
    const elsInSlice = Math.ceil(gates.length / 4);
    const slicedGates = sliceGatedByEdges(gates, elsInSlice);
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
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillText(`${g}`, edgeBreakPoints[index][0], edgeBreakPoints[index][1]);
      });
    }
  };
  drawEdges(gates, iPoints);
};
export class Canvas {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  timer: number;

  constructor(parent: HTMLCanvasElement) {
    this.width = parent.width;
    this.height = parent.height;
    this.ctx = parent.getContext("2d");
    this.timer = 0;
  }

  public draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    drawData(this.width, this.height).forEach((element) => {
      if (element.shape === SHAPES.TRIANGLE) {
        drawTriangleComponent(
          this.ctx,
          element.gates,
          element.startCoordinates[0],
          element.startCoordinates[1],
          element.rotateAngle,
        );
      } else {
        drawRectungleComponent(
          this.ctx,
          element.gates,
          element.startCoordinates[0],
          element.startCoordinates[1],
          element.rotateAngle,
        );
      }
    });
  }
}
