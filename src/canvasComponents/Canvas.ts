import { COLORS, FONT_SIZE } from "./constants";
import {
  defineDrawShapeFunction,
  drawGateText,
  getAnimatePathData,
  getDataForDraw,
  tDataForDraw,
  tGatePoints,
} from "../functions/functions";
import { tGateRelations } from "../slices/graphSlice";
import { drawData } from "./staticData";
enum PATH_WIDTH {
  ACTIVE = 3,
  REGULAR = 1,
}
type tAvtiveGateDraw = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  stepX: number;
  stepY: number;
};
export class Canvas {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  gatesCoordinates: Map<number, number[]>;
  gateRelations: Record<number, number>;
  gatePaths: tGateRelations;
  activeGates: Set<number>;
  dataToDraw: tDataForDraw[];
  activeGatesDataToDraw: tAvtiveGateDraw[];

  constructor(
    parent: HTMLCanvasElement,
    gateRelations: Record<number, number>,
    gatePaths: [number, number][],
    activeGates: Set<number>,
  ) {
    this.width = parent.width;
    this.height = parent.height;
    this.ctx = parent.getContext("2d") as CanvasRenderingContext2D;
    this.gatesCoordinates = new Map();
    this.gatePaths = gatePaths;
    this.gateRelations = gateRelations;
    this.activeGates = new Set(activeGates);
    this.activeGatesDataToDraw = [];
  }
  private drawPaths(isFisrtRender: boolean) {
    if (isFisrtRender) {
      const steps = 30;
      const toAnimateData = this.gatePaths.map(([g1, g2]) => {
        const firstGate = this.gatesCoordinates.get(g1);
        const secondGate = this.gatesCoordinates.get(g2);
        if (firstGate && secondGate) {
          return getAnimatePathData(firstGate[0], firstGate[1], secondGate[0], secondGate[1], steps, true);
        }
      });
      this.drawLines(toAnimateData, COLORS.GREY, COLORS.GREY, PATH_WIDTH.REGULAR);
    } else {
      this.gatePaths.forEach(([g1, g2]) => {
        const firstGate = this.gatesCoordinates.get(g1);
        const secondGate = this.gatesCoordinates.get(g2);
        if (firstGate && secondGate) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = COLORS.GREY;
          this.ctx.lineWidth = PATH_WIDTH.REGULAR;
          this.ctx.moveTo(+firstGate[0] + FONT_SIZE / 2, +firstGate[1] - FONT_SIZE / 2);
          this.ctx.lineTo(+secondGate[0] + FONT_SIZE / 2, +secondGate[1] - FONT_SIZE / 2);
          this.ctx.stroke();
          this.ctx.closePath();
        }
      });
    }
  }
  public init(isFisrtRender: boolean) {
    const dataToDraw = drawData(this.width).map((element) => {
      return getDataForDraw(element);
    });
    this.dataToDraw = dataToDraw;
    this.addGatesCoordinates(dataToDraw);
    this.getActiveGatesDataToDraw();

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawPaths(isFisrtRender);
    this.drawBase(dataToDraw);
    this.drawLines(this.activeGatesDataToDraw, COLORS.YELLOW, COLORS.ORANGE, PATH_WIDTH.ACTIVE);
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
      drawShapeFunction(this.ctx, item.color, item.shapePoints);
      item.gates.forEach((gate: tGatePoints) => {
        drawGateText(this.ctx, gate.name, gate.points[0], gate.points[1], this.activeGates.has(gate.name));
      });
    });
  }
  private getActiveGatesDataToDraw() {
    const step = 20;
    const drawCoordinates: tAvtiveGateDraw[] = [];
    this.activeGates.forEach((activeGate) => {
      const currentGate = this.gatesCoordinates.get(activeGate);
      const toGate = this.gatesCoordinates.get(this.gateRelations[activeGate] || 0);
      if (currentGate && toGate) {
        drawCoordinates.push(getAnimatePathData(currentGate[0], currentGate[1], toGate[0], toGate[1], step, false));
      }
    });
    this.activeGatesDataToDraw = drawCoordinates;
  }
  private drawLines(lines: tAvtiveGateDraw[], color1: COLORS, color2: COLORS, lineWidth: number) {
    for (const line of lines) {
      let currentX = line.startX;
      let currentY = line.startY;
      const drawLineStep = () => {
        this.ctx.beginPath();
        const grd = this.ctx.createLinearGradient(0, 0, 200, 0);
        grd.addColorStop(0, color1);
        grd.addColorStop(1, color2);
        this.ctx.strokeStyle = grd;
        this.ctx.lineWidth = lineWidth;
        this.ctx.moveTo(currentX, currentY);
        currentX += line.stepX;
        currentY += line.stepY;
        if (line.startX < line.endX ? currentX > line.endX : currentX < line.endX) {
          currentX = line.endX;
        }
        if (line.startY < line.endY ? currentY > line.endY : currentY < line.endY) {
          currentY = line.endY;
        }
        if (currentX !== line.endX || currentY !== line.endY) {
          requestAnimationFrame(drawLineStep);
        }
        this.ctx.lineTo(currentX, currentY);
        this.ctx.stroke();
        this.drawBase(this.dataToDraw);
      };
      requestAnimationFrame(drawLineStep);
    }
  }
}
