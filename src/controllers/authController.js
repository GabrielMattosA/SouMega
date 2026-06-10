import prisma from "../prisma/client.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function login(req, res) {
  const { rga, password } = req.body;

  try {
    const user = await prisma.member.findUnique({
      where: { rga },
    });

    if (!user) {
      return res.status(401).json({ error: "RGA ou senha inválidos." });
    }

    const senhaValida = await bcrypt.compare(password, user.password);

    if (!senhaValida) {
      return res.status(401).json({ error: "RGA ou senha inválidos." });
    }

    const token = jwt.sign(
      { id: user.id, cargo: user.cargo },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no login" });
  }
}