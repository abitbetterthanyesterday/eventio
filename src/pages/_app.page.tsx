import { AppProps, ErrorBoundary } from "@blitzjs/next"
import React, { Suspense } from "react"
import { withBlitz } from "src/blitz-client"
import "src/styles/globals.css"
import "@mantine/core/styles.css"
import { RootErrorFallback } from "@/core/components/RootErrorFallback"
import { MantineProvider } from "@mantine/core"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <MantineProvider defaultColorScheme={"dark"}>
        <Suspense fallback="Loading...">
          <Component {...pageProps} />
        </Suspense>
      </MantineProvider>
    </ErrorBoundary>
  )
}

export default withBlitz(MyApp)
