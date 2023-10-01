import db from "db"
import { Simulate } from "react-dom/test-utils"
import input = Simulate.input

type GetModels = {
  brandId: number
}

export default async function getModels(input: GetModels) {
  const models = await db.gliderModel.findMany({ where: { brandId: input.brandId } })
  return models
}
