import Layout from "src/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import { UserInfo } from "@/users/components/UserInfo"
import { Button, Center, Stack } from "@mantine/core"
import Link from "next/link"

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <Center h={"100%"}>
        <Stack h={"full"} w={"full"} align={"center"} justify={"center"}>
          <Stack>
            <UserInfo />
            <Button component={Link} variant={"light"} href={Routes.NewGliderPage()}>
              Sell
            </Button>
          </Stack>
        </Stack>
      </Center>
    </Layout>
  )
}

export default Home
Home.authenticate = { redirectTo: "/login" }
