import { Spring } from "simple-spring";
import Zdog from "zdog";
import { animateLine, wait } from "../utils";

const markerThickness = 6;

const markerConfig = {
  stroke: markerThickness,
  backface: false,
};

export function smilieFace(illo: Zdog.Illustration) {
  const face = new Zdog.Group();

  const shared = {
    ...markerConfig,
    addTo: face,
    color: "blue",
  };

  const leftEye = new Zdog.Shape({
    ...shared,
    path: [
      { x: -20, y: -20 },
      { x: -20, y: -20 },
    ],
  });

  const rightEye = new Zdog.Shape({
    ...shared,
    // make visible on a delay
    visible: false,
    path: [
      { x: 20, y: -20 },
      { x: 20, y: -20 },
    ],
  });

  const mouthAnchor = new Zdog.Anchor({
    addTo: face,
    translate: { x: 0, y: 12 },
  });

  const mouthArcLeft: Zdog.PathArcCommand = {
    arc: [
      { x: -10, y: 10 },
      { x: 0, y: 10 },
    ],
  };

  const mouthArcRight: Zdog.PathArcCommand = {
    arc: [
      { x: 10, y: 10 },
      { x: 10, y: 0 },
    ],
  };

  const mouth = new Zdog.Shape({
    ...shared,
    addTo: mouthAnchor,
    path: [
      { x: -10, y: 0 },
      mouthArcLeft,
      // add `mouthArcRight` during animation
    ],
    closed: false,
  });

  const mouthRevealer = mouth.copy({
    stroke: shared.stroke + 1,
    color: "white",
  });

  return {
    face,
    async animate() {
      animateLine({
        line: leftEye,
        illo,
        direction: "vertical",
        length: 20,
      });
      await wait(150);
      rightEye.visible = true;
      animateLine({
        line: rightEye,
        illo,
        direction: "vertical",
        length: 20,
      });
      await wait(150);
      const spring = new Spring({
        target: (Zdog.TAU * 5) / 8,
        precision: 0.1,
        onFrame(value) {
          mouthRevealer.rotate.z = -value;
          if (value > Zdog.TAU / 4) {
            // Avoid using `.push()` or spreading existing path.
            // Creates imperfections in curve.
            mouth.path = [{ x: -10, y: 0 }, mouthArcLeft, mouthArcRight];
            mouth.updatePath();
            face.updateGraph();
          }
          illo.updateRenderGraph();
        },
      });
      spring.start();
    },
  };
}
export function frownieFace(illo: Zdog.Illustration) {
  const face = new Zdog.Group();

  const shared = {
    ...markerConfig,
    addTo: face,
    color: "red",
  };

  const leftEye = new Zdog.Shape({
    ...shared,
    path: [
      { x: -20, y: -20 },
      { x: -20, y: -20 },
    ],
  });

  const rightEye = new Zdog.Shape({
    ...shared,
    // make visible on a delay
    visible: false,
    path: [
      { x: 20, y: -20 },
      { x: 20, y: -20 },
    ],
  });

  const mouthAnchor = new Zdog.Anchor({
    addTo: face,
    translate: { x: 0, y: 22 },
  });

  const mouthStart: Zdog.PathCommand = { x: -10, y: 0 };

  const mouthArcLeft: Zdog.PathArcCommand = {
    arc: [
      { x: -10, y: -10 },
      { x: 0, y: -10 },
    ],
  };

  const mouthArcRight: Zdog.PathArcCommand = {
    arc: [
      { x: 10, y: -10 },
      { x: 10, y: 0 },
    ],
  };

  const mouth = new Zdog.Shape({
    ...shared,
    addTo: mouthAnchor,
    path: [
      mouthStart,
      mouthArcLeft,
      // add `mouthArcRight` during animation
    ],
    closed: false,
  });

  const mouthRevealer = mouth.copy({
    stroke: shared.stroke + 1,
    color: "white",
  });

  return {
    face,
    async animate() {
      animateLine({
        line: leftEye,
        illo,
        direction: "vertical",
        length: 20,
      });
      await wait(150);
      rightEye.visible = true;
      animateLine({
        line: rightEye,
        illo,
        direction: "vertical",
        length: 20,
      });
      await wait(150);
      const spring = new Spring({
        target: (Zdog.TAU * 5) / 8,
        precision: 0.1,
        onFrame(value) {
          mouthRevealer.rotate.z = value;
          if (value > Zdog.TAU / 4) {
            // Avoid using `.push()` or spreading existing path.
            // Creates imperfections in curve.
            mouth.path = [mouthStart, mouthArcLeft, mouthArcRight];
            mouth.updatePath();
            face.updateGraph();
          }
          illo.updateRenderGraph();
        },
      });
      spring.start();
    },
  };
}
