import { Draw } from "./core";
import { Canvas } from "./screen";

const canvasHTML = document.querySelector<HTMLCanvasElement>("#canvas")!;

const screen = new Canvas(canvasHTML);
const draw = new Draw(screen);

draw.start();
