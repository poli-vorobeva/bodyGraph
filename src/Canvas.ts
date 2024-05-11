import { defineDrawShapeFunction, drawGateText, getDataForDraw, tDataForDraw } from "./functions";
import { CENTER_NAME, drawData, getesRelations } from "./staticData";

enum COLORS {
  BLACK = "black",
  RED = "red",
}
export enum SHAPES {
  TRIANGLE = "triangle",
  RECTANGLE = "rectangle",
}
export type tDrawDataItem = {
  title: CENTER_NAME;
  shape: SHAPES;
  gates: (string | number)[];
  rotateAngle: number;
  startCoordinates: number[];
  edgeWidth: number;
  extraAngles?: [number, number];
};

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
    getesRelations.forEach(([g1, g2]) => {
      const firstGate = this.gatesCoordinates.get(g1);
      const secondGate = this.gatesCoordinates.get(g2);
      if (firstGate && secondGate) {
        this.ctx.beginPath();
        this.ctx.moveTo(+firstGate[0], +firstGate[1]);
        this.ctx.lineTo(+secondGate[0], +secondGate[1]);
        this.ctx.strokeStyle = COLORS.RED;
        this.ctx.stroke();
        this.ctx.closePath();
      }
    });
  }
  public init() {
    const dataToDraw = drawData(this.width).map((element) => {
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
      drawShapeFunction(this.ctx, COLORS.BLACK, item.shapePoints);
      item.gates.forEach((gate) => {
        drawGateText(this.ctx, gate.name, gate.points[0], gate.points[1]);
      });
    });
  }
}
