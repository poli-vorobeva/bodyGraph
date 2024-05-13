import {
  defineDrawShapeFunction,
  drawGateText,
  getAnimatePathData,
  tDataForDraw,
  tGatePoints,
} from "../functions/functions";
import { tAvtiveGateDraw } from "./Canvas";
import { COLORS, DRAW_GATES_STEPS, FONT_SIZE, PATH_WIDTH } from "./constants";

const ids: number[] = [];

export class DrawCanvas {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  dataToDraw: tDataForDraw[];
  gatePaths: [number, number][];
  activeGatesDataToDraw: tAvtiveGateDraw[];
  gatesCoordinates: Map<number, number[]>;
  activeGates: Set<number>;

  constructor(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    dataToDraw: tDataForDraw[],
    gatePaths: [number, number][],
    activeGatesDataToDraw: tAvtiveGateDraw[],
    gatesCoordinates: Map<number, number[]>,
    activeGates: Set<number>,
  ) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.dataToDraw = dataToDraw;
    this.gatePaths = gatePaths;
    this.activeGatesDataToDraw = activeGatesDataToDraw;
    this.gatesCoordinates = gatesCoordinates;
    this.activeGates = activeGates;
  }
  public draw(isFisrtRender: boolean) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawPaths(isFisrtRender);
    this.drawBase();
    if (this.activeGates.size) {
      if (ids.length) {
        ids.forEach((id) => {
          cancelAnimationFrame(id);
        });
      }
      this.drawLines(this.activeGatesDataToDraw, COLORS.YELLOW, COLORS.ORANGE, PATH_WIDTH.ACTIVE);
    }
  }
  private drawPaths(isFisrtRender: boolean) {
    if (isFisrtRender) {
      const steps = DRAW_GATES_STEPS;
      const toAnimateData = this.gatePaths
        .map(([g1, g2]) => {
          const firstGate = this.gatesCoordinates.get(g1);
          const secondGate = this.gatesCoordinates.get(g2);
          if (firstGate && secondGate) {
            return getAnimatePathData(firstGate[0], firstGate[1], secondGate[0], secondGate[1], steps, true);
          }
        })
        .filter((e) => e);
      this.drawLines(toAnimateData as tAvtiveGateDraw[], COLORS.GREY, COLORS.GREY, PATH_WIDTH.REGULAR);
    } else {
      this.gatePaths.forEach(([g1, g2]) => {
        const firstGate = this.gatesCoordinates.get(g1);
        const secondGate = this.gatesCoordinates.get(g2);
        if (firstGate && secondGate) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = COLORS.GREY;
          this.ctx.lineWidth = PATH_WIDTH.REGULAR;
          this.ctx.moveTo(firstGate[0] + FONT_SIZE / 2, firstGate[1] - FONT_SIZE / 2);
          this.ctx.lineTo(secondGate[0] + FONT_SIZE / 2, secondGate[1] - FONT_SIZE / 2);
          this.ctx.stroke();
          this.ctx.closePath();
        }
      });
    }
  }
  private drawBase() {
    this.dataToDraw.forEach((item) => {
      const drawShapeFunction = defineDrawShapeFunction(item.shape);
      drawShapeFunction(this.ctx, item.color, item.shapePoints);
      item.gates.forEach((gate: tGatePoints) => {
        drawGateText(this.ctx, gate.name, gate.points[0], gate.points[1], this.activeGates.has(gate.name));
      });
    });
  }
  private drawLines(lines: tAvtiveGateDraw[], color1: COLORS, color2: COLORS, lineWidth: number) {
    for (const line of lines) {
      let currentX = line.startX;
      let currentY = line.startY;
      const drawLineStep = () => {
        this.ctx.beginPath();
        const grd = this.ctx.createLinearGradient(0, 200, 200, 0);
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
          const id = requestAnimationFrame(drawLineStep);
          ids.push(id);
        }
        this.ctx.lineTo(currentX, currentY);
        this.ctx.stroke();
        this.drawBase();
      };
      const id = requestAnimationFrame(drawLineStep);
      ids.push(id);
    }
  }
}
