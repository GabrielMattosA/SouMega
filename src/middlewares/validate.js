export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: "Erro de validação",
        details: result.error.errors.map((err) => ({
          campo: err.path.join("."),
          mensagem: err.message,
        })),
      });
    }

    req.body = result.data;
    next();
  };
}