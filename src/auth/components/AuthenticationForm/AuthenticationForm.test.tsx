import { act, waitFor, screen, waitForElementToBeRemoved } from "@testing-library/react"
import { afterEach } from "vitest"
import { render } from "../../../../test/utils"
import { AuthenticationForm } from "./AuthenticationForm"
import { userEvent } from "@testing-library/user-event"
import { initialValues } from "./useAuthenticationForm"
import { emailErrors, passwordErrors } from "../../schemas"
import db from "../../../../db"
import { SecurePassword } from "@blitzjs/auth/secure-password"

describe("AuthenticationForm", () => {
  afterEach(async () => {
    await db.$reset()
  })
  describe("Login", () => {
    it("should render the form with default values and no errors", () => {
      render(<AuthenticationForm />)
      // Assert that the form is rendered with the default values
      expect(screen.getByRole("textbox", { name: /email/i })).toHaveValue(initialValues.email)
      expect(screen.getByRole("password", { name: /password/i })).toHaveValue(
        initialValues.password
      )
      // Assert that there are no error messages displayed
      expect(screen.queryByRole("alert")).toBeNull()
    })

    it("should let the user login", async () => {
      const user = userEvent.setup()
      const testValues = {
        email: "twanda_ogleqldt@cities.jtk",
        password: "4KbQYB6ZQQjdc83t4deLBxJ",
      }
      const hashedPassword = await SecurePassword.hash(testValues.password.trim())
      await db.user.create({
        data: { email: testValues.email.toLowerCase().trim(), hashedPassword, role: "USER" },
        select: { id: true, name: true, email: true, role: true },
      })
      render(<AuthenticationForm />)

      await act(async () => {
        await user.type(screen.getByRole("textbox", { name: /email/i }), testValues.email)
        await user.type(screen.getByRole("password", { name: /password/i }), testValues.password)
        await user.click(screen.getByRole("button", { name: /login/i }))
      })

      await waitFor(async () => {
        expect(await screen.findByText(/Login success/i)).toBeInTheDocument()
      })
      await waitForElementToBeRemoved(() => screen.getByText(/Login success/i))
    })

    it("should toggle between login and register forms", async () => {
      const user = userEvent.setup()
      render(<AuthenticationForm />)

      // Assert that the form is rendered with the default values
      await act(async () => {
        await user.click(screen.getByRole("button", { name: /register/i }))
        await user.click(screen.getByRole("button", { name: /login/i }))
        await user.click(screen.getByRole("button", { name: /register/i }))
      })
    })

    it("should not submit the form with invalid data and display errors", async () => {
      const user = userEvent.setup()
      const testValues = {
        email: "twanda_ogleqldt",
        password: "hello",
      }
      render(<AuthenticationForm />)

      // Assert that the form is rendered with the default values
      await act(async () => {
        await user.type(screen.getByRole("textbox", { name: /email/i }), testValues.email)
        await user.type(screen.getByRole("password", { name: /password/i }), testValues.password)
        await user.click(screen.getByRole("button", { name: /login/i }))
        await user.click(screen.getByRole("button", { name: /login/i }))
      })

      expect(screen.getByText(passwordErrors.min)).toBeInTheDocument()
      expect(screen.getByText(emailErrors.invalid)).toBeInTheDocument()
    })

    it("should show an error message when my credentials are wrong", async () => {
      const user = userEvent.setup()
      const testValues = {
        email: "twanda_ogleqldt@cities.jtk",
        password: "4KbQYB6ZQQjdc83t4deLBxJ",
      }
      const hashedPassword = await SecurePassword.hash(testValues.password.trim())
      await db.user.create({
        data: { email: testValues.email.toLowerCase().trim(), hashedPassword, role: "USER" },
        select: { id: true, name: true, email: true, role: true },
      })
      render(<AuthenticationForm />)

      // Assert that the form is rendered with the default values
      await act(async () => {
        await user.type(screen.getByRole("textbox", { name: /email/i }), testValues.email)
        await user.type(
          screen.getByRole("password", { name: /password/i }),
          testValues.password + "x"
        )
        await user.click(screen.getByRole("button", { name: /login/i }))
        await user.click(screen.getByRole("button", { name: /login/i }))
      })

      expect(await screen.findByRole("alert", { name: /error/i })).toBeInTheDocument()
    })
  })
})
