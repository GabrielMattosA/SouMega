import prisma from "../prisma/client.js"
import { handlePrismaError } from "../utils/prismaErrors.js";

export async function createMember(req, res) {
  try {
    const member = await prisma.member.create({
      data: req.body,
    });

    res.status(201).json(member);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

export async function getMembers(req, res) {
  try {
    const members = await prisma.member.findMany();
    res.json(members);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}


export async function updateMember(req, res) {
  try {
    const member = await prisma.member.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });

    res.json(member);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

export async function deleteMember(req, res) {
  try {
    await prisma.member.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ message: "Membro removido com sucesso" });
  } catch (error) {
    return handlePrismaError(error, res);
  }
}