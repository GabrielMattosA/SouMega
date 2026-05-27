export const memberSchema = z.object({

  name: z
    .string()
    .min(3, "Nome muito curto"),

  email: z
    .email("Email inválido"),

  rga: z
    .string()
    .min(3, "RGA inválido"),

  role: z.enum([
    "MEMBRO",
    "DIRETOR",
    "PRESIDENTE"
  ])

})