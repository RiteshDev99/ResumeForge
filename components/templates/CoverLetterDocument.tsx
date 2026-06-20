'use client';

import React from 'react';
import { ResumeData } from '../../types/resume';

interface CoverLetterDocumentProps {
  data: ResumeData;
  coverLetterText: string;
}

export default function CoverLetterDocument({ data, coverLetterText }: CoverLetterDocumentProps) {
  const isCreative = data.selectedTemplate === 'creative';
  const isModern = data.selectedTemplate === 'modern';

  return (
    <div className="flex min-h-full flex-col bg-white text-zinc-800 p-8 sm:p-12 text-left" id="cover-letter-document-content">
      {/* Letterhead top banner */}
      {isCreative && (
        <div className="-mt-12 -mx-12 h-3.5 bg-gradient-to-r from-violet-600 via-indigo-600 to-emerald-500 w-[calc(100%+96px)] mb-8" />
      )}
      
      {/* Letterhead Metadata */}
      <div className={`flex flex-col gap-1 pb-6 border-b ${
        isModern ? 'border-indigo-150' : 'border-zinc-200'
      }`}>
        <h1 className="text-xl font-bold tracking-tight text-zinc-900">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <p className={`text-xs font-semibold uppercase tracking-wider ${
          isModern ? 'text-indigo-600' : isCreative ? 'text-emerald-600' : 'text-zinc-500'
        }`}>
          {data.personalInfo.title || 'Target Job Title'}
        </p>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-zinc-600">
          {data.personalInfo.email && <span>Email: {data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>Phone: {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>Location: {data.personalInfo.location}</span>}
        </div>
      </div>

      {/* Generated Text Content */}
      <div className="mt-8 text-[11px] leading-relaxed text-zinc-700 whitespace-pre-line flex-1">
        {coverLetterText}
      </div>
    </div>
  );
}
