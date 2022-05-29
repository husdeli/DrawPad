import Two from "two.js";
import ZUI from "@libs/zui";
import { TouchEvents } from "../EventsManagers/TouchEvents";
import { zoom } from "../Events/Zoom";
import { translate } from "../Events/Translate";
import { WheelEvents } from "../EventsManagers/WheelEvents";

const MAX_ZOOM = 8;
const MIN_ZOOM = 0.06;

let zui: InstanceType<typeof ZUI> | undefined;

export const initializeZui = (two: Two, hammer: HammerManager) => {
  const zui = new ZUI(two.scene);
  zui.addLimits(MIN_ZOOM, MAX_ZOOM);

  const touchEvents = new TouchEvents(hammer);
  const zoomEvent = zoom(zui);
  touchEvents.registerInOut(zoomEvent);
  touchEvents.registerPinchDrag(translate(zui));
  const wheelEvents = new WheelEvents(two.renderer.domElement);
  wheelEvents.registerOnWheel(zoomEvent);

  return zui;
};
