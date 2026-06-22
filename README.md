# 🚀 ResumeForge

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.x-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Gemini 2.5 Flash](https://img.shields.io/badge/Gemini_2.5_Flash-AI-orange?style=for-the-badge&logo=google-gemini)](https://deepmind.google/technologies/gemini/)

**A premium, high-fidelity Professional Resume Builder, AI GitHub Importer, ATS Diagnostic Analyzer, and Job Matcher.**

[🌐 Explore the Live Site](https://www.resumeforge.buzz)

---

<img src="public/images/landing-hero.png" alt="ResumeForge Landing Hero Banner" width="100%" style="border-radius: 12px; border: 1px solid #27272a;">

</div>

---

## ✨ Key Features

### 🧠 GitHub-Powered AI Resume Generation
* **OAuth & Public Username Import**: Connect securely via GitHub OAuth or input a public username for instant unauthenticated imports.
* **Interactive Repository Selector**: Search and filter public repositories by language and details to select exactly 2 to 4 projects to display.
* **Parallel Commit Pagination Scraper**: Extracts commit volume trends using a lightweight pagination technique, avoiding API rate limit throttling.
* **AI Technical Skill Classification**: Analyzes repository structure, commit volume, primary languages, and descriptions via **Gemini 2.5 Flash** to automatically map, group, and categorize your technical competencies.
* **Offline Fallback Heuristic Parser**: Instantly generates structural resume content locally if the server lacks Gemini API keys, ensuring a reliable offline preview experience.

### 🛠️ Interactive Resume Builder
* **Live Side-by-Side Preview**: Instantly see formatting adjustments render on the page as you edit details, with a green auto-sync status pulsing indicator.
* **Single-Purpose Workspace Focus**: A streamlined, resume-only editor workspace designed for high-density CV crafting, removing cover letter distractions.
* **Three Professional Layouts**:
  * **Modern**: Sleek modern layout with a sidebar column for contact options and core skills.
  * **Minimal (Academic/Serif)**: Clean, high-fidelity Times New Roman single-column design modeled strictly on parsing density:
    * Centered two-line contact details row separating phone/email from lowercase profile links.
    * Crisp horizontal lines above section headers in Title Case.
    * Double-line education rows displaying college names in bold, and degrees and graduation dates side-by-side.
    * Location duplication checks preventing double "Remote" suffixes.
    * Regex project name splits separating titles (bold) from subtitles (italic), with bold middle dots (` · `) separating tech stack tags.
  * **Creative**: Colorful top header accents, double columns, and visually styled tags.

### 📝 Document Exporters & Hyperlinks
* **High-Resolution PDF**: Clones the document container off-screen to export print-ready PDFs without template scale distortion.
* **Microsoft Word (DOCX/DOC) Exporter**: Downloads fully editable Microsoft Word documents matching the exact serif font margins, horizontal rules, dot tech stacks, and bullet formatting of the template.
* **Clickable Hyperlinks**: Preserves active, clickable, blue underlined links for email and social handles in both the web workspace and the exported Word files.

### 🔍 Interactive Resume Analyzer
* **Client-Side Parsing**: Scans PDF and DOCX files locally using **PDF.js** and **Mammoth.js**.
* **ATS Structural Diagnostic**: Evaluates resume text to calculate completion metrics and structural ATS scores.
* **Actionable Recommendations**: Flags missing project links, brief summaries, and missing contact handles with diagnostic tips.

### 🎯 Job Description Compatibility Matcher
* Compares parsed resume keywords with target job posting descriptions, calculating compatibility scores and highlighting missing skill tags.

---

## 🛠️ Technology Stack

* **Framework**: [Next.js](https://nextjs.org/) (App Router, Client Component state synchronization)
* **Library**: [React 19](https://react.dev/)
* **AI Model**: [Google Gemini 2.5 Flash API](https://deepmind.google/technologies/gemini/) (enforcing structured JSON schema outputs)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Text Extraction**:
  * [PDF.js](https://github.com/mozilla/pdf.js) (For PDF scanning)
  * [Mammoth.js](https://github.com/mwilliamson/mammoth.js) (For DOCX scanning)
* **Document Exports**:
  * [jsPDF](https://github.com/parallax/jsPDF) & [html2canvas-pro](https://github.com/gregjacobs/html2canvas) (For PDF exports)
  * HTML to Application/MSWord Blob Stream Exporter (For Word Doc exports)

---

## 📂 Project Structure

```bash
├── app/
│   ├── analyzer/         # Resume Parser & Job Matcher page
│   ├── api/              # Route Handlers
│   │   └── github/
│   │       └── import/
│   │           └── route.ts # API Route exchanging OAuth tokens and calling Gemini
│   ├── builder/          # Interactive editor workspace & preview deck
│   ├── templates/        # Showcase overview page
│   ├── layout.tsx        # Base root layout wrapper
│   └── page.tsx          # Landing / Hero home page
├── components/
│   ├── builder/          # Importer widgets (GitHubImportCard, RepoSelectorModal)
│   ├── form-sections/    # Modular section editor forms (PersonalInfo, Experience, etc.)
│   ├── templates/        # Resume templates (Modern, Minimal, Creative)
│   ├── Navbar.tsx        # Responsive navigation bar
│   ├── ResumeForm.tsx    # Multi-section resume builder form container
│   └── ResumePreview.tsx # Live auto-synced preview card container
├── utils/
│   ├── docxGenerator.ts      # HTML to Microsoft Word exporter pipeline
│   ├── metricsCalculator.ts  # ATS Score and Completion rate heuristic engines
│   ├── pdfGenerator.ts       # HTML5 Canvas to PDF print pipelines
│   └── resumeParser.ts       # PDF.js + Mammoth character text scanners
└── types/
    └── resume.ts         # Global TS interfaces (GitHubRepo, GitHubProfile)
```

---

## 🚀 Getting Started

First, clone the repository and navigate into the root directory:

```bash
git clone https://github.com/RiteshDev99/ResumeForge.git
cd ResumeForge
```

Install the dependencies:

```bash
pnpm install
```

Configure your environment variables in `.env` (referencing `.env.example`):

```bash
# GitHub OAuth Credentials
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret

# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the local development instance.

### Build and Deploy

To create an optimized production build:

```bash
pnpm build
```

To run the production build locally:

```bash
pnpm start
```

---

## 🧑‍💻 Author

Created and maintained with ❤️ by:
* **Ritesh Chaudhary**
* Email: [riteshchaudhary63430@gmail.com](mailto:riteshchaudhary63430@gmail.com)
* Website Credits: [Digital Heroes](https://digitalheroesco.com)
