'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function TemplateShowcase() {
  const templatesTeaser = [
    {
      id: 'modern',
      name: 'Modern Layout',
      tagline: 'Dual Column Sidebar',
      desc: 'Elegant corporate format separating contact details and skills into a dark sidebar, with work experience on a main white page.',
      badgeColor: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border-indigo-100 dark:border-indigo-900/50',
      structure: 'modern'
    },
    {
      id: 'minimal',
      name: 'Minimal Layout',
      tagline: 'Standard ATS Classic',
      desc: 'Traditional single-column format structured purely for parsing algorithm readability and high text density.',
      badgeColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-100 dark:border-emerald-900/50',
      structure: 'minimal'
    },
    {
      id: 'creative',
      name: 'Creative Layout',
      tagline: 'Bold Gradient Accents',
      desc: 'Double-column layout featuring modern colorful header bands and custom visual tag highlights.',
      badgeColor: 'bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300 border-violet-150 dark:border-violet-900/50',
      structure: 'creative'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {templatesTeaser.map((tpl) => (
        <div 
          key={tpl.id}
          className="group flex flex-col justify-between rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex flex-col gap-4">
            {/* Visual layout thumbnail block */}
            <div className="h-44 w-full rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-850 flex items-center justify-center p-3.5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.01] to-violet-500/[0.02] pointer-events-none" />
              
              {/* Modern Sidebar layout mockup */}
              {tpl.structure === 'modern' && (
                <div className="w-full h-full border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 rounded-lg overflow-hidden flex shadow-sm">
                  <div className="w-1/3 bg-zinc-950 h-full p-2 flex flex-col gap-2">
                    <div className="h-1.5 w-full bg-zinc-800 rounded" />
                    <div className="h-1 w-4/5 bg-indigo-500/50 rounded" />
                    <div className="flex flex-col gap-1 mt-4">
                      <div className="h-0.5 w-full bg-zinc-800 rounded" />
                      <div className="h-0.5 w-5/6 bg-zinc-800 rounded" />
                      <div className="h-0.5 w-4/5 bg-zinc-800 rounded" />
                    </div>
                  </div>
                  <div className="flex-1 p-2.5 flex flex-col gap-2">
                    <div className="h-1.5 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
                    <div className="flex flex-col gap-1.5 mt-2">
                      <div className="h-0.5 w-full bg-zinc-150 dark:bg-zinc-800 rounded" />
                      <div className="h-0.5 w-full bg-zinc-150 dark:bg-zinc-800 rounded" />
                      <div className="h-0.5 w-3/4 bg-zinc-150 dark:bg-zinc-800 rounded" />
                    </div>
                  </div>
                </div>
              )}

              {/* Minimal layout mockup */}
              {tpl.structure === 'minimal' && (
                <div className="w-full h-full border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 rounded-lg overflow-hidden p-3 flex flex-col gap-3.5 shadow-sm">
                  <div className="flex flex-col items-center gap-1.5 border-b border-zinc-100 dark:border-zinc-850 pb-2">
                    <div className="h-1.5 w-24 bg-zinc-800 dark:bg-zinc-200 rounded" />
                    <div className="h-1 w-32 bg-zinc-300 dark:bg-zinc-700 rounded" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="h-1.5 w-16 bg-zinc-400 dark:bg-zinc-600 rounded" />
                    <div className="h-0.5 w-full bg-zinc-150 dark:bg-zinc-850 rounded" />
                    <div className="h-0.5 w-full bg-zinc-150 dark:bg-zinc-850 rounded" />
                    <div className="h-0.5 w-5/6 bg-zinc-150 dark:bg-zinc-850 rounded" />
                  </div>
                </div>
              )}

              {/* Creative layout mockup */}
              {tpl.structure === 'creative' && (
                <div className="w-full h-full border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 rounded-lg overflow-hidden flex flex-col shadow-sm">
                  <div className="h-2.5 w-full bg-gradient-to-r from-violet-600 to-indigo-600" />
                  <div className="flex-1 flex gap-2.5 p-2.5">
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="h-1.5 w-4/5 bg-zinc-800 dark:bg-zinc-200 rounded" />
                      <div className="h-1 w-2/3 bg-indigo-500/30 rounded" />
                      <div className="flex flex-col gap-1 mt-1">
                        <div className="h-0.5 w-full bg-zinc-150 dark:bg-zinc-800 rounded" />
                        <div className="h-0.5 w-5/6 bg-zinc-150 dark:bg-zinc-800 rounded" />
                      </div>
                    </div>
                    <div className="w-[30%] flex flex-col gap-2">
                      <div className="h-1 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
                      <div className="flex flex-wrap gap-0.5">
                        <div className="h-1.5 w-4 rounded-sm bg-violet-100 dark:bg-violet-950/60 animate-pulse" />
                        <div className="h-1.5 w-5 rounded-sm bg-indigo-100 dark:bg-indigo-950/60" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between items-start gap-2.5">
              <h3 className="text-base font-extrabold text-zinc-950 dark:text-white">{tpl.name}</h3>
              <span className={`text-[9.5px] font-extrabold px-2.5 py-0.5 rounded-full border ${tpl.badgeColor}`}>
                {tpl.tagline}
              </span>
            </div>
            
            <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed">
              {tpl.desc}
            </p>
          </div>

          <Link
            href={`/builder?template=${tpl.id}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 mt-4 self-start cursor-pointer group/link"
          >
            <span>Create with this Template</span>
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
          </Link>
        </div>
      ))}
    </div>
  );
}
