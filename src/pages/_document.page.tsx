import Document, { Html, Main, NextScript, Head } from "next/document"

import { Button, ColorSchemeScript } from "@mantine/core"

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <ColorSchemeScript defaultColorScheme={"dark"} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
