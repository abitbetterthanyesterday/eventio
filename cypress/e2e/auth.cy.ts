describe("Sign up and login", () => {
  beforeEach(() => {
    cy.exec("blitz prisma migrate reset -f -e test")
    cy.exec("blitz db seed -e test")
    cy.visit("/")
    cy.location("pathname", { timeout: 20000 }).should("include", "/login")
  })

  it("should let me create a user, and login with it", () => {
    const testValues = {
      name: "Jazzmine",
      email: "waldo_motesz@those.cvd",
      password: "LzCQrIPDG3bsIEM62OtL",
    }

    cy.findByRole("form", { name: /login/i }).should("exist")
    cy.findByRole("textbox", { name: /email/i }).type(testValues.email, { force: true })
    cy.findByRole("password").type(testValues.password)
    cy.findByRole("button", { name: /^login$/i }).click()

    cy.findByRole("alert", { name: /error/i }).contains("The password and email do not match")

    cy.findByRole("button", { name: /register/i }).click()

    cy.findByRole("form", { name: /register/i }).should("exist")
    cy.findByRole("textbox", { name: /email/i }).clear().type(testValues.email, { force: true })
    cy.findByRole("password").clear().type(testValues.password)
    cy.findByRole("textbox", { name: /name/i }).clear().type(testValues.name)
    cy.findByRole("button", { name: /register/i }).click()

    cy.location("pathname", { timeout: 20000 }).should("include", "/")

    cy.findByRole("button", { name: /logout/i }).click()

    cy.location("pathname", { timeout: 20000 }).should("include", "/login")

    cy.findByRole("form", { name: /login/i }).should("exist")
    cy.findByRole("textbox", { name: /email/i }).type(testValues.email, { force: true })
    cy.findByRole("password").type(testValues.password)
    cy.findByRole("button", { name: /^login$/i }).click()
    const welcomeNotificationRegExp = new RegExp(`Welcome.*${testValues.name}`, "i")
    cy.findByText(welcomeNotificationRegExp).should("exist")

    cy.location("pathname", { timeout: 20000 }).should("include", "/")
  })

  it("should show an alert when the server is down", () => {
    // This is really difficult to test in vitest, so we do it here
    cy.intercept("post", "api/rpc/login", { forceNetworkError: true }).as("loginNetworkFailure")

    cy.findByRole("form", { name: /login/i }).should("exist")

    cy.findByRole("textbox", { name: /email/i }).type("ratha_temple7n@removable.gar", {
      force: true,
    })
    cy.findByRole("password").type("U2QWY7ayu9K")

    cy.findByRole("button", { name: /^login$/i }).click()

    cy.wait("@loginNetworkFailure")

    cy.findByRole("alert", { name: /error/i }).contains("An unexpected error has happened.")
  })
})
