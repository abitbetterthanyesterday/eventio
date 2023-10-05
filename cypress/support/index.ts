export {}
declare global {
  namespace Cypress {
    interface Chainable {
      /** Login to the application */
      login(email: string, password: string): Chainable<void>

      loginAsUser(): Chainable<void>
    }
  }
}
