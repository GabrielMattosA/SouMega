import { z } from "zod"

export const memberSchema = z.object({

  name: z
    .string()
    .min(3, "Nome muito curto"),

  email: z
    .email("Email inválido")

})