/// <reference types="astro/client" />

module "simple-spring" {
  interface SpringOptions {
    target: number;
    value?: number;
    tension?: number;
    friction?: number;
    mass?: number;
    precision?: number;
    fps?: number;

    onFrame?: (value: number) => void;
    onComplete?: () => void;
    onStart?: () => void;
    onRest?: () => void;
  }

  class Spring {
    constructor(options: SpringOptions);
    start(): void;
  }
}
