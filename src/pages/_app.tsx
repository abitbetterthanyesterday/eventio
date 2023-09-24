import { AppProps, ErrorBoundary } from "@blitzjs/next"
import React from "react"
import { withBlitz } from "src/blitz-client"
import "src/styles/globals.css"
import { RootErrorFallback } from "../core/components/RootErrorFallback"

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      {getLayout(<Component {...pageProps} />)}
    </ErrorBoundary>
  )
}

export default withBlitz(MyApp)
