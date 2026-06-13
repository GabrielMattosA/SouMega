import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";
import { gerarSenha } from "./passwordgenerate.js";
import { handlePrismaError } from "../utils/prismaErrors.js";

export async function createMember(req, res) {
  try {
    const senha = gerarSenha(req.body.name, req.body.rga);
    const senhaCripto = await bcrypt.hash(senha, 10);
    const member = await prisma.member.create({
      data: {
        ...req.body,
        password: senhaCripto,
      },
      select: {
        id: true,
        name: true,
        email: true,
        rga: true,
        cargo: true,
        diretoria: true,
        time: true,
      },
    });

    res.status(201).json({
      member,
      senhaGerada: senha,
    });
  } catch (error) {
    console.log("ERRO AO CRIAR MEMBRO:", error);
    return handlePrismaError(error, res);
  }
}
export async function getMembers(req, res) {
  try {
    const members = await prisma.member.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        rga: true,
        cargo: true,
        diretoria: true,
        time: true,
        projects: true,
      },
    });

    res.json(members);
  } catch (error) {
    return handlePrismaError(error, res);
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
    return handlePrismaError(error, res);
  }
}

export async function updateMember(req, res) {
  try {
    const id = Number(req.params.id);

    const member = await prisma.member.update({
      where: { id },
      data: req.body,
      select: {
        id: true,
        name: true,
        email: true,
        rga: true,
        cargo: true,
        diretoria: true,
        time: true,
      },
    });

    res.json(member);
  } catch (error) {
      return handlePrismaError(error, res);
    };
  }
