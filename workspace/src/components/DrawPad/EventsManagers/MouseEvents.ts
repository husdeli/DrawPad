import { compose } from "../../../utils/compose";

export interface EventPayload<T = MouseEvent> {
  originalEvent: T;
}

export interface MouseDragExtra {
  deltaX: number;
  deltaY: number;
}
export type Mousemove = (e: EventPayload) => void;

export type MouseDragStart = (e: EventPayload) => void;
export type MouseDragUpdate = (e: EventPayload & MouseDragExtra) => void;
export type MouseDragFinish = (e: EventPayload) => void;

let mouseMoveCache = null;

export class MouseEvents {
  private _onMouseMove: Mousemove[] = [];
  set onMouseMove(value: Mousemove[]) {
    this._onMouseMove = value;
    this.onMouseMoveComposed = compose(...this._onMouseMove);
  }

  private _onMouseDragStart: MouseDragStart[] = [];
  private _onMouseDragUpdate: MouseDragUpdate[] = [];
  private _onMouseDragFinish: MouseDragFinish[] = [];

  private _mouseLock = false;

  private onMouseMoveComposed: (...args: unknown[]) => void = (
    ...args: unknown[]
  ) => undefined;

  private get onMouseDragStart() {
    return compose(...this._onMouseDragStart);
  }

  private get onMouseDragUpdate() {
    return compose(...this._onMouseDragUpdate);
  }

  private get onMouseDragFinish() {
    return compose(...this._onMouseDragFinish);
  }

  constructor(private element: Window) {
    this.initialize();
  }

  registerMouseDrag = (
    start?: MouseDragStart,
    update?: MouseDragUpdate,
    finish?: MouseDragFinish
  ) => {
    start && this._onMouseDragStart.push(start);
    update && this._onMouseDragUpdate.push(update);
    finish && this._onMouseDragFinish.push(finish);
  };

  unregisterMouseDrag = ({
    start,
    update,
    finish,
  }: {
    start?: MouseDragStart;
    update?: MouseDragUpdate;
    finish?: MouseDragFinish;
  }) => {
    if (start) {
      this._onMouseDragStart = this._onMouseDragStart.filter(
        (cb) => cb !== start
      );
    }
    if (update) {
      this._onMouseDragUpdate = this._onMouseDragUpdate.filter(
        (cb) => cb !== update
      );
    }
    if (finish) {
      this._onMouseDragFinish = this._onMouseDragFinish.filter(
        (cb) => cb !== finish
      );
    }
  };

  registerMouseMove = (cb: Mousemove) => {
    this.onMouseMove = [...this._onMouseMove, cb];
  };

  unregisterMouseMove = (cb: Mousemove) => {
    if (cb) {
      this.onMouseMove = this._onMouseMove.filter((_cb) => cb !== _cb);
    }
  };

  private initialize = () => {
    this.subscribeOnMouseMove();
    this.subscribeOnMouseDrag();
  };

  private subscribeOnMouseDrag = () => {
    window.addEventListener("mousedown", (e: MouseEvent) => {
      if (!this._mouseLock) {
        this._mouseLock = true;
        this.onMouseDragStart({ originalEvent: e });

        let lastClientX = e.clientX;
        let lastClientY = e.clientY;

        const onMouseMove = ({ originalEvent }: EventPayload) => {
          // if basic mousemove (not drag) return
          if (!this._mouseLock) {
            return;
          }

          let deltaX = originalEvent.clientX - lastClientX;
          let deltaY = originalEvent.clientY - lastClientY;
          lastClientX = originalEvent.clientX;
          lastClientY = originalEvent.clientY;
          this.onMouseDragUpdate({ originalEvent, deltaX, deltaY });
        };
        this.registerMouseMove(onMouseMove);

        const onMouseUp = (e: MouseEvent) => {
          if (this._mouseLock) {
            this._mouseLock = false;
            this.onMouseDragFinish({ originalEvent: e });
            window.removeEventListener("mouseup", onMouseUp);
            this.unregisterMouseMove(onMouseMove);
          }
        };

        window.addEventListener("mouseup", onMouseUp);
      }
    });
  };

  private subscribeOnMouseMove = () => {
    const onMouseMove = (event: MouseEvent) => {
      this.onMouseMoveComposed({ originalEvent: event });
    };
    this.element.addEventListener("mousemove", onMouseMove);
    return () => this.element.removeEventListener("mousemove", onMouseMove);
  };
}
