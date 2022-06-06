import Two from "two.js";
import ZUI from "@libs/Zui";

const MAX_ZOOM = 8;
const MIN_ZOOM = 0.06;

export const initializeZui = (two: Two, hammer: HammerManager) => {
  const zui = new ZUI(two.scene);
  zui.addLimits(MIN_ZOOM, MAX_ZOOM);

  return zui;
};
