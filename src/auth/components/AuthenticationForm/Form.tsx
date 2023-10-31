import {
  useAuthenticationForm,
  Values,
} from "@/auth/components/AuthenticationForm/useAuthenticationForm"
import { notifications } from "@mantine/notifications"
import {
  Anchor,
  Button,
  Checkbox,
  Group,
  PasswordInput,
  Stack,
  TextInput,
  Tooltip,
} from "@mantine/core"
import { AuthenticationErrorAlert } from "@/auth/components/AuthenticationForm/AuthenticationErrorAlert"
import { upperFirst } from "@mantine/hooks"
import { GoogleButton } from "@/auth/components/AuthenticationForm/SocialButton"

/** The Form component contains the actual form.
 * It handles the business logic.
 * */
export const Form = () => {
  const { error, type, toggleType, form, onSubmit, onChangeTerms } = useAuthenticationForm()

  /** The handler for the alert component.
   * Not implemented yet. */
  const onClickAlert = () => {
    notifications.show({
      color: "red",
      title: "Error",
      message: "Not implemented yet",
    })
  }

  return (
    <form onSubmit={form.onSubmit((data: Values) => onSubmit(data))} name={"login"} title={type}>
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
/** Allows to login using Google */
export const GoogleLoginButton = (): JSX.Element => {
  return (
    <Tooltip label={"Coming soon"}>
      <Stack py={12}>
        <GoogleButton radius="xl" disabled opacity={0.5} />
      </Stack>
    </Tooltip>
  )
}
