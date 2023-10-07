import { BlitzPage } from "@blitzjs/next"
import Layout from "@/core/layouts/Layout"
import { useQuery } from "@blitzjs/rpc"
import getGliders from "@/gliders/queries/getGliders"

const GlidersIndexPage: BlitzPage = () => {
  const [gliders] = useQuery(getGliders, {})

  return (
    <Layout title={"glideras"}>
      <h1>Gliders</h1>
      {gliders.map((glider) => (
        <div key={glider.id}>
          <pre>{JSON.stringify(glider, null, 2)}</pre>
        </div>
      ))}
    </Layout>
  )
}

export default GlidersIndexPage
