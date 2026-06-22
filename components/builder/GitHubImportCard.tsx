'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, User, Globe, AlertCircle, CheckCircle } from 'lucide-react';
import { ResumeData, GitHubRepo, GitHubProfile } from '../../types/resume';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface GitHubImportCardProps {
  onImportSuccess: (resumeData: ResumeData, isDemo: boolean, demoMsg?: string) => void;
  onImportError: (error: string) => void;
  onSelectRepos: (repos: GitHubRepo[], profile: GitHubProfile, accessToken?: string) => void;
  isImporting: boolean;
  setIsImporting: (importing: boolean) => void;
}

export default function GitHubImportCard({
  onImportSuccess,
  onImportError,
  onSelectRepos,
  isImporting,
  setIsImporting,
}: GitHubImportCardProps) {
  const [activeTab, setActiveTab] = useState<'oauth' | 'username'>('username');
  const [username, setUsername] = useState('');
  const [progressPhase, setProgressPhase] = useState(0);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;

  // Cycle through loading steps to provide a premium feel
  const loadingPhases = [
    'Connecting to GitHub secure proxy...',
    'Downloading public repositories metadata...',
    'Analyzing codebase technologies...',
    'Applying Gemini 2.5 Flash parsing rules...',
    'Optimizing projects for ATS compatibility...',
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isImporting) {
      interval = setInterval(() => {
        setProgressPhase((prev) => (prev < loadingPhases.length - 1 ? prev + 1 : prev));
      }, 1500);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isImporting, loadingPhases.length]);

  // Clean toast notifications after 5 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleOAuthConnect = () => {
    if (!clientId) {
      setToast({
        type: 'error',
        message: 'GitHub OAuth Client ID is not configured in .env. Please configure NEXT_PUBLIC_GITHUB_CLIENT_ID or use Username Import.',
      });
      return;
    }
    setProgressPhase(0);
    setIsImporting(true);
    const redirectUri = `${window.location.origin}/builder`;
    const scope = 'read:user,repo';
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scope}`;
  };

  const handleUsernameImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setToast({ type: 'error', message: 'Please enter a valid GitHub username.' });
      return;
    }

    setProgressPhase(0);
    setIsImporting(true);
    setToast(null);

    try {
      const response = await fetch('/api/github/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username.trim() }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate resume from GitHub.');
      }

      if (result.step === 'select_repos') {
        onSelectRepos(result.repos, result.profile, result.accessToken);
        setToast({
          type: 'info',
          message: 'Profile fetched! Please select which repositories to include.',
        });
      } else {
        onImportSuccess(result.data, result.isDemo, result.message);
        setToast({
          type: 'success',
          message: result.isDemo
            ? 'Imported! (Generated using offline heuristics)'
            : 'Successfully generated resume from GitHub profile!',
        });
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'An error occurred during import.';
      onImportError(errMsg);
      setToast({ type: 'error', message: errMsg });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40">
      {/* Decorative gradient glow */}
      <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-indigo-500/10 blur-xl dark:bg-indigo-500/5 pointer-events-none" />

      {/* Toast popup */}
      {toast && (
        <div
          className={`absolute top-4 left-4 right-4 z-50 flex items-start gap-2.5 rounded-xl border p-3.5 text-xs font-medium shadow-lg animate-in slide-in-from-top duration-300 ${
            toast.type === 'success'
              ? 'border-emerald-100 bg-emerald-50 text-emerald-800 dark:border-emerald-950/30 dark:bg-emerald-950/70 dark:text-emerald-300'
              : toast.type === 'error'
              ? 'border-rose-100 bg-rose-50 text-rose-800 dark:border-rose-950/30 dark:bg-rose-950/70 dark:text-rose-300'
              : 'border-blue-100 bg-blue-50 text-blue-800 dark:border-blue-950/30 dark:bg-blue-950/70 dark:text-blue-300'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
          )}
          <span className="flex-1 leading-relaxed">{toast.message}</span>
          <button type="button" onClick={() => setToast(null)} className="text-[10px] uppercase font-bold hover:underline cursor-pointer">
            Dismiss
          </button>
        </div>
      )}

      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800/80">
        <h3 className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white">
          <GithubIcon className="h-4 w-4 text-zinc-950 dark:text-white" />
          <span>GitHub AI Resume Generator</span>
        </h3>
        <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-100/50 dark:border-indigo-900/30">
          <Sparkles className="h-2.5 w-2.5 text-indigo-500" />
          <span>AI Import</span>
        </span>
      </div>

      {isImporting ? (
        /* Loading/Generation State */
        <div className="flex flex-col items-center justify-center py-8 text-center animate-pulse">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600 dark:text-indigo-400 mb-4" />
          <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Analyzing Developer Portfolio</h4>
          <p className="mt-2 text-[11px] text-zinc-550 dark:text-zinc-400 max-w-[250px] leading-relaxed">
            {loadingPhases[progressPhase]}
          </p>
          <div className="mt-4 w-full max-w-[200px] h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 dark:bg-indigo-400 transition-all duration-500"
              style={{ width: `${((progressPhase + 1) / loadingPhases.length) * 100}%` }}
            />
          </div>
        </div>
      ) : (
        /* Action UI */
        <div className="flex flex-col gap-4">
          <p className="text-xs text-zinc-650 dark:text-zinc-300 leading-relaxed">
            Transform your GitHub projects, technical skills, and repository contributions into an ATS-optimized resume using Gemini 2.5 Flash.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-zinc-50 p-1 dark:bg-zinc-950">
            <button
              type="button"
              onClick={() => setActiveTab('username')}
              className={`flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'username'
                  ? 'bg-white text-zinc-950 shadow-sm dark:bg-zinc-800 dark:text-white'
                  : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              <Globe className="h-3.5 w-3.5" />
              <span>Username</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('oauth')}
              className={`flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'oauth'
                  ? 'bg-white text-zinc-950 shadow-sm dark:bg-zinc-800 dark:text-white'
                  : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              <User className="h-3.5 w-3.5" />
              <span>Connect Account</span>
            </button>
          </div>

          {/* Username mode form */}
          {activeTab === 'username' ? (
            <form onSubmit={handleUsernameImport} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter GitHub username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs text-zinc-900 outline-none placeholder-zinc-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-500/10 hover:bg-indigo-500 cursor-pointer transition-colors"
              >
                Import
              </button>
            </form>
          ) : (
            /* OAuth mode connect */
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleOAuthConnect}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 hover:bg-zinc-900 px-4 py-3 text-xs font-bold text-white shadow-md cursor-pointer transition-colors dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-100"
              >
                <GithubIcon className="h-4 w-4" />
                <span>Connect GitHub Account</span>
              </button>
              {!clientId && (
                <span className="text-[10px] text-zinc-500 text-center leading-relaxed">
                  Note: OAuth credentials not configured. Please use <b>Username Tab</b> to test instantly or configure client ID in .env.
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
