import Head from "next/head"
import React, { Suspense } from "react"
import { BlitzLayout, Routes } from "@blitzjs/next"
import { Anchor, AppShell, Burger, Button, ButtonGroup, Center, Flex, Group } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import Link from "next/link"
import { useMutation } from "@blitzjs/rpc"
import logout from "@/auth/mutations/logout"
import { useCurrentUser } from "@/users/hooks/useCurrentUser"

type Props = {
  title?: string
  children?: React.ReactNode
}
const Layout: BlitzLayout<Props> = ({ title, children }) => {
  const [opened, { toggle }] = useDisclosure()
  const [logoutMutation] = useMutation(logout)
  const user = useCurrentUser()

  return (
    <>
      <Head>
        <title>{title || "eventio"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppShell padding="md" header={{ height: 60 }}>
        <AppShell.Header p={16}>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size={"sm"} />
          <Flex h={"full"} align={"center"} justify={"space-between"}>
            <Anchor
              component={Link}
              href={Routes.Home()}
              underline={"never"}
              c={"gray.3"}
              fw={"bold"}
            >
              Paramarket
            </Anchor>
            {user && (
              <Group gap={20}>
                <Button component={Link} href={Routes.NewGliderPage()} color={"orange"}>
                  Sell
                </Button>
                <Button
                  size={"sm"}
                  variant={"light"}
                  onClick={async () => {
                    await logoutMutation()
                  }}
                >
                  Logout
                </Button>
              </Group>
            )}
          </Flex>
        </AppShell.Header>

        <AppShell.Main h={20}>
          <Suspense fallback="Loading...">{children}</Suspense>
        </AppShell.Main>

        <AppShell.Footer h={35} fz={"xs"}>
          <Center h={"100%"} c={"dimmed"}>
            Copyright 2023
          </Center>
        </AppShell.Footer>
      </AppShell>
    </>
  )
}

export default Layout
