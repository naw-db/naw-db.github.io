import { parse } from "csv-parse/sync";
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8000",
    specPattern: "cypress/e2e",
    supportFile: "cypress/support/e2e.ts",
    execTimeout: 5000,
    taskTimeout: 5000,
    pageLoadTimeout: 10000,
    responseTimeout: 10000,
    video: false,
    setupNodeEvents(on, config) {
      on(
        "task",
        {
          csvToJson({ csv }) {
            return parse(csv, { columns: true, skip_empty_lines: true });
          }
        }
      );
    }
  }
})
