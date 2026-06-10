import express from "express";
import { auth } from "../middlewares/auth.js";
import prisma from "../prisma/client.js";

import {
  createMember,
  getMembers,
  deleteMember,
  updateMember,
} from "../controllers/memberController.js";

import { validate } from "../middlewares/validate.js";

import { memberSchema } from "../schemas/memberSchema.js";

const router = express.Router();

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Lista todos os membros
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de membros retornada com sucesso
 *       401:
 *         description: Token não enviado ou inválido
 */
router.get("/", auth, getMembers);

/**
 * @swagger
 * /members:
 *   post:
 *     summary: Cria um novo membro
 *     tags: [Members]
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
 *                 example: "Heitor Cacciatore"
 *               email:
 *                 type: string
 *                 example: "heitor@email.com"
 *               rga:
 *                 type: string
 *                 example: "202519040073"
 *               cargo:
 *                 type: string
 *                 example: "Membro"
 *               diretoria:
 *                 type: string
 *                 example: "TI"
 *               time:
 *                 type: string
 *                 example: "Backend"
 *     responses:
 *       201:
 *         description: Membro criado com sucesso
 *       400:
 *         description: Erro de validação ou dados inválidos
 *       401:
 *         description: Token não enviado ou inválido
 */
router.post("/", auth, validate(memberSchema), createMember);

/**
 * @swagger
 * /members/{id}:
 *   put:
 *     summary: Atualiza um membro pelo ID
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do membro
 *     responses:
 *       200:
 *         description: Membro atualizado com sucesso
 *       401:
 *         description: Token não enviado ou inválido
 *       404:
 *         description: Membro não encontrado
 */
router.put("/:id", auth, updateMember);

/**
 * @swagger
 * /members/{id}:
 *   delete:
 *     summary: Remove um membro pelo ID
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do membro
 *     responses:
 *       200:
 *         description: Membro removido com sucesso
 *       401:
 *         description: Token não enviado ou inválido
 *       404:
 *         description: Membro não encontrado
 */
router.delete("/:id", auth, deleteMember);

/**
 * @swagger
 * /members/count:
 *   get:
 *     summary: Retorna o total de membros cadastrados
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total de membros retornado com sucesso
 *       401:
 *         description: Token não enviado ou inválido
 */
router.get("/count", auth, async (req, res) => {
  const count = await prisma.member.count();
  res.json({ count });
});


/**
 * @swagger
 * /members/available/count:
 *   get:
 *     summary: Retorna o total de membros sem projeto
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total de membros disponíveis retornado com sucesso
 *       401:
 *         description: Token não enviado ou inválido
 *       500:
 *         description: Erro ao buscar membros disponíveis
 */
router.get("/available/count", auth, async (req, res) => {
  try {
    const count = await prisma.member.count({
      where: {
        projects: {
          none: {}
        }
      }
    });

    res.json({ count });
  } catch (error) {
    console.log("ERRO MEMBERS AVAILABLE COUNT:", error);
    res.status(500).json({ error: "Erro ao buscar membros disponíveis" });
  }
});

export default router;
