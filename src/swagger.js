import swaggerJsdoc from "swagger-jsdoc"

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de membros",
      version: "1.0.0",
      description: "CRUD de membros e projetos"
    },

    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },

  apis: ["./src/routes/*.js"]
}

const swaggerSpec = swaggerJsdoc(options)

export default swaggerSpec