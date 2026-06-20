'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, PenTool, Sparkles, LayoutGrid } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/70 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/images/icon/logo.png"
            alt="ResumeForge Logo"
            width={36}
            height={36}
            className="object-contain transition-all duration-300 group-hover:scale-105"
          />
          <span className="hidden min-[400px]:inline bg-gradient-to-r from-zinc-950 via-zinc-900 to-indigo-600 bg-clip-text text-xl font-bold tracking-tight text-transparent dark:from-white dark:via-zinc-200 dark:to-indigo-400">
            ResumeForge
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
              pathname === '/'
                ? 'bg-zinc-150 text-zinc-900 dark:bg-zinc-800 dark:text-white'
                : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50'
            }`}
          >
            <Home className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Home</span>
          </Link>
          <Link
            href="/builder"
            className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
              pathname?.startsWith('/builder')
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50'
                : 'border border-transparent text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50'
            }`}
            title="Resume Builder"
          >
            <PenTool className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Resume Builder</span>
          </Link>
          <Link
            href="/analyzer"
            className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
              pathname?.startsWith('/analyzer')
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50'
                : 'border border-transparent text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50'
            }`}
            title="Resume Analyzer"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Resume Analyzer</span>
          </Link>
          <Link
            href="/templates"
            className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
              pathname?.startsWith('/templates')
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50'
                : 'border border-transparent text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50'
            }`}
            title="Templates"
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Templates</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
