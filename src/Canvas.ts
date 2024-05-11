import { COLORS } from "./constants";
import { defineDrawShapeFunction, drawGateText, getDataForDraw, tDataForDraw, tGatePoints } from "./functions";
import { tGateRelations } from "./slices/graphSlice";
import { drawData } from "./staticData";

export class Canvas {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  gatesCoordinates: Map<number, number[]>;
  gateRelations: Record<number, number>;
  gatePaths: tGateRelations;
  activeGates: number[];

  constructor(
    parent: HTMLCanvasElement,
    gateRelations: Record<number, number>,
    gatePaths: [number, number][],
    activeGates: number[],
  ) {
    this.width = parent.width;
    this.height = parent.height;
    this.ctx = parent.getContext("2d") as CanvasRenderingContext2D;
    this.gatesCoordinates = new Map();
    this.gatePaths = gatePaths;
    this.gateRelations = gateRelations;
    this.activeGates = activeGates || [];
  }
  private drawPaths() {
    this.gatePaths.forEach(([g1, g2]) => {
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
    this.addGatesCoordinates(dataToDraw);
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawPaths();
    this.drawActiveGates();
    this.drawBase(dataToDraw);
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
      item.gates.forEach((gate: tGatePoints) => {
        drawGateText(this.ctx, gate.name, gate.points[0], gate.points[1]);
      });
    });
  }
  private drawActiveGates() {
    const step = 20;
    const drawCoordinates = [];
    this.activeGates.forEach((activeGate) => {
      const currentGate = this.gatesCoordinates.get(activeGate);
      const toGate = this.gatesCoordinates.get(this.gateRelations[activeGate] || 0);
      if (currentGate && toGate) {
        const defineToTargetPointX = Math.floor((currentGate[0] + toGate[0]) / 2);
        const defineToTargetPointY = Math.floor((currentGate[1] + toGate[1]) / 2);
        const defineXStep = (defineToTargetPointX - currentGate[0]) / step;
        const defineYStep = (defineToTargetPointY - currentGate[1]) / step;
        drawCoordinates.push({
          startX: currentGate[0],
          startY: currentGate[1],
          endX: defineToTargetPointX,
          endY: defineToTargetPointY,
          stepX: defineXStep,
          stepY: defineYStep,
        });
      }
    });
    const drawLines = (
      lines: { startX: number; startY: number; endX: number; endY: number; stepX: number; stepY: number }[],
    ) => {
      for (const line of lines) {
        let currentX = line.startX;
        let currentY = line.startY;
        const drawLineStep = () => {
          this.ctx.beginPath();
          this.ctx.strokeStyle = "blue";
          this.ctx.lineWidth = 3;
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
            requestAnimationFrame(drawLineStep); // Остановить анимацию для этой линии
          }
          this.ctx.lineTo(currentX, currentY);
          this.ctx.stroke();
        };
        requestAnimationFrame(drawLineStep);
      }
    };
    drawLines(drawCoordinates);
  }
}
