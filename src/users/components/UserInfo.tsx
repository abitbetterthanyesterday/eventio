import { useCurrentUser } from "@/users/hooks/useCurrentUser"
import { Stack, Text } from "@mantine/core"

export const UserInfo = () => {
  const currentUser = useCurrentUser()

  if (!currentUser) {
    return null
  }

  return (
    <Stack>
      <Text>
        User id: <code>{currentUser.id}</code>
      </Text>
      <Text>
        User role: <code>{currentUser.role}</code>
      </Text>
    </Stack>
  )
}
