import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(resolver.authorize(), async ({ data }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const vote = await db.votesOnRequests.create({
    data,
  })
  return vote
})
