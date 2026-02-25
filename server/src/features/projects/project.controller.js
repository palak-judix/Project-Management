const Project = require("../projects/project.model")
const Task = require("../tasks/task.model")

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      user: req.user.id,
    })

    res.status(201).json(project)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id })
    res.json(projects)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.addTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      project: req.params.projectId,
    })

    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      project: req.params.projectId,
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.taskId)
    res.json({ message: "Task deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.projectId);
    await Task.deleteMany({ project: req.params.projectId });

    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.markTaskDone = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId)
    task.completed = true
    await task.save()

    res.json(task)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
