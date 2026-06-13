import { z } from "zod"

export const memberSchema = z.object({

  name: z
    .string()
    .min(1, "O nome é obrigatório"),

  email: z
    .string()
    .email("E-mail inválido"),

  rga: z
    .string()
    .min(1, "O RGA é obrigatório"),

  cargo: z.string().optional(),

  diretoria: z.string().optional(),

  time: z.string().optional()

})