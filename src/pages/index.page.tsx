import { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import { UserInfo } from "@/users/components/UserInfo"
import { MainAuthenticationForm } from "src/auth/components/MainAuthenticationForm"
import { useCurrentUser } from "@/users/hooks/useCurrentUser"
import { Button, Center, Stack } from "@mantine/core"
import Link from "next/link"

const Home: BlitzPage = () => {
  const currentUser = useCurrentUser()

  return (
    <Layout title="Home">
      <Center h={"100%"}>
        <Stack h={"full"} w={"full"} align={"center"} justify={"center"}>
          {currentUser && (
            <Stack>
              <UserInfo />
              <Button component={Link} variant={"light"} href={Routes.NewGliderPage()}>
                Sell
              </Button>
            </Stack>
          )}

          {!currentUser && <MainAuthenticationForm />}
        </Stack>
      </Center>
    </Layout>
  )
}

export default Home
