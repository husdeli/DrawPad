import { ZUI } from "two.js/extras/jsm/zui";
import { getTranslateSurfaceAction } from "../Events/TranslateSurface";
import { getZoomAction } from "../Events/Zoom";
import { KeyboardEvents } from "../EventsManagers/KeyboardEvents";
import {
  EventPayload,
  MouseDragExtra,
  MouseEvents,
} from "../EventsManagers/MouseEvents";
import { TouchEvents } from "../EventsManagers/TouchEvents";
import { WheelEvents } from "../EventsManagers/WheelEvents";

const DRAG_CURSOR_CLASS = "dragged";

export class ZuiEvents {
  private translateSurfaceAction;
  private zoomAction;

  constructor(
    zui: ZUI,
    private keyboardEvents: KeyboardEvents,
    private mouseEvents: MouseEvents,
    private wheelEvents: WheelEvents,
    private touchEvents: TouchEvents,
    private container: HTMLElement
  ) {
    this.translateSurfaceAction = getTranslateSurfaceAction(zui);
    this.zoomAction = getZoomAction(zui);
    this.initializeHandlers();
  }

  private initializeHandlers = () => {
    // Translate surface on Space + MouseDrag
    this.keyboardEvents.registerSpaceLock(
      () => {
        this.mouseEvents.registerMouseDrag(
          this.onMouseDragStart,
          this.onMouseDrag,
          this.onMouseDragFinish
        );
      },
      () => {
        this.mouseEvents.unregisterMouseDrag({
          start: this.onMouseDragStart,
          update: this.onMouseDrag,
          finish: this.onMouseDragFinish,
        });
      }
    );
    // Translate surface on pinch-drag
    this.touchEvents.registerPinchDrag(this.translateSurfaceAction);

    // Zoom scene on mousewheel
    this.wheelEvents.registerOnWheel(this.zoomAction);
    // Zoom scene on pinch in/out
    this.touchEvents.registerInOut(this.zoomAction);
  };

  private onMouseDrag = (e: EventPayload & MouseDragExtra) => {
    this.translateSurfaceAction(e);
  };

  private onMouseDragStart = (e: EventPayload) => {
    this.container.classList.add(DRAG_CURSOR_CLASS);
  };

  private onMouseDragFinish = (e: EventPayload) => {};
}
