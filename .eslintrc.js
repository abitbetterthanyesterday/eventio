const base = require("@blitzjs/next/eslint")

let configuration = {
  ...base,
  overrides: [
    {
      files: ["**/*.cy.ts"],
      parserOptions: {
        project: ["./cypress/tsconfig.json"],
      },
    },
  ],
}

module.exports = configuration
