'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import TemplateCard from '../../components/TemplateCard';
import ResumeForm from '../../components/ResumeForm';
import ResumePreview from '../../components/ResumePreview';
import CoverLetterForm from '../../components/CoverLetterForm';
import ATSMetricBar from '../../components/builder/ATSMetricBar';
import { ResumeData } from '../../types/resume';
import { generatePDF } from '../../utils/pdfGenerator';
import { calculateMetrics } from '../../utils/metricsCalculator';
import { 
  FileText, Download, PenTool, LayoutGrid, Eye, User, Mail
} from 'lucide-react';

export default function BuilderPage() {
  const [data, setData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      portfolio: '',
      summary: ''
    },
    education: [],
    experience: [],
    skills: '',
    projects: [],
    certifications: [],
    coverLetter: {
      jobRole: '',
      companyName: '',
      reason: '',
      yearsOfExperience: ''
    },
    selectedTemplate: 'modern'
  });

  const [activeTab, setActiveTab] = useState<'resume' | 'cover-letter'>('resume');
  const [mobileTab, setMobileTab] = useState<'form' | 'preview'>('form');

  // Sync templates gallery URL selection state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const t = params.get('template');
      if (t === 'modern' || t === 'minimal' || t === 'creative') {
        const timer = setTimeout(() => {
          setData(prev => ({ ...prev, selectedTemplate: t }));
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Calculate ATS metrics using the pure utility function
  const { score, completion, insights } = calculateMetrics(data);

  // PDF Generator Handlers with tab switching overlays
  const downloadResume = async () => {
    setActiveTab('resume');
    setTimeout(async () => {
      const cleanName = data.personalInfo.fullName.replace(/\s+/g, '_') || 'My';
      const filename = `${cleanName}_Resume.pdf`;
      await generatePDF('resume-document-content', filename);
    }, 150);
  };

  const downloadCoverLetter = async () => {
    setActiveTab('cover-letter');
    setTimeout(async () => {
      const cleanName = data.personalInfo.fullName.replace(/\s+/g, '_') || 'My';
      const filename = `${cleanName}_CoverLetter.pdf`;
      await generatePDF('cover-letter-document-content', filename);
    }, 150);
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 font-sans">
      <Navbar />

      {/* Main Workspace Dashboard */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        
        {/* Modular ATS and Profile Completion Metric Bar */}
        <ATSMetricBar score={score} completion={completion} insights={insights} />

        {/* Mobile Views Tabs bar */}
        <div className="flex lg:hidden bg-zinc-100 dark:bg-zinc-900 rounded-xl p-1">
          <button
            type="button"
            onClick={() => setMobileTab('form')}
            className={`flex-1 flex justify-center items-center gap-1.5 py-2.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              mobileTab === 'form'
                ? 'bg-white text-zinc-950 shadow-sm dark:bg-zinc-800 dark:text-white'
                : 'text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100'
            }`}
          >
            <PenTool className="h-4 w-4" /> Edit Details
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('preview')}
            className={`flex-1 flex justify-center items-center gap-1.5 py-2.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              mobileTab === 'preview'
                ? 'bg-white text-zinc-950 shadow-sm dark:bg-zinc-800 dark:text-white'
                : 'text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100'
            }`}
          >
            <Eye className="h-4 w-4" /> Live Preview
          </button>
        </div>

        {/* Builder Columns layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column (Forms & Template cards) */}
          <div className={`lg:col-span-6 flex flex-col gap-6 ${mobileTab !== 'form' ? 'hidden lg:flex' : ''}`}>
            
            {/* Template Selection */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/40">
              <h3 className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white border-b border-zinc-100 pb-3 dark:border-zinc-800 mb-4">
                <LayoutGrid className="h-4 w-4 text-indigo-500" />
                <span>Select Resume Template</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <TemplateCard
                  id="modern"
                  name="Modern"
                  description="Clean corporate style."
                  isActive={data.selectedTemplate === 'modern'}
                  onSelect={() => setData({ ...data, selectedTemplate: 'modern' })}
                />
                <TemplateCard
                  id="minimal"
                  name="Minimal"
                  description="Black & white ATS-ready."
                  isActive={data.selectedTemplate === 'minimal'}
                  onSelect={() => setData({ ...data, selectedTemplate: 'minimal' })}
                />
                <TemplateCard
                  id="creative"
                  name="Creative"
                  description="Color accent highlights."
                  isActive={data.selectedTemplate === 'creative'}
                  onSelect={() => setData({ ...data, selectedTemplate: 'creative' })}
                />
              </div>
            </div>

            {/* Editor Forms Tab Selector */}
            <div className="flex border-b border-zinc-200 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => setActiveTab('resume')}
                className={`border-b-2 px-4 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'resume'
                    ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                    : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-850 dark:hover:text-zinc-200'
                }`}
              >
                Resume Details
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('cover-letter')}
                className={`border-b-2 px-4 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'cover-letter'
                    ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                    : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-850 dark:hover:text-zinc-200'
                }`}
              >
                Cover Letter Options
              </button>
            </div>

            {/* Active editing form */}
            <div>
              {activeTab === 'resume' ? (
                <ResumeForm data={data} onChange={setData} />
              ) : (
                <CoverLetterForm data={data} onChange={setData} />
              )}
            </div>
          </div>

          {/* Right Column (Live Document Preview Panel) */}
          <div className={`lg:col-span-6 flex flex-col gap-4 lg:sticky lg:top-24 ${mobileTab !== 'preview' ? 'hidden lg:flex' : ''}`}>
            {/* Preview Box wrapper */}
            <div className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 overflow-hidden shadow-sm">
              <ResumePreview 
                data={data} 
                activeTab={activeTab} 
                setActiveTab={setActiveTab}
              />
            </div>

            {/* Download Buttons Section */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={downloadResume}
                className="flex-1 flex justify-center items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-indigo-500/10 hover:bg-indigo-500 cursor-pointer transition-colors"
              >
                <Download className="h-4 w-4" />
                Download Resume PDF
              </button>
              <button
                type="button"
                onClick={downloadCoverLetter}
                className="flex-1 flex justify-center items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-3 text-xs font-bold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 cursor-pointer transition-colors"
              >
                <FileText className="h-4 w-4" />
                Download Cover Letter PDF
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Assignment Mandatory Footer */}
      <footer className="border-t border-zinc-200 bg-white dark:border-zinc-900 dark:bg-zinc-950 py-8 mt-12 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300">
              <User className="h-3.5 w-3.5 text-indigo-500" />
              <span>Ritesh Chaudhary</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-[11px] text-zinc-600 dark:text-zinc-300">
              <Mail className="h-3 w-3 text-zinc-500 dark:text-zinc-400" />
              <span>riteshchaudhary63430@gmail.com</span>
            </div>
          </div>
          <div>
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg bg-indigo-50 border border-indigo-100 px-4 py-2 text-[11px] font-bold text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:border-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-900/60 transition-all cursor-pointer"
            >
              Built for Digital Heroes
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
