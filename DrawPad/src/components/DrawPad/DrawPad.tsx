import { h } from "preact";
import { useEffect } from "preact/hooks";
import Two from "two.js";
import { memo } from "preact/compat";
import { GridBuilder } from "./Grid/Grid";
import { ZuiBuilder } from "./Zui/ZuiBuilder";

interface Props {
  container: HTMLElement;
}

export const DrawPad = memo(
  ({ container }: Props) => {
    useEffect(() => {
      const twoInst = new Two({
        fitted: true,
        autostart: true,
      }).appendTo(container);
      const stage = new Two.Group();
      const gridBuilder = new GridBuilder(twoInst);
      gridBuilder.build(stage);
      const zuiBuilder = new ZuiBuilder(twoInst);
      zuiBuilder.build();
      twoInst.add(stage);

      return () => {
        twoInst?.clear();
        container.firstChild && container.removeChild(container.firstChild);
      };
    }, [container]);

    return null;
  },
  (prev, next) => prev.container !== next.container
);
