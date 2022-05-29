import { ZUI } from "two.js/extras/jsm/zui";

export const translate = (zui: ZUI) => {
  return ({ deltaX, deltaY }: { deltaX: number; deltaY: number }) => {
    zui.translateSurface(deltaX, deltaY);
  };
};
