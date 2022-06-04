import Two from "two.js";

export type PinchStartEvent = {};
export type PinchDragEvent = { deltaX: number; deltaY: number };
export type PinchInOutEvent = {
  diff: number;
  x: number;
  y: number;
};
export type PinchEndEvent = {};

export type PinchInOutCallback = (payload: PinchInOutEvent) => void;
export type PinchDragCallback = (payload: PinchDragEvent) => void;
export type PinchDragEndCallback = () => void;

export class TouchEvents {
  private scale = 1;
  private mouse = new Two.Vector();

  private _pinchInOutCb: PinchInOutCallback = () => {};
  private _pinchDragCb: PinchDragCallback = () => {};
  private _pinchDragEndCb: PinchDragEndCallback = () => {};

  constructor(private hammer: HammerManager) {
    this.initialize();
  }

  registerPinchStart = (cb: (payload: PinchStartEvent) => void) => {};
  registerInOut = (cb: PinchInOutCallback) => {
    this._pinchInOutCb = cb;
  };
  registerPinchDrag = (cb: PinchDragCallback) => {
    this._pinchDragCb = cb;
  };

  registerPinchDragEnd = (cb: PinchDragEndCallback) => {
    this._pinchDragEndCb = cb;
  };

  private onPinchDrag = (e: HammerInput) => {
    const { deltaX, deltaY } = e;
    const dx = deltaX - this.mouse.x;
    const dy = deltaY - this.mouse.y;
    this.mouse.set(deltaX, deltaY);
    this._pinchDragCb({ deltaX: dx, deltaY: dy });
  };

  private onPinchDragEnd = (e: HammerInput) => {
    this.scale = 1;
    this.mouse = new Two.Vector();
    this._pinchDragEndCb();
  };

  private onPinchInOut = (e: HammerInput) => {
    this._pinchInOutCb({
      diff: e.scale - this.scale,
      x: e.center.x,
      y: e.center.y,
    });
    this.scale = e.scale;
  };

  private initialize = () => {
    this.hammer.get("pinch").set({ enable: true });
    this.hammer.on("pinch", (e: HammerInput) => {
      this.onPinchDrag(e);
      this.onPinchInOut(e);
    });
    this.hammer.on("pinchend", this.onPinchDragEnd);
  };
}
