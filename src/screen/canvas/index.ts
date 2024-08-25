import { IScreen } from "../types/Screen";

export class Canvas implements IScreen {
  ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    this.ctx = canvas.getContext("2d")!;
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  draw(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    newLine: boolean = true
  ): void {
    if (newLine) {
      this.ctx.beginPath();
    }
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(endX, endY);
    this.ctx.stroke();
  }
}
