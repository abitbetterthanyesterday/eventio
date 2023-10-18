import { act, screen } from "@testing-library/react"
import { afterEach, vi } from "vitest"
import { render } from "../../../../test/utils"
import { AuthenticationForm } from "./AuthenticationForm"
import { userEvent } from "@testing-library/user-event"
import { initialValues } from "./useAuthenticationForm"
import { emailErrors, passwordErrors } from "../../schemas"

const onSubmitSpy = vi.fn()
vi.mock("./useAuthenticationForm", async () => {
  const actual = await vi.importActual<typeof import("./useAuthenticationForm")>(
    "./useAuthenticationForm"
  )
  return {
    ...actual,
    useAuthenticationForm: () => ({
      ...actual.useAuthenticationForm(),
      onSubmit: onSubmitSpy,
    }),
  }
})
describe("AuthenticationForm", () => {
  afterEach(() => {
    onSubmitSpy.mockReset()
  })
  // Renders the form with default values and no errors
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

    // Submits the form with valid data and no errors
    it("should submit the form with valid data and no errors", async () => {
      const user = userEvent.setup()
      const testValues = {
        email: "twanda_ogleqldt@cities.jtk",
        password: "4KbQYB6ZQQjdc83t4deLBxJ",
      }
      render(<AuthenticationForm />)

      // Assert that the form is rendered with the default values
      await act(async () => {
        await user.type(screen.getByRole("textbox", { name: /email/i }), testValues.email)
        await user.type(screen.getByRole("password", { name: /password/i }), testValues.password)
        await user.click(screen.getByRole("button", { name: /login/i }))
      })

      expect(onSubmitSpy).toHaveBeenCalledWith({ ...initialValues, ...testValues })
    })

    // Toggles between login and register forms
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

    // Submits the form with invalid data and displays errors
    it("should submit the form with invalid data and display errors", async () => {
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
      expect(onSubmitSpy).not.toHaveBeenCalled()
    })
  })
})
