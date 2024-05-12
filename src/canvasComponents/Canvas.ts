import { getAnimatePathData, getDataForDraw, tDataForDraw } from "../functions/functions";
import { drawData } from "./staticData";
import { DrawCanvas } from "./DrawCanvas";
export enum PATH_WIDTH {
  ACTIVE = 3,
  REGULAR = 1,
}
export type tAvtiveGateDraw = {
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
  gatePaths: [number, number][];
  activeGates: Set<number>;
  dataToDraw: tDataForDraw[];
  activeGatesDataToDraw: tAvtiveGateDraw[];

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
    this.dataToDraw = [];
    this.activeGates = new Set(activeGates);
    this.activeGatesDataToDraw = [];
  }

  public init(isFisrtRender: boolean) {
    const dataToDraw = drawData(this.width).map((element) => {
      return getDataForDraw(element);
    });
    this.dataToDraw = dataToDraw;
    this.addGatesCoordinates(dataToDraw);
    this.getActiveGatesDataToDraw();
    this.draw(isFisrtRender);
  }
  private draw(isFisrtRender: boolean) {
    new DrawCanvas(
      this.ctx,
      this.width,
      this.height,
      this.dataToDraw,
      this.gatePaths,
      this.activeGatesDataToDraw,
      this.gatesCoordinates,
      this.activeGates,
    ).draw(isFisrtRender);
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
}
