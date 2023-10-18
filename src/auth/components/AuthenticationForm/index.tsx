import { upperFirst, useToggle } from "@mantine/hooks"
import { useForm, zodResolver } from "@mantine/form"
import * as Sentry from "@sentry/nextjs"
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
import { useMutation } from "@blitzjs/rpc"
import login from "@/auth/mutations/login"
import { AuthenticationError } from "blitz"
import signup from "@/auth/mutations/signup"
import { useState } from "react"
import { z } from "zod"
import { Signup } from "@/auth/schemas"
import { AuthenticationErrorAlert } from "@/auth/components/AuthenticationForm/AuthenticationErrorAlert"

type Values = z.infer<typeof Signup>
export const initialValues = {
  email: "",
  name: "",
  password: "",
  terms: true,
}
export const MainAuthenticationForm = (props: PaperProps) => {
  const [type, toggle] = useToggle(["login", "register"])
  const [error, setError] = useState<Error | null>(null)
  const [$loginMutation] = useMutation(login)
  const [$signupMutation] = useMutation(signup)

  const form = useForm({
    initialValues: initialValues,
    validate: zodResolver(Signup),
  })

  async function onLogin(values: Values) {
    try {
      await $loginMutation(values)
    } catch (error: any) {
      setError(error)
      if (!(error instanceof AuthenticationError)) {
        Sentry.captureException(error)
      }
    }
  }

  const onSignup = async (values: Values) => {
    try {
      await $signupMutation(values)
    } catch (error: any) {
      if (error.code === "P2002" && error.meta?.target?.includes("email")) {
        // This error comes from Prisma
        form.setErrors({ email: "This email is already being used" })
      }
    }
  }

  async function onSubmit(values: Values) {
    if (type === "login") {
      await onLogin(values)
    } else {
      await onSignup(values)
    }
  }

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
            <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
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
