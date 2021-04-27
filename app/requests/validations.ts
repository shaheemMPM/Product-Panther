import * as z from "zod"

export const CreateRequest = z.object({
  title: z.string().min(2),
  description: z.string().min(5),
})

export const UpdateRequest = z
  .object({
    id: z.number(),
    title: z.string().min(2),
    description: z.string().min(5),
  })
  .nonstrict()
