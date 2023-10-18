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

export const AuthenticationForm = (props: PaperProps) => {
  const { error, type, toggleType, form, onSubmit } = useAuthenticationForm()

  return (
    <Container pt={"10vh"} size={"xs"}>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" fw={500}>
          Welcome to Paramarket, {type} with
        </Text>

        <Tooltip label={"Coming soon"}>
          <Stack py={12}>
            <GoogleButton radius="xl" disabled opacity={0.5} />
          </Stack>
        </Tooltip>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form
          onSubmit={form.onSubmit((data: Values) => void onSubmit(data))}
          name={"login"}
          title={"login"}
        >
          <Stack align={"stretch"}>
            {error && (
              <AuthenticationErrorAlert error={error} onClick={() => alert("Not implement yet")} />
            )}

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
                onChange={(event) => form.setFieldValue("terms", event.currentTarget.checked)}
              />
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={() => toggleType()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  )
}
