import { useEffect, useMemo } from "preact/hooks";
import { memo } from "preact/compat";
import { buildStage, destroy } from "./Stage";
import { initializeZui } from "./Zui";
import { initializeHammer } from "@libs/hammer";
import { ZuiEvents } from "./Zui/ZuiEvents";
import {
  TouchEvents,
  WheelEvents,
  KeyboardEvents,
  MouseEvents,
} from "./EventsManagers";

import "./index.css";

interface Props {
  container: HTMLElement;
}

export const DrawPad = memo(
  ({ container }: Props) => {
    useMemo(() => {
      const { twoInst } = buildStage(container);
      const hammer = initializeHammer(twoInst.renderer.domElement);
      const zui = initializeZui(twoInst, hammer);

      const touchEvents = new TouchEvents(hammer);
      const wheelEvents = new WheelEvents(twoInst.renderer.domElement);
      const keyboardEvents = new KeyboardEvents(window);
      const mouseEvents = new MouseEvents(window);

      new ZuiEvents(
        zui,
        keyboardEvents,
        mouseEvents,
        wheelEvents,
        touchEvents,
        container
      );
      return () => {
        // TODO: Check for memory leaks
        destroy();
      };
    }, [container]);

    return null;
  },
  (prev, next) => prev.container !== next.container
);
