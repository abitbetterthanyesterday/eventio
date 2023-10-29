import db from "../../../db"

export default async function getBrands(_ = null) {
  return await db.gliderBrand.findMany({})
}
