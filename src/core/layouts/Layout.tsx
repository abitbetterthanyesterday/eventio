import Head from "next/head"
import React, { FC, Suspense } from "react"
import { BlitzLayout, Routes } from "@blitzjs/next"
import { Anchor, AppShell, Burger, Center, Flex } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import Link from "next/link"

type Props = {
  title?: string
  children?: React.ReactNode
}
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
          <Anchor
            component={Link}
            href={Routes.Home()}
            underline={"never"}
            c={"gray.3"}
            fw={"bold"}
          >
            <Flex h={"100%"} align={"center"}>
              Eventio
            </Flex>
          </Anchor>
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
