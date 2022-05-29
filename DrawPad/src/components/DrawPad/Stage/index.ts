import Two from "two.js";
import { initializeHammer } from "../EventsManagers/Hammer";
import { GridBuilder } from "../Grid";
import { initializeZui } from "../Zui";

const twoInst = new Two({
  fitted: true,
  autostart: true,
});
let container: HTMLElement;

export const build = (_container: HTMLElement) => {
  container = _container;
  twoInst.appendTo(container);
  const stage = new Two.Group();
  const gridBuilder = new GridBuilder(twoInst);
  const hammer = initializeHammer(twoInst.renderer.domElement);
  initializeZui(twoInst, hammer);
  gridBuilder.build(stage);
  twoInst.add(stage);
};

export const destroy = () => {
  twoInst?.clear();
  container.firstChild && container.removeChild(container.firstChild);
};
