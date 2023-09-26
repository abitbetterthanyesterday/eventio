import { useMutation } from "@blitzjs/rpc"
import logout from "@/features/auth/mutations/logout"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"

export const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (!currentUser) {
    throw Error("No user")
  }

  return (
    <>
      <button
        onClick={async () => {
          await logoutMutation()
        }}
      >
        Logout
      </button>
      <div>
        User id: <code>{currentUser.id}</code>
        <br />
        User role: <code>{currentUser.role}</code>
      </div>
    </>
  )
}
