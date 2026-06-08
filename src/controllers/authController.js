//Importação do prisma e do JWT que vai servir para crair tokens
import prisma from "../prisma/client.js";
import jwt from "jsonwebtoken";

//Função de login utilizando o RGA
export async function login(req, res) {

  const user = await prisma.member.findUnique({
    where: { rga: req.body.rga },
  });


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

  const token = jwt.sign(
  { id: user.id },
  process.env.JWT_SECRET,
  { expiresIn: "2h" }
  );
  
  res.json({ token });
}
