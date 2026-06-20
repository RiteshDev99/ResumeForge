'use client';

import React from 'react';
import { ResumeData } from '../../types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface CreativeTemplateProps {
  data: ResumeData;
  skillList: string[];
}

export default function CreativeTemplate({ data, skillList }: CreativeTemplateProps) {
  return (
    <div className="flex min-h-full flex-col bg-white" id="resume-document-content">
      {/* Visual Accent Banner */}
      <div className="h-3.5 bg-gradient-to-r from-violet-600 via-indigo-600 to-emerald-500 w-full" />
      
      {/* Top Header Card */}
      <div className="px-8 pt-6 pb-4 bg-zinc-50 border-b border-zinc-200/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 leading-none">
            {data.personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mt-2">
            {data.personalInfo.title || 'Target Job Title'}
          </p>
        </div>
        {/* Simple grid list for contact */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[10px] text-zinc-600 sm:text-right">
          {data.personalInfo.email && <div className="flex items-center gap-1 justify-end"><Mail className="h-3 w-3 text-zinc-400" /> {data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div className="flex items-center gap-1 justify-end"><Phone className="h-3 w-3 text-zinc-400" /> {data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div className="flex items-center gap-1 justify-end"><MapPin className="h-3 w-3 text-zinc-400" /> {data.personalInfo.location}</div>}
          {data.personalInfo.portfolio && <div className="flex items-center gap-1 justify-end"><Globe className="h-3 w-3 text-zinc-400" /> {data.personalInfo.portfolio}</div>}
        </div>
      </div>

      {/* Main body */}
      <div className="p-8 grid grid-cols-12 gap-6 flex-1 text-zinc-800">
        {/* Left column (Main) */}
        <div className="col-span-8 flex flex-col gap-6">
          {/* Summary */}
          {data.personalInfo.summary && (
            <div className="flex flex-col gap-2">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-violet-700 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-600" /> Profile Statement
              </h2>
              <p className="text-[10px] leading-relaxed text-zinc-600">
                {data.personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-violet-700 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-600" /> Experience
              </h2>
              <div className="flex flex-col gap-4">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="flex flex-col gap-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-zinc-900">{exp.role}</h4>
                        <span className="text-[10px] font-bold text-zinc-500">{exp.company}</span>
                      </div>
                      <span className="text-[9.5px] font-semibold text-zinc-400">{exp.duration}</span>
                    </div>
                    {exp.description && (
                      <p className="text-[9.5px] leading-normal text-zinc-600 whitespace-pre-line">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-violet-700 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-600" /> Projects
              </h2>
              <div className="flex flex-col gap-4">
                {data.projects.map((proj) => (
                  <div key={proj.id} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-zinc-900">{proj.name}</h4>
                      {proj.techStack && (
                        <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                          {proj.techStack}
                        </span>
                      )}
                    </div>
                    {proj.description && (
                      <p className="text-[9.5px] leading-normal text-zinc-600">
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column (Info Sidebar) */}
        <div className="col-span-4 flex flex-col gap-6 border-l border-zinc-100 pl-6">
          {/* Skills */}
          {skillList.length > 0 && (
            <div className="flex flex-col gap-2">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-violet-700">Skills</h2>
              <div className="flex flex-wrap gap-1.5">
                {skillList.map((skill) => (
                  <span
                    key={skill}
                    className="rounded bg-indigo-50 border border-indigo-100/50 px-2 py-0.5 text-[9px] font-semibold text-indigo-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div className="flex flex-col gap-2">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-violet-700">Education</h2>
              <div className="flex flex-col gap-3">
                {data.education.map((edu) => (
                  <div key={edu.id} className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold text-zinc-900">{edu.degree}</span>
                    <span className="text-[9.5px] text-zinc-500 leading-tight">{edu.college}</span>
                    <div className="flex items-center justify-between text-[8.5px] text-zinc-400">
                      <span>{edu.year}</span>
                      {edu.cgpa && <span>GPA: {edu.cgpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <div className="flex flex-col gap-2">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-violet-700">Certifications</h2>
              <div className="flex flex-col gap-3">
                {data.certifications.map((cert) => (
                  <div key={cert.id} className="flex flex-col">
                    <span className="text-[10px] font-bold text-zinc-900 leading-tight">{cert.name}</span>
                    <span className="text-[9px] text-zinc-500 leading-tight mt-0.5">{cert.organization}</span>
                    <span className="text-[8px] text-zinc-400 mt-0.5">{cert.year}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
