import express from "express"

import {
  createMember,
  getMembers,
  deleteMember,
  updateMember
} from "../controllers/memberController.js"

import { validate } from "../middlewares/validate.js"

import { memberSchema } from "../schemas/memberSchema.js"

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

router.post(
  "/",
  validate(memberSchema),
  createMember
)

router.delete("/:id", deleteMember)
router.put("/:id", updateMember)

export default router