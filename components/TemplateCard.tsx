'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface TemplateCardProps {
  id: 'modern' | 'minimal' | 'creative';
  name: string;
  description: string;
  isActive: boolean;
  onSelect: () => void;
}

export default function TemplateCard({
  id,
  name,
  description,
  isActive,
  onSelect,
}: TemplateCardProps) {
  // Simple representation of layout styles for the cards
  const renderMiniPreview = () => {
    switch (id) {
      case 'modern':
        return (
          <div className="flex h-20 w-full flex-col gap-1 rounded bg-zinc-50 p-2 dark:bg-zinc-900">
            <div className="h-3 w-1/2 rounded bg-indigo-500/25" />
            <div className="h-1 w-3/4 rounded bg-zinc-300 dark:bg-zinc-700" />
            <div className="mt-1 flex flex-1 gap-2">
              <div className="flex flex-1 flex-col gap-1">
                <div className="h-1.5 w-full rounded bg-zinc-300 dark:bg-zinc-700" />
                <div className="h-1.5 w-5/6 rounded bg-zinc-300 dark:bg-zinc-700" />
                <div className="h-1.5 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
              </div>
              <div className="w-1/3 border-l border-zinc-200 pl-1 dark:border-zinc-800">
                <div className="h-1 w-full rounded bg-zinc-300 dark:bg-zinc-700" />
                <div className="mt-1 flex flex-wrap gap-0.5">
                  <div className="h-1 w-2 rounded bg-indigo-500/20" />
                  <div className="h-1 w-3 rounded bg-indigo-500/20" />
                  <div className="h-1 w-2 rounded bg-indigo-500/20" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'minimal':
        return (
          <div className="flex h-20 w-full flex-col gap-1 rounded bg-white border border-zinc-100 p-2 dark:bg-zinc-900 dark:border-zinc-800">
            <div className="self-center h-2 w-1/3 rounded bg-zinc-800 dark:bg-zinc-200" />
            <div className="self-center h-1 w-1/2 rounded bg-zinc-300 dark:bg-zinc-700" />
            <div className="mt-1 flex flex-col gap-1">
              <div className="h-1.5 w-full rounded bg-zinc-300 dark:bg-zinc-700" />
              <div className="h-1.5 w-full rounded bg-zinc-300 dark:bg-zinc-700" />
              <div className="h-1.5 w-5/6 rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>
        );
      case 'creative':
        return (
          <div className="flex h-20 w-full rounded bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
            {/* Sidebar accent */}
            <div className="w-1/3 bg-indigo-600/10 p-1 flex flex-col gap-1">
              <div className="h-2 w-2/3 rounded bg-indigo-600/30" />
              <div className="h-1 w-full rounded bg-zinc-300 dark:bg-zinc-700" />
              <div className="mt-1 flex flex-col gap-0.5">
                <div className="h-1 w-full rounded bg-zinc-400 dark:bg-zinc-600" />
                <div className="h-1 w-5/6 rounded bg-zinc-400 dark:bg-zinc-600" />
              </div>
            </div>
            {/* Main body */}
            <div className="flex-1 p-2 flex flex-col gap-1">
              <div className="h-2.5 w-1/2 rounded bg-emerald-500/30" />
              <div className="h-1.5 w-full rounded bg-zinc-300 dark:bg-zinc-700" />
              <div className="h-1.5 w-full rounded bg-zinc-300 dark:bg-zinc-700" />
              <div className="h-1.5 w-4/5 rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative flex flex-col gap-2.5 rounded-2xl border p-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer ${
        isActive
          ? 'border-indigo-600 bg-indigo-50/20 ring-1 ring-indigo-600 dark:border-indigo-500 dark:bg-indigo-950/10'
          : 'border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700'
      }`}
    >
      {/* Active Check Badge */}
      {isActive && (
        <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white dark:bg-indigo-500">
          <Check className="h-3 w-3 stroke-[3]" />
        </span>
      )}

      {/* Mini Visual Preview */}
      {renderMiniPreview()}

      {/* Card Info */}
      <div>
        <h3 className="font-semibold text-zinc-900 dark:text-white text-sm sm:text-base leading-tight">
          {name}
        </h3>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-normal">
          {description}
        </p>
      </div>
    </button>
  );
}
