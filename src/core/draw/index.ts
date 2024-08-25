import { IScreen } from "../../screen";
import { ICore } from "../types/Core";

export class Draw implements ICore {
  private screen: IScreen;
  private objects: {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  }[] = [];

  constructor(screen: IScreen) {
    this.screen = screen;
  }
  name: string = "Draw";

  private draw() {
    this.screen.clear();

    this.objects.forEach(({ startX, startY, endX, endY }) => {
      this.screen.draw(startX, startY, endX, endY);
    });
  }

  public start() {
    this.draw();

    let mousedown = false;

    let keyPressed = "";

    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    document.addEventListener("keydown", (e) => {
      keyPressed = e.key;

      if (e.ctrlKey && e.key === "z") {
        this.objects.pop();

        this.draw();
      }
    });

    document.addEventListener("keyup", (e) => {
      if (keyPressed === "Escape") {
        this.objects.length = 0;

        this.draw();
      }

      if (keyPressed === e.key) {
        mousedown = false;
        keyPressed = "";
      }
    });

    document.addEventListener("mousedown", (e) => {
      mousedown = true;

      startX = e.clientX;
      startY = e.clientY;
    });

    document.addEventListener("mousemove", (e) => {
      if (!mousedown) return;

      endX = e.clientX;
      endY = e.clientY;

      this.draw();

      let newLine = true;

      if (keyPressed === "Shift") {
        newLine = false;
      }

      this.screen.draw(startX, startY, endX, endY, newLine);

      if (keyPressed === "Shift") {
        this.objects.push({ startX, startY, endX, endY });

        startX = endX;
        startY = endY;
      }
    });

    document.addEventListener("mouseup", () => {
      this.objects.push({ startX, startY, endX, endY });
      mousedown = false;
    });
  }
}
