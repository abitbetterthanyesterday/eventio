import { AppProps, ErrorBoundary } from "@blitzjs/next"
import React, { Suspense } from "react"
import { withBlitz } from "src/blitz-client"
import "src/styles/globals.css"
import { RootErrorFallback } from "@/core/components/RootErrorFallback"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <Suspense fallback="Loading...">
        <Component {...pageProps} />
      </Suspense>
    </ErrorBoundary>
  )
}

export default withBlitz(MyApp)
