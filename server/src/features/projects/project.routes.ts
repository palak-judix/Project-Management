import express from "express";

import authMiddleware from "../../common/auth.middleware";

import {
  createProject,
  getProjects,
  addTask,
  deleteTask,
  markTaskDone,
  getTasks,
  deleteProject,
} from "./project.controller";

const router = express.Router();

/* Project routes */
router.post(
  "/projects",
  authMiddleware,
  createProject
);

router.get(
  "/projects",
  authMiddleware,
  getProjects
);

router.delete(
  "/projects/:projectId",
  authMiddleware,
  deleteProject
);

/* Task routes */
router.get(
  "/projects/:projectId/tasks",
  authMiddleware,
  getTasks
);

router.post(
  "/projects/:projectId/tasks",
  authMiddleware,
  addTask
);

router.delete(
  "/tasks/:taskId",
  authMiddleware,
  deleteTask
);

router.put(
  "/tasks/:taskId",
  authMiddleware,
  markTaskDone
);

export default router;