import { debounce } from "lodash";

const WHEEL_DEBOUNCE_TIME = 10;
const WHEEL_MAX_WAIT = 1000 / 60;

interface CustomWheelEvent {
  x: number;
  y: number;
  diff: number;
}

type OnWheelCallback = (payload: CustomWheelEvent) => void;

export class WheelEvents {
  private _onWheelCb: OnWheelCallback = () => {};

  constructor(private element: HTMLElement) {
    this.initialize();
  }

  registerOnWheel = (cb: OnWheelCallback) => {
    this._onWheelCb = cb;
  };

  private onWheel = debounce(
    (e: WheelEvent) => {
      const diff = ((e as any).wheelDeltaY || -e.deltaY) / 1000;

      this._onWheelCb({ x: e.clientX, y: e.clientY, diff });
    },
    WHEEL_DEBOUNCE_TIME,
    {
      maxWait: WHEEL_MAX_WAIT,
    }
  );

  private initialize = () => {
    this.element.addEventListener("wheel", this.onWheel, false);
  };
}
