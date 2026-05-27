import express from "express"

import {
  createProject,
  getProjects,
  updateProject,
  deleteProject
} from "../controllers/projectController.js"

import { validate } from "../middlewares/validate.js"

import { projectSchema } from "../schemas/projectSchema.js"


const router = express.Router()

router.post(
  "/",
  validate(projectSchema),
  createProject
)
router.get("/", getProjects)
router.put(
  "/:id",
  validate(projectSchema),
  updateProject
)
router.delete("/:id", deleteProject)

export default router