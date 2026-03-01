"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export interface Project {
  _id: string;
  name: string;
}

interface AppContextType {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [projects, setProjects] = useState<Project[]>([]);

  const addProject = (project: Project) => {
    setProjects((prev) => [...prev, project]);
  };

  const deleteProject = (id: string) => {
    setProjects((prev) =>
      prev.filter((p) => p._id !== id)
    );
  };

  return (
    <AppContext.Provider
      value={{
        projects,
        setProjects,
        addProject,
        deleteProject,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "useApp must be used inside AppProvider"
    );
  }

  return context;
}