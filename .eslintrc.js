const base = require("@blitzjs/next/eslint")

let configuration = {
  ...base,
  parserOptions: {
    ...base.parserOptions,
    project: ["./tsconfig.json", "./cypress/tsconfig.json"],
  },
}

console.log(configuration)

module.exports = configuration
