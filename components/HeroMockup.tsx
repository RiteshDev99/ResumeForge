'use client';

import React, { useState } from 'react';
import { Mail, User, CheckCircle } from 'lucide-react';

export default function HeroMockup() {
  const [activeHeroTab, setActiveHeroTab] = useState<'profile' | 'experience' | 'skills'>('profile');
  const [includePortfolio, setIncludePortfolio] = useState<boolean>(true);

  // Compute hero score dynamically during render
  const heroScore = activeHeroTab === 'profile'
    ? (includePortfolio ? 95 : 85)
    : (activeHeroTab === 'experience' ? 92 : 88);

  return (
    <div className="relative w-full flex justify-center">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-violet-500/5 rounded-3xl blur-2xl -z-10" />
      
      {/* Main Window mockup */}
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl shadow-2xl p-5 flex flex-col gap-4 transform rotate-1 hover:rotate-0 transition-all duration-500 backdrop-blur-md">
        
        {/* Window Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-850 pb-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-400/90 shadow-sm" />
            <span className="h-3 w-3 rounded-full bg-amber-400/90 shadow-sm" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/90 shadow-sm" />
          </div>
          <div className="flex items-center gap-1 bg-zinc-50 dark:bg-zinc-950 px-2 py-0.5 rounded border border-zinc-150 dark:border-zinc-850">
            <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">interactive_preview.tsx</span>
          </div>
        </div>

        {/* Tabs selector */}
        <div className="flex gap-1.5 bg-zinc-100/80 dark:bg-zinc-950/60 p-1 rounded-xl border border-zinc-150 dark:border-zinc-850">
          {(['profile', 'experience', 'skills'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveHeroTab(tab)}
              className={`flex-1 text-[10px] font-bold py-1.5 rounded-lg capitalize transition-all cursor-pointer ${
                activeHeroTab === tab
                  ? 'bg-white text-indigo-600 shadow-sm dark:bg-zinc-800 dark:text-indigo-400'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Mockup content box dynamically updating */}
        <div className="bg-zinc-50 dark:bg-zinc-950/40 p-4 rounded-xl border border-zinc-150 dark:border-zinc-850/60 min-h-[160px] flex flex-col gap-3 transition-all duration-300">
          {activeHeroTab === 'profile' && (
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-zinc-950 dark:text-white">Alex Rivera</h4>
                  <p className="text-[10px] text-indigo-500 dark:text-indigo-400 font-bold mt-0.5">Senior Frontend Engineer</p>
                </div>
                <span className="text-[8px] text-zinc-400 font-semibold">San Francisco, CA</span>
              </div>
              
              <div className="grid grid-cols-2 gap-1.5 border-t border-dashed border-zinc-150 dark:border-zinc-800/80 pt-2.5 mt-1">
                <div className="flex items-center gap-1 text-[9px] text-zinc-500 dark:text-zinc-400">
                  <Mail className="h-3 w-3 shrink-0" />
                  <span className="truncate">alex.rivera@gmail.com</span>
                </div>
                <div className="flex items-center gap-1 text-[9px] text-zinc-500 dark:text-zinc-400">
                  <User className="h-3 w-3 shrink-0" />
                  <span className="truncate">linkedin.com/in/alexr</span>
                </div>
              </div>

              <div className="mt-2 flex flex-col min-[380px]:flex-row min-[380px]:items-center justify-between gap-2 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 p-2 rounded-lg">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includePortfolio}
                    onChange={(e) => setIncludePortfolio(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800"
                  />
                  <span className="text-[9.5px] font-bold text-zinc-700 dark:text-zinc-300">Include GitHub & Portfolio</span>
                </label>
                <span className="text-[8px] text-zinc-400 italic shrink-0">Adds +10 ATS points</span>
              </div>
            </div>
          )}

          {activeHeroTab === 'experience' && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-0.5 border-b border-zinc-150 dark:border-zinc-850 pb-2">
                <div className="flex justify-between items-center text-[10px] font-bold text-zinc-950 dark:text-white">
                  <span>Tech Lead @ Stripe</span>
                  <span className="text-zinc-400 text-[8px]">2022 - Present</span>
                </div>
                <p className="text-[9px] text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1">
                  • Rebuilt core billing dashboard using Next.js & TypeScript, increasing page speed by 42%.
                </p>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex justify-between items-center text-[10px] font-bold text-zinc-950 dark:text-white">
                  <span>Software Engineer @ Vercel</span>
                  <span className="text-zinc-400 text-[8px]">2020 - 2022</span>
                </div>
                <p className="text-[9px] text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1">
                  • Maintained open-source routing packages; collaborated with core Next.js development team.
                </p>
              </div>
            </div>
          )}

          {activeHeroTab === 'skills' && (
            <div className="flex flex-col gap-2.5">
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">Tech Stack Tags:</span>
              <div className="flex flex-wrap gap-1">
                {['React', 'Next.js', 'TypeScript', 'Node.js', 'TailwindCSS', 'Docker', 'GraphQL', 'Jest'].map((skill) => (
                  <span key={skill} className="text-[8.5px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-100/50 dark:border-indigo-900/30">
                    {skill}
                  </span>
                ))}
              </div>
              <p className="text-[9px] text-zinc-400 leading-relaxed mt-1">
                ATS scanners scan for matching noun keywords. Tag blocks align beautifully inside modern index formats.
              </p>
            </div>
          )}
        </div>

        {/* Bottom score and stats widgets */}
        <div className="grid grid-cols-2 gap-3.5 mt-1">
          {/* Score Widget */}
          <div className="flex items-center gap-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 p-2.5 border border-zinc-150 dark:border-zinc-850 shadow-sm">
            <div className="relative flex items-center justify-center shrink-0">
              <svg className="w-10 h-10 transform -rotate-90">
                <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-zinc-100 dark:text-zinc-800" />
                <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" fill="transparent" strokeDasharray={2 * Math.PI * 16} strokeDashoffset={2 * Math.PI * 16 * (1 - heroScore / 100)} className="text-indigo-600 dark:text-indigo-400 transition-all duration-500" />
              </svg>
              <span className="absolute text-[8px] font-black text-zinc-950 dark:text-white">{heroScore}%</span>
            </div>
            <div>
              <h4 className="text-[9px] font-bold text-zinc-950 dark:text-white leading-none">ATS Score</h4>
              <span className="text-[7.5px] text-zinc-400 block mt-1">Dynamic Rating</span>
            </div>
          </div>

          {/* Score badge validation status */}
          <div className="flex items-center gap-2 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 p-2.5 border border-zinc-150 dark:border-zinc-850 shadow-sm">
            <div className="h-5 w-5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle className="h-3 w-3" />
            </div>
            <div className="leading-tight">
              <span className="text-[9px] font-bold text-zinc-950 dark:text-white">Validation Pass</span>
              <span className="text-[7.5px] text-emerald-600 dark:text-emerald-400 font-bold block mt-0.5">Strong Layout 🟢</span>
            </div>
          </div>
        </div>

        {/* Visual background details */}
        <div className="absolute -bottom-4 -right-4 h-24 w-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -top-4 -left-4 h-20 w-20 bg-indigo-500/10 rounded-full blur-lg pointer-events-none" />
      </div>
    </div>
  );
}
