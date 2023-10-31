import { Button, Group, Paper, Stack, Text, Title } from "@mantine/core"
import { ShowOnlyForEnv } from "@/core/components/ShowOnlyForEnv"
import { useTestLoginAs } from "@/core/components/DevToolbox/useTestLoginAs"

/** The AvailableActions component the list of actions available in the dev. toolbox. */
const AvailableActions = (): JSX.Element => {
  const { loginAsAdmin, loginAsUser } = useTestLoginAs()

  return (
    <Group>
      <Button color="gray" onClick={loginAsAdmin}>
        Login as admin
      </Button>
      <Button color="gray" onClick={loginAsUser}>
        Login as user
      </Button>
    </Group>
  )
}

/** The Devtoolbox is a component that is only visible in development environment.
 * It allows to perform actions that are not available in production for testing purposes.
 * For example, it allows you to login as admin in one click. */
export const Devtoolbox = () => {
  return (
    <ShowOnlyForEnv env={"development"}>
      <Paper style={{ border: "1px dashed orange" }} px={32} py={16} my={32}>
        <Stack>
          <Title>Dev. toolbox</Title>
          <Text variant={"dimmed"}>This is only visible in dev. environment</Text>
          <AvailableActions />
        </Stack>
      </Paper>
    </ShowOnlyForEnv>
  )
}
