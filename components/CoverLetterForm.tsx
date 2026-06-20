'use client';

import React from 'react';
import { ResumeData, CoverLetterInput } from '../types/resume';
import { FileText, Briefcase, Building, Clock, FileQuestion } from 'lucide-react';

interface CoverLetterFormProps {
  data: ResumeData;
  onChange: (updatedData: ResumeData) => void;
}

export default function CoverLetterForm({ data, onChange }: CoverLetterFormProps) {
  const handleCoverLetterChange = (field: keyof CoverLetterInput, value: string) => {
    onChange({
      ...data,
      coverLetter: {
        ...data.coverLetter,
        [field]: value
      }
    });
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950 flex flex-col gap-5">
      {/* Intro info */}
      <div className="flex flex-col gap-1 border-b border-zinc-150 pb-4 dark:border-zinc-800">
        <h3 className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white">
          <FileText className="h-5 w-5 text-indigo-500" />
          <span>Cover Letter Generator</span>
        </h3>
        <p className="text-xs text-zinc-400">
          Enter target job details below. Predefined templates will automatically format a customized cover letter.
        </p>
      </div>

      {/* Input layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Job Role */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-500 uppercase flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5 text-zinc-400" /> Target Job Role
          </label>
          <input
            type="text"
            placeholder="Senior Frontend Engineer"
            value={data.coverLetter.jobRole}
            onChange={(e) => handleCoverLetterChange('jobRole', e.target.value)}
            className="rounded-xl border border-zinc-200 bg-transparent px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-zinc-800 dark:text-white"
          />
        </div>

        {/* Company Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-500 uppercase flex items-center gap-1.5">
            <Building className="h-3.5 w-3.5 text-zinc-400" /> Company Name
          </label>
          <input
            type="text"
            placeholder="Digital Heroes Co"
            value={data.coverLetter.companyName}
            onChange={(e) => handleCoverLetterChange('companyName', e.target.value)}
            className="rounded-xl border border-zinc-200 bg-transparent px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-zinc-800 dark:text-white"
          />
        </div>

        {/* Years of Experience */}
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-xs font-semibold text-zinc-500 uppercase flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-zinc-400" /> Years of Relevant Experience
          </label>
          <input
            type="text"
            placeholder="6"
            value={data.coverLetter.yearsOfExperience}
            onChange={(e) => handleCoverLetterChange('yearsOfExperience', e.target.value)}
            className="rounded-xl border border-zinc-200 bg-transparent px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-zinc-800 dark:text-white"
          />
        </div>

        {/* Motivation/Reason */}
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-xs font-semibold text-zinc-500 uppercase flex items-center gap-1.5">
            <FileQuestion className="h-3.5 w-3.5 text-zinc-400" /> Why do you want this job?
          </label>
          <textarea
            rows={4}
            placeholder="Explain why you are motivated to join... e.g. I admire your team's focus on developer experience and open-source packages."
            value={data.coverLetter.reason}
            onChange={(e) => handleCoverLetterChange('reason', e.target.value)}
            className="rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-sm text-zinc-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-zinc-800 dark:text-white resize-y"
          />
        </div>
      </div>
    </div>
  );
}
