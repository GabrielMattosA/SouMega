import express from "express";
import prisma from "../prisma/client.js";

import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import { validate } from "../middlewares/validate.js";
import { projectSchema } from "../schemas/projectSchema.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Lista todos os projetos
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de projetos retornada com sucesso
 *       401:
 *         description: Token não enviado ou inválido
 */
router.get("/", auth, getProjects);

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Cria um novo projeto
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Sistema SouMega"
 *               status:
 *                 type: string
 *                 example: "Em andamento"
 *               prazo:
 *                 type: string
 *                 example: "2026-12-31"
 *               description:
 *                 type: string
 *                 example: "Sistema para gerenciar membros e projetos"
 *               members:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2]
 *     responses:
 *       201:
 *         description: Projeto criado com sucesso
 *       400:
 *         description: Erro de validação ou dados inválidos
 *       401:
 *         description: Token não enviado ou inválido
 */
router.post("/", auth, validate(projectSchema), createProject);

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Atualiza um projeto pelo ID
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do projeto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Projeto Atualizado"
 *               status:
 *                 type: string
 *                 example: "Em andamento"
 *               prazo:
 *                 type: string
 *                 example: "2026-12-31"
 *               description:
 *                 type: string
 *                 example: "Descrição atualizada do projeto"
 *               members:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2]
 *     responses:
 *       200:
 *         description: Projeto atualizado com sucesso
 *       400:
 *         description: Erro de validação ou dados inválidos
 *       401:
 *         description: Token não enviado ou inválido
 *       404:
 *         description: Projeto não encontrado
 */
router.put("/:id", auth, validate(projectSchema), updateProject);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Remove um projeto pelo ID
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do projeto
 *     responses:
 *       200:
 *         description: Projeto removido com sucesso
 *       401:
 *         description: Token não enviado ou inválido
 *       404:
 *         description: Projeto não encontrado
 */
router.delete("/:id", auth, deleteProject);

/**
 * @swagger
 * /projects/count:
 *   get:
 *     summary: Retorna o total de projetos cadastrados
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total de projetos retornado com sucesso
 *       401:
 *         description: Token não enviado ou inválido
 */
router.get("/count", auth, async (req, res) => {
  const count = await prisma.project.count();
  res.json({ count });
});

export default router;