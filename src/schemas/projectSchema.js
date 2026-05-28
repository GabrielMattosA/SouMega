import { z } from "zod"

export const projectSchema = z.object({
  name: z
    .string()
    .min(1, "O nome é obrigatório"),

  status: z
    .string()
    .min(1, "O status é obrigatório"),

  prazo: z
    .string()
    .min(1, "O prazo é obrigatório"),

  description: z.string().optional(),

  memberId: z.number().optional()
})