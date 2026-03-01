import Task from "./task.model";

export const createTaskRepo =
  async (
    title: string,
    projectId: string
  ) => {

    return await Task.create({
      title,
      project: projectId,
    });

};

export const getTasksRepo =
  async (
    projectId: string
  ) => {

    return await Task.find({
      project: projectId,
    });

};

export const deleteTaskRepo =
  async (
    taskId: string
  ) => {

    return await Task.findByIdAndDelete(
      taskId
    );

};

export const markTaskDoneRepo =
  async (
    taskId: string
  ) => {

    return await Task.findByIdAndUpdate(
      taskId,
      { completed: true },
      { new: true }
    );

};