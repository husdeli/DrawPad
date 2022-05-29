import { useEffect } from "preact/hooks";
import { memo } from "preact/compat";
import { build, destroy } from "./Stage";

interface Props {
  container: HTMLElement;
}

export const DrawPad = memo(
  ({ container }: Props) => {
    useEffect(() => {
      build(container);
      return () => {
        destroy();
      };
    }, [container]);

    return null;
  },
  (prev, next) => prev.container !== next.container
);
