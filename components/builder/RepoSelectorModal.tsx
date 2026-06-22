'use client';

import React, { useState } from 'react';
import { Search, Star, X, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { ResumeData, GitHubRepo, GitHubProfile } from '../../types/resume';

interface RepoSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  repos: GitHubRepo[];
  profile: GitHubProfile | null;
  accessToken?: string;
  onGenerateSuccess: (resumeData: ResumeData, isDemo: boolean, demoMsg?: string) => void;
  onGenerateError: (error: string) => void;
}

export default function RepoSelectorModal({
  isOpen,
  onClose,
  repos,
  profile,
  accessToken,
  onGenerateSuccess,
  onGenerateError,
}: RepoSelectorModalProps) {
  const [selectedRepoNames, setSelectedRepoNames] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Filter repositories based on search input
  const filteredRepos = repos.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.language && r.language.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleToggleRepo = (repoName: string) => {
    setErrorMsg(null);
    setSelectedRepoNames((prev) => {
      if (prev.includes(repoName)) {
        return prev.filter((name) => name !== repoName);
      }
      if (prev.length >= 4) {
        setErrorMsg('You can select a maximum of 4 repositories.');
        return prev;
      }
      return [...prev, repoName];
    });
  };

  const handleGenerate = async () => {
    if (selectedRepoNames.length === 0) {
      setErrorMsg('Please select at least 1 repository to build your resume.');
      return;
    }

    setIsGenerating(true);
    setErrorMsg(null);

    // Map selected names back to full repo objects
    const selectedReposObjects = repos.filter((r) => selectedRepoNames.includes(r.name));

    try {
      const response = await fetch('/api/github/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profile,
          selectedRepos: selectedReposObjects,
          accessToken,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate resume with selected projects.');
      }

      onGenerateSuccess(result.data, result.isDemo, result.message);
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred during resume generation.';
      setErrorMsg(msg);
      onGenerateError(msg);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 flex flex-col max-h-[85vh] animate-in scale-in duration-200">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isGenerating}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 cursor-pointer disabled:opacity-50"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-4">
          <h3 className="flex items-center gap-2 text-base font-bold text-zinc-900 dark:text-white">
            <Sparkles className="h-5 w-5 text-indigo-500" />
            <span>Select Repositories for AI Resume</span>
          </h3>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Choose 2 to 4 repositories that best highlight your technical skills. Gemini 2.5 Flash will analyze their structure and commit counts to generate optimized resume descriptions.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative mb-4">
          <Search className="absolute top-2.5 left-3.5 h-4 w-4 text-zinc-450 dark:text-zinc-550 pointer-events-none" />
          <input
            type="text"
            placeholder="Search projects by name or language..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isGenerating}
            className="w-full rounded-xl border border-zinc-200 bg-white pl-10 pr-4 py-2.5 text-xs text-zinc-900 outline-none placeholder-zinc-450 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white disabled:opacity-50"
          />
        </div>

        {/* Selected Count Indicator / Error */}
        <div className="mb-3 flex justify-between items-center text-xs">
          <span className={`font-semibold ${selectedRepoNames.length >= 2 && selectedRepoNames.length <= 4 ? 'text-indigo-600 dark:text-indigo-400' : 'text-zinc-500'}`}>
            Selected: {selectedRepoNames.length} of 4 repositories (Recommending 3-4)
          </span>
          {errorMsg && (
            <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-semibold animate-pulse">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>{errorMsg}</span>
            </span>
          )}
        </div>

        {/* Repositories Checklist scroll container */}
        <div className="flex-1 overflow-y-auto divide-y divide-zinc-150 border border-zinc-200 rounded-xl dark:divide-zinc-850 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/10 px-2 max-h-[40vh]">
          {filteredRepos.length === 0 ? (
            <div className="py-12 text-center text-xs text-zinc-500">
              No matching repositories found.
            </div>
          ) : (
            filteredRepos.map((repo) => {
              const isChecked = selectedRepoNames.includes(repo.name);
              return (
                <div
                  key={repo.name}
                  onClick={() => !isGenerating && handleToggleRepo(repo.name)}
                  className={`flex items-start gap-3.5 py-3.5 px-3.5 my-1.5 rounded-xl transition-all cursor-pointer border ${
                    isChecked
                      ? 'bg-indigo-50/50 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900/50'
                      : 'border-transparent hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50'
                  }`}
                >
                  {/* Custom Checkbox */}
                  <input
                    type="checkbox"
                    checked={isChecked}
                    readOnly
                    disabled={isGenerating}
                    className="mt-1 h-4.5 w-4.5 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer disabled:opacity-50 shrink-0"
                  />
                  
                  {/* Repo Metadata */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-950 dark:text-white truncate">
                        {repo.name}
                      </span>
                      {repo.language && (
                        <span className="rounded bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
                          {repo.language}
                        </span>
                      )}
                      {repo.stars > 0 && (
                        <span className="flex items-center gap-0.5 text-[10px] text-zinc-500 font-semibold">
                          <Star className="h-3 w-3 fill-amber-400 stroke-amber-400" />
                          <span>{repo.stars}</span>
                        </span>
                      )}
                    </div>
                    {repo.description && (
                      <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-550 dark:text-zinc-450 line-clamp-2">
                        {repo.description}
                      </p>
                    )}
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {repo.topics.slice(0, 4).map((topic) => (
                          <span
                            key={topic}
                            className="rounded bg-zinc-150 px-1.5 py-0.5 text-[9px] font-medium text-zinc-650 dark:bg-zinc-900 dark:text-zinc-400"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Action Panel Footer */}
        <div className="mt-6 flex items-center justify-end gap-3 border-t border-zinc-150 pt-4 dark:border-zinc-800">
          <button
            type="button"
            onClick={onClose}
            disabled={isGenerating}
            className="rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 px-4 py-2.5 text-xs font-bold text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating || selectedRepoNames.length === 0}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:from-indigo-500 hover:to-violet-500 cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Generating AI Resume...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Generate AI Resume</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
