import {
  getTriangleVertexesBySingle,
  rotateTriangleCoordinates,
} from "./mathFunctions";

function gateText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: never,
  y: never,
) {
  ctx.beginPath();
  ctx.font = "60px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(text, x, y);
  ctx.closePath();
}

function drawTriangle(
  ctx: CanvasRenderingContext2D,
  sX: number,
  sY: number,
  rotateAngle: number,
) {
  const [[p1x, p1y], [p2x, p2y]] = getTriangleVertexesBySingle(60, 60, sX, sY);
  const [firstPoint, secondPoint, thirdPoint] = rotateTriangleCoordinates(
    sX,
    p1x,
    p2x,
    sY,
    p1y,
    p2y,
    rotateAngle,
  );
  ctx.beginPath();
  ctx.moveTo(firstPoint.x, firstPoint.y);
  ctx.lineTo(secondPoint.x, secondPoint.y);
  ctx.lineTo(thirdPoint.x, thirdPoint.y);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

function defineGateTextCoordinates(gates: string[]) {}
enum SHAPES {
  TRIUNGLE = "triangle",
}
const drawData = (middleX: number) => ({
  Head: {
    shape: SHAPES.TRIUNGLE,
    gates: [1, 2, 3],
    coordinates: [],
  },
  Foot: {
    shape: SHAPES.TRIUNGLE,
    gates: [9, 8, 7],
  },
});

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
  headTriangle() {
    const startX = this.width / 2;
    const startY = 0;
    drawTriangle(this.ctx, startX, startY, 0);
  }
  footTriangle() {
    const startX = this.width / 2;
    const startY = Math.floor(this.height / 2);
    drawTriangle(this.ctx, startX, startY, 180);
  }
  public draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.headTriangle();
    this.footTriangle();
  }
}
//const angle = (45 * Math.PI) / 180;
// const xPrime = sX * Math.cos(angle) - sY * Math.sin(angle);
// const yPrime = sX * Math.sin(angle) + sY * Math.cos(angle);
//
// const p1xPrime = p1x * Math.cos(angle) - p1y * Math.sin(angle);
// const p1yPrime = p1x * Math.sin(angle) + p1y * Math.cos(angle);
// //console.log(sX, sY, `Новые координаты: (${xPrime}, ${yPrime})`);
//
// const p2xPrime = p2x * Math.cos(angle) - p2y * Math.sin(angle);
// const p2yPrime = p2x * Math.sin(angle) + p2y * Math.cos(angle);
//
// ctx.beginPath();
// ctx.moveTo(xPrime, yPrime);
// ctx.lineTo(p1xPrime, p1yPrime);
// ctx.lineTo(p2xPrime, p2yPrime);
// ctx.fillStyle = "red";
// ctx.fill();
// ctx.closePath();

/* 
    this.triangle(75, 50, 100, 75, 100, 25); */
/*     this.ctx.moveTo(basicX, 0);

    this.ctx.lineTo(100, basicX);
    this.ctx.stroke(); */
// this.triangle(basicX, 0, basicX + 40, 40, basicX - 40, 40);
// requestAnimationFrame(() => this.d());

//this.timer += 1;
/*  this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillRect(25, 25, this.timer, 100);
    if (this.timer < 100) {
      requestAnimationFrame(() => this.d());
    } */

//
////
