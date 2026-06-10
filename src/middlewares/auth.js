import jwt from "jsonwebtoken";

export function auth(req, res, next) {

  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: "Token não enviado" });
  }

  const token = header.split(" ")[1];

  try {
    //Verifica se o token é válido
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    //Salva os dados na requisição
    req.user = decoded;

    //Libera o acesso
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}
