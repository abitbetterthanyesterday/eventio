import db from "db"

type GetModels = {
  brandId: number
}

export default async function getModels(input: GetModels) {
  return await db.gliderModel.findMany({ where: { brandId: input.brandId } })
}
