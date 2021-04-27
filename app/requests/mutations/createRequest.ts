import { resolver, Ctx } from "blitz"
import db from "db"
import { CreateRequest } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateRequest),
  resolver.authorize(),
  async (input, ctx: Ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const userId = ctx.session.userId
    const request = await db.request.create({
      data: { title: input.title, description: input.description, productId: 1, userId },
    })

    return request
  }
)
