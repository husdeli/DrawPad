import Two from "two.js";

export function getDrawCurveEvent(twoInst: Two) {
  const group = new Two.Group();
  twoInst.add(group);

  let path: null | InstanceType<typeof Two.Path> = null;
  return {
    startPath: (
      point1: InstanceType<typeof Two.Anchor>,
      point2: InstanceType<typeof Two.Anchor>
    ) => {
      path = new Two.Path([point1, point2], false, true);
      group?.add(path);
      return path;
    },
    addPoint: (point: InstanceType<typeof Two.Anchor>) => {
      path?.vertices.push(point);
    },
    clear: () => {
      path = null;
      twoInst.remove(group);
    },
  };
}
