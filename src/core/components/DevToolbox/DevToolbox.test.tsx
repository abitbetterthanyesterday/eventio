import { screen, act } from "@testing-library/react"
import { Devtoolbox } from "./index"
import { render } from "../../../../test/utils"
import { cleanup } from "@testing-library/react-hooks"
import { userEvent } from "@testing-library/user-event"

const loginMock = vi.fn()

vi.mock("../../hooks/useGetEnv")
vi.mock("@blitzjs/rpc", async () => {
  const actual = await vi.importActual("@blitzjs/rpc")
  return {
    ...actual,
    useMutation: () => [loginMock],
  }
})

describe("DevToolbox", () => {
  it('should not render when process.env.NODE_ENV is not "development"', async () => {
    const useCurrentEnv = await import("../../hooks/useGetEnv")
    useCurrentEnv.useGetEnv = vi.fn(() => "production")
    render(<Devtoolbox />)
    // Assert that the component is not rendered
    expect(screen.queryByText("Dev. toolbox")).not.toBeInTheDocument()
    expect(screen.queryByText("This is only visible in dev. environment")).not.toBeInTheDocument()

    cleanup()
    useCurrentEnv.useGetEnv = vi.fn(() => "development")
    render(<Devtoolbox />)

    // Assert that the component is rendered
    expect(screen.queryByText("Dev. toolbox")).toBeInTheDocument()
    expect(screen.queryByText("This is only visible in dev. environment")).toBeInTheDocument()
  })

  it('should call loginAs function with "admin" argument when "Login as admin" Button is clicked', async () => {
    const user = userEvent.setup()
    const useCurrentEnv = await import("../../hooks/useGetEnv")
    useCurrentEnv.useGetEnv = vi.fn(() => "development")
    render(<Devtoolbox />)

    // Click the "Login as admin" button
    await act(async () => {
      await user.click(screen.getByRole("button", { name: /Login.*as.*admin/i }))
    })

    // Verify that the loginAs function is called with "admin" argument
    expect(loginMock).toHaveBeenCalledWith({
      email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
      password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD,
    })
  })

  it('should call loginAs function with "user" argument when "Login as user" Button is clicked', async () => {
    const user = userEvent.setup()
    const useCurrentEnv = await import("../../hooks/useGetEnv")
    useCurrentEnv.useGetEnv = vi.fn(() => "development")
    render(<Devtoolbox />)

    // Click the "Login as admin" button
    await act(async () => {
      await user.click(screen.getByRole("button", { name: /Login.*as.*admin/i }))
    })

    // Verify that the loginAs function is called with "admin" argument
    expect(loginMock).toHaveBeenCalledWith({
      email: process.env.NEXT_PUBLIC_USER_EMAIL,
      password: process.env.NEXT_PUBLIC_USER_PASSWORD,
    })
  })
})
