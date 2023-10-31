import { upperFirst } from "@mantine/hooks"
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Divider,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core"
import { GoogleButton } from "./SocialButton"
import { AuthenticationErrorAlert } from "@/auth/components/AuthenticationForm/AuthenticationErrorAlert"
import {
  useAuthenticationForm,
  Values,
} from "@/auth/components/AuthenticationForm/useAuthenticationForm"
import { Devtoolbox } from "@/core/components/DevToolbox"
import { notifications } from "@mantine/notifications"

export const AuthenticationForm = (props: PaperProps) => {
  return (
    <Container pt={"10vh"} size={"xs"}>
      <Devtoolbox />

      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" fw={500}>
          Welcome to Paramarket
        </Text>

        <GoogleLoginButton />

        <Form />

        <Divider label="Or continue with email" labelPosition="center" my="lg" />
      </Paper>
    </Container>
  )
}

const Form = () => {
  const { error, type, toggleType, form, onSubmit, onChangeTerms } = useAuthenticationForm()

  const onClickAlert = () => {
    notifications.show({
      color: "red",
      title: "Error",
      message: "Not implemented yet",
    })
  }

  return (
    <form
      onSubmit={form.onSubmit((data: Values) => void onSubmit(data))}
      name={"login"}
      title={type}
    >
      <Stack align={"stretch"}>
        {error && <AuthenticationErrorAlert error={error} onClick={onClickAlert} />}

        {type === "register" && (
          <TextInput
            label="Name"
            placeholder="Your name"
            {...form.getInputProps("name")}
            radius="md"
          />
        )}

        <TextInput
          required
          label="Email"
          placeholder="hello@mantine.dev"
          {...form.getInputProps("email")}
          radius="md"
        />

        <PasswordInput
          required
          label="Password"
          placeholder="Your password"
          radius="md"
          role={"password"}
          {...form.getInputProps("password")}
        />

        {type === "register" && (
          <Checkbox
            label="I accept terms and conditions"
            checked={form.values.terms}
            onChange={onChangeTerms}
          />
        )}
      </Stack>

      <Group justify="space-between" mt="xl">
        <Anchor component="button" type="button" c="dimmed" onClick={toggleType} size="xs">
          {type === "register"
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </Anchor>
        <Button type="submit" radius="xl">
          {upperFirst(type)}
        </Button>
      </Group>
    </form>
  )
}

const GoogleLoginButton = (): JSX.Element => {
  return (
    <Tooltip label={"Coming soon"}>
      <Stack py={12}>
        <GoogleButton radius="xl" disabled opacity={0.5} />
      </Stack>
    </Tooltip>
  )
}
