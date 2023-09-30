/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * to easily generate realistic data.
 */
import { gliders } from "./fixtures/gliderBrand"
import db from "./index"

const seed = async () => {
  await seedGliderBrandsAndModels()
}

export default seed

/** Seed glider brands and models */
async function seedGliderBrandsAndModels() {
  for (const [brand, models] of Object.entries(gliders)) {
    const { id } = await db.gliderBrand.create({ data: { name: brand } })
    for (const model of models) {
      await db.gliderModel.create({
        data: {
          name: model,
          brand: { connect: { id } },
        },
      })
    }
  }
}
