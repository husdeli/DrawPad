import { ZUI } from "two.js/extras/jsm/zui";

export const zoom = (zui: ZUI) => {
  return ({ x, y, diff }: { x: number; y: number; diff: number }) => {
    zui.zoomBy(diff, x, y);
  };
};
