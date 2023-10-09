import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "../../../db"
import { GliderClassEnum, GliderTypeEnum } from "@/gliders/schema"

export const CreateGliderSchema = z.object({
  year: z.number().min(1979).max(2050),
  size: z.string().optional(),
  minWeight: z.number().optional(),
  maxWeight: z.number().optional(),
  hours: z.number().optional(),
  description: z.string().optional(),
  price: z.number(),
  model: z.number(),
  class: GliderClassEnum,
  seller: z.number(),
  type: GliderTypeEnum,
})
export default resolver.pipe(
  resolver.zod(CreateGliderSchema),
  resolver.authorize(),
  async (data) => {
    return db.glider.create({
      data: {
        ...data,
        class: data.class,
        year: new Date(data.year, 1, 1),
        model: {
          connect: { id: data.model },
        },
        seller: {
          connect: { id: data.seller },
        },
      },
    })
  },
)
