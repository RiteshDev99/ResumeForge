/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';

// Helper function to fetch the commit count of a repository using lightweight pagination trick
async function getCommitCount(owner: string, repo: string, accessToken?: string): Promise<number> {
  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'ResumeForge-App',
    };
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`, { headers });
    if (!response.ok) return 0;
    
    const linkHeader = response.headers.get('Link');
    if (!linkHeader) {
      const data = await response.json();
      return Array.isArray(data) ? data.length : 0;
    }
    
    const match = linkHeader.match(/page=(\d+)>;\s*rel="last"/);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
    return 1;
  } catch (error) {
    console.error(`Error getting commit count for ${owner}/${repo}:`, error);
    return 0;
  }
}

// Fallback algorithm to generate high-quality resume data client-side if Gemini is missing
function generateLocalFallback(profile: any, repos: any[]): any {
  const fullName = profile.name || profile.login || 'GitHub Developer';
  const username = profile.login || '';
  
  // Count primary languages
  const languageCounts: Record<string, number> = {};
  repos.forEach((r) => {
    if (r.language) {
      languageCounts[r.language] = (languageCounts[r.language] || 0) + 1;
    }
  });

  // Determine top language
  const topLanguages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([lang]) => lang);
  
  const mainLang = topLanguages[0] || 'TypeScript';
  let title = 'Software Engineer';
  if (topLanguages.includes('TypeScript') || topLanguages.includes('JavaScript')) {
    title = topLanguages.includes('Python') || topLanguages.includes('Go') ? 'Fullstack Engineer' : 'Frontend Engineer';
  } else if (topLanguages.includes('Python') || topLanguages.includes('Java') || topLanguages.includes('Go')) {
    title = 'Backend Engineer';
  }

  // Derive skills
  const baseSkills = new Set<string>(['Git', 'GitHub', 'REST APIs']);
  topLanguages.forEach((lang) => baseSkills.add(lang));
  
  // Add framework suggestions based on languages
  if (baseSkills.has('JavaScript') || baseSkills.has('TypeScript')) {
    ['React', 'Next.js', 'Node.js', 'Tailwind CSS'].forEach(s => baseSkills.add(s));
  }
  if (baseSkills.has('Python')) {
    ['Django', 'FastAPI', 'PostgreSQL'].forEach(s => baseSkills.add(s));
  }
  if (baseSkills.has('Java')) {
    ['Spring Boot', 'SQL'].forEach(s => baseSkills.add(s));
  }
  
  // Flatten skills
  const skillsList = Array.from(baseSkills).join(', ');

  // Projects conversion - Sort by stars, forks, description existence, and size
  const sourceRepos = repos.filter(r => !r.fork);
  const reposToAnalyze = sourceRepos.length > 0 ? sourceRepos : repos;
  const selectedRepos = [...reposToAnalyze]
    .sort((a, b) => {
      let scoreA = (a.stargazers_count || 0) * 100 + (a.forks_count || 0) * 50;
      let scoreB = (b.stargazers_count || 0) * 100 + (b.forks_count || 0) * 50;
      if (a.description) scoreA += 30;
      if (b.description) scoreB += 30;
      scoreA += Math.min(a.size || 0, 5000) / 100;
      scoreB += Math.min(b.size || 0, 5000) / 100;
      return scoreB - scoreA;
    })
    .slice(0, 3);

  const projects = selectedRepos.map((r, idx) => {
    const projName = r.name
      .split(/[-_]+/)
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
      
    const techStack = [r.language, ...(r.topics || [])]
      .filter(Boolean)
      .slice(0, 4)
      .join(', ') || mainLang;

    return {
      id: `proj-${Date.now()}-${idx}`,
      name: projName,
      techStack,
      description: r.description || `Built a robust ${projName} system implementing best practices in ${r.language || 'software engineering'}. Scaled repository design and automated test configurations.`,
      githubLink: r.html_url || `https://github.com/${username}/${r.name}`
    };
  });

  // Summary
  const summary = `Dedicated ${title} and active GitHub contributor with focus on ${mainLang}. Experienced in designing modular code structures, maintaining open-source repositories, and implementing clean code workflows as seen across ${repos.length} public projects.`;

  return {
    personalInfo: {
      fullName,
      title,
      email: profile.email || '',
      phone: '',
      location: profile.location || 'Remote',
      linkedin: '',
      github: profile.html_url || `https://github.com/${username}`,
      portfolio: profile.blog || '',
      summary
    },
    skills: skillsList,
    projects,
    experience: [
      {
        id: `exp-${Date.now()}-1`,
        company: 'GitHub Open Source',
        role: `Independent ${title}`,
        duration: '2023 - Present',
        description: `Actively maintained public repositories and contributed to the open-source community. Implemented key features in ${mainLang}, performed code reviews, and optimized project setups.`
      }
    ],
    education: [
      {
        id: `edu-${Date.now()}-1`,
        degree: 'Bachelor of Science in Computer Science',
        college: 'University Name (Click to edit)',
        year: '2020 - 2024',
        cgpa: ''
      }
    ],
    certifications: [],
    coverLetter: {
      jobRole: title,
      companyName: 'Open Source',
      reason: `I am interested in contributing my strong ${mainLang} and full-stack software development experience to your projects.`,
      yearsOfExperience: '2'
    },
    selectedTemplate: 'modern'
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      code, 
      redirectUri, 
      username, 
      profile: clientProfile, 
      selectedRepos, 
      accessToken: clientAccessToken 
    } = body;

    const geminiKey = process.env.GEMINI_API_KEY;

    // STEP 2: Generate Resume from user's selected repositories
    if (clientProfile && Array.isArray(selectedRepos)) {
      const ownerName = clientProfile.login || username || '';
      
      // Fetch commit count only for the selected repos in parallel
      const selectedReposWithCommits = await Promise.all(
        selectedRepos.map(async (r: any) => {
          const commits = await getCommitCount(ownerName, r.name, clientAccessToken);
          return {
            name: r.name,
            description: r.description || '',
            language: r.language || '',
            stars: r.stars || r.stargazers_count || 0,
            size: r.size || 0,
            commits: commits || 0,
            topics: r.topics || [],
            updated_at: r.updated_at,
            html_url: r.html_url || r.githubLink
          };
        })
      );

      // Check for Gemini API key
      if (!geminiKey || geminiKey.includes('your_gemini_api_key')) {
        // Use premium offline fallback when key is not present
        const fallbackData = generateLocalFallback(clientProfile, selectedReposWithCommits);
        return NextResponse.json({ 
          data: fallbackData, 
          isDemo: true,
          message: 'No GEMINI_API_KEY environment variable found. Resume was generated using offline heuristics.'
        });
      }

      // Call Google Gemini 2.5 Flash API
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;

      const promptText = `You are an expert technical recruiter and resume builder.
Your task is to analyze the following GitHub user profile and public repositories to generate a highly professional, ATS-friendly developer resume.

GITHUB USER PROFILE:
${JSON.stringify(clientProfile, null, 2)}

SELECTED GITHUB REPOSITORIES:
${JSON.stringify(selectedReposWithCommits, null, 2)}

INSTRUCTIONS:
1. Generate a resume JSON matching the schema provided below.
2. "personalInfo":
   - "fullName": User's real name (from profile) or fallback to github username capitalized.
   - "title": A professional job title based on their repositories (e.g., "Fullstack Engineer", "Frontend Developer", "Python Developer").
   - "email": Use user's email if available, otherwise leave empty or use a placeholder.
   - "phone": Leave empty or use empty string.
   - "location": Use location from profile if available, otherwise leave empty or use a placeholder.
   - "linkedin": Leave empty or use empty string.
   - "github": Link to their GitHub profile (e.g. html_url).
   - "portfolio": Use their website/blog if available.
   - "summary": Write a compelling 2-3 sentence professional summary summarizing their technical strengths and experience, optimized for ATS.
3. "skills": Generate a clean, flat comma-separated list of technical skills (e.g. "React, Next.js, Node.js, TypeScript, JavaScript, Tailwind CSS, PostgreSQL, Docker, Git, REST APIs"). Do NOT group them with subheaders or labels like "Languages:" or "Frameworks:" – output ONLY a single flat list of technologies, databases, frameworks, languages, and tools.
4. "projects": Convert the SELECTED GITHUB REPOSITORIES into professional resume entries:
   - "id": generate unique strings (e.g. "proj-1", "proj-2", ...).
   - "name": Clean, human-readable repository name (e.g., convert "my-chat-app" to "My Chat App").
   - "techStack": A precise, comma-separated list of technologies and libraries used in this specific project (inferred from primary language, topics, and description).
   - "description": A high-impact, professional, recruiter-approved description (2 sentences) highlighting what the project does, key technical challenges resolved (e.g. state management, API integration, data caching), and highlighting scale or activity if the project has a large number of commits (e.g. "Built with a rigorous iteration history of over X commits" or similar).
   - "githubLink": The repository html_url.
5. "experience": Generate 1 or 2 realistic professional experience roles based on the projects. If no direct experience is available, formulate roles like "Independent Open Source Contributor" or "Freelance Fullstack Developer", highlighting their development work, code organization, pull requests, and software design contributions.
6. "education": Since education is not on GitHub, generate a single empty/placeholder entry: e.g. college: "University Name (Click to edit)", degree: "Bachelor of Science in Computer Science", year: "2020 - 2024", cgpa: "".
7. "certifications": Provide an empty array or a placeholder certification.

Ensure the final response is pure JSON conforming to this schema, with no markdown tags surrounding it.`;

      const geminiResponse = await fetch(geminiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: promptText,
                },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: 'OBJECT',
              properties: {
                personalInfo: {
                  type: 'OBJECT',
                  properties: {
                    fullName: { type: 'STRING' },
                    title: { type: 'STRING' },
                    email: { type: 'STRING' },
                    phone: { type: 'STRING' },
                    location: { type: 'STRING' },
                    linkedin: { type: 'STRING' },
                    github: { type: 'STRING' },
                    portfolio: { type: 'STRING' },
                    summary: { type: 'STRING' },
                  },
                  required: ['fullName', 'title', 'email', 'phone', 'location', 'linkedin', 'github', 'portfolio', 'summary'],
                },
                skills: { type: 'STRING' },
                projects: {
                  type: 'ARRAY',
                  items: {
                    type: 'OBJECT',
                    properties: {
                      id: { type: 'STRING' },
                      name: { type: 'STRING' },
                      techStack: { type: 'STRING' },
                      description: { type: 'STRING' },
                      githubLink: { type: 'STRING' },
                    },
                    required: ['id', 'name', 'techStack', 'description', 'githubLink'],
                  },
                },
                experience: {
                  type: 'ARRAY',
                  items: {
                    type: 'OBJECT',
                    properties: {
                      id: { type: 'STRING' },
                      company: { type: 'STRING' },
                      role: { type: 'STRING' },
                      duration: { type: 'STRING' },
                      description: { type: 'STRING' },
                    },
                    required: ['id', 'company', 'role', 'duration', 'description'],
                  },
                },
                education: {
                  type: 'ARRAY',
                  items: {
                    type: 'OBJECT',
                    properties: {
                      id: { type: 'STRING' },
                      degree: { type: 'STRING' },
                      college: { type: 'STRING' },
                      year: { type: 'STRING' },
                      cgpa: { type: 'STRING' },
                    },
                    required: ['id', 'degree', 'college', 'year'],
                  },
                },
                certifications: {
                  type: 'ARRAY',
                  items: {
                    type: 'OBJECT',
                    properties: {
                      id: { type: 'STRING' },
                      name: { type: 'STRING' },
                      organization: { type: 'STRING' },
                      year: { type: 'STRING' },
                    },
                    required: ['id', 'name', 'organization', 'year'],
                  },
                },
              },
              required: ['personalInfo', 'skills', 'projects', 'experience', 'education', 'certifications'],
            },
          },
        }),
      });

      if (!geminiResponse.ok) {
        const errorText = await geminiResponse.text();
        console.warn('Gemini API call failed, using fallback:', errorText);
        const fallbackData = generateLocalFallback(clientProfile, selectedReposWithCommits);
        return NextResponse.json({ 
          data: fallbackData, 
          isDemo: true,
          message: 'Gemini API call failed or is rate-limited. Resume was generated using offline heuristics.'
        });
      }

      const geminiData = await geminiResponse.json();
      const content = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!content) {
        console.warn('Gemini API returned empty candidate content, using fallback.');
        const fallbackData = generateLocalFallback(clientProfile, selectedReposWithCommits);
        return NextResponse.json({ 
          data: fallbackData, 
          isDemo: true,
          message: 'Gemini AI returned empty candidate data. Resume was generated using offline heuristics.'
        });
      }

      let cleanContent = content.trim();
      if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.replace(/^```(?:json)?\n?/i, '').replace(/```$/i, '').trim();
      }
      const generatedResume = JSON.parse(cleanContent);
      return NextResponse.json({ data: generatedResume, isDemo: false });
    }

    // STEP 1: Fetch user profile & list of all repositories
    let profile: any = null;
    let repos: any[] = [];
    let accessToken: string | undefined = undefined;

    // Mode 1: OAuth flow
    if (code) {
      const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
      const clientSecret = process.env.GITHUB_CLIENT_SECRET;

      if (!clientId || !clientSecret) {
        return NextResponse.json(
          { error: 'GitHub OAuth Client credentials are not configured in Server environment.' },
          { status: 500 }
        );
      }

      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
          redirect_uri: redirectUri,
        }),
      });

      const tokenData = await tokenResponse.json();
      accessToken = tokenData.access_token;

      if (!accessToken) {
        return NextResponse.json(
          { error: `Failed to retrieve access token. Details: ${tokenData.error_description || 'unknown error'}` },
          { status: 400 }
        );
      }

      const userResponse = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'ResumeForge-App',
        },
      });

      if (!userResponse.ok) {
        return NextResponse.json({ error: 'Failed to retrieve GitHub profile.' }, { status: 400 });
      }
      profile = await userResponse.json();

      const reposResponse = await fetch('https://api.github.com/user/repos?sort=updated&per_page=100', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'ResumeForge-App',
        },
      });

      if (reposResponse.ok) {
        repos = await reposResponse.json();
      }
    } 
    // Mode 2: Username direct fetch
    else if (username) {
      const userResponse = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': 'ResumeForge-App',
        },
      });

      if (!userResponse.ok) {
        return NextResponse.json({ error: 'GitHub user not found or rate limited.' }, { status: 404 });
      }
      profile = await userResponse.json();

      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': 'ResumeForge-App',
        },
      });

      if (reposResponse.ok) {
        repos = await reposResponse.json();
      }
    } 
    else {
      return NextResponse.json({ error: 'Missing oauth code or username parameter.' }, { status: 400 });
    }

    if (!profile) {
      return NextResponse.json({ error: 'GitHub profile retrieval failed.' }, { status: 400 });
    }

    if (!Array.isArray(repos)) {
      repos = [];
    }

    // Process repositories list (prefer source, sort by score)
    const sourceRepos = repos.filter((r) => !r.fork);
    const reposToAnalyze = sourceRepos.length > 0 ? sourceRepos : repos;

    const sortedRepos = [...reposToAnalyze]
      .sort((a, b) => {
        let scoreA = (a.stargazers_count || 0) * 100 + (a.forks_count || 0) * 50;
        let scoreB = (b.stargazers_count || 0) * 100 + (b.forks_count || 0) * 50;
        
        if (a.description) scoreA += 30;
        if (b.description) scoreB += 30;

        scoreA += Math.min(a.size || 0, 5000) / 100;
        scoreB += Math.min(b.size || 0, 5000) / 100;

        return scoreB - scoreA;
      });

    const repoList = sortedRepos.map((r) => ({
      name: r.name,
      description: r.description || '',
      language: r.language || '',
      stars: r.stargazers_count || 0,
      size: r.size || 0,
      topics: r.topics || [],
      updated_at: r.updated_at,
      html_url: r.html_url,
    }));

    return NextResponse.json({
      step: 'select_repos',
      profile,
      repos: repoList,
      accessToken
    });

  } catch (error: any) {
    console.error('Import error:', error);
    return NextResponse.json({ error: error.message || 'An unexpected error occurred during resume generation.' }, { status: 500 });
  }
}
