import { useMutation } from "@blitzjs/rpc"
import logout from "@/features/auth/mutations/logout"
import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { Button, Group, Stack } from "@mantine/core"

export const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <Group gap={4} justify={"center"}>
        <Button component={Link} href={Routes.SignupPage()} color={"grape"}>
          Sign Up
        </Button>
        <Button component={Link} href={Routes.LoginPage()}>
          Login
        </Button>
      </Group>
    )
  }
}
