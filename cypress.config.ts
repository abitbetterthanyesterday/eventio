import { defineConfig } from "cypress"
import dotenv from "dotenv"

dotenv.config({ path: ".env.test" })

export default defineConfig({
  projectId: "iargio",
  e2e: {
    baseUrl: "http://localhost:3001",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    loginEmail: process.env.ADMIN_EMAIL,
    loginPassword: process.env.ADMIN_PASSWORD,
  },
})
