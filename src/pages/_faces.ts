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
      // Left eye
      animateLine({
        from: { x: -20, y: -20 },
        to: { x: -20, y: 0 },
        illo,
        shapeOpts: shared,
      });
      await wait(250);
      // Right eye
      animateLine({
        from: { x: 20, y: -20 },
        to: { x: 20, y: 0 },
        illo,
        shapeOpts: shared,
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
      // Left eye
      animateLine({
        from: { x: -20, y: -20 },
        to: { x: -20, y: 0 },
        illo,
        shapeOpts: shared,
      });
      await wait(250);
      // Right eye
      animateLine({
        from: { x: 20, y: -20 },
        to: { x: 20, y: 0 },
        illo,
        shapeOpts: shared,
      });
      await wait(150);
      // Mouth
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

export function deadFace(illo: Zdog.Illustration) {
  const face = new Zdog.Group();

  const shared = {
    ...markerConfig,
    addTo: face,
    color: "green",
  };

  return {
    face,
    async animate() {
      // Left eye
      animateLine({
        from: { x: -20, y: -20 },
        to: { x: -6, y: -6 },
        illo,
        shapeOpts: shared,
      });
      await wait(150);
      animateLine({
        from: { x: -6, y: -20 },
        to: { x: -20, y: -6 },
        illo,
        shapeOpts: shared,
      });
      await wait(150);
      // Right eye
      animateLine({
        from: { x: 6, y: -20 },
        to: { x: 20, y: -6 },
        illo,
        shapeOpts: shared,
      });
      await wait(150);
      animateLine({
        from: { x: 20, y: -20 },
        to: { x: 6, y: -6 },
        illo,
        shapeOpts: shared,
      });
      await wait(150);
      // Mouth
      animateLine({
        from: { x: -10, y: 20 },
        to: { x: 10, y: 20 },
        illo,
        shapeOpts: shared,
      });
    },
  };
}
