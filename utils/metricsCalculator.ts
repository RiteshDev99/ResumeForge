import { ResumeData } from '../types/resume';

interface MetricResult {
  score: number;
  completion: number;
  insights: string[];
}

/**
 * Computes profile metrics and ATS feedback.
 * - Personal Info: 15%
 * - Summary: 15%
 * - Experience: 25%
 * - Skills: 20%
 * - Projects: 15%
 * - Education: 10%
 * - Total: 100%
 */
export function calculateMetrics(resumeData: ResumeData): MetricResult {
  let score = 0;
  let completion = 0;
  const insights: string[] = [];

  // 1. Personal Info (15 pts)
  const hasName = !!resumeData.personalInfo.fullName.trim();
  const hasTitle = !!resumeData.personalInfo.title.trim();
  const hasEmail = !!resumeData.personalInfo.email.trim();
  const hasPhone = !!resumeData.personalInfo.phone.trim();
  const hasLinkedin = !!resumeData.personalInfo.linkedin.trim();
  
  if (hasName && hasEmail && hasPhone) {
    score += 15;
  }
  
  if (!hasName) insights.push('Add your full name');
  if (!hasTitle) insights.push('Add a target job title');
  if (!hasEmail || !hasPhone) insights.push('Provide email & phone contact details');
  if (!hasLinkedin) insights.push('Add your LinkedIn profile link');

  // 2. Summary (15 pts)
  const summaryLength = resumeData.personalInfo.summary.trim().length;
  if (summaryLength >= 25) {
    score += 15;
  } else {
    insights.push('Write a professional summary (at least 25 characters)');
  }

  // 3. Experience (25 pts)
  const hasExp = resumeData.experience.length > 0;
  if (hasExp) {
    score += 25;
  } else {
    insights.push('Add at least one work experience history');
  }

  // 4. Skills (20 pts)
  const skillCount = resumeData.skills.split(',').map(s => s.trim()).filter(Boolean).length;
  if (skillCount >= 3) {
    score += 20;
  } else if (skillCount > 0) {
    score += 10;
    insights.push('Add at least 3 skills to strengthen your index');
  } else {
    insights.push('Add core technical skills');
  }

  // 5. Projects (15 pts)
  const hasProjects = resumeData.projects.length > 0;
  if (hasProjects) {
    score += 15;
  } else {
    insights.push('Add one or more technical projects');
  }

  // 6. Education (10 pts)
  const hasEducation = resumeData.education.length > 0;
  if (hasEducation) {
    score += 10;
  } else {
    insights.push('Add your college or education details');
  }

  // Completion percentage calculation
  let filledSections = 0;
  const totalSections = 7;
  if (hasName || hasEmail) filledSections++;
  if (summaryLength > 0) filledSections++;
  if (hasExp) filledSections++;
  if (skillCount > 0) filledSections++;
  if (hasProjects) filledSections++;
  if (hasEducation) filledSections++;
  if (resumeData.certifications.length > 0) filledSections++;
  completion = Math.round((filledSections / totalSections) * 100);

  return { score, completion, insights };
}
