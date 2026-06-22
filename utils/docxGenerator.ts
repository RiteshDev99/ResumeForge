import { ResumeData } from '../types/resume';

/**
 * Generates an editable Microsoft Word (.doc / .docx) file from resume data
 * styled exactly like the user's professional ATS reference resume.
 */
export function generateDocxResume(data: ResumeData, filename: string) {
  // Helper to convert markdown bold (**text**) to HTML <strong> tag
  const formatMarkdownBold = (text: string) => {
    return (text || '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  // Parse skills
  const parseSkills = (skillsString: string) => {
    if (skillsString && skillsString.includes(':')) {
      const categories = skillsString.split(/[;\n]/).filter(Boolean);
      return categories.map(cat => {
        const parts = cat.split(':');
        return {
          category: parts[0].trim(),
          skills: parts[1] ? parts[1].trim() : ''
        };
      }).filter(c => c.category && c.skills);
    }
    return [{ category: 'Skills', skills: skillsString }];
  };

  const skillsList = parseSkills(data.skills);

  // Construct contact details row in 2 centered lines for Word
  const line1: string[] = [];
  if (data.personalInfo.phone) {
    line1.push(`•  ${data.personalInfo.phone}`);
  }
  if (data.personalInfo.email) {
    line1.push(`•  <a href="mailto:${data.personalInfo.email}">${data.personalInfo.email}</a>`);
  }

  const line2: string[] = [];
  if (data.personalInfo.github) {
    const cleanGithub = data.personalInfo.github.replace(/^https?:\/\//, '');
    const url = data.personalInfo.github.startsWith('http') ? data.personalInfo.github : `https://${data.personalInfo.github}`;
    line2.push(`<a href="${url}">${cleanGithub}</a>`);
  }
  if (data.personalInfo.linkedin) {
    const cleanLinkedin = data.personalInfo.linkedin.replace(/^https?:\/\//, '');
    const url = data.personalInfo.linkedin.startsWith('http') ? data.personalInfo.linkedin : `https://${data.personalInfo.linkedin}`;
    line2.push(`<a href="${url}">${cleanLinkedin}</a>`);
  }

  const line1Html = line1.join('  ');
  const line2Html = line2.join('  •  ');
  const contactRowHtml = `
    <div class="contact-row">${line1Html}</div>
    <div class="contact-row" style="margin-top: 2pt; margin-bottom: 12pt;">${line2Html}</div>
  `;

  // Construct Experience HTML with dual table layouts for clean left-right alignment in Word
  let experienceHtml = '';
  if (data.experience.length > 0) {
    experienceHtml = `
      <div class="section-title">Experience</div>
      ${data.experience.map(exp => {
        const hasLocationInCompany = exp.company.includes(',') || exp.company.toLowerCase().includes('remote');
        const displayLocation = hasLocationInCompany ? '' : 'Remote';

        return `
          <div class="item-block">
            <table class="item-table" width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td class="item-header" align="left" style="font-weight: bold; font-size: 10.5pt;">${exp.company}</td>
                <td class="item-meta" align="right" style="font-size: 10pt; font-weight: normal;">${displayLocation}</td>
              </tr>
              <tr>
                <td class="item-sub" align="left" style="font-size: 10pt; font-style: italic; color: #333;">${exp.role}</td>
                <td class="item-meta" align="right" style="font-size: 10pt;">${exp.duration}</td>
              </tr>
            </table>
            <ul class="bullet-list">
              ${(exp.description || '').split('\n').map(line => {
                const cleanLine = line.replace(/^[•\-\s\*]+/, '').trim();
                return cleanLine ? `<li>${formatMarkdownBold(cleanLine)}</li>` : '';
              }).filter(Boolean).join('')}
            </ul>
          </div>
        `;
      }).join('')}
    `;
  }

  // Construct Projects HTML
  let projectsHtml = '';
  if (data.projects.length > 0) {
    projectsHtml = `
      <div class="section-title">Projects</div>
      ${data.projects.map(proj => {
        const parts = proj.name.split(/\s+[-—]\s+/);
        let nameHtml = '';
        if (parts.length > 1) {
          nameHtml = `<span style="font-weight: bold;">${parts[0]}</span> — <span style="font-style: italic;">${parts.slice(1).join(' — ')}</span>`;
        } else {
          nameHtml = `<span style="font-weight: bold;">${proj.name}</span>`;
        }

        const isGithub = proj.githubLink && (proj.githubLink.includes('github.com') || proj.githubLink.includes('github'));
        const linkLabel = isGithub ? 'GitHub' : 'Live';
        const linkHtml = proj.githubLink ? ` <span class="link-span">[<a href="${proj.githubLink.startsWith('http') ? proj.githubLink : `https://${proj.githubLink}`}">${linkLabel}</a>]</span>` : '';
        const techStackHtml = proj.techStack ? `<div class="tech-stack">${proj.techStack.split(',').map(s => s.trim()).join(' · ')}</div>` : '';

        return `
          <div class="item-block">
            <div class="item-header">• ${nameHtml}${linkHtml}</div>
            ${techStackHtml}
            <div class="project-desc">${formatMarkdownBold(proj.description || '')}</div>
          </div>
        `;
      }).join('')}
    `;
  }

  // Construct Skills HTML
  let skillsHtml = '';
  if (skillsList.length > 0) {
    skillsHtml = `
      <div class="section-title">Skills</div>
      <ul class="skills-list">
        ${skillsList.map(item => `
          <li><span class="skill-category">• ${item.category}</span>: ${item.skills}</li>
        `).join('')}
      </ul>
    `;
  }

  // Construct Education HTML
  let educationHtml = '';
  if (data.education.length > 0) {
    educationHtml = `
      <div class="section-title">Education</div>
      ${data.education.map(edu => `
        <div class="item-block">
          <table class="item-table" width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td class="item-header" align="left" style="font-weight: bold; font-size: 10.5pt;">${edu.college}</td>
              <td class="item-meta" align="right" style="font-size: 10pt;"></td>
            </tr>
            <tr>
              <td class="item-sub" align="left" style="font-size: 10pt; color: #333; font-style: normal;">${edu.degree} ${edu.cgpa ? `| GPA: ${edu.cgpa}` : ''}</td>
              <td class="item-meta" align="right" style="font-size: 10pt;">${edu.year}</td>
            </tr>
          </table>
        </div>
      `).join('')}
    `;
  }

  const htmlString = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" 
          xmlns:w="urn:schemas-microsoft-com:office:word" 
          xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <!--[if gte mso 9]>
      <xml>
        <w:WordDocument>
          <w:View>Print</w:View>
          <w:Zoom>100</w:Zoom>
          <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
      </xml>
      <![endif]-->
      <meta charset="utf-8">
      <title>${data.personalInfo.fullName || 'Resume'}</title>
      <style>
        @page {
          size: 8.5in 11in;
          margin: 0.75in 0.75in 0.75in 0.75in;
        }
        body {
          font-family: "Times New Roman", Times, serif;
          font-size: 10.5pt;
          line-height: 1.25;
          color: #000000;
        }
        h1 {
          font-size: 18pt;
          font-weight: bold;
          text-align: center;
          margin: 0 0 2pt 0;
        }
        .contact-row {
          text-align: center;
          font-size: 9.5pt;
          margin-bottom: 2pt;
        }
        .section-title {
          font-size: 11pt;
          font-weight: bold;
          border-top: 1px solid #000000;
          margin-top: 12pt;
          margin-bottom: 6pt;
          padding-top: 2pt;
        }
        .item-block {
          margin-bottom: 8pt;
        }
        .item-table {
          width: 100%;
          margin-bottom: 2pt;
        }
        .bullet-list {
          margin-top: 2pt;
          margin-bottom: 4pt;
          padding-left: 18pt;
        }
        .bullet-list li {
          margin-bottom: 2pt;
          font-size: 10pt;
        }
        .tech-stack {
          font-weight: bold;
          font-size: 9.5pt;
          margin-top: 1pt;
          margin-bottom: 2pt;
        }
        .project-desc {
          font-size: 10pt;
          line-height: 1.2;
        }
        .skills-list {
          margin-top: 2pt;
          margin-bottom: 4pt;
          padding-left: 0;
          list-style-type: none;
        }
        .skills-list li {
          margin-bottom: 3pt;
          font-size: 10pt;
        }
        .skill-category {
          font-weight: bold;
        }
        .link-span {
          font-size: 9pt;
          font-weight: normal;
        }
        a {
          color: #2563eb;
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <h1>${data.personalInfo.fullName || 'Your Name'}</h1>
      ${contactRowHtml}
      
      ${data.personalInfo.summary ? `
        <div class="section-title">Professional Summary</div>
        <div style="margin-bottom: 10pt; font-size: 10pt; text-align: justify;">${formatMarkdownBold(data.personalInfo.summary)}</div>
      ` : ''}

      ${experienceHtml}
      ${projectsHtml}
      ${skillsHtml}
      ${educationHtml}
    </body>
    </html>
  `;

  // Prepend byte order mark so Word correctly identifies UTF-8 characters
  const blob = new Blob(['\ufeff' + htmlString], {
    type: 'application/msword;charset=utf-8'
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
