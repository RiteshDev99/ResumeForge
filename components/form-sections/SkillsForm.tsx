'use client';

import React from 'react';
import { SKILL_SUGGESTIONS } from '../../data/templates';
import { Sparkles } from 'lucide-react';

interface SkillsFormProps {
  skills: string;
  onChange: (value: string) => void;
  title: string;
}

export default function SkillsForm({ skills, onChange, title }: SkillsFormProps) {
  // Append a suggested skill to list
  const addSuggestedSkill = (skill: string) => {
    const currentSkills = skills.split(',').map(s => s.trim()).filter(Boolean);
    if (!currentSkills.includes(skill)) {
      const updated = [...currentSkills, skill].join(', ');
      onChange(updated);
    }
  };

  // Find skill suggestions based on typed Title
  const getSuggestions = () => {
    const roleTitle = title.toLowerCase();
    if (!roleTitle) return [];

    // Match best keys
    for (const [key, list] of Object.entries(SKILL_SUGGESTIONS)) {
      if (roleTitle.includes(key.toLowerCase()) || key.toLowerCase().includes(roleTitle)) {
        return list;
      }
    }
    
    // Default general tech suggestions if title doesn't match exactly but is not empty
    if (roleTitle.length > 2) {
      return ['Git', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'];
    }

    return [];
  };

  const suggestions = getSuggestions();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-zinc-500 uppercase">Core Skills (Comma separated)</label>
        <textarea
          rows={3}
          placeholder="React, Next.js, JavaScript, TypeScript, Tailwind CSS, Node.js"
          value={skills}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm text-zinc-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-zinc-800 dark:text-white resize-y"
        />
      </div>

      {/* Suggestions Panel */}
      {suggestions.length > 0 && (
        <div className="rounded-xl bg-zinc-50 p-4 border border-zinc-150 dark:bg-zinc-900/50 dark:border-zinc-800">
          <span className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            Recommended Skills for &quot;{title || 'Your Role'}&quot;
          </span>
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map((skill) => {
              const isAdded = skills.split(',').map(s => s.trim().toLowerCase()).includes(skill.toLowerCase());
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => addSuggestedSkill(skill)}
                  disabled={isAdded}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-100 text-emerald-800 cursor-not-allowed dark:bg-emerald-950/40 dark:text-emerald-300'
                      : 'bg-white border border-zinc-200 text-zinc-700 hover:border-indigo-500 hover:text-indigo-600 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-indigo-400'
                  }`}
                >
                  {skill} {isAdded ? '✓' : '+'}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
