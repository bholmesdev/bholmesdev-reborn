import { Spring } from "simple-spring";
import Zdog from "zdog";

const markerThickness = 6;

export function smilieFace(illo: Zdog.Illustration) {
  const face = new Zdog.Group({
    translate: { x: 0, y: 0, z: 0 },
  });

  const shared = {
    addTo: face,
    stroke: markerThickness,
    color: "blue",
    backface: false,
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

  const mouth = new Zdog.Ellipse({
    ...shared,
    addTo: mouthAnchor,
    width: 20,
    height: 20,
    quarters: 1,
    rotate: { z: Zdog.TAU / 4, y: Zdog.TAU / 2 },
    backface: true,
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
      await wait(200);
      rightEye.visible = true;
      animateLine({
        line: rightEye,
        illo,
        direction: "vertical",
        length: 20,
      });
      await wait(200);
      const spring = new Spring({
        target: (Zdog.TAU * 5) / 8,
        precision: 0.1,
        onFrame(value) {
          mouthRevealer.rotate.z = Zdog.TAU / 4 + value;
          if (value > Zdog.TAU / 4) {
            mouth.quarters = 2;
          }
          mouth.updatePath();
          illo.updateRenderGraph();
        },
      });
      spring.start();
    },
  };
}

async function animateLine({
  line,
  illo,
  direction,
  length,
}: {
  line: Zdog.Shape;
  illo: Zdog.Illustration;
  direction: "horizontal" | "vertical";
  length: number;
}) {
  return new Promise((resolve) => {
    const initialX = line.path[1].x;
    const initialY = line.path[1].y;
    const spring = new Spring({
      target: length,
      // lower precision for perf
      // visually looks the same
      precision: 0.1,
      onFrame(value) {
        if (direction === "horizontal") {
          line.path[1].x = initialX + value;
        } else {
          line.path[1].y = initialY + value;
        }
        line.updatePath();
        illo.updateRenderGraph();
      },
      onComplete: () => resolve(null),
    });
    spring.start();
  });
}

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
