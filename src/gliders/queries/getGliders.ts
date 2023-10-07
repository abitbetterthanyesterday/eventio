import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "../../../db"

const GetGliders = z.object({
  id: z.string().optional(),
})

export default resolver.pipe(resolver.zod(GetGliders), resolver.authorize(), async (input) => {
  return await db.glider.findMany()
})
