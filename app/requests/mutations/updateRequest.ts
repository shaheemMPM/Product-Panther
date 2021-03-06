import { resolver } from "blitz"
import db from "db"
import { UpdateRequest } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateRequest),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const request = await db.request.update({
      where: { id },
      data: { title: data.title, description: data.description },
    })

    return request
  }
)
