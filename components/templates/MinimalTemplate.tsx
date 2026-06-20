'use client';

import React from 'react';
import { ResumeData } from '../../types/resume';

interface MinimalTemplateProps {
  data: ResumeData;
  skillList: string[];
}

export default function MinimalTemplate({ data, skillList }: MinimalTemplateProps) {
  return (
    <div className="p-8 flex flex-col gap-5 text-zinc-900 bg-white" id="resume-document-content">
      {/* Header */}
      <div className="text-center flex flex-col gap-1 border-b-2 border-zinc-900 pb-4">
        <h1 className="text-2xl font-bold tracking-wide uppercase">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
          {data.personalInfo.title || 'Target Job Title'}
        </p>
        {/* Contact row */}
        <div className="mt-1 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] text-zinc-600">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span>• {data.personalInfo.linkedin}</span>}
          {data.personalInfo.github && <span>• {data.personalInfo.github}</span>}
          {data.personalInfo.portfolio && <span>• {data.personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="flex flex-col gap-1">
          <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-zinc-300 pb-0.5">
            Professional Summary
          </h2>
          <p className="text-[10px] leading-relaxed text-zinc-700">
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-zinc-300 pb-0.5">
            Work Experience
          </h2>
          <div className="flex flex-col gap-3">
            {data.experience.map((exp) => (
              <div key={exp.id} className="flex flex-col gap-0.5">
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span>{exp.role} — {exp.company}</span>
                  <span className="font-normal text-zinc-500">{exp.duration}</span>
                </div>
                {exp.description && (
                  <p className="text-[9.5px] leading-normal text-zinc-700 whitespace-pre-line">
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
        <div className="flex flex-col gap-2">
          <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-zinc-300 pb-0.5">
            Projects
          </h2>
          <div className="flex flex-col gap-3">
            {data.projects.map((proj) => (
              <div key={proj.id} className="flex flex-col gap-0.5">
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span>{proj.name} {proj.techStack ? `(${proj.techStack})` : ''}</span>
                  {proj.githubLink && <span className="font-normal text-zinc-500 text-[9px]">{proj.githubLink}</span>}
                </div>
                {proj.description && (
                  <p className="text-[9.5px] leading-normal text-zinc-700">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skillList.length > 0 && (
        <div className="flex flex-col gap-1">
          <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-zinc-300 pb-0.5">
            Core Competencies & Skills
          </h2>
          <p className="text-[10px] leading-relaxed text-zinc-700">
            {skillList.join(' • ')}
          </p>
        </div>
      )}

      {/* Education & Certs */}
      <div className="grid grid-cols-2 gap-4">
        {data.education.length > 0 && (
          <div className="flex flex-col gap-1">
            <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-zinc-300 pb-0.5">
              Education
            </h2>
            <div className="flex flex-col gap-2">
              {data.education.map((edu) => (
                <div key={edu.id} className="text-[9.5px]">
                  <div className="font-bold">{edu.degree}</div>
                  <div className="text-zinc-600">{edu.college} ({edu.year})</div>
                  {edu.cgpa && <div className="text-[9px] text-zinc-500">GPA: {edu.cgpa}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.certifications.length > 0 && (
          <div className="flex flex-col gap-1">
            <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-zinc-300 pb-0.5">
              Certifications
            </h2>
            <div className="flex flex-col gap-1.5">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="text-[9.5px]">
                  <div className="font-bold">{cert.name}</div>
                  <div className="text-zinc-600">{cert.organization} | {cert.year}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
