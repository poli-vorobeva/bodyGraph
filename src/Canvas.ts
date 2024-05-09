import {
  calcPointsOnEdge,
  getCenterCoordinates,
  getPointRotateCoord,
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
  gates: number[],
  sX: number,
  sY: number,
  rotateAngle: number,
) {
  const [[p1x, p1y], [p2x, p2y]] = getTriangleVertexesBySingle(
    30,
    90,
    sX,
    sY,
    1,
  );
  const center = getCenterCoordinates(sX, p1x, p2x, sY, p1y, p2y);

  const [firstPoint, secondPoint, thirdPoint] = rotateTriangleCoordinates(
    sX,
    p1x,
    p2x,
    sY,
    p1y,
    p2y,
    85,
    center,
  );
  console.log("out", sX, sY, p1x, p1y, p2x, p2y);
  ctx.beginPath();
  ctx.moveTo(firstPoint.x, firstPoint.y);
  ctx.lineTo(secondPoint.x, secondPoint.y);
  ctx.lineTo(thirdPoint.x, thirdPoint.y);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();

  const [[ip1x, ip1y], [ip2x, ip2y]] = getTriangleVertexesBySingle(
    30,
    90,
    sX,
    sY + 30,
    0.6,
  );
  console.log("insede", sX, sY + 30, ip1x, ip1y, ip2x, ip2y);
  const [firstIPoint, secondIPoint, thirdIPoint] = rotateTriangleCoordinates(
    sX,
    ip1x,
    ip2x,
    sY + 30,
    ip1y,
    ip2y,
    85,
    center,
  );
  ctx.beginPath();
  ctx.moveTo(firstIPoint.x, firstIPoint.y);
  ctx.lineTo(secondIPoint.x, secondIPoint.y);
  ctx.lineTo(thirdIPoint.x, thirdIPoint.y);
  //ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.closePath();

  const getesPerEdge = gates.length / 3;
  const firstEdgeGates = gates.slice(0, getesPerEdge);
  const firstEdgeBreakPoints = calcPointsOnEdge(
    firstIPoint.x,
    secondIPoint.x,
    firstIPoint.y,
    secondIPoint.y,
    getesPerEdge,
  );

  firstEdgeGates.forEach((g, index) => {
    console.log("firstg", g);
    ctx.beginPath();
    ctx.fillStyle = "white";
    //сдвигаем тектс вовнутрь
    const pointWithRotate = getPointRotateCoord(
      firstEdgeBreakPoints[index][0],
      firstEdgeBreakPoints[index][1],
      rotateAngle,
      center[0],
      center[1],
    );
    ctx.fillText(g, pointWithRotate.x, pointWithRotate.y);
  });

  const secondEdgeGates = gates.slice(getesPerEdge, getesPerEdge * 2);
  const secondEdgeBreakPoints = calcPointsOnEdge(
    secondIPoint.x,
    thirdIPoint.x,
    secondIPoint.y,
    thirdIPoint.y,
    getesPerEdge,
  );

  secondEdgeGates.forEach((g, index) => {
    ctx.beginPath();
    ctx.fillStyle = "white";
    //сдвигаем тектс вовнутрь
    const pointWithRotate = getPointRotateCoord(
      secondEdgeBreakPoints[index][0],
      secondEdgeBreakPoints[index][1],
      rotateAngle,
      center[0],
      center[1],
    );
    ctx.fillText(g, pointWithRotate.x, pointWithRotate.y);
  });

  const thirdEdgeGates = gates.slice(getesPerEdge * 2, getesPerEdge * 3);
  const thirdEdgeBreakPoints = calcPointsOnEdge(
    thirdIPoint.x,
    firstIPoint.x,
    thirdIPoint.y,
    firstIPoint.y,
    getesPerEdge,
  );
  thirdEdgeGates.forEach((g, index) => {
    ctx.beginPath();
    ctx.fillStyle = "white";
    //сдвигаем тектс вовнутрь
    const pointWithRotate = getPointRotateCoord(
      thirdEdgeBreakPoints[index][0],
      thirdEdgeBreakPoints[index][1],
      rotateAngle,
      center[0],
      center[1],
    );
    ctx.fillText(g, pointWithRotate.x, pointWithRotate.y);
  });

  console.log(firstEdgeGates, "f");
}

function defineGateTextCoordinates(gates: string[]) {}
enum SHAPES {
  TRIANGLE = "triangle",
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
      gates: [1, 2, "", "", 5, 6],
      rotateAngle: 0,
      startCoordinates: [Math.floor(width / 2), 0],
    },
    /*   {
      title: "Foot",
      shape: SHAPES.TRIANGLE,
      gates: [0, 0, 0, 0, 0, 0, 9, 8, 7],
      rotateAngle: 180,
      startCoordinates: [Math.floor(width / 2), Math.floor(height / 2)],
    }, */
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
    this.ctx = parent.getContext("2d");
    this.timer = 0;
  }
  /* 
  footTriangle() {
    const startX = this.width / 2;
    const startY = Math.floor(this.height / 2);
    drawTriangle(this.ctx, startX, startY, 180);
  } */
  public draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    // this.headTriangle();
    //this.footTriangle();

    drawData(this.width, this.height).forEach((element) => {
      drawTriangle(
        this.ctx,
        element.gates,
        element.startCoordinates[0],
        element.startCoordinates[1],
        element.rotateAngle,
      );
    });
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
