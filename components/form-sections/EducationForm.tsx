'use client';

import React from 'react';
import { Education } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface EducationFormProps {
  education: Education[];
  onItemChange: (id: string, field: keyof Education, value: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
}

export default function EducationForm({
  education,
  onItemChange,
  onAdd,
  onRemove,
}: EducationFormProps) {
  return (
    <div className="flex flex-col gap-5">
      {education.map((edu, idx) => (
        <div
          key={edu.id}
          className="relative flex flex-col gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800 bg-zinc-50/20 dark:bg-zinc-900/10"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">Education #{idx + 1}</span>
            <button
              type="button"
              onClick={() => onRemove(edu.id)}
              className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-rose-600 dark:hover:bg-zinc-900 cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase">Degree / Program</label>
              <input
                type="text"
                placeholder="Bachelor of Science in Computer Science"
                value={edu.degree}
                onChange={(e) => onItemChange(edu.id, 'degree', e.target.value)}
                className="rounded-xl border border-zinc-200 bg-zinc-50/50 dark:bg-zinc-900/20 px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:bg-white dark:focus:bg-zinc-900/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-zinc-800 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10 transition-all duration-200 shadow-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase">College / University</label>
              <input
                type="text"
                placeholder="Stanford University"
                value={edu.college}
                onChange={(e) => onItemChange(edu.id, 'college', e.target.value)}
                className="rounded-xl border border-zinc-200 bg-zinc-50/50 dark:bg-zinc-900/20 px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:bg-white dark:focus:bg-zinc-900/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-zinc-800 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10 transition-all duration-200 shadow-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase">Year (e.g. 2018 - 2022)</label>
              <input
                type="text"
                placeholder="2016 - 2020"
                value={edu.year}
                onChange={(e) => onItemChange(edu.id, 'year', e.target.value)}
                className="rounded-xl border border-zinc-200 bg-zinc-50/50 dark:bg-zinc-900/20 px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:bg-white dark:focus:bg-zinc-900/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-zinc-800 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10 transition-all duration-200 shadow-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase">CGPA / Grade (Optional)</label>
              <input
                type="text"
                placeholder="3.8 / 4.0"
                value={edu.cgpa || ''}
                onChange={(e) => onItemChange(edu.id, 'cgpa', e.target.value)}
                className="rounded-xl border border-zinc-200 bg-zinc-50/50 dark:bg-zinc-900/20 px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:bg-white dark:focus:bg-zinc-900/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-zinc-800 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10 transition-all duration-200 shadow-sm"
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
        Add Education
      </button>
    </div>
  );
}
