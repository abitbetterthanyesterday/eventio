import { useMutation } from "@blitzjs/rpc"
import login from "@/auth/mutations/login"
import { Button, Group, Paper, Stack, Text, Title } from "@mantine/core"
import { ShowOnlyForEnv } from "@/core/components/ShowOnlyForEnv"

export const Devtoolbox = () => {
  const [$login] = useMutation(login)

  async function loginAs(role: "admin" | "user") {
    let email, password
    switch (role) {
      case "admin":
        email = process.env.NEXT_PUBLIC_ADMIN_EMAIL
        password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD
        break
      case "user":
        email = process.env.NEXT_PUBLIC_USER_EMAIL
        password = process.env.NEXT_PUBLIC_USER_PASSWORD
        break
    }
    if (!email || !password) throw new Error(`Missing ${role} credentials in env. file`)
    await $login({
      email,
      password,
    })
  }

  function loginAsAdmin() {
    loginAs("admin")
  }

  function loginAsUser() {
    loginAs("user")
  }

  return (
    <ShowOnlyForEnv env={"development"}>
      <Paper style={{ border: "1px dashed orange" }} px={32} py={16} my={32}>
        <Stack>
          <Title>Dev. toolbox</Title>
          <Text variant={"dimmed"}>This is only visible in dev. environment</Text>
          <Group>
            <Button color="gray" onClick={loginAsAdmin}>
              Login as admin
            </Button>
            <Button color="gray" onClick={loginAsUser}>
              Login as user
            </Button>
          </Group>
        </Stack>
      </Paper>
    </ShowOnlyForEnv>
  )
}
