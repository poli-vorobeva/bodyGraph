export interface IMetheor {
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  size: number;
  x: number;
  y: number;
  speed: number;
  reset: () => void;
  draw: () => void;
  update: () => void;
}
export class Metheor implements IMetheor {
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  size: number;
  x: number;
  y: number;
  speed: number;
  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx;
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 3;
    this.speed = Math.random() * 5;
  }
  reset() {
    this.x = Math.random() * this.canvasWidth;
    this.y = Math.random() * this.canvasHeight * 0.05;
    this.size = (Math.random() + 0.3) * 3;
  }
  draw() {
    this.ctx.save();
    this.ctx.strokeStyle = `rgba(255,255,255,.1)`;
    this.ctx.lineCap = "round";
    this.ctx.shadowColor = "rgba(255,255,255,1)";
    this.ctx.shadowBlur = 10;
    for (let i = 0; i < 10; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineWidth = this.size;
      this.ctx.lineTo(this.x + 10 * (i + 1), this.y - 10 * (i + 1));
      this.ctx.stroke();
      this.ctx.closePath();
    }
    this.ctx.restore();
  }
  update() {
    this.x -= this.speed;
    this.y += this.speed;
    if (this.y >= this.canvasHeight + 100) {
      this.reset();
    }
  }
}
