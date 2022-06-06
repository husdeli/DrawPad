import Two from "two.js";
import { ZUI } from "two.js/extras/jsm/zui";
import { getDrawCurveEvent } from "../../Events";
import { KeyboardEvents, MouseEvents } from "../../EventsManagers";

export class DrawEvents {
  private _drawCurve;

  constructor(
    twoInst: Two,
    private mouseEvents: MouseEvents,
    private keyboardEvents: KeyboardEvents,
    private zui: ZUI
  ) {
    this._drawCurve = getDrawCurveEvent(twoInst);

    this.initializeHandlers();
  }

  private initializeHandlers() {
    const { addPoint, startPath } = this._drawCurve;

    let mouse = new Two.Vector();
    let started = false;
    this.mouseEvents.registerMouseDrag(
      ({ originalEvent }) => {
        if (this.keyboardEvents.spaceLocked) {
          return;
        }

        const { x, y } = this.zui.clientToSurface(
          originalEvent.clientX,
          originalEvent.clientY
        );
        mouse.set(x, y);
      },
      ({ originalEvent }) => {
        if (this.keyboardEvents.spaceLocked) {
          return;
        }

        const { x, y } = this.zui.clientToSurface(
          originalEvent.clientX,
          originalEvent.clientY
        );

        if (!started) {
          const v1 = new Two.Anchor(mouse.x, mouse.y);
          const v2 = new Two.Anchor(x, y);
          startPath(v1, v2);
        } else {
          const v1 = new Two.Anchor(x, y);
          addPoint(v1);
        }
        mouse.set(x, y);
      }
    );
  }
}
