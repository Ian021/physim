import { IScreen } from "../../screen";
import { ICore } from "../types/Core";

export class Menu implements ICore {
  name: string = "Menu";

  private screen: IScreen;
  items: ICore[] = [];

  constructor(screen: IScreen) {
    this.screen = screen;
  }

  add(item: ICore) {
    this.items.push(item);
  }

  draw() {
    this.screen.clear();

    this.items.forEach((item, index) => {
      this.screen.button({
        text: item.name,
        x: 400,
        y: 100 + index * 65,
        width: 400,
        height: 60,
        onClick: () => {
          item.start();
        },
      });
    });
  }

  start(): void {
    this.draw();
  }
}
