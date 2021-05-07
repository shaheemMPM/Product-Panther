import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateProduct = z
  .object({
    id: z.number(),
    name: z.string().min(2),
    description: z.string().min(5),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateProduct),
  resolver.authorize(),
  async ({ id, name, description }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const product = await db.product.update({
      where: { id },
      data: { name: name, description: description },
      include: { requests: { include: { votesOnRequest: true } } },
    })

    return product
  }
)
