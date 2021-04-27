import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteRequest = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(DeleteRequest), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const request = await db.request.deleteMany({ where: { id } })

  return request
})
