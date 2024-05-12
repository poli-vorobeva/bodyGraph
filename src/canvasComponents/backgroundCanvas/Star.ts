export interface IStar {
  x: number;
  y: number;
  size: number;
  ctx: CanvasRenderingContext2D;
  alpha: number;
  blinkChance: number;
  alphaChange: number;
  draw: () => void;
  update: () => void;
}
export class Star implements IStar {
  x: number;
  y: number;
  size: number;
  ctx: CanvasRenderingContext2D;
  alpha: number;
  blinkChance: number;
  alphaChange: number;
  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx;
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() + 0.5;
    this.blinkChance = 0.005;
    this.alpha = 0.5;
    this.alphaChange = 1;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(254,247,200,${this.alpha})`;
    this.ctx.fill();
    this.ctx.closePath();
  }
  update() {
    if (this.alphaChange === 0 && Math.random() < this.blinkChance) {
      this.alphaChange = -1;
    } else if (this.alphaChange !== 0) {
      this.alpha += this.alphaChange * 0.1;
      if (this.alpha <= 0) {
        this.alphaChange = 1;
      } else if (this.alpha >= 0.7) {
        this.alphaChange = 0;
      }
    }
  }
}
