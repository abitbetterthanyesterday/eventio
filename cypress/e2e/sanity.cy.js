describe("Sanity checks", () => {
  it("should open the app", () => {
    cy.visit("/")
    cy.contains("Paramarket")
  })
})
