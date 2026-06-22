export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  summary: string;
}

export interface Education {
  id: string;
  degree: string;
  college: string;
  year: string;
  cgpa?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  techStack: string;
  description: string;
  githubLink?: string;
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  year: string;
}

export interface CoverLetterInput {
  jobRole: string;
  companyName: string;
  reason: string;
  yearsOfExperience: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: string;
  projects: Project[];
  certifications: Certification[];
  coverLetter: CoverLetterInput;
  selectedTemplate: 'modern' | 'minimal' | 'creative';
}

export interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  stars: number;
  size: number;
  topics: string[];
  updated_at: string;
  html_url: string;
}

export interface GitHubProfile {
  login: string;
  name?: string;
  avatar_url?: string;
  html_url?: string;
  email?: string;
  location?: string;
  blog?: string;
}
