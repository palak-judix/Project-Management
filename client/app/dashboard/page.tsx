"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";

export default function DashboardPage() {
  const router = useRouter();

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newProject, setNewProject] = useState({ name: "" });
  const [toast, setToast] = useState<{
  message: string;
  type: "success" | "error";
} | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/projects", {
          credentials: "include",
        });

        if (res.status === 401) {
          router.push("/login");
          return;
        }

        const data = await res.json();
        setProjects(data);
      } catch {
        setError("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [router]);

  const handleCreateProject = async (e: any) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/projects", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProject),
    });

    const data = await res.json();
    setProjects((prev) => [...prev, data]);
    setNewProject({ name: "" });
  };
  const handleDeleteProject = async (id: string) => {
  await fetch(`http://localhost:5000/api/projects/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  setProjects((prev) => prev.filter((p) => p._id !== id));
};

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white text-xl">
        Loading your workspace...
      </div>
    );
  }

  return (
  <>
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0f172a] text-white">
      
      <div className="flex justify-between items-center px-10 py-6 border-b border-white/10 backdrop-blur-lg">
        <h1 className="text-2xl font-bold tracking-wide">
          🚀 ProjectSpace
        </h1>
        <button
          onClick={() => router.push("/login")}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm transition"
        >
          Logout
        </button>
      </div>

      <div className="p-10">
        <h2 className="text-4xl font-bold mb-8">
          Your Projects
        </h2>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10 backdrop-blur-xl shadow-lg">
          <form onSubmit={handleCreateProject} className="flex gap-4">
            <input
              type="text"
              placeholder="Enter project name..."
              value={newProject.name}
              onChange={(e) =>
                setNewProject({ name: e.target.value })
              }
              className="flex-1 p-3 rounded-lg bg-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-6 rounded-lg transition font-semibold">
              Add Project
            </button>
          </form>
        </div>

        {error && (
          <p className="text-red-400 mb-6">{error}</p>
        )}

        {projects.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">
            <p className="text-xl mb-2">No projects yet.</p>
            <p>Create your first project above 👆</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project: any) => (
              <div
                key={project._id}
                className="relative group bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl hover:border-blue-500 transition-all duration-300"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProject(project._id);
                  }}
                  className="absolute top-3 right-3 text-red-400 hover:text-red-600"
                >
                  ✕
                </button>

                <div
                  onClick={() =>
                    router.push(`/project/${project._id}`)
                  }
                  className="cursor-pointer"
                >
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition">
                    {project.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Click to manage tasks →
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

    {toast && (
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(null)}
      />
    )}
  </>
);
}