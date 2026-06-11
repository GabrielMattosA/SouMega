export function handlePrismaError(error, res) {
  if (error.code === "P2002") {
    const campo = error.meta?.target?.[0] || "campo";

    return res.status(400).json({
      error: `${campo} já cadastrado`,
    });
  }

  if (error.code === "P2025") {
    return res.status(404).json({
      error: "Registro não encontrado",
    });
  }

  console.error(error);

  return res.status(500).json({
    error: "Erro interno do servidor",
  });
}