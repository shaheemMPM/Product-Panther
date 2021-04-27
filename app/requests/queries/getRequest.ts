import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetRequest = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetRequest), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const request = await db.request.findFirst({ where: { id } })

  if (!request) throw new NotFoundError()

  return request
})
