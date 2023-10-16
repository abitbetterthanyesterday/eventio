describe("Login", () => {
  beforeEach(() => {
    cy.exec("blitz prisma migrate reset -f -e test")
    cy.exec("blitz db seed -e test")
    cy.visit("/")
    cy.location("pathname", { timeout: 20000 }).should("include", "/login")
  })

  it("should show an error message when my credentials are wrong", () => {
    cy.findByRole("form", { name: /login/i }).should("exist")

    cy.findByRole("textbox", { name: /email/i }).type("albert@einstein.de", { force: true })
    cy.findByRole("password").type("password")

    cy.findByRole("button", { name: /login/i }).click()

    cy.findByRole("alert", { name: /error/i }).contains("The password and email do not match")
  })

  it("should show an alert when the server is down", () => {
    cy.intercept("post", "api/rpc/login", { forceNetworkError: true }).as("loginNetworkFailure")

    cy.findByRole("form", { name: /login/i }).should("exist")

    cy.findByRole("textbox", { name: /email/i }).type("albert@einstein.de", { force: true })
    cy.findByRole("password").type("password")

    cy.findByRole("button", { name: /login/i }).click()

    cy.wait("@loginNetworkFailure")

    cy.findByRole("alert", { name: /error/i }).contains("An unexpected error has happened.")
  })

  it("should redirect me when the login is successful", () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })
    cy.findByRole("form", { name: /login/i }).should("exist")

    cy.findByRole("textbox", { name: /email/i }).type(Cypress.env("loginEmail"))
    cy.findByRole("password").type(Cypress.env("loginPassword"))

    cy.findByRole("button", { name: /login/i }).click()

    cy.url().should("eq", `${Cypress.config().baseUrl}/`)
  })
})
