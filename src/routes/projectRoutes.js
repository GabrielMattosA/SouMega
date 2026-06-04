import express from "express";

import prisma from "../prisma/client.js";

import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import { validate } from "../middlewares/validate.js";

import { projectSchema } from "../schemas/projectSchema.js";

import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", auth, validate(projectSchema), createProject);
router.get("/", auth, getProjects);
router.put("/:id", auth, validate(projectSchema), updateProject);
router.delete("/:id", auth, deleteProject);

router.get("/count", auth, async (req, res) => {
  const count = await prisma.project.count();
  res.json({ count });
});

export default router;
