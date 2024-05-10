import {
  defineDrawShapeFunction,
  defineShapeFunction,
  drawGateText,
  getDataForDraw,
  tDataForDraw,
  tGatePoints,
} from "./functions";
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
      gates: [13, 25, 46, 2, 15, 10, 7, 1],
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
      gates: [40, "", 26, 51, 21, ""],
      rotateAngle: 110,
      get startCoordinates() {
        return [width / 2 + 1.5 * this.edgeWidth, 360];
      },
      edgeWidth: RECTANGLE_EDGE_LENGHT,
      extraAngles: [80, 50],
    },
  ];
};
const getesRelations = [
  [64, 47],
  [61, 24],
  [63, 4],
  [17, 62],
  [43, 23],
  [11, 56],
  [16, 48],
  [20, 57],
  [31, 7],
  [8, 1],
  [33, 13],
  [45, 21],
  [12, 22],
  [35, 36],
  [25, 51],
  [15, 5],
  [40, 37],
  [2, 14],
  [46, 29],
  [44, 26],
  [50, 27],
  [59, 6],
  [32, 54],
  [28, 38],
  [18, 58],
  [19, 49],
  [39, 55],
  [41, 30],
];
export class Canvas {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  timer: number;
  gatesCoordinates: Map<number, number[]>;
  gateRelations: Map<number, number>;

  constructor(parent: HTMLCanvasElement) {
    this.width = parent.width;
    this.height = parent.height;
    this.ctx = parent.getContext("2d") as CanvasRenderingContext2D;
    this.timer = 0;
    this.gatesCoordinates = new Map();
    this.gateRelations = new Map();
  }
  private drawPaths() {
    console.log("***");
    this.ctx.beginPath(); // Start a new path
    this.ctx.moveTo(30, 50); // Move the pen to (30, 50)
    this.ctx.lineTo(150, 100); // Draw a line to (150, 100)
    this.ctx.stroke(); // Render the path

    getesRelations.forEach(([g1, g2]) => {
      const fg = this.gatesCoordinates.get(g1);
      const fs = this.gatesCoordinates.get(g2);
      if (fg && fs) {
        /*  this.ctx.beginPath(); // Start a new path
        this.ctx.moveTo(30, 50); // Move the pen to (30, 50)
        this.ctx.lineTo(150, 100); // Draw a line to (150, 100)
        this.ctx.stroke(); // Render the path */

        this.ctx.beginPath();
        this.ctx.moveTo(+fg[0], +fg[1]);
        this.ctx.lineTo(+fs[0], +fs[1]);
        this.ctx.strokeStyle = "red";
        this.ctx.stroke();
        this.ctx.closePath();
      }
    });
  }
  public init() {
    const dataToDraw = drawData(this.width, this.height).map((element) => {
      return getDataForDraw(element);
    });
    this.getGatesRelations();
    this.addGatesCoordinates(dataToDraw);
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawPaths();
    this.drawBase(dataToDraw);
  }
  private getGatesRelations() {
    getesRelations.forEach(([g1, g2]) => {
      this.gateRelations.set(g1, g2);
      this.gateRelations.set(g2, g1);
    });
  }
  private addGatesCoordinates(dataToDraw: tDataForDraw[]) {
    dataToDraw.forEach((center) => {
      center.gates.forEach((gate) => {
        if (gate.name) {
          this.gatesCoordinates.set(+gate.name, gate.points);
        }
      });
    });
  }
  private drawBase(dataToDraw: tDataForDraw[]) {
    dataToDraw.forEach((item) => {
      const drawShapeFunction = defineDrawShapeFunction(item.shape);
      drawShapeFunction(this.ctx, "black", item.shapePoints);
      item.gates.forEach((gate) => {
        drawGateText(this.ctx, gate.name, gate.points[0], gate.points[1]);
      });
    });
  }
}
