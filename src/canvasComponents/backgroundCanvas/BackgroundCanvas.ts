import { IMetheor, Metheor } from "./Metheor";
import { IStar, Star } from "./Star";

export class BackgroundCanvas {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  stars: IStar[];
  metheors: IMetheor[];

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
