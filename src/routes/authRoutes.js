//Importando o express e o logincontroller
import express from "express";
import { login } from "../controllers/authController.js";

const router = express.Router();

//Rota para o login
router.post("/login", login);

router.get("/teste-auth", (req, res) => {
  res.send("AUTH OK");
});

export default router;
