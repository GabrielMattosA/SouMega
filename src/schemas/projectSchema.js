import { z } from "zod"

export const projectSchema = z.object({

  title: z
    .string()
    .min(3, "Título muito curto"),

  description: z
    .string()
    .min(5, "Descrição muito curta"),

  memberId: z
    .number()

})