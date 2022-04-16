import Two from "two.js";
import ZUI from "@libs/zui";
import { CustomZoomEvent, EventManager } from "../EventManager/EventManager";

export class ZuiBuilder {
  private readonly domElement;

  private readonly MAX_ZOOM = 8;
  private readonly MIN_ZOOM = 0.06;

  constructor(
    private readonly two: Two,
    private readonly onZoom: () => void = () => undefined
  ) {
    this.domElement = this.two.renderer.domElement;
  }

  build() {
    const zui = new ZUI(this.two.renderer.scene);
    zui.addLimits(this.MIN_ZOOM, this.MAX_ZOOM);

    const manager = new EventManager(this.domElement);
    manager.on<CustomZoomEvent>("ZOOM", ({ diff, originalEvent }) => {
      zui.zoomBy(diff, originalEvent.clientX, originalEvent.clientY);
      this.onZoom();
    });
  }
}
