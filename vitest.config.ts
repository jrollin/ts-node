import { defineConfig } from "vite";

export default defineConfig({
  test: {
    setupFiles: ["./node_modules/fetch-mocked/testSetup.mjs"],
    // ... Specify options here.
  },
});
