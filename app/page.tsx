'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import HeroMockup from '../components/HeroMockup';
import ScannerSimulator from '../components/ScannerSimulator';
import TemplateShowcase from '../components/TemplateShowcase';
import { 
  Sparkles, LayoutGrid, Send, ShieldCheck, Mail, User, 
  ArrowRight, ArrowUpRight
} from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* Decorative Grid Background and Glow Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none -z-10" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Shared Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 flex flex-col gap-24 py-12">
        
        {/* Section 1: Hero split screen */}
        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
          
          {/* Left Column - Copy details */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50/80 px-4 py-1.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-100/80 dark:border-indigo-900/50 self-start shadow-sm backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500 animate-pulse" />
              <span>100% Client-Side. No Sign-ups Required.</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.08]">
              Forge Resumes Built for <br />
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-emerald-400">
                Career Acceleration
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-650 dark:text-zinc-300 max-w-2xl leading-relaxed">
              Create recruiter-approved, ATS-friendly resumes and cover letters in minutes. Analyze formatting weaknesses, score keywords, and generate custom designs instantly.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
              <Link
                href="/builder"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-500 hover:to-violet-500 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Start Building Now</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/analyzer"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white/80 px-8 py-4 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:bg-zinc-850/80 transition-all shadow-sm backdrop-blur-sm cursor-pointer"
              >
                <span>Analyze Existing Resume</span>
              </Link>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-6 border-t border-zinc-200 dark:border-zinc-800/80 pt-8 mt-4">
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-extrabold text-zinc-950 dark:text-white tracking-tight">100%</span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider">Free & Secure</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-extrabold text-zinc-950 dark:text-white tracking-tight">ATS-Ready</span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider">Templates</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-extrabold text-zinc-950 dark:text-white tracking-tight">0 Sec</span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider">Account Setup</span>
              </div>
            </div>
          </div>

          {/* Right Column - Hero mockup widget */}
          <div className="lg:col-span-5 relative w-full flex justify-center">
            <HeroMockup />
          </div>
        </section>

        {/* Section 2: Features Cards Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full border-t border-zinc-200 dark:border-zinc-900">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              Engineered for Technical Roles
            </h2>
            <p className="mt-4 text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Bypass applicant tracking algorithms and capture the attention of hiring managers with formats tailored specifically for readability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="group relative rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/0 via-indigo-500/0 to-indigo-500/[0.02] group-hover:to-indigo-500/[0.04] transition-all" />
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 shadow-sm shrink-0">
                <LayoutGrid className="h-5 w-5" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-bold text-zinc-950 dark:text-white">Three Custom Layout Formats</h3>
                <p className="text-xs text-zinc-650 dark:text-zinc-300 leading-relaxed">
                  Choose between Modern (elegant corporate style), Minimal (classic black & white), or Creative templates based on your target role.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/0 via-emerald-500/0 to-emerald-500/[0.02] group-hover:to-emerald-500/[0.04] transition-all" />
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 shadow-sm shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-bold text-zinc-950 dark:text-white">Live Structural Diagnostic</h3>
                <p className="text-xs text-zinc-650 dark:text-zinc-300 leading-relaxed">
                  Monitor profile completion metrics in real-time. Follow builder insights directly to improve section values before exporting.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-violet-500/0 via-violet-500/0 to-violet-500/[0.02] group-hover:to-violet-500/[0.04] transition-all" />
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400 shadow-sm shrink-0">
                <Send className="h-5 w-5" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-bold text-zinc-950 dark:text-white">Matching Cover Letter</h3>
                <p className="text-xs text-zinc-650 dark:text-zinc-300 leading-relaxed">
                  Automatically generate customized cover letters that match your chosen resume header, creating a cohesive professional package.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Interactive Scanner Diagnostic Simulator */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <ScannerSimulator />
        </section>

        {/* Section 4: Templates gallery quick-start */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full border-t border-zinc-200 dark:border-zinc-900">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              Sleek Recruit-Ready Formats
            </h2>
            <p className="mt-4 text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Select an optimized design template below to instantiate your builder workspace immediately.
            </p>
          </div>

          <TemplateShowcase />
        </section>
      </main>

      {/* Footer Section */}
      <footer className="border-t border-zinc-200 bg-white dark:border-zinc-900 dark:bg-zinc-950 py-12 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Credits info */}
          <div className="flex flex-col gap-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-sm font-bold text-zinc-800 dark:text-zinc-200">
              <User className="h-4 w-4 text-indigo-500" />
              <span>Ritesh Chaudhary</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-zinc-650 dark:text-zinc-350">
              <Mail className="h-3.5 w-3.5 text-zinc-500 dark:text-indigo-400" />
              <span>riteshchaudhary63430@gmail.com</span>
            </div>
          </div>

          {/* Copy info */}
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} ResumeForge. All rights reserved.
          </div>

          {/* Built for Digital Heroes CTA */}
          <div>
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-50 border border-indigo-100 hover:border-indigo-500/30 px-5 py-2.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:border-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-900/60 transition-all cursor-pointer shadow-sm"
            >
              <span>Built for Digital Heroes</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
