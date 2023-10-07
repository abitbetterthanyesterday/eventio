// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands"
import { z } from "zod"
import { email, Login, password } from "../../src/auth/schemas"

// Alternatively you can use CommonJS syntax:
// require('./commands')

const login = ({ email, password }: z.infer<typeof Login>) => {
  return cy.request("POST", `/api/rpc/login`, {
    params: {
      email,
      password,
    },
  })
}

const loginAsUser = () => {
  login({
    email: Cypress.env("loginEmail"),
    password: Cypress.env("loginPassword"),
  })
}

// @ts-ignore
Cypress.Commands.add("login", login)
Cypress.Commands.add("loginAsUser", loginAsUser)
