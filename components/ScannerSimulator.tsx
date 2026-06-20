'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Activity, FileText, Upload, RefreshCw, Check, AlertCircle, ArrowRight 
} from 'lucide-react';

export default function ScannerSimulator() {
  const [simFile, setSimFile] = useState<'swe' | 'marketing' | null>(null);
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'complete'>('idle');
  const [scanProgress, setScanProgress] = useState<string>('');

  const handleSimulateScan = (type: 'swe' | 'marketing') => {
    setSimFile(type);
    setScanStatus('scanning');
    setScanProgress('Parsing document structure...');
    
    setTimeout(() => {
      setScanProgress('Calculating keyword match densities...');
    }, 800);
    
    setTimeout(() => {
      setScanProgress('Running semantic formatting analysis...');
    }, 1600);
    
    setTimeout(() => {
      setScanStatus('complete');
    }, 2400);
  };

  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-800 p-8 sm:p-12 overflow-hidden shadow-2xl">
      {/* Ambient background glows */}
      <div className="absolute -right-16 -bottom-16 w-96 h-96 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute -left-16 -top-16 w-96 h-96 rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Simulator Description (Left Column) */}
        <div className="lg:col-span-6 flex flex-col gap-6 text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 text-[10px] font-bold text-indigo-300 uppercase tracking-wider self-start">
            <Activity className="h-3.5 w-3.5 text-indigo-400" />
            Premium Interactive Feature
          </span>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Instant Formatting & ATS Keyword Diagnostic
          </h2>
          
          <p className="text-sm text-zinc-300 leading-relaxed">
            Already have a resume? Run a mock scan using our dynamic parser simulator to extract structural sections, score keyword match metrics, and identify critical optimization leaks.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button
              type="button"
              onClick={() => handleSimulateScan('swe')}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold border transition-all cursor-pointer ${
                simFile === 'swe'
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-350 hover:bg-zinc-850 hover:text-white'
              }`}
            >
              <FileText className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">Demo: Software_Engineer.pdf</span>
            </button>
            <button
              type="button"
              onClick={() => handleSimulateScan('marketing')}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold border transition-all cursor-pointer ${
                simFile === 'marketing'
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-350 hover:bg-zinc-850 hover:text-white'
              }`}
            >
              <FileText className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">Demo: Marketing_Manager.docx</span>
            </button>
          </div>
          
          <div className="pt-2">
            <Link
              href="/analyzer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-white px-5 py-3 text-xs font-bold text-zinc-950 hover:bg-zinc-100 transition-colors shadow-lg cursor-pointer"
            >
              <span>Analyze Your Custom Resume</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Simulator Action Panel (Right Column) */}
        <div className="lg:col-span-6 w-full flex justify-center">
          <div className="w-full max-w-md bg-zinc-950/60 border border-zinc-800/80 rounded-2xl shadow-xl p-5 min-h-[300px] flex flex-col justify-between relative overflow-hidden backdrop-blur-md">
            
            {/* Scanner line animation overlay */}
            {scanStatus === 'scanning' && (
              <div className="absolute inset-x-0 w-full h-1 bg-gradient-to-r from-violet-500 via-indigo-400 to-emerald-400 shadow-md shadow-indigo-500/80 scanner-line z-20 pointer-events-none" />
            )}

            {/* Top Bar inside diagnostic widget */}
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">ATS Diagnostic Simulator</span>
              <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            </div>

            {/* Dynamic Content States */}
            {scanStatus === 'idle' && (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-8">
                <div className="h-12 w-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
                  <Upload className="h-5 w-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-bold text-zinc-300">No Document Selected</p>
                  <p className="text-[10px] text-zinc-500 max-w-[240px]">
                    Select a sample candidate document profile on the left to instantiate structural parsing.
                  </p>
                </div>
              </div>
            )}

            {scanStatus === 'scanning' && (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-8">
                <div className="animate-spin text-indigo-400">
                  <RefreshCw className="h-8 w-8 stroke-[2.5]" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-bold text-zinc-300">Scanning File Structure...</p>
                  <p className="text-[10px] text-indigo-400 font-semibold">{scanProgress}</p>
                </div>
              </div>
            )}

            {scanStatus === 'complete' && simFile === 'swe' && (
              <div className="flex-1 flex flex-col gap-4 py-3 transition-all duration-300">
                <div className="flex items-center justify-between bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/80">
                  <div className="flex items-center gap-2.5">
                    <div className="relative flex items-center justify-center shrink-0">
                      <svg className="w-12 h-12 transform -rotate-90">
                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-zinc-800" />
                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" fill="transparent" strokeDasharray={2 * Math.PI * 20} strokeDashoffset={2 * Math.PI * 20 * 0.12} className="text-indigo-400" />
                      </svg>
                      <span className="absolute text-[9px] font-black text-white">88%</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Software_Engineer.pdf</h4>
                      <p className="text-[8px] text-zinc-400 mt-0.5">Contact, skills, and projects detected</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-indigo-950/60 text-indigo-300 border border-indigo-900/50">Good ✨</span>
                </div>

                <div className="flex flex-col gap-2 bg-zinc-900/30 p-3 rounded-xl border border-zinc-850">
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">Diagnostic Summary:</span>
                  <div className="flex flex-col gap-1.5 mt-0.5">
                    <div className="flex items-start gap-2 text-[10px] text-zinc-300">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Linked GitHub profile adds keyword context (+5 ATS pts).</span>
                    </div>
                    <div className="flex items-start gap-2 text-[10px] text-zinc-300">
                      <AlertCircle className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>Warning: Summary is missing core technical tools. Add React/TypeScript tags.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {scanStatus === 'complete' && simFile === 'marketing' && (
              <div className="flex-1 flex flex-col gap-4 py-3 transition-all duration-300">
                <div className="flex items-center justify-between bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/80">
                  <div className="flex items-center gap-2.5">
                    <div className="relative flex items-center justify-center shrink-0">
                      <svg className="w-12 h-12 transform -rotate-90">
                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-zinc-800" />
                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" fill="transparent" strokeDasharray={2 * Math.PI * 20} strokeDashoffset={2 * Math.PI * 20 * 0.08} className="text-emerald-400" />
                      </svg>
                      <span className="absolute text-[9px] font-black text-white">92%</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Marketing_Manager.docx</h4>
                      <p className="text-[8px] text-zinc-400 mt-0.5">Classic ATS layout structure</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-900/50">Strong 🟢</span>
                </div>

                <div className="flex flex-col gap-2 bg-zinc-900/30 p-3 rounded-xl border border-zinc-850">
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">Diagnostic Summary:</span>
                  <div className="flex flex-col gap-1.5 mt-0.5">
                    <div className="flex items-start gap-2 text-[10px] text-zinc-300">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Action verbs like &quot;Managed&quot; &amp; &quot;Increased&quot; are well density-scored.</span>
                    </div>
                    <div className="flex items-start gap-2 text-[10px] text-zinc-300">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Classic single-column format is easily readable by parser machines.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reset/CTA bottom button */}
            {scanStatus === 'complete' && (
              <button
                type="button"
                onClick={() => setScanStatus('idle')}
                className="w-full mt-2 inline-flex items-center justify-center gap-1 border border-zinc-800 rounded-xl bg-zinc-900 px-4 py-2.5 text-xs font-bold text-zinc-300 hover:text-white hover:bg-zinc-850 transition-colors cursor-pointer"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Simulate Another File</span>
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Inline styles for custom simulator scanning animation */}
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          50% { transform: translateY(220px); }
          100% { transform: translateY(0); }
        }
        .scanner-line {
          animation: scan 2.4s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
