import { Spring } from "simple-spring";
import Zdog from "zdog";

export async function animateLine({
  from,
  to,
  illo,
  shapeOpts,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  illo: Zdog.Illustration;
  shapeOpts?: Zdog.ShapeOptions;
}) {
  const line = new Zdog.Shape({
    ...shapeOpts,
    path: [from, { ...from }],
  });

  if (shapeOpts?.addTo) {
    shapeOpts.addTo.updateGraph();
  }

  return new Promise((resolve) => {
    const initialX = from.x;
    const initialY = from.y;

    const xDiff = Math.abs(to.x - from.x);
    const yDiff = Math.abs(to.y - from.y);
    const target = Math.max(xDiff, yDiff);

    const xScale = xDiff / target;
    const yScale = yDiff / target;

    const spring = new Spring({
      target,
      // lower precision for perf
      // visually looks the same
      precision: 0.1,
      onFrame(value) {
        line.path[1].x = initialX + value * xScale;
        line.path[1].y = initialY + value * yScale;

        line.updatePath();
        illo.updateRenderGraph();
      },
      onComplete: () => resolve(null),
    });
    spring.start();
  });
}

export async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
