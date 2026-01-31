import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: env.BASE_URL || "",
    plugins: [react()],
    server: {
      open: true,
      port: 5173,
    },
    build: {
      outDir: "./build",
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.ts",
      coverage: {
        provider: "v8",
        reporter: ["text", "json-summary", "json", "html"],
        exclude: [
          "node_modules/",
          "src/test/",
          "**/*.d.ts",
          "**/*.config.*",
          "**/*.test.*",
          "**/*.spec.*",
          "**/mocks/",
          "**/types/",
          "**/index.*",
        ],
      },
    },
  };
});
