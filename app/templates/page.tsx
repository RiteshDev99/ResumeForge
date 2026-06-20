'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { 
  Sparkles, ArrowRight, CheckCircle
} from 'lucide-react';
import { User, Mail } from 'lucide-react';

export default function TemplatesPage() {
  const templates = [
    {
      id: 'modern',
      name: 'Modern Resume',
      tagline: 'Recruiter Recommended',
      badgeColor: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border-indigo-150 dark:border-indigo-900',
      description: 'Features a sleek vertical sidebar layout for personal metrics, contact links, and core competencies, alongside a primary column for summary and employment history. Best for tech, startup, and business roles.',
      features: ['Dual column organization', 'Accent divider lines', 'Lucide metadata icons', 'High density readability'],
      mockup: (
        <div className="flex h-44 w-full flex-row rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white shadow-sm">
          {/* Sidebar */}
          <div className="w-[30%] bg-zinc-900 p-2.5 flex flex-col gap-2">
            <div className="h-2 w-3/4 rounded bg-indigo-400/80" />
            <div className="h-1 w-1/2 rounded bg-zinc-500" />
            <div className="mt-2 flex flex-col gap-1">
              <div className="h-1 w-full rounded bg-zinc-700" />
              <div className="h-1 w-4/5 rounded bg-zinc-700" />
            </div>
            <div className="mt-auto flex gap-1">
              <div className="h-1.5 w-3 rounded-full bg-indigo-400/30" />
              <div className="h-1.5 w-4 rounded-full bg-indigo-400/30" />
            </div>
          </div>
          {/* Main */}
          <div className="flex-1 p-3 flex flex-col gap-2 bg-white">
            <div className="h-2.5 w-1/3 rounded bg-indigo-600/30" />
            <div className="h-1.5 w-full rounded bg-zinc-200" />
            <div className="h-1.5 w-full rounded bg-zinc-200" />
            <div className="h-1.5 w-5/6 rounded bg-zinc-150" />
            <div className="mt-2 h-2.5 w-1/4 rounded bg-indigo-600/30" />
            <div className="h-1.5 w-full rounded bg-zinc-200" />
          </div>
        </div>
      )
    },
    {
      id: 'minimal',
      name: 'Minimal Resume',
      tagline: '100% ATS Parser Safe',
      badgeColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-150 dark:border-emerald-900',
      description: 'A traditional, single-column design oriented strictly for parsing accuracy. Maximizes text density and clean hierarchical tags, eliminating graphical overhead. Ideal for enterprise roles and corporate screening.',
      features: ['Centered modern header', 'ATS-friendly bullet flow', 'Horizontal block separators', 'No complex columns'],
      mockup: (
        <div className="flex h-44 w-full flex-col p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white shadow-sm gap-2">
          <div className="self-center h-3 w-1/3 rounded bg-zinc-800" />
          <div className="self-center h-1.5 w-1/2 rounded bg-zinc-400" />
          <div className="mt-2 h-0.5 w-full bg-zinc-900" />
          <div className="flex flex-col gap-1.5 mt-1">
            <div className="h-2 w-1/4 rounded bg-zinc-800" />
            <div className="h-1.5 w-full rounded bg-zinc-200" />
            <div className="h-1.5 w-full rounded bg-zinc-200" />
            <div className="h-1.5 w-5/6 rounded bg-zinc-150" />
          </div>
        </div>
      )
    },
    {
      id: 'creative',
      name: 'Creative Resume',
      tagline: 'Bold Design Statement',
      badgeColor: 'bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300 border-violet-150 dark:border-violet-900',
      description: 'Features a colorful top banner section and accent tags, paired with double column layouts. Best suited for designers, developers, product managers, and roles requiring visual flair.',
      features: ['Gradient accent banner', 'Visual block tag pill designs', 'Side column metadata list', 'Outstanding visual hierarchy'],
      mockup: (
        <div className="flex h-44 w-full flex-col rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white shadow-sm">
          {/* Header Banner */}
          <div className="h-2 bg-gradient-to-r from-violet-600 via-indigo-500 to-emerald-400 w-full" />
          {/* Inner column grid */}
          <div className="flex flex-1">
            {/* Left */}
            <div className="flex-1 p-3 flex flex-col gap-2">
              <div className="h-3 w-1/2 rounded bg-zinc-800" />
              <div className="h-1.5 w-full rounded bg-zinc-200" />
              <div className="h-1.5 w-full rounded bg-zinc-200" />
              <div className="mt-2 h-2 w-1/3 rounded bg-violet-600/30" />
              <div className="h-1.5 w-full rounded bg-zinc-200" />
            </div>
            {/* Sidebar */}
            <div className="w-[30%] border-l border-zinc-100 p-2.5 flex flex-col gap-2">
              <div className="h-2.5 w-3/4 rounded bg-violet-600/30" />
              <div className="flex flex-wrap gap-1">
                <div className="h-2.5 w-4 rounded bg-indigo-50" />
                <div className="h-2.5 w-5 rounded bg-indigo-50" />
                <div className="h-2.5 w-3 rounded bg-indigo-50" />
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 font-sans">
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50 self-center">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            ATS-Friendly & Professional Layouts
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Choose a Template to <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-500 bg-clip-text text-transparent">Forge Your Future</span>
          </h1>
          <p className="text-base text-zinc-650 dark:text-zinc-300">
            Select one of our expertly-crafted formats. Each layout was designed to maximize parsing score while keeping a sleek, premium design.
          </p>
        </div>

        {/* Templates list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
          {templates.map((tpl) => (
            <div 
              key={tpl.id}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-6 flex flex-col gap-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Visual Preview */}
              {tpl.mockup}

              {/* Title & Tagline */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{tpl.name}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tpl.badgeColor}`}>
                    {tpl.tagline}
                  </span>
                </div>
                <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed mt-1">
                  {tpl.description}
                </p>
              </div>

              {/* Bullet Features */}
              <div className="flex flex-col gap-2 border-t border-zinc-100 dark:border-zinc-800/80 pt-4">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Template Highlights</span>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {tpl.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-300">
                      <CheckCircle className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Select Action */}
              <div className="mt-auto pt-2">
                <Link
                  href={`/builder?template=${tpl.id}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-3 text-xs font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 transition-colors shadow-sm cursor-pointer"
                >
                  Create with this Template
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white dark:border-zinc-900 dark:bg-zinc-950 py-8 mt-12 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300">
              <User className="h-3.5 w-3.5 text-indigo-500" />
              <span>Ritesh Chaudhary</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-[11px] text-zinc-600 dark:text-zinc-300">
              <Mail className="h-3 w-3 text-zinc-500 dark:text-zinc-400" />
              <span>riteshchaudhary63430@gmail.com</span>
            </div>
          </div>
          <div>
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg bg-indigo-50 border border-indigo-100 px-4 py-2 text-[11px] font-bold text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:border-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-900/60 transition-all cursor-pointer"
            >
              Built for Digital Heroes
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
