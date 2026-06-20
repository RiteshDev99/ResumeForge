'use client';

import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface ATSMetricBarProps {
  score: number;
  completion: number;
  insights: string[];
}

export default function ATSMetricBar({ score, completion, insights }: ATSMetricBarProps) {
  // Get rating labels based on score
  const getStrengthMetrics = (s: number) => {
    if (s < 45) return { label: 'Weak 🔴', color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/20' };
    if (s < 75) return { label: 'Good 🟡', color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/20' };
    return { label: 'Strong 🟢', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20' };
  };

  const strength = getStrengthMetrics(score);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/40 shrink-0">
      {/* Col 1: Completion SVG Circle */}
      <div className="flex items-center gap-4">
        <div className="relative flex items-center justify-center shrink-0">
          <svg className="w-14 h-14 transform -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              className="text-zinc-200 dark:text-zinc-800"
            />
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 24}
              strokeDashoffset={2 * Math.PI * 24 * (1 - completion / 100)}
              className="text-indigo-600 dark:text-indigo-400 transition-all duration-300"
            />
          </svg>
          <span className="absolute text-xs font-bold text-zinc-900 dark:text-white">{completion}%</span>
        </div>
        <div>
          <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Profile Completion</h4>
          <p className="text-xs text-zinc-400">Filled sections index indicator</p>
        </div>
      </div>

      {/* Col 2: ATS Checker & Strength Score */}
      <div className="flex items-center justify-between border-t border-zinc-100 pt-4 md:border-t-0 md:pt-0 md:border-l md:pl-6 border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-zinc-400 uppercase">ATS Score</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${strength.color}`}>
              {strength.label}
            </span>
          </div>
          <span className="text-2xl font-black text-zinc-950 dark:text-white tracking-tight">{score}%</span>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className="text-xs text-zinc-400">Score Rating</span>
          <div className="h-2 w-28 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                score < 45 ? 'bg-rose-500' : score < 75 ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </div>

      {/* Col 3: Actionable Strength Insights list */}
      <div className="border-t border-zinc-100 pt-4 md:border-t-0 md:pt-0 md:border-l md:pl-6 border-zinc-200 dark:border-zinc-800 flex flex-col justify-center">
        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wide mb-1.5 flex items-center gap-1">
          <AlertCircle className="h-3.5 w-3.5 text-indigo-500" /> Action Items
        </h4>
        {insights.length > 0 ? (
          <div className="text-[10px] text-zinc-500 leading-snug flex flex-col gap-1 max-h-[50px] overflow-y-auto">
            {insights.slice(0, 2).map((insight, idx) => (
              <div key={idx} className="flex items-start gap-1">
                <span className="text-rose-500 shrink-0">•</span>
                <span className="truncate">{insight}</span>
              </div>
            ))}
            {insights.length > 2 && (
              <span className="text-zinc-400 italic">+{insights.length - 2} more recommendations</span>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1.5 rounded-xl self-start">
            <CheckCircle className="h-3.5 w-3.5" />
            Resume fully optimized!
          </div>
        )}
      </div>
    </div>
  );
}
