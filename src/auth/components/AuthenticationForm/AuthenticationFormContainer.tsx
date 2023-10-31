import { Container, Divider, Paper, PaperProps, Text } from "@mantine/core"
import { Devtoolbox } from "@/core/components/DevToolbox"
import { Form, GoogleLoginButton } from "@/auth/components/AuthenticationForm/Form"

/** The AuthenticationFormContainer render the form, as well as the social buttons, title ect. */
export const AuthenticationFormContainer = (props: PaperProps) => {
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
