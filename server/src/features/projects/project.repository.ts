import Project from "./project.model";

export const createProjectRepo =
  async (
    name: string,
    userId: string
  ) => {

    return await Project.create({
      name,
      user: userId,
    });

};

export const getProjectsRepo =
  async (
    userId: string
  ) => {

    return await Project.find({
      user: userId,
    });

};

export const deleteProjectRepo =
  async (
    projectId: string
  ) => {

    return await Project.findByIdAndDelete(
      projectId
    );

};