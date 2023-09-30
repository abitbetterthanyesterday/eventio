import { resolver } from "@blitzjs/rpc"
import { z } from "zod"

export const CreateGliderSchema = z.object({
  year: z.number().min(1979).max(2050),
  size: z.string().optional(),
  minWeight: z.number().optional(),
  maxWeight: z.number().optional(),
  hours: z.number().optional(),
  description: z.string().optional(),
  price: z.number(),
  model: z.string(),
  brand: z.string(),
})
export default resolver.pipe(resolver.zod(CreateGliderSchema), resolver.authorize(), async () => {
  return
})
