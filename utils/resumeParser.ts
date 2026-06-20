/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import mammoth from 'mammoth';

// Interface for structured resume analysis results
export interface AnalyzedResume {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  portfolio: string;
  summary: string;
  skills: string[];
  sectionsFound: {
    summary: boolean;
    skills: boolean;
    experience: boolean;
    projects: boolean;
    education: boolean;
    certifications: boolean;
  };
  scoreBreakdown: {
    contact: number;
    summary: number;
    skills: number;
    experience: number;
    projects: number;
    education: number;
  };
  totalScore: number;
  problems: {
    id: string;
    title: string;
    description: string;
    fix: string;
  }[];
  recommendations: string[];
  detectedSkills: string[];
  missingSkills: string[];
  strengthLevel: 'Weak' | 'Average' | 'Strong' | 'Excellent';
}

// Dynamically load PDF.js script from a CDN to avoid Next.js bundling/worker compilation bugs
export const loadPdfJs = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Cannot load PDF.js server-side'));
      return;
    }

    if ((window as any).pdfjsLib) {
      resolve((window as any).pdfjsLib);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
    script.async = true;
    script.onload = () => {
      const pdfjsLib = (window as any).pdfjsLib;
      if (pdfjsLib) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
        resolve(pdfjsLib);
      } else {
        reject(new Error('PDF.js loaded but pdfjsLib not found on window'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load PDF.js script from CDN'));
    document.body.appendChild(script);
  });
};

// Extracts text from a PDF file (client-side)
export const extractTextFromPdf = async (arrayBuffer: ArrayBuffer): Promise<string> => {
  const pdfjsLib = await loadPdfJs();
  const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
  const pdf = await loadingTask.promise;
  
  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: any) => item.str || '')
      .join(' ');
    fullText += pageText + '\n';
  }
  return fullText;
};

// Extracts text from a DOCX file (client-side)
export const extractTextFromDocx = async (arrayBuffer: ArrayBuffer): Promise<string> => {
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value || '';
};

// High-frequency keyword skill bank
const SKILL_BANK = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 
  'Express', 'HTML', 'CSS', 'Tailwind', 'Python', 'Django', 
  'Flask', 'Java', 'Spring', 'Docker', 'Kubernetes', 'AWS', 
  'Azure', 'GCP', 'SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 
  'Redis', 'Git', 'CI/CD', 'GitHub Actions', 'Testing', 
  'Jest', 'Cypress', 'Unit Testing', 'REST APIs', 'GraphQL', 
  'Redux', 'Zustand', 'Linux', 'C++', 'C#', 'Go', 'PHP'
];

