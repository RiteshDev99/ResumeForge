'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ResumeData } from '../types/resume';
import { COVER_LETTER_TEMPLATES } from '../data/templates';
import ModernTemplate from './templates/ModernTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import CoverLetterDocument from './templates/CoverLetterDocument';

interface ResumePreviewProps {
  data: ResumeData;
  activeTab: 'resume' | 'cover-letter';
  setActiveTab: (tab: 'resume' | 'cover-letter') => void;
}

export default function ResumePreview({ data, activeTab, setActiveTab }: ResumePreviewProps) {
  const [activeLetterTone, setActiveLetterTone] = useState<string>('modern');
  const [zoom, setZoom] = useState(1);
  const [scrollHeight, setScrollHeight] = useState(1122);
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Format skills as array
  const skillList = data.skills
    ? data.skills.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  // Generate Cover Letter Content text
  const selectedTone = COVER_LETTER_TEMPLATES.find(t => t.id === activeLetterTone) || COVER_LETTER_TEMPLATES[0];
  const coverLetterText = selectedTone.generate({
    fullName: data.personalInfo.fullName,
    email: data.personalInfo.email,
    phone: data.personalInfo.phone,
    location: data.personalInfo.location,
    jobRole: data.coverLetter.jobRole,
    companyName: data.coverLetter.companyName,
    reason: data.coverLetter.reason,
    yearsOfExperience: data.coverLetter.yearsOfExperience
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current || !innerRef.current) return;
      const parent = containerRef.current.parentElement;
      if (!parent) return;
      const parentWidth = parent.clientWidth;
      const availableWidth = parentWidth - 48; // p-6 padding
      const a4Width = 794; // 210mm in pixels at 96 DPI
      const factor = Math.min(availableWidth / a4Width, 1);
      setZoom(factor);
      setScrollHeight(innerRef.current.scrollHeight || 1122);
    };

    updateDimensions();
    const observer = new ResizeObserver(updateDimensions);
    if (innerRef.current) observer.observe(innerRef.current);
    window.addEventListener('resize', updateDimensions);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, [data, activeTab]);

  const getActiveDocument = () => {
    if (activeTab === 'cover-letter') {
      return <CoverLetterDocument data={data} coverLetterText={coverLetterText} />;
    }
    
    switch (data.selectedTemplate) {
      case 'minimal':
        return <MinimalTemplate data={data} skillList={skillList} />;
      case 'creative':
        return <CreativeTemplate data={data} skillList={skillList} />;
      case 'modern':
      default:
        return <ModernTemplate data={data} skillList={skillList} />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toggles bar */}
      <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900/50 rounded-t-2xl">
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('resume')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'resume'
                ? 'bg-white text-zinc-950 shadow-sm dark:bg-zinc-900 dark:text-white'
                : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            Resume Document
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cover-letter')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'cover-letter'
                ? 'bg-white text-zinc-950 shadow-sm dark:bg-zinc-900 dark:text-white'
                : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            Cover Letter
          </button>
        </div>

        {/* Tone picker for Cover Letter */}
        {activeTab === 'cover-letter' && (
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase">Tone:</span>
            <select
              value={activeLetterTone}
              onChange={(e) => setActiveLetterTone(e.target.value)}
              className="rounded border border-zinc-200 bg-white px-2 py-1 text-[10px] font-semibold text-zinc-600 outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
            >
              {COVER_LETTER_TEMPLATES.map((tone) => (
                <option key={tone.id} value={tone.id}>
                  {tone.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Render Workspace - Simulated A4 paper sheet scaled inside dashboard */}
      <div className="flex-1 overflow-auto bg-zinc-150/40 p-6 dark:bg-zinc-950/20 flex justify-center items-start rounded-b-2xl min-h-[500px]" ref={containerRef}>
        {/* Scaled paper representation wrapper */}
        <div 
          style={{ width: `${794 * zoom}px`, height: `${scrollHeight * zoom}px` }} 
          className="relative shadow-xl border border-zinc-200 bg-white dark:border-zinc-800 transition-all duration-100 shrink-0"
        >
          <div 
            ref={innerRef}
            style={{ 
              transform: `scale(${zoom})`, 
              transformOrigin: 'top left',
              width: '794px',
              height: `${scrollHeight}px`,
              position: 'absolute',
              top: 0,
              left: 0
            }}
            className="bg-white text-black"
          >
            {getActiveDocument()}
          </div>
          
          {/* Page break guide line */}
          {scrollHeight > 1122 && (
            <div 
              style={{ top: `${1122 * zoom}px` }} 
              className="absolute left-0 w-full border-t-2 border-dashed border-rose-400/50 pointer-events-none flex justify-center z-10"
            >
              <span className="bg-rose-100 text-rose-700 text-[9px] font-bold px-2 py-0.5 rounded-b shadow-sm uppercase tracking-wider">
                Page 1 / Page 2 Break
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
