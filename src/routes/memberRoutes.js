import express from "express";
import { auth } from "../middlewares/auth.js";

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
 *     responses:
 *       200:
 *         description: Lista de membros
 */
router.get("/", auth, getMembers);

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

router.post("/", auth, validate(memberSchema), createMember);

router.delete("/:id", auth, deleteMember);
router.put("/:id", auth, updateMember);

export default router;
