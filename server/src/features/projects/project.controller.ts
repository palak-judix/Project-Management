import { RequestHandler } from "express";

import {
  createProjectRepo,
  getProjectsRepo,
  deleteProjectRepo,
} from "./project.repository";

import {
  createTaskRepo,
  getTasksRepo,
  deleteTaskRepo,
  markTaskDoneRepo,
} from "../tasks/task.repository";


interface AuthRequest {
  user?: {
    id: string;
  };
}


/* CREATE PROJECT */
export const createProject: RequestHandler =
  async (req, res) => {

    const project =
      await createProjectRepo(
        req.body.name as string,
        (req as AuthRequest).user!.id
      );

    res.status(201).json(project);

};


/* GET PROJECTS */
export const getProjects: RequestHandler =
  async (req, res) => {

    const projects =
      await getProjectsRepo(
        (req as AuthRequest).user!.id
      );

    res.json(projects);

};


/* DELETE PROJECT */
export const deleteProject: RequestHandler =
  async (req, res) => {

    await deleteProjectRepo(
      req.params.projectId as string
    );

    res.json({
      message: "Project deleted",
    });

};


/* ADD TASK */
export const addTask: RequestHandler =
  async (req, res) => {

    const task =
      await createTaskRepo(
        req.body.title as string,
        req.params.projectId as string
      );

    res.status(201).json(task);

};


/* GET TASKS */
export const getTasks: RequestHandler =
  async (req, res) => {

    const tasks =
      await getTasksRepo(
        req.params.projectId as string
      );

    res.json(tasks);

};


/* DELETE TASK */
export const deleteTask: RequestHandler =
  async (req, res) => {

    await deleteTaskRepo(
      req.params.taskId as string
    );

    res.json({
      message: "Task deleted",
    });

};


/* MARK TASK DONE */
export const markTaskDone: RequestHandler =
  async (req, res) => {

    const task =
      await markTaskDoneRepo(
        req.params.taskId as string
      );

    res.json(task);

};