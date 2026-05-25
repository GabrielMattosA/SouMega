import dotenv from "dotenv"
import express from "express"
import cors from "cors"

import swaggerUi from "swagger-ui-express"

import memberRoutes from "./src/routes/memberRoutes.js"
import swaggerSpec from "./src/swagger.js"

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
)

app.use("/members", memberRoutes)

app.listen(process.env.PORT, () => {
  console.log("Servidor rodando")
})