"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
  const fetchProject = async () => {
    const projectRes = await fetch(
      `http://localhost:5000/api/projects`,
      { credentials: "include" }
    );

    const projectData = await projectRes.json();
    const foundProject = projectData.find(
      (p: any) => p._id === id
    );

    setProject(foundProject);
  };

  const fetchTasks = async () => {
    const taskRes = await fetch(
      `http://localhost:5000/api/projects/${id}/tasks`,
      { credentials: "include" }
    );

    const taskData = await taskRes.json();
    setTasks(taskData || []);
  };

  fetchProject();
  fetchTasks();
}, [id]);

  const handleAddTask = async (e: any) => {
    e.preventDefault();

    const res = await fetch(
      `http://localhost:5000/api/projects/${id}/tasks`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTask }),
      }
    );

    const data = await res.json();

    // Update state instantly
    setTasks((prev) => [...prev, data]);
    setNewTask("");
  };
  const handleDeleteTask = async (taskId: string) => {
  await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
    method: "DELETE",
    credentials: "include",
  });

  setTasks((prev) => prev.filter((t) => t._id !== taskId));
};

  if (!project) return <p className="text-white p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 p-10">
      <h1 className="text-3xl font-bold text-white mb-6">
        {project.name}
      </h1>

      <p className="text-gray-300 mb-8">{project.description}</p>

      <form onSubmit={handleAddTask} className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
          required
        />

        <button className="bg-blue-600 px-4 rounded-lg text-white">
          Add
        </button>
      </form>

      <div className="space-y-4">
  {tasks.length === 0 ? (
    <p className="text-gray-400">No tasks yet</p>
  ) : (
    tasks.map((task: any) => (
      <div
        key={task._id}
        className="flex justify-between items-center bg-white/10 p-4 rounded-lg text-white"
      >
        <span>{task.title}</span>

        <button
          onClick={() => handleDeleteTask(task._id)}
          className="text-red-400 hover:text-red-600"
        >
          ✕
        </button>
      </div>
    ))
  )}
</div>
    </div>
  );
}