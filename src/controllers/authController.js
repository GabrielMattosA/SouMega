//Importação do prisma e do JWT que vai servir para crair tokens
import prisma from "../prisma/client.js";
import jwt from "jsonwebtoken";
//Importação do bcrypt
import bcrypt from "bcrypt";

//Função de login utilizando o RGA
export async function login(req, res) {
  const { rga, password } = req.body;

  try {
    //Procura o úsuario com o rga informado no banco de dados
    const user = await prisma.member.findUnique({
      where: { rga },
    });

    //Se não encontrar o úsuario, bloqueia.
    if (!user) {
      return res.status(404).json({ error: "RGA ou senha inválidos." });
    }

    //Verifica se a senha informada está correta
    senhaValida = await bcrypt.compare(password, user.password);

    if (!senhaValida) {
      return res.status(404).json({ error: "RGA ou senha inválidos." });
    }

    //Cria um token
    const token = jwt.sign(
      { id: user.id, cargo: user.cargo },
      process.env.JWT_TOKEN,
      {
        expiresIn: "2h",
      },
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Erro no login" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  res.json({ token });
}
