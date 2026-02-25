"use client";

import { useEffect } from "react";

interface Props {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

export default function Toast({ message, type = "success", onClose }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-6 z-50">
      <div
        className={`px-6 py-4 rounded-xl shadow-lg text-white transition-all duration-300 ${
          type === "error"
            ? "bg-red-600"
            : "bg-green-600"
        }`}
      >
        {message}
      </div>
    </div>
  );
}