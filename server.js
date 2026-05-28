import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import swaggerUi from "swagger-ui-express";

import memberRoutes from "./src/routes/memberRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import swaggerSpec from "./src/swagger.js";

import authRoutes from "./src/routes/authRoutes.js";
app.use("/auth", authRoutes);
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/members", memberRoutes);
app.use("/projects", projectRoutes);

app.listen(process.env.PORT, () => {
  console.log("Servidor rodando");
});
