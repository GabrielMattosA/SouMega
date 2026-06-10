import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";
import { memberSchema } from "../schemas/memberSchema.js";
import { gerarSenha } from "./passwordgenerate.js";

export async function createMember(req, res) {
  try {
    const senha = gerarSenha(req.body.name, req.body.rga);
    const senhaCripto = await bcrypt.hash(senha, 10);
    const member = await prisma.member.create({
      data: {
        ...req.body,
        password: senhaCripto,
      },
    });

    res.status(201).json(member);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({
        error: `JÃ¡ existe um membro com esse ${error.meta.target[0]}.`,
      });
    }

    res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
}
export async function getMembers(req, res) {
  try {
    const members = await prisma.member.findMany();

    res.json(members);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export async function deleteMember(req, res) {
  try {
    const id = Number(req.params.id);

    await prisma.member.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: "Membro deletado",
    });
  } catch (error) {
    res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
}

export async function updateMember(req, res) {
  try {
    const id = Number(req.params.id);

    const member = await prisma.member.update({
      where: {
        id,
      },
      data: req.body,
    });

    res.json(member);
  } catch (error) {
    res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
}
