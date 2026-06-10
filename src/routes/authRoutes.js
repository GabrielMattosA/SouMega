//Importando o express e o logincontroller
import express from "express";
import { login } from "../controllers/authController.js";

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Faz login pelo RGA
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rga:
 *                 type: string
 *                 example: "202519040073"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       404:
 *         description: RGA não encontrado
 *       500:
 *         description: Erro interno no login
 */
router.post("/login", login);

router.get("/teste-auth", (req, res) => {
  res.send("AUTH OK");
});

export default router;
