/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * to easily generate realistic data.
 */
import { gliders } from "./fixtures/gliderBrand"
import db from "./index"
import { SecurePassword } from "@blitzjs/auth/secure-password"
import * as process from "process"

const seed = async () => {
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error(
      `Missing ADMIN_EMAIL or ADMIN_PASSWORD environment variable ${process.env.NODE_ENV}`
    )
    process.exit(1)
  }
  const hashedPassword = await SecurePassword.hash(ADMIN_PASSWORD)
  try {
    await db.user.create({
      data: {
        email: ADMIN_EMAIL,
        hashedPassword,
      },
    })
  } catch (error) {
    console.error(`Failed to create admin user ${error}`)
    process.exit(1)
  }

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
