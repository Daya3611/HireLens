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

export default function GoogleStyle({ data }: TemplateProps) {
  // Google applicants generally use clean sans-serif like Arial, Helvetica, or Inter
  const fontClass = getFontClass(data.customization?.fontFamily || "sans");
  const sizeClasses = getFontSizeClass(data.customization?.fontSize);
  const leadingClass = getLineSpacingClass(data.customization?.lineSpacing);
  const accentColor = getAccentColor(data, "#1a73e8"); // Google Blue accent
  const sections = getOrderedSections(data);

  const renderSummary = () => {
    if (!data.summary) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: accentColor }}>
          Summary
        </h2>
        <p className={`${sizeClasses.body} text-neutral-700 leading-relaxed text-justify`}>
          {data.summary}
        </p>
      </section>
    );
  };

  const renderExperience = () => {
    if (!data.experience || data.experience.length === 0) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: accentColor }}>
          Experience
        </h2>
        <div className="space-y-4">
          {data.experience.map((exp, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline text-neutral-900 font-bold">
                <span className={sizeClasses.body}>{exp.role}</span>
                <span className={`${sizeClasses.sub} font-medium text-neutral-500`}>{exp.duration}</span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-neutral-600 mb-1">
                <span>{exp.company}</span>
                {data.location && <span>{data.location}</span>}
              </div>
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
        <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: accentColor }}>
          Education
        </h2>
        <div className="space-y-3">
          {data.education.map((edu, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline text-neutral-900 font-bold">
                <span className={sizeClasses.body}>{edu.institution}</span>
                <span className={`${sizeClasses.sub} font-medium text-neutral-500`}>{edu.year}</span>
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
        <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: accentColor }}>
          Projects
        </h2>
        <div className="space-y-4">
          {data.projects.map((project, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline text-neutral-900 font-bold">
                <span className={sizeClasses.body}>
                  {project.name}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 font-normal text-xs hover:underline"
                      style={{ color: accentColor }}
                    >
                      | Link
                    </a>
                  )}
                </span>
              </div>
              <p className={`${sizeClasses.body} text-neutral-700 whitespace-pre-line leading-relaxed mb-1.5`}>
                {project.description}
              </p>
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded text-[10px] font-medium border border-neutral-200"
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
        <h2 className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: accentColor }}>
          Skills
        </h2>
        <p className={`${sizeClasses.body} text-neutral-700 leading-relaxed`}>
          {data.skills.join(" • ")}
        </p>
      </section>
    );
  };

  const renderCertifications = () => {
    if (!data.certifications || data.certifications.length === 0) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: accentColor }}>
          Certifications
        </h2>
        <div className="space-y-2">
          {data.certifications.map((cert, idx) => (
            <div key={idx} className="flex justify-between items-baseline break-inside-avoid">
              <div>
                <span className={`${sizeClasses.body} font-bold text-neutral-900`}>{cert.name}</span>
                <span className="text-neutral-500 text-xs"> — {cert.issuer}</span>
              </div>
              <span className={`${sizeClasses.sub} text-neutral-500`}>{cert.year}</span>
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
        <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: accentColor }}>
          Awards
        </h2>
        <div className="space-y-2">
          {data.awards.map((award, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className={`${sizeClasses.body} font-bold text-neutral-900`}>{award.name}</span>
                  <span className="text-neutral-500 text-xs"> — {award.issuer}</span>
                </div>
                <span className={`${sizeClasses.sub} text-neutral-500`}>{award.year}</span>
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
        <h2 className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: accentColor }}>
          Languages
        </h2>
        <p className={`${sizeClasses.body} text-neutral-700 leading-relaxed`}>
          {data.languages.map((lang) => `${lang.name} (${lang.level})`).join(", ")}
        </p>
      </section>
    );
  };

  const renderInterests = () => {
    if (!data.interests || data.interests.length === 0) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: accentColor }}>
          Interests
        </h2>
        <p className={`${sizeClasses.body} text-neutral-700 leading-relaxed`}>
          {data.interests.join(", ")}
        </p>
      </section>
    );
  };

  const renderReferences = () => {
    if (!data.references || data.references.length === 0) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: accentColor }}>
          References
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
    <div className={`p-10 bg-white text-neutral-800 min-h-full ${fontClass} ${leadingClass}`}>
      {/* Google Header */}
      <header className="mb-6 pb-4 border-b border-neutral-200 break-inside-avoid">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 mb-1.5">
          {data.name || "YOUR NAME"}
        </h1>
        {data.title && (
          <p className="text-sm font-semibold tracking-wider uppercase mb-3 text-neutral-600">
            {data.title}
          </p>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-500">
          {data.email && (
            <a href={`mailto:${data.email}`} className="hover:underline">
              {data.email}
            </a>
          )}
          {data.phone && <span>| {data.phone}</span>}
          {data.location && <span>| {data.location}</span>}
          {data.website && (
            <span>
              | <a href={data.website} className="hover:underline" style={{ color: accentColor }}>{data.website.replace(/^https?:\/\//, "")}</a>
            </span>
          )}
          {data.linkedin && (
            <span>
              | <a href={data.linkedin} className="hover:underline" style={{ color: accentColor }}>linkedin.com/in/{data.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")}</a>
            </span>
          )}
          {data.github && (
            <span>
              | <a href={data.github} className="hover:underline" style={{ color: accentColor }}>github.com/{data.github.replace(/^https?:\/\/(www\.)?github\.com\//, "")}</a>
            </span>
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
