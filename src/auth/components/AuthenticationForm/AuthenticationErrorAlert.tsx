import { IconInfoCircle } from "@tabler/icons-react"
import { AuthenticationError } from "blitz"
import { Alert, Anchor, Text } from "@mantine/core"

type AuthenticationErrorAlertProps = { error: Error; onClick: () => void }
export const AuthenticationErrorAlert = (props: AuthenticationErrorAlertProps) => {
  return (
    <Alert variant="light" color="red" radius="lg" title="Error" icon={<IconInfoCircle />}>
      {props.error instanceof AuthenticationError && (
        <Text>
          The password and email do not match. Please try again or
          {/* eslint-disable-next-line react/jsx-no-undef */}
          <Anchor component={"button"} c={"red.5"} onClick={props.onClick} pl={4}>
            reset your password
          </Anchor>
        </Text>
      )}
      {!(props.error instanceof AuthenticationError) && (
        <Text>
          An unexpected error has happened. The team has been notified. Please try again.
          {props.error.message}
        </Text>
      )}
    </Alert>
  )
}
