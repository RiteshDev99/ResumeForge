'use client';

import React from 'react';
import { ResumeData } from '../../types/resume';

interface MinimalTemplateProps {
  data: ResumeData;
  skillList: string[];
}

export default function MinimalTemplate({ data, skillList }: MinimalTemplateProps) {
  // Helper to parse markdown bold (**text**) and render it safely in React
  const renderFormattedText = (text: string) => {
    if (!text) return '';
    const parts = text.split('**');
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} className="font-bold text-zinc-950">{part}</strong>;
      }
      return part;
    });
  };

  // Parser to extract categorized skills
  const parseSkills = (skillsString: string) => {
    if (skillsString && skillsString.includes(':')) {
      const categories = skillsString.split(/[;\n]/).filter(Boolean);
      return categories.map((cat) => {
        const parts = cat.split(':');
        return {
          category: parts[0].trim(),
          skills: parts[1] ? parts[1].trim() : '',
        };
      }).filter((c) => c.category && c.skills);
    }
    // Fallback if not structured with colons
    return [{ category: 'Technologies & Tools', skills: skillsString || skillList.join(', ') }];
  };

  const categorizedSkills = parseSkills(data.skills);

  return (
    <div className="p-8 flex flex-col gap-4 text-black bg-white font-serif" id="resume-document-content">
      {/* Header - Centered Name and Contact Details */}
      <div className="text-center flex flex-col gap-1 pb-1">
        <h1 className="text-2xl font-bold tracking-normal text-zinc-950">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        
        {/* Contact details row in 2 centered lines */}
        <div className="text-[10px] text-zinc-800 flex flex-col items-center gap-0.5">
          <div className="flex items-center justify-center gap-2">
            {data.personalInfo.phone && <span>• &nbsp;{data.personalInfo.phone}</span>}
            {data.personalInfo.email && (
              <span className="flex items-center gap-2">
                <span>•</span>
                <a href={`mailto:${data.personalInfo.email}`} className="text-blue-600 hover:underline">
                  {data.personalInfo.email}
                </a>
              </span>
            )}
          </div>
          <div className="flex items-center justify-center gap-2">
            {data.personalInfo.github && (
              <a 
                href={data.personalInfo.github.startsWith('http') ? data.personalInfo.github : `https://${data.personalInfo.github}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:underline"
              >
                {data.personalInfo.github.replace(/^https?:\/\//, '')}
              </a>
            )}
            {data.personalInfo.github && data.personalInfo.linkedin && <span>•</span>}
            {data.personalInfo.linkedin && (
              <a 
                href={data.personalInfo.linkedin.startsWith('http') ? data.personalInfo.linkedin : `https://${data.personalInfo.linkedin}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:underline"
              >
                {data.personalInfo.linkedin.replace(/^https?:\/\//, '')}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      {data.personalInfo.summary && (
        <div className="flex flex-col gap-1 border-t border-zinc-950 pt-2 mt-1">
          <h2 className="text-[11.5px] font-bold tracking-normal text-zinc-900">
            Professional Summary
          </h2>
          <p className="text-[10px] leading-relaxed text-zinc-850 text-justify">
            {renderFormattedText(data.personalInfo.summary)}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {data.experience.length > 0 && (
        <div className="flex flex-col gap-1 border-t border-zinc-950 pt-2 mt-1">
          <h2 className="text-[11.5px] font-bold tracking-normal text-zinc-900">
            Experience
          </h2>
          <div className="flex flex-col gap-3 mt-1">
            {data.experience.map((exp) => {
              const hasLocationInCompany = exp.company.includes(',') || exp.company.toLowerCase().includes('remote');
              const displayLocation = hasLocationInCompany ? '' : 'Remote';

              return (
                <div key={exp.id} className="flex flex-col gap-0.5">
                  <div className="flex items-center justify-between text-[10.5px] font-bold text-zinc-900">
                    <span>{exp.company}</span>
                    {displayLocation && <span className="font-normal text-zinc-800">{displayLocation}</span>}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-zinc-700 italic">
                    <span>{exp.role}</span>
                    <span className="not-italic text-zinc-800">{exp.duration}</span>
                  </div>
                  {exp.description && (
                    <ul className="list-disc pl-5 mt-1 text-zinc-850 text-[10px] leading-relaxed flex flex-col gap-0.5">
                      {exp.description.split('\n').map((line, idx) => {
                        const cleanLine = line.replace(/^[•\-\s\*]+/, '').trim();
                        return cleanLine ? <li key={idx}>{renderFormattedText(cleanLine)}</li> : null;
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="flex flex-col gap-1 border-t border-zinc-950 pt-2 mt-1">
          <h2 className="text-[11.5px] font-bold tracking-normal text-zinc-900">
            Projects
          </h2>
          <div className="flex flex-col gap-2.5 mt-1">
            {data.projects.map((proj) => {
              const parts = proj.name.split(/\s+[-—]\s+/);
              const namePart = parts[0];
              const subtitlePart = parts.slice(1).join(' — ');

              const isGithub = proj.githubLink && (proj.githubLink.includes('github.com') || proj.githubLink.includes('github'));
              const linkLabel = isGithub ? 'GitHub' : 'Live';

              return (
                <div key={proj.id} className="flex flex-col gap-0.5 text-[10.5px]">
                  <div className="flex items-start gap-1">
                    <span className="text-zinc-950">•</span>
                    <div className="flex-1">
                      <span className="font-bold text-zinc-900">{namePart}</span>
                      {subtitlePart && (
                        <>
                          <span className="text-zinc-900"> — </span>
                          <span className="italic text-zinc-800">{subtitlePart}</span>
                        </>
                      )}
                      {proj.githubLink && (
                        <span className="font-normal text-[9.5px] ml-1.5">
                          [
                          <a 
                            href={proj.githubLink.startsWith('http') ? proj.githubLink : `https://${proj.githubLink}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-600 hover:underline"
                          >
                            {linkLabel}
                          </a>
                          ]
                        </span>
                      )}
                      {proj.techStack && (
                        <div className="font-bold text-zinc-900 text-[9.5px] mt-0.5 mb-1">
                          {proj.techStack.split(',').map((s) => s.trim()).join(' · ')}
                        </div>
                      )}
                      {proj.description && (
                        <p className="text-[10px] leading-relaxed text-zinc-850">
                          {renderFormattedText(proj.description)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Skills */}
      {categorizedSkills.length > 0 && (
        <div className="flex flex-col gap-1 border-t border-zinc-950 pt-2 mt-1">
          <h2 className="text-[11.5px] font-bold tracking-normal text-zinc-900">
            Skills
          </h2>
          <ul className="list-none flex flex-col gap-1 mt-1 text-[10px] text-zinc-850">
            {categorizedSkills.map((item, idx) => (
              <li key={idx}>
                <span className="font-bold">• {item.category}</span>: {item.skills}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="flex flex-col gap-1 border-t border-zinc-950 pt-2 mt-1">
          <h2 className="text-[11.5px] font-bold tracking-normal text-zinc-900">
            Education
          </h2>
          <div className="flex flex-col gap-2 mt-1">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex flex-col gap-0.5 text-[10px]">
                <div className="font-bold text-zinc-900">
                  {edu.college}
                </div>
                <div className="flex items-center justify-between text-zinc-800">
                  <span>{edu.degree} {edu.cgpa ? `| GPA: ${edu.cgpa}` : ''}</span>
                  <span className="text-zinc-850">{edu.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
