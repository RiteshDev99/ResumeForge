import React from 'react';
import Link from 'next/link';
import { 
  FileSpreadsheet, Sparkles, LayoutGrid, 
  Send, ShieldCheck, Mail, User
} from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans">
      {/* Top Header/Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/70 backdrop-blur-md dark:border-zinc-900/80 dark:bg-zinc-950/70">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-500/20">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <span className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-indigo-600 bg-clip-text text-xl font-bold tracking-tight text-transparent dark:from-white dark:via-zinc-200 dark:to-indigo-400">
              ResumeForge
            </span>
          </div>
          <Link
            href="/builder"
            className="rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 transition-colors"
          >
            Create Resume
          </Link>
        </div>
      </header>

      {/* Main hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Decorative background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center py-20 sm:py-24">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50 mb-6">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            No sign-ups required. 100% Free & client-side.
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.1] mb-6">
            Build Your Resume <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-500 bg-clip-text text-transparent">
              in Minutes
            </span>
          </h1>

          <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Create ATS-friendly resumes and professional cover letters in minutes. Check your scores, get tailored recommendations, and export high-fidelity PDFs instantly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/builder"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-500 hover:to-violet-500 transition-all hover:scale-[1.02] cursor-pointer"
            >
              Create Resume
            </Link>
            <a
              href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-7 py-4 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-850 transition-all"
            >
              Explore Features
            </a>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="max-w-7xl mx-auto py-16 sm:py-24 border-t border-zinc-200 dark:border-zinc-900 w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Engineered for Career Acceleration
            </h2>
            <p className="mt-4 text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
              Everything you need to bypass applicant tracking filters and impress technical recruiters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-900 dark:bg-zinc-950 hover:shadow-md transition-shadow">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 mb-4">
                <LayoutGrid className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Three Dynamic Templates</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Choose between Modern (elegant corporate style), Minimal (black & white ATS-optimized), and Creative (color accent blocks) layouts depending on your industry.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-900 dark:bg-zinc-950 hover:shadow-md transition-shadow">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">ATS Score Checker</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Check profile completeness in real-time. Follow actionable builder recommendations to optimize for parsing metrics and maximize hiring potential.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-900 dark:bg-zinc-950 hover:shadow-md transition-shadow">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 mb-4">
                <Send className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Cover Letter Generator</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Input your targeted role and company details to generate complete, high-quality cover letters matching your letterhead layout without external AI latency.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="border-t border-zinc-200 bg-white dark:border-zinc-900 dark:bg-zinc-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Credits info */}
          <div className="flex flex-col gap-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-sm font-bold text-zinc-800 dark:text-zinc-200">
              <User className="h-4 w-4 text-indigo-500" />
              <span>Ritesh Chaudhary</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <Mail className="h-3.5 w-3.5 text-zinc-400" />
              <span>riteshchaudhary63430@gmail.com</span>
            </div>
          </div>

          {/* Copy info */}
          <div className="text-xs text-zinc-400 dark:text-zinc-500">
            © {new Date().getFullYear()} ResumeForge. All rights reserved.
          </div>

          {/* Built for Digital Heroes CTA (Mandatory requirement) */}
          <div>
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-50 border border-indigo-100 hover:border-indigo-500/30 px-5 py-2.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:border-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-900/60 transition-all cursor-pointer"
            >
              Built for Digital Heroes
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
