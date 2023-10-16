import { defineConfig } from "cypress"
import dotenv from "dotenv"

dotenv.config({ path: ".env.test" })

export default defineConfig({
  projectId: "ieu1f8",
  retries: {
    runMode: 2,
    openMode: 0,
  },
  e2e: {
    baseUrl: "http://localhost:3001",
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    loginEmail: process.env.ADMIN_EMAIL,
    loginPassword: process.env.ADMIN_PASSWORD,
  },
})