// Parser heuristics to analyze extracted resume text
export const analyzeResumeText = (text: string): AnalyzedResume => {
  const normalizedText = text.replace(/\s+/g, ' ');
  const lowerText = text.toLowerCase();

  // 1. Extract Contact Info via regex
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  const linkedinRegex = /linkedin\.com\/in\/[a-zA-Z0-9_-]+/;
  const githubRegex = /github\.com\/[a-zA-Z0-9_-]+/;
  const portfolioRegex = /(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9_-]+\.(?:dev|me|io|com|org|net))/;

  const emailMatch = normalizedText.match(emailRegex);
  const phoneMatch = normalizedText.match(phoneRegex);
  const linkedinMatch = normalizedText.match(linkedinRegex);
  const githubMatch = normalizedText.match(githubRegex);
  
  // Custom portfolio check (excluding common links like github/linkedin)
  let portfolio = '';
  const portfolioMatches = [...normalizedText.matchAll(new RegExp(portfolioRegex, 'gi'))];
  for (const m of portfolioMatches) {
    const domain = m[0].toLowerCase();
    if (!domain.includes('linkedin.com') && !domain.includes('github.com') && !domain.includes('w3.org') && !domain.includes('schema.org')) {
      portfolio = m[0];
      break;
    }
  }

  // Extract Name (first non-empty text line that looks like a name)
  let fullName = '';
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  for (const line of lines.slice(0, 5)) {
    const cleanedLine = line.replace(/[^a-zA-Z\s]/g, '').trim();
    const wordCount = cleanedLine.split(/\s+/).length;
    if (wordCount >= 2 && wordCount <= 4 && !cleanedLine.toLowerCase().includes('resume') && !cleanedLine.toLowerCase().includes('curriculum')) {
      fullName = cleanedLine;
      break;
    }
  }
  if (!fullName) fullName = 'Candidate Name';

  // 2. Identify Sections based on keywords
  const sectionsFound = {
    summary: /summary|profile|professional summary|about me|career objective/i.test(lowerText),
    skills: /skills|technical skills|core competencies|technologies|expertise/i.test(lowerText),
    experience: /experience|work experience|employment history|professional experience/i.test(lowerText),
    projects: /projects|personal projects|academic projects/i.test(lowerText),
    education: /education|academic background|qualification/i.test(lowerText),
    certifications: /certifications|certificates|licenses|awards/i.test(lowerText)
  };

  // 3. Extract Skills keywords using Skill Bank
  const detectedSkills: string[] = [];
  SKILL_BANK.forEach(skill => {
    // Word boundary case-insensitive search
    const escaped = skill.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    if (regex.test(text)) {
      detectedSkills.push(skill);
    }
  });

  // Calculate missing recommended skills (some high priority ones not detected)
  const missingSkills = SKILL_BANK.filter(skill => !detectedSkills.includes(skill)).slice(0, 4);

  // Extract professional summary block if section exists
  let summary = '';
  const summaryHeaderMatch = text.match(/(?:summary|profile|about me|objective)/i);
  if (summaryHeaderMatch && summaryHeaderMatch.index !== undefined) {
    const startIdx = summaryHeaderMatch.index + summaryHeaderMatch[0].length;
    // Extract up to 500 characters or next newline/section
    summary = text.substring(startIdx, startIdx + 400).trim();
  }

  // 4. Calculate Scores
  // Contact Info Scoring (Max 15)
  let contactScore = 0;
  if (fullName && fullName !== 'Candidate Name') contactScore += 3;
  if (emailMatch) contactScore += 3;
  if (phoneMatch) contactScore += 3;
  if (linkedinMatch) contactScore += 3;
  if (githubMatch) contactScore += 3;

  // Summary Scoring (Max 15)
  let summaryScore = 0;
  if (sectionsFound.summary) {
    const summaryWords = summary.split(/\s+/).filter(Boolean).length;
    if (summaryWords > 30) summaryScore = 15;
    else if (summaryWords > 10) summaryScore = 8;
    else summaryScore = 5;
  }

  // Skills Scoring (Max 20)
  let skillsScore = 0;
  if (sectionsFound.skills) {
    skillsScore += 10; // Section exists
    skillsScore += Math.min(detectedSkills.length, 10); // 1 pt per skill up to 10
  }

  // Experience Scoring (Max 25)
  let experienceScore = 0;
  if (sectionsFound.experience) {
    experienceScore += 15; // Section exists
    // Give additional points based on description volume details
    const wordCount = text.length / 6;
    if (wordCount > 300) experienceScore += 10;
    else if (wordCount > 150) experienceScore += 5;
    else experienceScore += 2;
  }

  // Projects Scoring (Max 15)
  let projectsScore = 0;
  if (sectionsFound.projects) {
    projectsScore += 10; // Section exists
    if (githubMatch || portfolio) projectsScore += 5; // Direct links
  }

  // Education Scoring (Max 10)
  const educationScore = sectionsFound.education ? 10 : 0;

  const scoreBreakdown = {
    contact: contactScore,
    summary: summaryScore,
    skills: skillsScore,
    experience: experienceScore,
    projects: projectsScore,
    education: educationScore
  };

  const totalScore = contactScore + summaryScore + skillsScore + experienceScore + projectsScore + educationScore;

  // 5. Problem Detection & Recommendations
  const problems: { id: string; title: string; description: string; fix: string; }[] = [];
  const recommendations: string[] = [];

  if (!linkedinMatch) {
    problems.push({
      id: 'no-linkedin',
      title: 'Missing LinkedIn Profile Link',
      description: 'Recruiters expect a direct link to your professional profile to review endorsements and network presence.',
      fix: 'Add your custom URL (e.g. linkedin.com/in/username) to the contact section.'
    });
    recommendations.push('Add LinkedIn profile');
  } else {
    recommendations.push('✓ LinkedIn profile linked successfully');
  }

  if (!githubMatch) {
    problems.push({
      id: 'no-github',
      title: 'Missing GitHub Portfolio Link',
      description: 'For technical roles, missing repository highlights make it hard to evaluate practical code contributions.',
      fix: 'Add a link to your active GitHub account near your email.'
    });
    recommendations.push('Add GitHub repository links');
  } else {
    recommendations.push('✓ GitHub repository linked successfully');
  }

  if (!sectionsFound.summary || summary.split(/\s+/).length < 25) {
    problems.push({
      id: 'short-summary',
      title: 'Professional Summary Too Short or Missing',
      description: 'Your professional profile statement introduces your core value proposition in the first 5 seconds.',
      fix: 'Write a 3-4 sentence paragraph highlighting your years of experience, core skill stack, and key career metrics.'
    });
    recommendations.push('Add a 3-sentence summary of your background');
  } else {
    recommendations.push('✓ Professional summary is well-structured');
  }

  if (detectedSkills.length < 5) {
    problems.push({
      id: 'few-skills',
      title: 'Skills Section Too Small',
      description: 'An ATS scans resumes specifically for core technical keywords. Having fewer than 5 skills flags lower relevance.',
      fix: 'Expand your skills block with 2-3 additional programming languages or industry tools.'
    });
    recommendations.push('Add 2-3 additional technical skills');
  } else {
    recommendations.push('✓ Solid selection of technical keywords');
  }

  if (!sectionsFound.projects) {
    problems.push({
      id: 'no-projects',
      title: 'No Projects Section Found',
      description: 'Projects demonstrate hands-on application of technical competencies, bridging gaps in direct experience.',
      fix: 'Introduce a "Projects" section detailing 2 accomplishments using results-oriented action words.'
    });
    recommendations.push('Add project descriptions with tech stacks');
  }

  if (!sectionsFound.certifications) {
    problems.push({
      id: 'no-certs',
      title: 'Missing Certifications Section',
      description: 'Relevant certifications display dedication to lifelong learning and validate standard skills.',
      fix: 'Add completed industry achievements or courses (e.g. AWS, Scrum Master).'
    });
    recommendations.push('Include relevant certifications');
  }

  if (!portfolio) {
    problems.push({
      id: 'no-portfolio',
      title: 'Missing Portfolio Website Link',
      description: 'A personal landing page shows professional presentation and separates you from other candidates.',
      fix: 'Link a personal site/domain highlighting your best projects.'
    });
  }

  // 6. Overall Strength Meter Level
  let strengthLevel: 'Weak' | 'Average' | 'Strong' | 'Excellent' = 'Weak';
  if (totalScore >= 90) strengthLevel = 'Excellent';
  else if (totalScore >= 75) strengthLevel = 'Strong';
  else if (totalScore >= 50) strengthLevel = 'Average';

  return {
    fullName,
    email: emailMatch ? emailMatch[0] : '',
    phone: phoneMatch ? phoneMatch[0] : '',
    linkedin: linkedinMatch ? linkedinMatch[0] : '',
    github: githubMatch ? githubMatch[0] : '',
    portfolio,
    summary,
    skills: detectedSkills,
    sectionsFound,
    scoreBreakdown,
    totalScore,
    problems,
    recommendations,
    detectedSkills,
    missingSkills,
    strengthLevel
  };
};
