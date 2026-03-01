"use client";
import { useApp } from "@/context/AppContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";
import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";

interface Project {
  _id: string;
  name: string;
}

export default function DashboardPage() {

  const router = useRouter();

  // const [projects, setProjects] =
  //   useState<Project[]>([]);
  const {
  projects,
  setProjects,
  addProject,
  deleteProject,
} = useApp();

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [newProject, setNewProject] =
    useState({ name: "" });

  const [toast, setToast] =
    useState<{
      message: string;
      type: "success" | "error";
    } | null>(null);

  useEffect(() => {

    const fetchProjects =
      async () => {

        try {

          const res =
            await fetch(
              "http://localhost:5000/api/projects",
              {
                credentials:
                  "include",
              }
            );

          if (
            res.status === 401
          ) {

            router.push(
              "/login"
            );

            return;

          }

          const data =
            await res.json();

          setProjects(
            data
          );

        } catch {

          setError(
            "Failed to fetch projects"
          );

        } finally {

          setLoading(
            false
          );

        }

      };

    fetchProjects();

  }, [router]);

  const handleCreateProject =
    async (
      e:
        React.FormEvent
    ) => {

      e.preventDefault();

      const res =
        await fetch(
          "http://localhost:5000/api/projects",
          {

            method:
              "POST",

            credentials:
              "include",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              newProject
            ),

          }
        );

      const data =
        await res.json();

      addProject(data);

      setNewProject({
        name: "",
      });

      setToast({
        message:
          "Project created",
        type: "success",
      });

    };

  const handleDeleteProject =
    async (
      id: string
    ) => {

      await fetch(
        `http://localhost:5000/api/projects/${id}`,
        {

          method:
            "DELETE",

          credentials:
            "include",

        }
      );

      deleteProject(id);

      setToast({
        message:
          "Project deleted",
        type: "success",
      });

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

        {/* Header */}
        <div className="flex justify-between items-center px-10 py-6 border-b border-white/10">

          <h1 className="text-2xl font-bold">
            🚀 ProjectSpace
          </h1>

          <Button
            text="Logout"
            onClick={() =>
              router.push(
                "/login"
              )
            }
            className="bg-red-600 hover:bg-red-700"
          />

        </div>

        <div className="p-10">

          <PageHeader
  title="Your Projects"
  subtitle="Manage and organize your workspace"
/>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10">

            <form
              onSubmit={
                handleCreateProject
              }
              className="flex gap-4"
            >

              <input
                type="text"
                placeholder="Enter project name..."
                value={
                  newProject.name
                }
                onChange={(
                  e
                ) =>
                  setNewProject(
                    {
                      name:
                        e.target
                          .value,
                    }
                  )
                }
                className="flex-1 p-3 rounded-lg bg-white/10"
                required
              />

              <Button
                text="Add Project"
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
              />

            </form>

          </div>

          {error && (
            <p className="text-red-400 mb-6">
              {error}
            </p>
          )}

          {/* Project cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {projects.map(
              (
                project
              ) => (

                <div
                  key={
                    project._id
                  }
                  className="relative group bg-white/5 border border-white/10 p-6 rounded-2xl"
                >

                  <Button
                    text="✕"
                    onClick={() =>
                      handleDeleteProject(
                        project._id
                      )
                    }
                    className="absolute top-3 right-3 bg-red-500 px-2 py-1"
                  />

                  <div
                    onClick={() =>
                      router.push(
                        `/project/${project._id}`
                      )
                    }
                    className="cursor-pointer"
                  >

                    <h3 className="text-xl font-semibold mb-2">
                      {
                        project.name
                      }
                    </h3>

                    <p className="text-gray-400 text-sm">
                      Click to manage tasks →
                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </div>

      {toast && (

        <Toast
          message={
            toast.message
          }
          type={
            toast.type
          }
          onClose={() =>
            setToast(null)
          }
        />

      )}
    </>
  );

}