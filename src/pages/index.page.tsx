import { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { UserInfo } from "@/core/components/UserInfo"
import { MainAuthenticationForm } from "@/core/components/MainAuthenticationForm"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { Center, Stack } from "@mantine/core"

const Home: BlitzPage = () => {
  const currentUser = useCurrentUser()

  return (
    <Layout title="Home">
      <Center h={"100%"}>
        <Stack h={"full"} w={"full"} align={"center"} justify={"center"}>
          {currentUser && <UserInfo />}
          {!currentUser && <MainAuthenticationForm />}
        </Stack>
      </Center>
    </Layout>
  )
}

export default Home
