import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    baseUrl: "http://0.0.0.0:8000",
    specPattern: "cypress/e2e",
    supportFile: "cypress/support/e2e.ts",
    video: false
  }
})
