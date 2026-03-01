"use client";

import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  rightContent,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          {title}
        </h1>

        {subtitle && (
          <p className="text-gray-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {rightContent && (
        <div>
          {rightContent}
        </div>
      )}

    </div>
  );
}