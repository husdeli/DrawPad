import { ZUI } from "two.js/extras/jsm/zui";

export const getTranslateSurfaceAction = (zui: ZUI) => {
  return ({ deltaX, deltaY }: { deltaX: number; deltaY: number }) => {
    zui.translateSurface(deltaX, deltaY);
  };
};
