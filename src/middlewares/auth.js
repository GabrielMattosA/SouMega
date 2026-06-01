import jwt from "jsonwebtoken";

//Middleware para proteger as rotas
export function auth(req, res, next) {
  //Pega o header de autorização
  const authHeader = req.headers.authorization;

  //Se não haver token é bloqueado
  if (!authHeader) {
    return res.status(401).json({ error: "Token não enviado" });
  }

  //Remove a parte que contem o Bearer
  const token = authHeader.split(" ")[1];

  try {
    //Verifica se o token é válido
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    //Salva os dados na requisição
    req.user = decoded;

    //Libera o acesso
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
}
