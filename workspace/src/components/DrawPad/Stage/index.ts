import Two from "two.js";
import { GridBuilder } from "../Grid";

const twoInst = new Two({
  type: Two.Types.canvas,
  fitted: true,
  autostart: true,
});
let container: HTMLElement;

export const buildStage = (_container: HTMLElement) => {
  container = _container;
  twoInst.appendTo(container);
  const stage = new Two.Group();
  const gridBuilder = new GridBuilder(twoInst);
  gridBuilder.build(stage);
  twoInst.add(stage);

  return {
    twoInst,
    stage,
  };
};

export const destroy = () => {
  twoInst?.clear();
  container.firstChild && container.removeChild(container.firstChild);
};
