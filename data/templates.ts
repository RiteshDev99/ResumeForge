import { ResumeData } from '../types/resume';

export const SKILL_SUGGESTIONS: Record<string, string[]> = {
  'Frontend Developer': [
    'React', 'Next.js', 'JavaScript', 'TypeScript', 'Tailwind CSS',
    'HTML5', 'CSS3', 'Redux Toolkit', 'Zustand', 'Vite', 'GraphQL',
    'Jest', 'Cypress', 'Git', 'REST APIs'
  ],
  'Backend Developer': [
    'Node.js', 'Express', 'NestJS', 'Python', 'Django', 'PostgreSQL',
    'MongoDB', 'Redis', 'Docker', 'AWS', 'GraphQL', 'SQL',
    'TypeScript', 'gRPC', 'Microservices'
  ],
  'Fullstack Developer': [
    'React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS',
    'PostgreSQL', 'Express', 'MongoDB', 'Docker', 'Git',
    'REST APIs', 'AWS', 'GraphQL', 'Prisma', 'System Design'
  ],
  'Data Scientist': [
    'Python', 'R', 'SQL', 'Pandas', 'NumPy', 'Scikit-Learn',
    'TensorFlow', 'PyTorch', 'Jupyter Notebook', 'Tableau',
    'Data Visualization', 'Statistical Analysis', 'Machine Learning'
  ],
  'UI/UX Designer': [
    'Figma', 'Adobe Creative Cloud', 'Sketch', 'Wireframing',
    'Prototyping', 'User Research', 'Information Architecture',
    'Visual Design', 'Design Systems', 'Interaction Design'
  ],
  'Product Manager': [
    'Agile Methodology', 'Scrum', 'Product Roadmap', 'Jira',
    'User Stories', 'Market Research', 'Google Analytics',
    'Product Lifecycle', 'SQL', 'A/B Testing', 'Stakeholder Management'
  ]
};

export const DEMO_RESUME_DATA: ResumeData = {
  personalInfo: {
    fullName: 'Alexander Wright',
    title: 'Senior Fullstack Developer',
    email: 'alexander.wright@dev.com',
    phone: '+1 (555) 019-2834',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexanderwright',
    github: 'github.com/alexwright-dev',
    portfolio: 'alexwright.dev',
    summary: 'Innovative Senior Fullstack Engineer with 6+ years of experience designing, building, and deploying highly scalable web applications. Expert in Next.js, React, Node.js, and cloud architectures. Passionate about writing clean, maintainable code and mentoring junior developers to achieve operational excellence.'
  },
  education: [
    {
      id: 'edu-1',
      degree: 'Bachelor of Science in Computer Science',
      college: 'Stanford University',
      year: '2016 - 2020',
      cgpa: '3.92'
    }
  ],
  experience: [
    {
      id: 'exp-1',
      company: 'Vercel Labs',
      role: 'Lead Frontend Engineer',
      duration: '2022 - Present',
      description: 'Spearheaded the migration of legacy dashboard applications to Next.js App Router, resulting in a 40% improvement in Core Web Vitals. Designed and developed reusable UI component libraries using Tailwind CSS and TypeScript, reducing development cycle times by 25%. Mentored 5 junior engineers and established robust code review practices.'
    },
    {
      id: 'exp-2',
      company: 'Stripe',
      role: 'Software Engineer II',
      duration: '2020 - 2022',
      description: 'Implemented complex payment flows and subscription modules serving millions of active merchants. Optimized serverless functions API latency by 150ms through strategic database index tuning and caching layers. Collaborated with cross-functional product teams to design developer-centric API features.'
    }
  ],
  skills: 'React, Next.js, TypeScript, JavaScript, Node.js, Tailwind CSS, PostgreSQL, AWS, GraphQL, Docker, Git, REST APIs, System Design',
  projects: [
    {
      id: 'proj-1',
      name: 'CloudScribe AI',
      techStack: 'Next.js, Tailwind CSS, OpenAI API, PostgreSQL',
      description: 'A collaborative markdown editor featuring AI-assisted writing workflows. Built interactive editor components and real-time document synchronization.',
      githubLink: 'github.com/alexwright-dev/cloudscribe'
    },
    {
      id: 'proj-2',
      name: 'DevPulse Dashboard',
      techStack: 'React, Node.js, Express, Chart.js, Docker',
      description: 'An analytics engine aggregating GitHub API metrics to visualize team coding performance. Deployed on AWS ECS with automated CI/CD pipelines.',
      githubLink: 'github.com/alexwright-dev/devpulse'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect - Associate',
      organization: 'Amazon Web Services (AWS)',
      year: '2023'
    },
    {
      id: 'cert-2',
      name: 'Next.js Certified Developer',
      organization: 'Vercel',
      year: '2022'
    }
  ],
  coverLetter: {
    jobRole: 'Senior Frontend Engineer',
    companyName: 'Digital Heroes Co',
    reason: "I've been tracking Digital Heroes Co's trajectory in building open-source developer tooling and developer experience services. I believe my expertise in building high-performance Next.js architectures aligns perfectly with your engineering goals.",
    yearsOfExperience: '6'
  },
  selectedTemplate: 'modern'
};

