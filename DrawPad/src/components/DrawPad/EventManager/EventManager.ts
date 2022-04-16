import { debounce } from "lodash";
import Two from "two.js";

export type CustomEvents = "ZOOM" | "DRAG" | "DRAG_END";

export type EventHandler<T> = (arg: T) => void;

export interface CustomZoomEvent {
  diff: number;
  x: number;
  y: number;
}

export interface CustomDragEvent {
  deltaX: number;
  deltaY: number;
}

export class EventManager {
  private register: Record<CustomEvents, (event: any) => void> = {
    ZOOM: () => undefined,
    DRAG: () => undefined,
    DRAG_END: () => undefined,
  };

  private readonly WHEEL_DEBOUNCE_TIME = 10;
  private readonly WHEEL_MAX_WAIT = 1000 / 60;

  private scale = 1;
  private mouse = new Two.Vector();

  constructor(private readonly element: HTMLElement) {
    element.addEventListener("wheel", this.onWheel, false);
    const hammer = new Hammer(element);
    hammer.get("pinch").set({ enable: true });
    hammer.on("pinch", (e: HammerInput) => {
      this.onPinchMove(e);
      this.onPinchInOut(e);
    });
    hammer.on("pinchend", this.onPinchEnd);
  }

  on = <T>(type: CustomEvents, handler: EventHandler<T>) => {
    const oldFn = this.register[type];
    this.register[type] = (arg: T) => {
      oldFn(arg);
      handler(arg);
    };
  };

  flushSubscriptions = () => {
    this.element.removeEventListener("wheel", this.onWheel);
  };

  private onPinchMove = (e: HammerInput) => {
    const { deltaX, deltaY } = e;
    const dx = deltaX - this.mouse.x;
    const dy = deltaY - this.mouse.y;
    this.mouse.set(deltaX, deltaY);
    this.register.DRAG({ deltaX: dx, deltaY: dy });
  };

  private onPinchEnd = (e: HammerInput) => {
    this.scale = 1;
    this.mouse = new Two.Vector();
    this.register.DRAG_END(e);
  };

  private onPinchInOut = (e: HammerInput) => {
    this.register.ZOOM({
      diff: e.scale - this.scale,
      x: e.center.x,
      y: e.center.y,
    });
    this.scale = e.scale;
  };

  private onWheel = debounce(
    (e: WheelEvent) => {
      const diff = ((e as any).wheelDeltaY || -e.deltaY) / 1000;

      this.register.ZOOM({ x: e.clientX, y: e.clientY, diff });
    },
    this.WHEEL_DEBOUNCE_TIME,
    {
      maxWait: this.WHEEL_MAX_WAIT,
    }
  );
}
