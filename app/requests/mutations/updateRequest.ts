import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateRequest = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateRequest),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const request = await db.request.update({ where: { id }, data })

    return request
  }
)
