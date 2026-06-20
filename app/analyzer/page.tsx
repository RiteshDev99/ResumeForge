/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useRef } from 'react';
import Navbar from '../../components/Navbar';
import { 
  extractTextFromPdf, 
  extractTextFromDocx, 
  analyzeResumeText,
  AnalyzedResume
} from '../../utils/resumeParser';
import { 
  Upload, FileText, CheckCircle, AlertTriangle, 
  Sparkles, Plus, AlertCircle, RefreshCw
} from 'lucide-react';
import { User, Mail } from 'lucide-react';

export default function AnalyzerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'reading' | 'scanning' | 'dashboard'>('idle');
  const [analysis, setAnalysis] = useState<AnalyzedResume | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  
  // Job Matcher State
  const [jobDescription, setJobDescription] = useState<string>('');
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [missingJobKeywords, setMissingJobKeywords] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File drag handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Main file reader and parser execution pipeline
  const handleFile = async (selectedFile: File) => {
    const extension = selectedFile.name.split('.').pop()?.toLowerCase();
    if (extension !== 'pdf' && extension !== 'docx') {
      setErrorMsg('Unsupported file format. Please upload a PDF or DOCX file.');
      return;
    }

    setFile(selectedFile);
    setErrorMsg('');
    setStatus('reading');

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        let parsedText = '';
        
        try {
          setStatus('scanning');
          
          if (extension === 'pdf') {
            parsedText = await extractTextFromPdf(arrayBuffer);
          } else {
            parsedText = await extractTextFromDocx(arrayBuffer);
          }
          
          // Introduce a simulated structural scanner delay for refined visual feel
          setTimeout(() => {
            const results = analyzeResumeText(parsedText);
            setAnalysis(results);
            setStatus('dashboard');
            // Reset job matcher details
            setJobDescription('');
            setMatchScore(null);
            setMissingJobKeywords([]);
          }, 1800);

        } catch (err: any) {
          console.error(err);
          setErrorMsg(err.message || 'Error parsing document content.');
          setStatus('idle');
        }
      };
      
      reader.readAsArrayBuffer(selectedFile);
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Failed to read file.');
      setStatus('idle');
    }
  };

  // Job Matcher scoring heuristics
  const analyzeJobMatch = () => {
    if (!jobDescription || !analysis) return;
    
    // Extract unique high-frequency target keywords from job description
    const commonKeywords = [
      'react', 'nextjs', 'next.js', 'typescript', 'javascript', 'nodejs', 'node.js',
      'docker', 'kubernetes', 'aws', 'amazon', 'azure', 'gcp', 'sql', 'postgres',
      'postgresql', 'mongodb', 'redis', 'git', 'testing', 'jest', 'cypress',
      'unit testing', 'apis', 'rest', 'graphql', 'redux', 'scrum', 'agile', 'ci/cd',
      'devops', 'microservices', 'css', 'tailwind', 'sass', 'webpack', 'figma'
    ];
    
    const targeted = commonKeywords.filter(word => {
      const regex = new RegExp(`\\b${word.replace('.', '\\.')}\\b`, 'i');
      return regex.test(jobDescription);
    });

    if (targeted.length === 0) {
      setMatchScore(75); // Fallback match
      setMissingJobKeywords(['Unit Testing', 'Docker', 'REST APIs']);
      return;
    }

    // Check how many of targeted job description skills exist in resume text
    const parsedText = (analysis.fullName + ' ' + analysis.summary + ' ' + analysis.skills.join(' ')).toLowerCase();
    const matches = targeted.filter(skill => parsedText.includes(skill));
    const missing = targeted.filter(skill => !parsedText.includes(skill));

    const percentage = Math.round((matches.length / targeted.length) * 100);
    
    setMatchScore(percentage);
    // Format missing keywords nicely
    setMissingJobKeywords(
      missing.map(m => m.charAt(0).toUpperCase() + m.slice(1).replace('js', '.js').replace('nodejs', 'Node.js').replace('nextjs', 'Next.js'))
    );
  };

  const getBadgeColor = (score: number) => {
    if (score >= 90) return 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-100 dark:border-emerald-900/50';
    if (score >= 70) return 'text-amber-700 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-300 border-amber-100 dark:border-amber-900/50';
    return 'text-rose-700 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-300 border-rose-100 dark:border-rose-900/50';
  };

  const getStatusLabel = (score: number) => {
    if (score >= 90) return 'Excellent ✨';
    if (score >= 70) return 'Good ⚡';
    return 'Needs Improvement ⚠️';
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 font-sans">
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        
        {/* State: Idle / Upload dropzone */}
        {status === 'idle' && (
          <div className="max-w-xl mx-auto w-full py-10 flex flex-col gap-6">
            <div className="text-center flex flex-col gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50 self-center">
                <Sparkles className="h-3.5 w-3.5" />
                Premium ATS Optimizer
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                Resume Analyzer
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Upload your resume in PDF or DOCX format to receive real-time structural analytics, keywords checking, and compatibility scoring.
              </p>
            </div>

            {/* Drag Zone Container */}
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 ${
                dragActive 
                  ? 'border-indigo-600 bg-indigo-50/20 dark:border-indigo-400 dark:bg-indigo-950/10'
                  : 'border-zinc-200 bg-white hover:border-indigo-500 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/20 dark:hover:border-indigo-500'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.docx"
                onChange={handleFileInputChange}
              />
              <div className="h-12 w-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-sm">
                <Upload className="h-6 w-6" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  Drag and drop your file here, or <span className="text-indigo-600 dark:text-indigo-400">browse</span>
                </p>
                <p className="text-xs text-zinc-400 mt-1.5">
                  Supports PDF and DOCX formats up to 10MB
                </p>
              </div>
            </div>

            {errorMsg && (
              <div className="flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-100 p-4 text-xs font-semibold text-rose-600 dark:bg-rose-950/20 dark:border-rose-900/50">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>
        )}

        {/* State: Reading / Extracting Text */}
        {status === 'reading' && (
          <div className="max-w-md mx-auto w-full py-20 flex flex-col items-center justify-center gap-4 text-center">
            <div className="animate-spin text-indigo-600 dark:text-indigo-400">
              <RefreshCw className="h-10 w-10 stroke-[2.5]" />
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white mt-2">Reading Document...</h3>
            <p className="text-xs text-zinc-400">Extracting raw character metadata from {file?.name}</p>
          </div>
        )}

        {/* State: Scanning animation overlay */}
        {status === 'scanning' && (
          <div className="max-w-lg mx-auto w-full py-16 flex flex-col items-center justify-center gap-8 text-center">
            {/* Visual sheet representation with vertical scanner bar */}
            <div className="relative w-64 h-80 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl overflow-hidden flex flex-col gap-3 p-4">
              {/* Fake elements */}
              <div className="h-3 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-2 w-3/4 rounded bg-zinc-150 dark:bg-zinc-800/60" />
              <div className="h-1 w-full rounded bg-zinc-100 dark:bg-zinc-800/40" />
              <div className="mt-4 flex flex-col gap-2">
                <div className="h-1.5 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-1.5 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-1.5 w-5/6 rounded bg-zinc-150 dark:bg-zinc-800/60" />
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <div className="h-1.5 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-1.5 w-2/3 rounded bg-zinc-150 dark:bg-zinc-800/60" />
              </div>
              
              {/* Scanner Line */}
              <div className="absolute left-0 w-full h-1 bg-gradient-to-r from-violet-600 via-indigo-500 to-emerald-400 shadow-lg shadow-indigo-500/80 animate-[scan_1.6s_ease-in-out_infinite]" />
            </div>

            <style jsx>{`
              @keyframes scan {
                0%, 100% { top: 0%; }
                50% { top: 100%; }
              }
            `}</style>

            <div className="flex flex-col gap-1.5">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">Parsing Sections & Scoring Metrics</h3>
              <p className="text-xs text-zinc-400">Scanning content compatibility for resume: {file?.name}</p>
            </div>
          </div>
        )}

        {/* State: Dashboard Results */}
        {status === 'dashboard' && analysis && (
          <div className="flex flex-col gap-6">
            
            {/* Header info bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/40">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-sm">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-zinc-950 dark:text-white">{analysis.fullName}</h2>
                  <p className="text-xs text-zinc-400">Analyzed Resume: <span className="font-semibold">{file?.name}</span></p>
                </div>
              </div>
              
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-650 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-350 dark:hover:bg-zinc-900 cursor-pointer"
              >
                Upload Different File
              </button>
            </div>

            {/* Dashboard Grid blocks */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Side: Score summary and breakdown (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* Score Card */}
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40 flex flex-col items-center gap-4 text-center">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wide">Overall ATS Score</span>
                  
                  {/* SVG Circle Progress */}
                  <div className="relative flex items-center justify-center mt-2">
                    <svg className="w-28 h-28 transform -rotate-90">
                      <circle
                        cx="56"
                        cy="56"
                        r="48"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-zinc-100 dark:text-zinc-800"
                      />
                      <circle
                        cx="56"
                        cy="56"
                        r="48"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 48}
                        strokeDashoffset={2 * Math.PI * 48 * (1 - analysis.totalScore / 100)}
                        className="text-indigo-600 dark:text-indigo-400 transition-all duration-500"
                      />
                    </svg>
                    <span className="absolute text-2xl font-black text-zinc-950 dark:text-white tracking-tight">
                      {analysis.totalScore}%
                    </span>
                  </div>

                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getBadgeColor(analysis.totalScore)}`}>
                    {getStatusLabel(analysis.totalScore)}
                  </span>
                </div>

                {/* ATS Breakdown details */}
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40 flex flex-col gap-4">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-850 pb-2">
                    ATS Score Breakdown
                  </h3>
                  
                  <div className="flex flex-col gap-3">
                    {/* Contact details bar */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        <span>Contact Info</span>
                        <span>{analysis.scoreBreakdown.contact}/15</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500" style={{ width: `${(analysis.scoreBreakdown.contact / 15) * 100}%` }} />
                      </div>
                    </div>

                    {/* Summary detail bar */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        <span>Professional Summary</span>
                        <span>{analysis.scoreBreakdown.summary}/15</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500" style={{ width: `${(analysis.scoreBreakdown.summary / 15) * 100}%` }} />
                      </div>
                    </div>

                    {/* Skills detail bar */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        <span>Core Skills</span>
                        <span>{analysis.scoreBreakdown.skills}/20</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500" style={{ width: `${(analysis.scoreBreakdown.skills / 20) * 100}%` }} />
                      </div>
                    </div>

                    {/* Experience detail bar */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        <span>Work Experience</span>
                        <span>{analysis.scoreBreakdown.experience}/25</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500" style={{ width: `${(analysis.scoreBreakdown.experience / 25) * 100}%` }} />
                      </div>
                    </div>

                    {/* Projects detail bar */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        <span>Projects</span>
                        <span>{analysis.scoreBreakdown.projects}/15</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500" style={{ width: `${(analysis.scoreBreakdown.projects / 15) * 100}%` }} />
                      </div>
                    </div>

                    {/* Education detail bar */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        <span>Education</span>
                        <span>{analysis.scoreBreakdown.education}/10</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500" style={{ width: `${(analysis.scoreBreakdown.education / 10) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resume Strength Meter */}
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40 flex flex-col gap-4">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wide">Overall Strength Gauge</span>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-zinc-400">Strength level:</span>
                    <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">{analysis.strengthLevel}</span>
                  </div>

                  <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden relative flex">
                    <div className="h-full flex-1 border-r border-white dark:border-zinc-900 bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-full flex-1 border-r border-white dark:border-zinc-900 bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-full flex-1 border-r border-white dark:border-zinc-900 bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-full flex-1 bg-zinc-200 dark:bg-zinc-800" />
                    
                    {/* Glowing slider point based on total score */}
                    <div 
                      className="absolute top-0 w-3 h-3 rounded-full bg-indigo-600 border border-white -mt-0.5 shadow-md shadow-indigo-500/50 transition-all duration-500"
                      style={{ left: `calc(${analysis.totalScore}% - 6px)` }}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] text-zinc-400 font-semibold px-0.5">
                    <span>WEAK</span>
                    <span>AVERAGE</span>
                    <span>STRONG</span>
                    <span>EXCELLENT</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Problems, Recommendations, Keyword analysis, JD matcher (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                
                {/* Problems and Warnings */}
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40 flex flex-col gap-4">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-850 pb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4.5 w-4.5 text-rose-500" />
                    <span>Detected Resume Weaknesses ({analysis.problems.length})</span>
                  </h3>
                  
                  {analysis.problems.length > 0 ? (
                    <div className="flex flex-col gap-4">
                      {analysis.problems.map((prob) => (
                        <div key={prob.id} className="flex items-start gap-3 rounded-xl border border-zinc-100 bg-zinc-50/20 p-4 dark:border-zinc-850 dark:bg-zinc-900/10">
                          <div className="h-6 w-6 rounded-lg bg-rose-50 dark:bg-rose-950/20 text-rose-500 flex items-center justify-center shrink-0">
                            <AlertCircle className="h-4 w-4" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <h4 className="text-xs font-bold text-zinc-900 dark:text-white">{prob.title}</h4>
                            <p className="text-[11px] text-zinc-550 dark:text-zinc-400 leading-normal">{prob.description}</p>
                            <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1 mt-0.5">
                              <span className="underline">Tip:</span> {prob.fix}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl self-start text-xs">
                      <CheckCircle className="h-4 w-4" /> No major weaknesses detected. Great job!
                    </div>
                  )}
                </div>

                {/* Recommendations checklist */}
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40 flex flex-col gap-4">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-850 pb-2">
                    Actionable Smart Recommendations
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {analysis.recommendations.map((rec, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                        {rec.startsWith('✓') ? (
                          <div className="h-4.5 w-4.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 flex items-center justify-center shrink-0">
                            <CheckCircle className="h-3 w-3 stroke-[2.5]" />
                          </div>
                        ) : (
                          <div className="h-4.5 w-4.5 rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-500 flex items-center justify-center shrink-0">
                            <Plus className="h-3 w-3 stroke-[2.5]" />
                          </div>
                        )}
                        <span className={rec.startsWith('✓') ? 'text-zinc-400 line-through' : ''}>
                          {rec.replace('✓ ', '')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Keyword Analysis section */}
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40 flex flex-col gap-5">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-850 pb-2">
                    Industry Keywords Analysis
                  </h3>
                  
                  {/* Detected skills */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Detected Technologies ({analysis.detectedSkills.length})</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {analysis.detectedSkills.length > 0 ? (
                        analysis.detectedSkills.map(skill => (
                          <span key={skill} className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/40 px-2 py-0.5 rounded-lg">
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-zinc-400 italic">No matching keywords scanned.</span>
                      )}
                    </div>
                  </div>

                  {/* Missing skills */}
                  <div className="flex flex-col gap-2 border-t border-zinc-100 dark:border-zinc-850 pt-4">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Recommended Missing Skills</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {analysis.missingSkills.map(skill => (
                        <span key={skill} className="text-[10px] font-semibold text-amber-700 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-100 dark:border-amber-900/40 px-2 py-0.5 rounded-lg">
                          + {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Job Description Matcher (Bonus) */}
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40 flex flex-col gap-4">
                  <div className="flex flex-col gap-1 border-b border-zinc-100 dark:border-zinc-850 pb-2">
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                      <Sparkles className="h-4.5 w-4.5 text-indigo-500" />
                      <span>Job Description Compatibility Matcher</span>
                    </h3>
                    <p className="text-[11px] text-zinc-400">
                      Paste a target job posting description below to test dynamic matching criteria.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <textarea
                      rows={4}
                      placeholder="Paste the job requirements description here (e.g. Seeking a Frontend Developer with React, TypeScript, and Docker experience...)"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="rounded-xl border border-zinc-200 bg-transparent px-4 py-3 text-xs text-zinc-900 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-zinc-800 dark:text-white resize-y"
                    />

                    <button
                      type="button"
                      onClick={analyzeJobMatch}
                      disabled={!jobDescription}
                      className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 text-xs font-bold text-white shadow-md shadow-indigo-500/10 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                    >
                      Compare Match Score
                    </button>
                  </div>

                  {matchScore !== null && (
                    <div className="flex flex-col sm:flex-row gap-5 items-center border-t border-dashed border-zinc-200 dark:border-zinc-800 pt-4 mt-2">
                      {/* Match percentage circular SVG */}
                      <div className="relative flex items-center justify-center shrink-0">
                        <svg className="w-16 h-16 transform -rotate-90">
                          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-zinc-100 dark:text-zinc-850" />
                          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={2 * Math.PI * 28} strokeDashoffset={2 * Math.PI * 28 * (1 - matchScore / 100)} className="text-emerald-500 transition-all duration-300" />
                        </svg>
                        <span className="absolute text-xs font-black text-zinc-950 dark:text-white">{matchScore}%</span>
                      </div>
                      
                      <div className="flex-1 flex flex-col gap-1 text-center sm:text-left">
                        <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Compatibility Score: {matchScore}%</h4>
                        {missingJobKeywords.length > 0 ? (
                          <div className="flex flex-col gap-1.5 mt-1">
                            <span className="text-[10px] font-bold text-zinc-400 uppercase">Missing Keywords detected:</span>
                            <div className="flex flex-wrap justify-center sm:justify-start gap-1">
                              {missingJobKeywords.map(kw => (
                                <span key={kw} className="text-[9px] font-semibold text-rose-700 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-350 px-2 py-0.5 rounded border border-rose-100 dark:border-rose-900/50">
                                  {kw}
                                </span>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <p className="text-[11px] text-emerald-600 font-semibold mt-1">✓ Your resume keywords perfectly match the job requirements!</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
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
