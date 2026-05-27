import prisma from "../prisma/client.js"
import { projectSchema } from "../schemas/projectSchema.js"

export async function createProject(req, res) {

  try {

    const project = await prisma.project.create({
      data: req.body
    })

    res.status(201).json(project)

  } catch(error) {

    const errors = error.issues?.map(err => err.message)

    res.status(400).json({
      errors
    })

  }

}

export async function getProjects(req, res) {

  try {

    const projects = await prisma.project.findMany({
      include: {
        member: true
      }
    })

    res.json(projects)

  } catch (error) {

    res.status(500).json({
      error: "Erro ao buscar projetos"
    })

  }

}

export async function updateProject(req, res) {

  try {

    const id = Number(req.params.id)

    const project = await prisma.project.update({
      where: {
        id
      },
      data: req.body
    })

    res.json(project)

  } catch (error) {

    res.status(500).json({
      error: "Erro ao atualizar projeto"
    })

  }

}

export async function deleteProject(req, res) {

  try {

    const id = Number(req.params.id)

    await prisma.project.delete({
      where: {
        id
      }
    })

    res.json({
      message: "Projeto deletado"
    })

  } catch (error) {

    res.status(500).json({
      error: "Erro ao deletar projeto"
    })

  }

}