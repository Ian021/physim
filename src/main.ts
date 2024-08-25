import { Draw, Menu } from "./core";
import { Canvas } from "./screen";

const canvasHTML = document.querySelector<HTMLCanvasElement>("#canvas")!;

const screen = new Canvas(canvasHTML);
const menu = new Menu(screen);

const draw = new Draw(screen);

menu.add(draw);

menu.start();
