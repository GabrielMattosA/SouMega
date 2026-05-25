import express from "express"

import {
  createMember,
  getMembers,
  deleteMember,
  updateMember
} from "../controllers/memberController.js"

const router = express.Router()

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Lista todos os membros
 *     responses:
 *       200:
 *         description: Lista de membros
 */
router.get("/", getMembers)

/**
 * @swagger
 * /members:
 *   post:
 *     summary: Cria um membro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Membro criado
 */
router.post("/", createMember)

router.delete("/:id", deleteMember)
router.put("/:id", updateMember)

export default router