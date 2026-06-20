'use client';

import React, { useState } from 'react';
import { ResumeData, PersonalInfo, Education, Experience, Project, Certification } from '../types/resume';
import { DEMO_RESUME_DATA } from '../data/templates';
import { 
  User, Briefcase, Code, GraduationCap, Award, BookOpen, 
  ChevronDown, ChevronUp, RotateCcw, Sparkles 
} from 'lucide-react';

import PersonalInfoForm from './form-sections/PersonalInfoForm';
import SummaryForm from './form-sections/SummaryForm';
import ExperienceForm from './form-sections/ExperienceForm';
import SkillsForm from './form-sections/SkillsForm';
import ProjectsForm from './form-sections/ProjectsForm';
import EducationForm from './form-sections/EducationForm';
import CertificationsForm from './form-sections/CertificationsForm';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (updatedData: ResumeData) => void;
}

export default function ResumeForm({ data, onChange }: ResumeFormProps) {
  const [activeSection, setActiveSection] = useState<string>('personal');

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? '' : section);
  };

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  const handleArrayItemChange = <T extends { id: string }>(
    key: 'education' | 'experience' | 'projects' | 'certifications',
    id: string,
    field: keyof T,
    value: string
  ) => {
    const updatedArray = data[key].map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    onChange({ ...data, [key]: updatedArray });
  };

  const addExperience = () => {
    const newExp: Experience = { id: `exp-${Date.now()}`, company: '', role: '', duration: '', description: '' };
    onChange({ ...data, experience: [...data.experience, newExp] });
  };

  const addEducation = () => {
    const newEdu: Education = { id: `edu-${Date.now()}`, degree: '', college: '', year: '', cgpa: '' };
    onChange({ ...data, education: [...data.education, newEdu] });
  };

  const addProject = () => {
    const newProj: Project = { id: `proj-${Date.now()}`, name: '', techStack: '', description: '', githubLink: '' };
    onChange({ ...data, projects: [...data.projects, newProj] });
  };

  const addCertification = () => {
    const newCert: Certification = { id: `cert-${Date.now()}`, name: '', organization: '', year: '' };
    onChange({ ...data, certifications: [...data.certifications, newCert] });
  };

  const removeItem = (key: 'education' | 'experience' | 'projects' | 'certifications', id: string) => {
    onChange({ ...data, [key]: data[key].filter((item) => item.id !== id) });
  };

  const handleSkillsChange = (val: string) => {
    onChange({ ...data, skills: val });
  };

  const loadDemoData = () => {
    onChange({
      ...DEMO_RESUME_DATA,
      selectedTemplate: data.selectedTemplate
    });
  };

  const resetForm = () => {
    onChange({
      personalInfo: { fullName: '', title: '', email: '', phone: '', location: '', linkedin: '', github: '', portfolio: '', summary: '' },
      education: [],
      experience: [],
      skills: '',
      projects: [],
      certifications: [],
      coverLetter: { jobRole: '', companyName: '', reason: '', yearsOfExperience: '' },
      selectedTemplate: data.selectedTemplate
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Quick Actions Panel */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-zinc-50 p-4 border border-zinc-200 dark:bg-zinc-900/50 dark:border-zinc-800">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Quick Actions</span>
          <span className="text-xs text-zinc-400">Load sample profile to test immediately.</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadDemoData}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-500/10 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/20 transition-all cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Load Demo Resume
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset Form
          </button>
        </div>
      </div>

      {/* Accordion List */}
      <div className="divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-950">
        {/* Personal Info */}
        <div>
          <button
            type="button"
            onClick={() => toggleSection('personal')}
            className="flex w-full items-center justify-between p-5 text-left font-semibold text-zinc-900 dark:text-white cursor-pointer hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30"
          >
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-indigo-500" />
              <span>Personal Information</span>
            </div>
            {activeSection === 'personal' ? <ChevronUp className="h-5 w-5 text-zinc-400" /> : <ChevronDown className="h-5 w-5 text-zinc-400" />}
          </button>
          {activeSection === 'personal' && (
            <div className="border-t border-zinc-100 p-5 dark:border-zinc-900">
              <PersonalInfoForm data={data.personalInfo} onChange={handlePersonalInfoChange} />
            </div>
          )}
        </div>

        {/* Summary */}
        <div>
          <button
            type="button"
            onClick={() => toggleSection('summary')}
            className="flex w-full items-center justify-between p-5 text-left font-semibold text-zinc-900 dark:text-white cursor-pointer hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-indigo-500" />
              <span>Professional Summary</span>
            </div>
            {activeSection === 'summary' ? <ChevronUp className="h-5 w-5 text-zinc-400" /> : <ChevronDown className="h-5 w-5 text-zinc-400" />}
          </button>
          {activeSection === 'summary' && (
            <div className="border-t border-zinc-100 p-5 dark:border-zinc-900">
              <SummaryForm summary={data.personalInfo.summary} onChange={(val) => handlePersonalInfoChange('summary', val)} />
            </div>
          )}
        </div>

        {/* Experience */}
        <div>
          <button
            type="button"
            onClick={() => toggleSection('experience')}
            className="flex w-full items-center justify-between p-5 text-left font-semibold text-zinc-900 dark:text-white cursor-pointer hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30"
          >
            <div className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-indigo-500" />
              <span>Work Experience</span>
            </div>
            {activeSection === 'experience' ? <ChevronUp className="h-5 w-5 text-zinc-400" /> : <ChevronDown className="h-5 w-5 text-zinc-400" />}
          </button>
          {activeSection === 'experience' && (
            <div className="border-t border-zinc-100 p-5 dark:border-zinc-900">
              <ExperienceForm
                experience={data.experience}
                onItemChange={(id, f, val) => handleArrayItemChange<Experience>('experience', id, f, val)}
                onAdd={addExperience}
                onRemove={(id) => removeItem('experience', id)}
              />
            </div>
          )}
        </div>

        {/* Skills */}
        <div>
          <button
            type="button"
            onClick={() => toggleSection('skills')}
            className="flex w-full items-center justify-between p-5 text-left font-semibold text-zinc-900 dark:text-white cursor-pointer hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30"
          >
            <div className="flex items-center gap-3">
              <Code className="h-5 w-5 text-indigo-500" />
              <span>Skills</span>
            </div>
            {activeSection === 'skills' ? <ChevronUp className="h-5 w-5 text-zinc-400" /> : <ChevronDown className="h-5 w-5 text-zinc-400" />}
          </button>
          {activeSection === 'skills' && (
            <div className="border-t border-zinc-100 p-5 dark:border-zinc-900">
              <SkillsForm skills={data.skills} onChange={handleSkillsChange} title={data.personalInfo.title} />
            </div>
          )}
        </div>

        {/* Projects */}
        <div>
          <button
            type="button"
            onClick={() => toggleSection('projects')}
            className="flex w-full items-center justify-between p-5 text-left font-semibold text-zinc-900 dark:text-white cursor-pointer hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-indigo-500" />
              <span>Projects</span>
            </div>
            {activeSection === 'projects' ? <ChevronUp className="h-5 w-5 text-zinc-400" /> : <ChevronDown className="h-5 w-5 text-zinc-400" />}
          </button>
          {activeSection === 'projects' && (
            <div className="border-t border-zinc-100 p-5 dark:border-zinc-900">
              <ProjectsForm
                projects={data.projects}
                onItemChange={(id, f, val) => handleArrayItemChange<Project>('projects', id, f, val)}
                onAdd={addProject}
                onRemove={(id) => removeItem('projects', id)}
              />
            </div>
          )}
        </div>

        {/* Education */}
        <div>
          <button
            type="button"
            onClick={() => toggleSection('education')}
            className="flex w-full items-center justify-between p-5 text-left font-semibold text-zinc-900 dark:text-white cursor-pointer hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30"
          >
            <div className="flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-indigo-500" />
              <span>Education</span>
            </div>
            {activeSection === 'education' ? <ChevronUp className="h-5 w-5 text-zinc-400" /> : <ChevronDown className="h-5 w-5 text-zinc-400" />}
          </button>
          {activeSection === 'education' && (
            <div className="border-t border-zinc-100 p-5 dark:border-zinc-900">
              <EducationForm
                education={data.education}
                onItemChange={(id, f, val) => handleArrayItemChange<Education>('education', id, f, val)}
                onAdd={addEducation}
                onRemove={(id) => removeItem('education', id)}
              />
            </div>
          )}
        </div>

        {/* Certifications */}
        <div>
          <button
            type="button"
            onClick={() => toggleSection('certifications')}
            className="flex w-full items-center justify-between p-5 text-left font-semibold text-zinc-900 dark:text-white cursor-pointer hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30"
          >
            <div className="flex items-center gap-3">
              <Award className="h-5 w-5 text-indigo-500" />
              <span>Certifications</span>
            </div>
            {activeSection === 'certifications' ? <ChevronUp className="h-5 w-5 text-zinc-400" /> : <ChevronDown className="h-5 w-5 text-zinc-400" />}
          </button>
          {activeSection === 'certifications' && (
            <div className="border-t border-zinc-100 p-5 dark:border-zinc-900">
              <CertificationsForm
                certifications={data.certifications}
                onItemChange={(id, f, val) => handleArrayItemChange<Certification>('certifications', id, f, val)}
                onAdd={addCertification}
                onRemove={(id) => removeItem('certifications', id)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
