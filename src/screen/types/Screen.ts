export interface IScreen {
  clear(): void;
  draw(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    newLine?: boolean
  ): void;
}
