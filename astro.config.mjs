import { defineConfig } from "astro/config";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import markdoc from "@astrojs/markdoc";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  scopedStyleStrategy: "class",
  integrations: [solidJs(), tailwind(), markdoc(), svelte()],
});
