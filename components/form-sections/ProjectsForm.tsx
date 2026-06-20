'use client';

import React from 'react';
import { Project } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface ProjectsFormProps {
  projects: Project[];
  onItemChange: (id: string, field: keyof Project, value: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
}

export default function ProjectsForm({
  projects,
  onItemChange,
  onAdd,
  onRemove,
}: ProjectsFormProps) {
  return (
    <div className="flex flex-col gap-5">
      {projects.map((proj, idx) => (
        <div
          key={proj.id}
          className="relative flex flex-col gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800 bg-zinc-50/20 dark:bg-zinc-900/10"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">Project #{idx + 1}</span>
            <button
              type="button"
              onClick={() => onRemove(proj.id)}
              className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-rose-600 dark:hover:bg-zinc-900 cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-500 uppercase">Project Name</label>
              <input
                type="text"
                placeholder="ResumeForge"
                value={proj.name}
                onChange={(e) => onItemChange(proj.id, 'name', e.target.value)}
                className="rounded-xl border border-zinc-200 bg-transparent px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-zinc-800 dark:text-white"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-500 uppercase">Tech Stack</label>
              <input
                type="text"
                placeholder="Next.js, Tailwind CSS, TypeScript"
                value={proj.techStack}
                onChange={(e) => onItemChange(proj.id, 'techStack', e.target.value)}
                className="rounded-xl border border-zinc-200 bg-transparent px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-zinc-800 dark:text-white"
              />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-zinc-500 uppercase">GitHub / Demo Link</label>
              <input
                type="text"
                placeholder="github.com/username/project"
                value={proj.githubLink || ''}
                onChange={(e) => onItemChange(proj.id, 'githubLink', e.target.value)}
                className="rounded-xl border border-zinc-200 bg-transparent px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-zinc-800 dark:text-white"
              />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-zinc-500 uppercase">Project Description</label>
              <textarea
                rows={3}
                placeholder="A real-time resume builder with high-fidelity PDF exports..."
                value={proj.description}
                onChange={(e) => onItemChange(proj.id, 'description', e.target.value)}
                className="rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm text-zinc-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-zinc-800 dark:text-white resize-y"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        className="flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-zinc-300 bg-white py-3 text-sm font-semibold text-indigo-600 hover:border-indigo-500 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-indigo-400 dark:hover:border-indigo-500 dark:hover:bg-zinc-900/30 cursor-pointer transition-all"
      >
        <Plus className="h-4 w-4" />
        Add Project
      </button>
    </div>
  );
}
