import { ResumeData } from "@/types/resume";
import {
  getFontClass,
  getFontSizeClass,
  getLineSpacingClass,
  getOrderedSections,
  isSectionVisible,
  getAccentColor
} from "./templateUtils";

interface TemplateProps {
  data: ResumeData;
}

export default function DeveloperResume({ data }: TemplateProps) {
  const fontClass = getFontClass(data.customization?.fontFamily || "mono"); // Default mono font for dev feel
  const sizeClasses = getFontSizeClass(data.customization?.fontSize || "sm");
  const leadingClass = getLineSpacingClass(data.customization?.lineSpacing || "snug");
  const accentColor = getAccentColor(data, "#0284c7"); // Dev blue/cyan accent
  const sections = getOrderedSections(data);

  const renderSummary = () => {
    if (!data.summary) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5" style={{ color: accentColor }}>
          <span>&gt;</span> _summary
        </h2>
        <p className={`${sizeClasses.body} text-neutral-700 leading-relaxed`}>
          {data.summary}
        </p>
      </section>
    );
  };

  const renderExperience = () => {
    if (!data.experience || data.experience.length === 0) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5" style={{ color: accentColor }}>
          <span>&gt;</span> _experience
        </h2>
        <div className="space-y-4">
          {data.experience.map((exp, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline font-bold text-neutral-900 mb-0.5">
                <span className={sizeClasses.body}>{exp.role}</span>
                <span className={`${sizeClasses.sub} text-neutral-500 font-semibold`}>{exp.duration}</span>
              </div>
              <div className="text-xs text-neutral-600 font-bold mb-1">{exp.company}</div>
              <p className={`${sizeClasses.body} text-neutral-700 whitespace-pre-line leading-relaxed`}>
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderEducation = () => {
    if (!data.education || data.education.length === 0) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5" style={{ color: accentColor }}>
          <span>&gt;</span> _education
        </h2>
        <div className="space-y-3">
          {data.education.map((edu, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline font-bold text-neutral-900">
                <span className={sizeClasses.body}>{edu.institution}</span>
                <span className={`${sizeClasses.sub} text-neutral-500 font-semibold`}>{edu.year}</span>
              </div>
              <div className="text-xs text-neutral-600">
                {edu.degree} {edu.gpa && `• GPA: ${edu.gpa}`}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderProjects = () => {
    if (!data.projects || data.projects.length === 0) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5" style={{ color: accentColor }}>
          <span>&gt;</span> _projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.projects.map((project, idx) => (
            <div key={idx} className="border border-neutral-200 rounded-xl p-3.5 break-inside-avoid bg-neutral-50 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-bold text-neutral-900 text-sm">{project.name}</span>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] underline hover:text-neutral-900"
                      style={{ color: accentColor }}
                    >
                      source &rarr;
                    </a>
                  )}
                </div>
                <p className={`${sizeClasses.sub} text-neutral-600 leading-relaxed mb-2.5`}>
                  {project.description}
                </p>
              </div>
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-neutral-200/60 text-neutral-850"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderSkills = () => {
    if (!data.skills || data.skills.length === 0) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5" style={{ color: accentColor }}>
          <span>&gt;</span> _skills_stack
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {data.skills.map((skill, idx) => (
            <span
              key={idx}
              className="text-[11px] font-bold font-mono px-2.5 py-1 rounded bg-neutral-900 text-neutral-100 shadow-sm border border-neutral-850"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    );
  };

  const renderCertifications = () => {
    if (!data.certifications || data.certifications.length === 0) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5" style={{ color: accentColor }}>
          <span>&gt;</span> _certifications
        </h2>
        <div className="space-y-1.5">
          {data.certifications.map((cert, idx) => (
            <div key={idx} className="flex justify-between items-baseline text-neutral-800 break-inside-avoid">
              <span className={sizeClasses.body}>
                <span className="font-semibold text-neutral-900">{cert.name}</span> — {cert.issuer}
              </span>
              <span className={`${sizeClasses.sub} text-neutral-500 font-semibold`}>{cert.year}</span>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderAwards = () => {
    if (!data.awards || data.awards.length === 0) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5" style={{ color: accentColor }}>
          <span>&gt;</span> _awards
        </h2>
        <div className="space-y-2">
          {data.awards.map((award, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline text-neutral-800">
                <span className={sizeClasses.body}>
                  <span className="font-bold text-neutral-900">{award.name}</span> — {award.issuer}
                </span>
                <span className={`${sizeClasses.sub} text-neutral-500 font-semibold`}>{award.year}</span>
              </div>
              {award.description && (
                <p className={`${sizeClasses.sub} text-neutral-600 mt-0.5`}>{award.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderLanguages = () => {
    if (!data.languages || data.languages.length === 0) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5" style={{ color: accentColor }}>
          <span>&gt;</span> _languages
        </h2>
        <p className={`${sizeClasses.body} text-neutral-800 leading-normal`}>
          {data.languages.map((lang) => `${lang.name} (${lang.level})`).join(", ")}
        </p>
      </section>
    );
  };

  const renderInterests = () => {
    if (!data.interests || data.interests.length === 0) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5" style={{ color: accentColor }}>
          <span>&gt;</span> _interests
        </h2>
        <p className={`${sizeClasses.body} text-neutral-800 leading-normal`}>
          {data.interests.join(", ")}
        </p>
      </section>
    );
  };

  const renderReferences = () => {
    if (!data.references || data.references.length === 0) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5" style={{ color: accentColor }}>
          <span>&gt;</span> _references
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {data.references.map((ref, idx) => (
            <div key={idx} className="text-neutral-800 break-inside-avoid">
              <div className="font-semibold text-sm">{ref.name}</div>
              <div className="text-xs text-neutral-600">{ref.title}, {ref.company}</div>
              <div className="text-xs text-neutral-500 mt-0.5">{ref.contact}</div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderSection = (sectionId: string) => {
    if (!isSectionVisible(data, sectionId)) return null;
    switch (sectionId) {
      case "summary": return renderSummary();
      case "experience": return renderExperience();
      case "education": return renderEducation();
      case "projects": return renderProjects();
      case "skills": return renderSkills();
      case "certifications": return renderCertifications();
      case "awards": return renderAwards();
      case "languages": return renderLanguages();
      case "interests": return renderInterests();
      case "references": return renderReferences();
      default: return null;
    }
  };

  return (
    <div className={`p-8 bg-white text-neutral-800 min-h-full border border-neutral-200 rounded shadow-xs ${fontClass} ${leadingClass}`}>
      {/* Dev Header Layout */}
      <header className="mb-6 flex flex-col md:flex-row justify-between items-start border-b-2 border-neutral-900 pb-4 break-inside-avoid gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-950 mb-1 leading-none">
            {data.name || "YOUR NAME"}
          </h1>
          {data.title && (
            <p className="text-xs font-bold font-mono tracking-wide" style={{ color: accentColor }}>
              const role = "{data.title}";
            </p>
          )}
        </div>
        <div className="text-xs text-neutral-600 font-mono space-y-0.5 font-medium md:text-right">
          {data.email && (
            <div>
              email: <a href={`mailto:${data.email}`} className="hover:underline">{data.email}</a>
            </div>
          )}
          {data.phone && <div>tel: {data.phone}</div>}
          {data.location && <div>loc: {data.location}</div>}
          {data.website && (
            <div>
              web: <a href={data.website} className="hover:underline" style={{ color: accentColor }}>{data.website.replace(/^https?:\/\//, "")}</a>
            </div>
          )}
          {data.github && (
            <div>
              git: <a href={data.github} className="hover:underline" style={{ color: accentColor }}>github.com/{data.github.replace(/^https?:\/\/(www\.)?github\.com\//, "")}</a>
            </div>
          )}
        </div>
      </header>

      {/* Render sections in order */}
      <main className="space-y-4">
        {sections.map((sectionId) => (
          <div key={sectionId}>
            {renderSection(sectionId)}
          </div>
        ))}
      </main>
    </div>
  );
}
