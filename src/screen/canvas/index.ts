import { ButtonProps } from "../types/ButtonProps";
import { IScreen } from "../types/Screen";

export class Canvas implements IScreen {
  ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    this.ctx = canvas.getContext("2d")!;
  }

  button(props: ButtonProps): void {
    const { x, y, width, height, text } = props;

    this.ctx.beginPath();
    this.ctx.rect(x, y, width, height);
    this.ctx.fillStyle = "black";
    this.ctx.fill();
    this.ctx.fillStyle = "white";
    this.ctx.font = "30px serif";
    this.ctx.fillText(text, x + width / 2, y + height / 2);

    document.addEventListener("click", (e) => {
      if (
        e.clientX >= x &&
        e.clientX <= x + width &&
        e.clientY >= y &&
        e.clientY <= y + height
      ) {
        props.onClick();
      }
    });
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
