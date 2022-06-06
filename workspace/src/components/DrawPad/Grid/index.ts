import { Group } from "two.js/src/group";
import Two from "two.js";

export interface GridConfig {
  color?: string;
  size?: number;
}

const DEFAULT_SIZE = 30;
const DEFAULT_COLOR = "#e6e6e6";

export class GridBuilder {
  private currentGridGroup: null | Group = null;

  constructor(private two: Two) {}

  build = (
    stage: Group,
    { size = DEFAULT_SIZE, color = DEFAULT_COLOR }: GridConfig = {}
  ) => {
    const { width, height } = this.two;
    const grid = new Two.Group();
    const positionX = width / 2;
    const positionY = height / 2;
    const paddingModifier = 10;
    // Horizontal
    const hCount = (height * paddingModifier) / size;
    for (let i = 0; i <= hCount; i++) {
      const nextY = i * size;
      const line1 = new Two.Line(
        -width * paddingModifier + positionX,
        positionY + nextY,
        width * paddingModifier + positionX,
        positionY + nextY
      );
      const line2 = new Two.Line(
        -width * paddingModifier + positionX,
        positionY - nextY,
        width * paddingModifier + positionX,
        positionY - nextY
      );
      line1.stroke = color;
      line2.stroke = color;
      grid.add(line1);
      grid.add(line2);
    }
    // Vertical
    const vCount = (width * paddingModifier) / size;
    for (let i = 0; i <= vCount; i++) {
      const nextX = i * size;
      const line1 = new Two.Line(
        nextX,
        -height * paddingModifier,
        nextX,
        height * paddingModifier
      );
      const line2 = new Two.Line(
        -nextX,
        -(height * paddingModifier),
        -nextX,
        height * paddingModifier
      );
      line1.stroke = color;
      line2.stroke = color;
      grid.add(line1);
      grid.add(line2);
    }

    this.currentGridGroup = grid;
    stage.add(grid);
  };

  clear = () => {
    this.currentGridGroup && this.currentGridGroup.remove();
  };
}
