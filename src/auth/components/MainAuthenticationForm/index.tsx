import { useToggle, upperFirst } from "@mantine/hooks"
import { useForm } from "@mantine/form"
import * as Sentry from "@sentry/nextjs"
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  PaperProps,
  Alert,
  Container,
  Center,
  Flex,
  Tooltip,
} from "@mantine/core"
import { TwitterButton, GoogleButton } from "./SocialButton"
import { useMutation } from "@blitzjs/rpc"
import login from "@/auth/mutations/login"
import { AuthenticationError } from "blitz"
import { FORM_ERROR } from "@/core/components/Form"
import signup from "@/auth/mutations/signup"

import { IconInfoCircle } from "@tabler/icons-react"
import { useState } from "react"
import { z } from "zod"
import { Login } from "@/auth/schemas"

export const MainAuthenticationForm = (props: PaperProps) => {
  const [type, toggle] = useToggle(["login", "register"])
  const [error, setError] = useState<Error | null>(null)
  const [$loginMutation] = useMutation(login)
  const [signupMutation] = useMutation(signup)

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) => (val.length <= 6 ? "Password should include at least 6 characters" : null),
    },
  })

  async function onLogin(values: z.infer<typeof Login>) {
    try {
      await $loginMutation(values)
    } catch (error: any) {
      setError(error)
      if (!(error instanceof AuthenticationError)) {
        Sentry.captureException(error)
      }
    }
  }

  const onSignup = async (values: z.infer<typeof Login>) => {
    try {
      await signupMutation(values)
    } catch (error: any) {
      if (error.code === "P2002" && error.meta?.target?.includes("email")) {
        // This error comes from Prisma
        return { email: "This email is already being used" }
      } else {
        return { [FORM_ERROR]: error.toString() }
      }
    }
  }

  async function onSubmit(values: z.infer<typeof Login>) {
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
          onSubmit={form.onSubmit((data) => void onSubmit(data))}
          name={"login"}
          title={"login"}
        >
          <Stack align={"stretch"}>
            {error && (
              <Alert
                variant="light"
                color="red"
                radius="lg"
                title="Error"
                icon={<IconInfoCircle />}
              >
                {error instanceof AuthenticationError && (
                  <Text>
                    The password and email do not match. Please try again or
                    <Anchor
                      component={"button"}
                      c={"red.5"}
                      onClick={() => alert("Not implement yet")}
                    >
                      reset your password
                    </Anchor>
                  </Text>
                )}
                {!(error instanceof AuthenticationError) && (
                  <Text>
                    An unexpected error has happened. The team has been notified. Please try again.
                    {error.message}
                  </Text>
                )}
              </Alert>
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
