import db from "../../../db"

export default async function getBrands(_ = null) {
  const brands = await db.gliderBrand.findMany({})
  return brands
}
