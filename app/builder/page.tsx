'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import TemplateCard from '../../components/TemplateCard';
import ResumeForm from '../../components/ResumeForm';
import ResumePreview from '../../components/ResumePreview';
import { 
  FileText, Download, PenTool, LayoutGrid, Eye, User, Mail, AlertCircle, CheckCircle
} from 'lucide-react';
import GitHubImportCard from '../../components/builder/GitHubImportCard';
import RepoSelectorModal from '../../components/builder/RepoSelectorModal';
import { ResumeData, GitHubRepo, GitHubProfile } from '../../types/resume';
import { generatePDF } from '../../utils/pdfGenerator';
import { calculateMetrics } from '../../utils/metricsCalculator';
import ATSMetricBar from '../../components/builder/ATSMetricBar';
import { generateDocxResume } from '../../utils/docxGenerator';

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

  const [mobileTab, setMobileTab] = useState<'form' | 'preview'>('form');
  const [isImporting, setIsImporting] = useState(false);
  const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  // Repository Selector States
  const [selectorRepos, setSelectorRepos] = useState<GitHubRepo[]>([]);
  const [selectorProfile, setSelectorProfile] = useState<GitHubProfile | null>(null);
  const [selectorToken, setSelectorToken] = useState<string | undefined>(undefined);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  // Handle GitHub OAuth callback redirection on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      if (code) {
        // Clear code from URL search parameters immediately to maintain clean browser URL
        const cleanUrl = window.location.pathname + window.location.search.replace(/[?&]code=[^&]+/, '').replace(/^&/, '?');
        window.history.replaceState({}, document.title, cleanUrl);

        const runImport = async () => {
          setIsImporting(true);
          setImportStatus(null);
          try {
            const response = await fetch('/api/github/import', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                code,
                redirectUri: window.location.origin + '/builder',
              }),
            });

            const result = await response.json();
            if (!response.ok) {
              throw new Error(result.error || 'Failed to import GitHub details.');
            }

            if (result.step === 'select_repos') {
              setSelectorRepos(result.repos);
              setSelectorProfile(result.profile);
              setSelectorToken(result.accessToken);
              setIsSelectorOpen(true);
              setImportStatus({
                type: 'success',
                message: 'Successfully connected GitHub! Please select projects from the modal.',
              });
            } else {
              setData((prev) => ({
                ...prev,
                ...result.data,
                selectedTemplate: prev.selectedTemplate,
              }));
              setImportStatus({
                type: 'success',
                message: result.isDemo
                  ? result.message || 'Imported! (Generated using offline heuristics)'
                  : 'Successfully authenticated with GitHub and generated resume!',
              });
            }
          } catch (err: unknown) {
            setImportStatus({
              type: 'error',
              message: err instanceof Error ? err.message : 'Failed to exchange credentials with GitHub.',
            });
          } finally {
            setIsImporting(false);
          }
        };

        runImport();
      }
    }
  }, []);

  // Auto-dismiss page level toasts
  useEffect(() => {
    if (importStatus) {
      const timer = setTimeout(() => setImportStatus(null), 7000);
      return () => clearTimeout(timer);
    }
  }, [importStatus]);

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

  // PDF & DOCX Generator Handlers
  const downloadResume = async () => {
    const cleanName = data.personalInfo.fullName.replace(/\s+/g, '_') || 'My';
    const filename = `${cleanName}_Resume.pdf`;
    await generatePDF('resume-document-content', filename);
  };

  const downloadResumeDocx = () => {
    const cleanName = data.personalInfo.fullName.replace(/\s+/g, '_') || 'My';
    const filename = `${cleanName}_Resume.doc`;
    generateDocxResume(data, filename);
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
            
            {/* GitHub-Powered Resume Generator widget */}
            <GitHubImportCard
              onImportSuccess={(importedData, isDemo, demoMsg) => {
                setData((prev) => ({
                  ...prev,
                  ...importedData,
                  selectedTemplate: prev.selectedTemplate,
                }));
                setImportStatus({
                  type: 'success',
                  message: isDemo
                    ? demoMsg || 'Imported! (Generated using offline heuristics)'
                    : 'Successfully generated resume from GitHub profile!',
                });
              }}
              onImportError={(errMsg) => {
                setImportStatus({
                  type: 'error',
                  message: errMsg,
                });
              }}
              onSelectRepos={(repos, profile, token) => {
                setSelectorRepos(repos);
                setSelectorProfile(profile);
                setSelectorToken(token);
                setIsSelectorOpen(true);
              }}
              isImporting={isImporting}
              setIsImporting={setIsImporting}
            />

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

            {/* Active editing form */}
            <div>
              <ResumeForm data={data} onChange={setData} />
            </div>
          </div>

          {/* Right Column (Live Document Preview Panel) */}
          <div className={`lg:col-span-6 flex flex-col gap-4 lg:sticky lg:top-24 ${mobileTab !== 'preview' ? 'hidden lg:flex' : ''}`}>
            {/* Preview Box wrapper */}
            <div className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 overflow-hidden shadow-sm">
              <ResumePreview data={data} />
            </div>

            {/* Download Buttons Section */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={downloadResume}
                className="flex-1 flex justify-center items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-xs font-bold text-white shadow-md hover:bg-indigo-500 cursor-pointer transition-colors"
              >
                <Download className="h-4.5 w-4.5" />
                <span>Resume PDF</span>
              </button>
              <button
                type="button"
                onClick={downloadResumeDocx}
                className="flex-1 flex justify-center items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white shadow-md hover:bg-emerald-550 cursor-pointer transition-colors"
              >
                <FileText className="h-4.5 w-4.5" />
                <span>Resume DOCX (Word)</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Global Page-level Toasts */}
      {importStatus && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-start gap-3 rounded-xl border p-4 text-xs font-semibold shadow-2xl animate-in slide-in-from-bottom duration-300 max-w-sm ${
            importStatus.type === 'success'
              ? 'border-emerald-100 bg-emerald-50 text-emerald-800 dark:border-emerald-950/30 dark:bg-emerald-950/70 dark:text-emerald-300'
              : 'border-rose-100 bg-rose-50 text-rose-800 dark:border-rose-950/30 dark:bg-rose-950/70 dark:text-rose-300'
          }`}
        >
          {importStatus.type === 'success' ? (
            <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
          )}
          <div className="flex-1 leading-normal">
            {importStatus.message}
          </div>
          <button
            type="button"
            onClick={() => setImportStatus(null)}
            className="text-[10px] uppercase font-bold hover:underline cursor-pointer ml-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Repository Selector Modal overlay */}
      <RepoSelectorModal
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        repos={selectorRepos}
        profile={selectorProfile}
        accessToken={selectorToken}
        onGenerateSuccess={(importedData, isDemo, demoMsg) => {
          setData((prev) => ({
            ...prev,
            ...importedData,
            selectedTemplate: prev.selectedTemplate,
          }));
          setImportStatus({
            type: 'success',
            message: isDemo
              ? demoMsg || 'Imported! (Generated using offline heuristics)'
              : 'Successfully generated resume from GitHub profile selection!',
          });
        }}
        onGenerateError={(errMsg) => {
          setImportStatus({
            type: 'error',
            message: errMsg,
          });
        }}
      />

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
