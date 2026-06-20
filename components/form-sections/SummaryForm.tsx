'use client';

import React from 'react';

interface SummaryFormProps {
  summary: string;
  onChange: (value: string) => void;
}

export default function SummaryForm({ summary, onChange }: SummaryFormProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase">Tell us about yourself...</label>
      <textarea
        rows={4}
        placeholder="Experienced software engineer specializing in frontend frameworks..."
        value={summary}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-zinc-200 bg-zinc-50/50 dark:bg-zinc-900/20 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:bg-white dark:focus:bg-zinc-900/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-zinc-800 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10 transition-all duration-200 shadow-sm resize-y"
      />
    </div>
  );
}
