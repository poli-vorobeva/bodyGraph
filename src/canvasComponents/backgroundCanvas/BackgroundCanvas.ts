export class BackgroundCanvas {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  stars: [];
  metheors: never[];

  constructor(parent: HTMLCanvasElement) {
    this.width = parent.width;
    this.height = parent.height;
    this.ctx = parent.getContext("2d") as CanvasRenderingContext2D;
    this.stars = [];
    this.metheors = [];
  }
  public init() {
    for (let i = 0; i < this.height * 0.5; i++) {
      this.stars.push(new Star(this.ctx, this.width, this.height));
    }
    for (let i = 0; i < 5; i++) {
      this.metheors.push(new Metheor(this.ctx, this.width, this.height));
    }
    this.animationLoop();
  }
  public animationLoop() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawScene();
    requestAnimationFrame(this.animationLoop.bind(this));
  }
  private drawScene() {
    this.stars.map((star) => {
      star.update();
      star.draw();
    });
    this.metheors.map((metheor) => {
      metheor.update();
      metheor.draw();
    });
  }
}

class Star {
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

class Metheor {
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
