import { defineShapeFunction, drawGateText, getDataForDraw } from "./functions";
import { RECTANGLE_EDGE_LENGHT, TRIANGLE_EDGE_LENGHT } from "./mathFunctions";

export enum SHAPES {
  TRIANGLE = "triangle",
  RECTANGLE = "rectangle",
}
export type tDrawDataItem = {
  title: string;
  shape: SHAPES;
  gates: (string | number)[];
  rotateAngle: number;
  startCoordinates: number[];
  edgeWidth: number;
  extraAngles?: [number, number];
};

const drawData = (width: number, height: number): tDrawDataItem[] => {
  return [
    {
      title: "Head",
      shape: SHAPES.TRIANGLE,
      gates: ["", "", 63, 61, 64, ""],
      rotateAngle: 0,
      startCoordinates: [Math.floor(width / 2), 0],
      edgeWidth: TRIANGLE_EDGE_LENGHT,
    },
    {
      title: "Ajna",
      shape: SHAPES.TRIANGLE,
      gates: [43, 17, 47, 24, 4, 11],
      rotateAngle: 180,
      startCoordinates: [Math.floor(width / 2), 70],
      edgeWidth: TRIANGLE_EDGE_LENGHT,
    },
    {
      title: "Throat",
      shape: SHAPES.RECTANGLE,
      gates: [62, 23, 56, 35, 12, 45, 33, 8, 31, 20, "", 16],
      rotateAngle: 0,
      get startCoordinates() {
        return [Math.floor(width / 2 - this.edgeWidth / 2), 200];
      },
      edgeWidth: RECTANGLE_EDGE_LENGHT,
    },

    {
      title: "G",
      shape: SHAPES.RECTANGLE,
      gates: [1, 13, 25, 46, 2, 15, 10, 7],
      rotateAngle: 45,
      get startCoordinates() {
        return [Math.floor(width / 2 - this.edgeWidth / 2), 320];
      },
      edgeWidth: RECTANGLE_EDGE_LENGHT,
    },

    {
      title: "Sacral",
      shape: SHAPES.RECTANGLE,
      gates: [5, 14, 29, "", "", 59, 9, 3, 42, 27, "", 34],
      rotateAngle: 0,
      get startCoordinates() {
        return [Math.floor(width / 2 - this.edgeWidth / 2), 450];
      },
      edgeWidth: RECTANGLE_EDGE_LENGHT,
    },
    {
      title: "Root",
      shape: SHAPES.RECTANGLE,
      gates: [53, 60, 52, 19, 39, 41, "", "", "", 58, 38, 54],
      rotateAngle: 0,
      get startCoordinates() {
        return [Math.floor(width / 2 - this.edgeWidth / 2), 580];
      },
      edgeWidth: RECTANGLE_EDGE_LENGHT,
    },
    {
      title: "Spleen",
      shape: SHAPES.TRIANGLE,
      gates: [50, 32, 28, 18, "", "", 48, 57, 44],
      rotateAngle: 90,
      get startCoordinates() {
        return [this.edgeWidth / 2, 430];
      },
      edgeWidth: RECTANGLE_EDGE_LENGHT,
    },
    {
      title: "Solar",
      shape: SHAPES.TRIANGLE,
      gates: [6, 37, 22, 36, "", "", 30, 55, 49],
      rotateAngle: 270,
      get startCoordinates() {
        return [width - this.edgeWidth / 2, 430];
      },
      edgeWidth: RECTANGLE_EDGE_LENGHT,
    },
    {
      title: "Heart",
      shape: SHAPES.TRIANGLE,
      gates: [26, 51, 21, "", 40, ""],
      rotateAngle: 110,
      get startCoordinates() {
        return [width / 2 + 1.5 * this.edgeWidth, 360];
      },
      edgeWidth: RECTANGLE_EDGE_LENGHT,
      extraAngles: [80, 50],
    },
  ];
};

export class Canvas {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  timer: number;

  constructor(parent: HTMLCanvasElement) {
    this.width = parent.width;
    this.height = parent.height;
    this.ctx = parent.getContext("2d") as CanvasRenderingContext2D;
    this.timer = 0;
  }

  public draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    const dataToDraw = drawData(this.width, this.height).map((element) => {
      return getDataForDraw(element);
    });
    dataToDraw.forEach((item) => {
      const drawShapeFunction = defineShapeFunction(item.shape);
      drawShapeFunction(this.ctx, "black", item.shapePoints);
      item.gates.forEach((gate) => {
        console.log(gate);
        drawGateText(this.ctx, gate.name, gate.points[0], gate.points[1]);
      });
    });
  }
}
