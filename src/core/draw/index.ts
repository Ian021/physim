import { IScreen } from "../../screen";
import { ICore } from "../types/Core";

export class Draw implements ICore {
  screen: IScreen;

  constructor(screen: IScreen) {
    this.screen = screen;
  }

  public start() {
    let mousedown = false;

    let keyPressed = "";

    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    const objects: {
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    }[] = [];

    document.addEventListener("keydown", (e) => {
      keyPressed = e.key;
    });

    document.addEventListener("keyup", (e) => {
      if (keyPressed === "Escape") {
        objects.length = 0;
        this.screen.clear();
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

      this.screen.clear();

      endX = e.clientX;
      endY = e.clientY;

      objects.forEach(({ startX, startY, endX, endY }) => {
        this.screen.draw(startX, startY, endX, endY);
      });

      let newLine = true;

      if (keyPressed === "Shift") {
        newLine = false;
      }

      this.screen.draw(startX, startY, endX, endY, newLine);

      if (keyPressed === "Shift") {
        objects.push({ startX, startY, endX, endY });

        startX = endX;
        startY = endY;
      }
    });

    document.addEventListener("mouseup", () => {
      objects.push({ startX, startY, endX, endY });
      mousedown = false;
    });
  }
}
