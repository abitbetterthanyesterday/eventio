import Head from "next/head"
import React, { FC, Suspense } from "react"
import { BlitzLayout } from "@blitzjs/next"
import { AppShell, Burger, Center, Flex } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

type Props = { title?: string; children?: React.ReactNode }
const Layout: BlitzLayout<Props> = ({ title, children }) => {
  const [opened, { toggle }] = useDisclosure()

  return (
    <>
      <Head>
        <title>{title || "eventio"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppShell padding="md" header={{ height: 60 }}>
        <AppShell.Header p={16}>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size={"sm"} />
          <Flex h={"100%"} align={"center"}>
            Eventio
          </Flex>
        </AppShell.Header>

        <AppShell.Main>
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
