import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetRequestsInput
  extends Pick<Prisma.RequestFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetRequestsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { items: requests, hasMore, nextPage, count } = await paginate({
      skip,
      take,
      count: () => db.request.count({ where }),
      query: (paginateArgs) => db.request.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      requests,
      nextPage,
      hasMore,
      count,
    }
  }
)
