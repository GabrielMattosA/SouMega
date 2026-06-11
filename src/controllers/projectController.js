import prisma from "../prisma/client.js";
import { handlePrismaError } from "../utils/prismaErrors.js";

export async function createProject(req, res) {
  try {
    const { name, status, prazo, description, members } = req.body;

    const project = await prisma.project.create({
      data: {
        name,
        status,
        prazo,
        description,
        members: {
          connect: members?.map((id) => ({ id: Number(id) })) || [],
        },
      },
      include: {
        members: true,
      },
    });

    res.status(201).json(project);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

export async function getProjects(req, res) {
  try {
    const projects = await prisma.project.findMany({
      include: {
        members: true,
      },
    });

    res.json(projects);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

export async function updateProject(req, res) {
  try {
    const id = Number(req.params.id);
    const { name, status, prazo, description, members } = req.body;

    const project = await prisma.project.update({
      where: { id },
      data: {
        name,
        status,
        prazo,
        description,
        members: {
          set: members?.map((id) => ({ id: Number(id) })) || [],
        },
      },
      include: {
        members: true,
      },
    });

    res.json(project);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

export async function deleteProject(req, res) {
  try {
    const id = Number(req.params.id);

    await prisma.project.delete({
      where: { id },
    });

    res.json({
      message: "Projeto deletado",
    });
  } catch (error) {
    return handlePrismaError(error, res);
  }
}