export interface CoverLetterTemplate {
  id: string;
  name: string;
  generate: (data: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    jobRole: string;
    companyName: string;
    reason: string;
    yearsOfExperience: string;
  }) => string;
}

export const COVER_LETTER_TEMPLATES: CoverLetterTemplate[] = [
  {
    id: 'modern',
    name: 'Modern & Direct',
    generate: (data) => `Dear Hiring Team at ${data.companyName || '[Company Name]'},

I am writing to express my strong interest in the ${data.jobRole || '[Job Role]'} position at ${data.companyName || '[Company Name]'}. With ${data.yearsOfExperience || '[X]'} years of professional experience building modern web architectures and solving complex product challenges, I am eager to bring my background to your engineering team.

${data.reason || 'I have been following your growth and admire your commitment to building high-quality, developer-centric platforms. I believe my background aligns perfectly with your technical vision and core values.'}

Throughout my career, I have focused on writing clean, scalable code and delivering user-centric frontends. I have extensive practical experience with technologies like React, Next.js, and TypeScript, which matches the requirements of this role. I am particularly excited about the chance to collaborate with the team at ${data.companyName || '[Company Name]'} and contribute to your future success.

Thank you for your time and consideration. I look forward to the possibility of discussing how my experience can benefit your team.

Sincerely,

${data.fullName || '[Your Name]'}
${data.email || '[Your Email]'} | ${data.phone || '[Your Phone]'}
${data.location || '[Your Location]'}`
  },
  {
    id: 'formal',
    name: 'Formal & Professional',
    generate: (data) => `Dear Hiring Manager,

Please accept this letter as expression of my formal interest in the ${data.jobRole || '[Job Role]'} vacancy at ${data.companyName || '[Company Name]'}. I bring ${data.yearsOfExperience || '[X]'} years of software engineering experience, characterized by a dedicated focus on building performant, robust applications and maintaining standard-compliant code.

${data.reason || 'My interest in this position is motivated by your company\'s impressive track record and market leadership. I am confident that my technical skills and disciplined approach will serve your team\'s current objectives.'}

My professional background includes leading critical features, optimizing APIs, and working within agile environments. I prioritize visual clarity, rigorous testing, and seamless user experiences. The technical expectations for the ${data.jobRole || '[Job Role]'} role closely parallel my competencies, and I am prepared to deliver positive contributions immediately.

I would appreciate the opportunity to discuss my qualifications with you in more detail during an interview. Thank you for your review of my application materials.

Respectfully yours,

${data.fullName || '[Your Name]'}
Email: ${data.email || '[Your Email]'}
Phone: ${data.phone || '[Your Phone]'}
Location: ${data.location || '[Your Location]'}`
  },
  {
    id: 'enthusiastic',
    name: 'Enthusiastic & Creative',
    generate: (data) => `Hi there!

I was incredibly excited to see the opening for a ${data.jobRole || '[Job Role]'} at ${data.companyName || '[Company Name]'}! As someone who has spent the last ${data.yearsOfExperience || '[X]'} years designing interactive frontends and scaling services, I would jump at the chance to bring my energy and experience to your team.

${data.reason || 'Your products stand out in the industry for their design quality and speed. I would love to bring my skills to help scale these tools and build fantastic user experiences together.'}

My coding philosophy centers on simplicity, maintainability, and visual craft. I love solving tough problems in Next.js and building products that make a real impact. I am eager to join a team that shares this enthusiasm for coding excellence.

I\'d love to jump on a call and chat about how we can build something amazing together at ${data.companyName || '[Company Name]'}. Thanks for reading!

Best,

${data.fullName || '[Your Name]'}
${data.email || '[Your Email]'}
${data.phone || '[Your Phone]'}`
  }
];
