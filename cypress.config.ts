import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8000",
    specPattern: "cypress/e2e",
    supportFile: "cypress/support/e2e.ts",
    execTimeout: 5000,
    taskTimeout: 5000,
    pageLoadTimeout: 10000,
    responseTimeout: 10000,
    video: false
  }
})
