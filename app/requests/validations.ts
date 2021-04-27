import * as z from "zod"

export const CreateRequest = z.object({
  title: z.string().min(2),
  description: z.string().min(5),
})
