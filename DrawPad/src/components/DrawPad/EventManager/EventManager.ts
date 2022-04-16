import { debounce } from "lodash";

export type CustomEvents = "ZOOM";

export type EventHandler<T> = (arg: T) => void;

export interface CustomZoomEvent {
  diff: number;
  originalEvent: WheelEvent;
}

export class EventManager {
  private register: Record<CustomEvents, (event: any) => void> = {
    ZOOM: () => undefined,
  };

  private readonly WHEEL_DEBOUNCE_TIME = 10;
  private readonly WHEEL_MAX_WAIT = 1000 / 60;

  constructor(private readonly element: HTMLElement) {
    element.addEventListener(
      "wheel",
      debounce(this.onWheel, this.WHEEL_DEBOUNCE_TIME, {
        maxWait: this.WHEEL_MAX_WAIT,
      })
    );
  }

  on = <T>(type: CustomEvents, handler: EventHandler<T>) => {
    this.register[type] = handler;
  };

  flushSubscriptions = () => {
    this.element.removeEventListener("wheel", this.onWheel);
  };

  private onWheel = (e: WheelEvent) => {
    const diff = ((e as any).wheelDeltaY || -e.deltaY) / 1000;

    this.register.ZOOM({ originalEvent: e, diff });
  };
}
