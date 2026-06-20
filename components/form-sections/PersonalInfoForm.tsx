'use client';

import React from 'react';
import { PersonalInfo } from '../../types/resume';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (field: keyof PersonalInfo, value: string) => void;
}

export default function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase">Full Name</label>
        <input
          type="text"
          placeholder="John Doe"
          value={data.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
          className="rounded-xl border border-zinc-200 bg-zinc-50/50 dark:bg-zinc-900/20 px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:bg-white dark:focus:bg-zinc-900/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-zinc-800 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10 transition-all duration-200 shadow-sm"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase">Job Title / Role</label>
        <input
          type="text"
          placeholder="Frontend Developer"
          value={data.title}
          onChange={(e) => onChange('title', e.target.value)}
          className="rounded-xl border border-zinc-200 bg-zinc-50/50 dark:bg-zinc-900/20 px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:bg-white dark:focus:bg-zinc-900/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-zinc-800 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10 transition-all duration-200 shadow-sm"
        />
        <p className="text-[10px] text-zinc-500 dark:text-zinc-450">Drives skill suggestions below (e.g. Frontend Developer)</p>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase">Email Address</label>
        <input
          type="email"
          placeholder="johndoe@example.com"
          value={data.email}
          onChange={(e) => onChange('email', e.target.value)}
          className="rounded-xl border border-zinc-200 bg-zinc-50/50 dark:bg-zinc-900/20 px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:bg-white dark:focus:bg-zinc-900/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-zinc-800 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10 transition-all duration-200 shadow-sm"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase">Phone Number</label>
        <input
          type="tel"
          placeholder="+1 (555) 019-2834"
          value={data.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          className="rounded-xl border border-zinc-200 bg-zinc-50/50 dark:bg-zinc-900/20 px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:bg-white dark:focus:bg-zinc-900/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-zinc-800 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10 transition-all duration-200 shadow-sm"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase">Location</label>
        <input
          type="text"
          placeholder="New York, NY"
          value={data.location}
          onChange={(e) => onChange('location', e.target.value)}
          className="rounded-xl border border-zinc-200 bg-zinc-50/50 dark:bg-zinc-900/20 px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:bg-white dark:focus:bg-zinc-900/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-zinc-800 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10 transition-all duration-200 shadow-sm"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase">LinkedIn Profile Link</label>
        <input
          type="text"
          placeholder="linkedin.com/in/johndoe"
          value={data.linkedin}
          onChange={(e) => onChange('linkedin', e.target.value)}
          className="rounded-xl border border-zinc-200 bg-zinc-50/50 dark:bg-zinc-900/20 px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:bg-white dark:focus:bg-zinc-900/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-zinc-800 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10 transition-all duration-200 shadow-sm"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase">GitHub Profile Link</label>
        <input
          type="text"
          placeholder="github.com/johndoe"
          value={data.github}
          onChange={(e) => onChange('github', e.target.value)}
          className="rounded-xl border border-zinc-200 bg-zinc-50/50 dark:bg-zinc-900/20 px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:bg-white dark:focus:bg-zinc-900/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-zinc-800 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10 transition-all duration-200 shadow-sm"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase">Portfolio Website</label>
        <input
          type="text"
          placeholder="johndoe.dev"
          value={data.portfolio}
          onChange={(e) => onChange('portfolio', e.target.value)}
          className="rounded-xl border border-zinc-200 bg-zinc-50/50 dark:bg-zinc-900/20 px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:bg-white dark:focus:bg-zinc-900/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-zinc-800 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10 transition-all duration-200 shadow-sm"
        />
      </div>
    </div>
  );
}
