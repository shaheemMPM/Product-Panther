import * as z from "zod"

export const CreateProduct = z.object({
  name: z.string().min(2),
  description: z.string().min(5),
})
