import Two from "two.js";
import ZUI from "@libs/zui";
import {
  CustomDragEvent,
  CustomZoomEvent,
  EventManager,
} from "../EventManager/EventManager";

export class ZuiBuilder {
  private readonly domElement;

  private readonly MAX_ZOOM = 8;
  private readonly MIN_ZOOM = 0.06;

  constructor(
    private readonly two: Two,
    private readonly eventManager: EventManager,
    private readonly onZoom: () => void = () => undefined
  ) {
    this.domElement = this.two.renderer.domElement;
  }

  build() {
    const zui = new ZUI(this.two.renderer.scene);
    zui.addLimits(this.MIN_ZOOM, this.MAX_ZOOM);

    this.eventManager.on<CustomZoomEvent>("ZOOM", ({ diff, x, y }) => {
      zui.zoomBy(diff, x, y);
      this.onZoom();
    });

    this.eventManager.on<CustomDragEvent>("DRAG", ({ deltaX, deltaY }) => {
      zui.translateSurface(deltaX, deltaY);
    });
  }
}
