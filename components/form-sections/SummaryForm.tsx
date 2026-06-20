'use client';

import React from 'react';

interface SummaryFormProps {
  summary: string;
  onChange: (value: string) => void;
}

export default function SummaryForm({ summary, onChange }: SummaryFormProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-zinc-500 uppercase">Tell us about yourself...</label>
      <textarea
        rows={4}
        placeholder="Experienced software engineer specializing in frontend frameworks..."
        value={summary}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm text-zinc-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-zinc-800 dark:text-white resize-y"
      />
    </div>
  );
}
