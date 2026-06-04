import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import prisma from "./src/prisma/client.js";
import memberRoutes from "./src/routes/memberRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import swaggerSpec from "./src/swagger.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/members", memberRoutes);
app.use("/projects", projectRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/criar-membro-teste", async (req, res) => {
  const member = await prisma.member.create({
    data: {
      name: "Heitor",
      email: "heitor@email.com",
      rga: "202519040073",
      cargo: "Membro",
      diretoria: "TI",
      time: "Backend",
    },
  });

  res.json(member);
});

app.get("/teste-members", async (req, res) => {
  const members = await prisma.member.findMany();
  res.json(members);
});

app.get("/teste", (req, res) => {
  res.send("OK");
});

app.get("/", (req, res) => {
  res.json({ message: "API SouMega rodando" });
});

app.listen(process.env.PORT, () => {
  console.log("Servidor rodando");
});
