import { Spring } from "simple-spring";

export async function animateLine({
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

export async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
