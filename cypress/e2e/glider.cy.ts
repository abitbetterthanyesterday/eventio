type FormFieldData =
  | {
      inputName: RegExp
      value: string
      type: "textbox" | "spinbutton"
    }
  | {
      type: "radio"
      value: string
    }

const formData: FormFieldData[] = [
  {
    value: "Advance",
    type: "textbox",
    inputName: /brand/i,
  },
  {
    value: "Alpha 6",
    type: "textbox",
    inputName: /model/i,
  },
  { value: "Acro", type: "radio" },
  { value: "B", type: "radio" },
  { value: "2019", type: "textbox", inputName: /year/i },
  { inputName: /hours/i, type: "textbox", value: "100" },
  { inputName: /price/i, type: "textbox", value: "2000" },
  { inputName: /description/i, type: "textbox", value: "This is a test description" },
]

describe("Gliders", () => {
  beforeEach(() => {
    cy.exec("blitz prisma migrate reset -f -e test")
    cy.exec("blitz db seed -e test")
  })

  it("should be able to create a new glider ad", () => {
    cy.loginAsUser()
    cy.visit("/")

    cy.findAllByRole("link", { name: /sell/i }).first().click()
    cy.waitForNetworkIdle(2000)
    cy.url().should("include", "/new")

    // Fill the form
    for (const data of formData) {
      cy.findByRole("form").within((_) => {
        if (data.type === "radio") {
          cy.findByRole(data.type, { name: data.value }).check(data.value, { force: true })
        } else {
          cy.findByRole(data.type, { name: data.inputName }).clear().type(data.value)
        }
      })
    }

    // Set up the sliders to
    cy.get("[data-testid=weight-range-min]")
      .parent()
      .click()
      .type("{leftarrow}".repeat(3), { force: true })
      .realPress("Tab")
    cy.get("[data-testid=weight-range-max]")
      .parent()
      .click()
      .type("{rightarrow}".repeat(6), { force: true })

    // Submit the form
    cy.findByRole("form").within((_) => {
      cy.findByRole("button", { name: /submit/i }).scrollIntoView()
      cy.findByRole("button", { name: /submit/i }).click()
    })

    // Redirect to the gliders page
    cy.waitForNetworkIdle(2000)
    cy.url().should("include", "/gliders")

    // Check that the glider is in the list
    for (const { value } of formData) {
      cy.contains(value)
    }
  })
})
