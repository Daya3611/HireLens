import { ResumeData } from "@/types/resume";
import {
  getFontClass,
  getFontSizeClass,
  getLineSpacingClass,
  getOrderedSections,
  isSectionVisible
} from "./templateUtils";

interface TemplateProps {
  data: ResumeData;
}

export default function ATSClassic({ data }: TemplateProps) {
  const fontClass = getFontClass(data.customization?.fontFamily);
  const sizeClasses = getFontSizeClass(data.customization?.fontSize);
  const leadingClass = getLineSpacingClass(data.customization?.lineSpacing);
  const sections = getOrderedSections(data);

  // Helper renderers for sections
  const renderSummary = () => {
    if (!data.summary) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <h2 className={`${sizeClasses.h4} uppercase tracking-wider border-b border-black pb-0.5 mb-1.5`}>
          Professional Summary
        </h2>
        <p className={`${sizeClasses.body} text-neutral-800 leading-normal text-justify`}>
          {data.summary}
        </p>
      </section>
    );
  };

  const renderExperience = () => {
    if (!data.experience || data.experience.length === 0) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <h2 className={`${sizeClasses.h4} uppercase tracking-wider border-b border-black pb-0.5 mb-2`}>
          Work Experience
        </h2>
        <div className="space-y-3">
          {data.experience.map((exp, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline font-bold text-neutral-900">
                <span className={sizeClasses.body}>{exp.role}</span>
                <span className={`${sizeClasses.sub} font-medium`}>{exp.duration}</span>
              </div>
              <div className="flex justify-between items-baseline italic text-neutral-700 mb-1">
                <span className={sizeClasses.body}>{exp.company}</span>
                {data.location && <span className={sizeClasses.sub}>{data.location}</span>}
              </div>
              <p className={`${sizeClasses.body} text-neutral-800 whitespace-pre-line leading-normal`}>
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
        <h2 className={`${sizeClasses.h4} uppercase tracking-wider border-b border-black pb-0.5 mb-2`}>
          Education
        </h2>
        <div className="space-y-2">
          {data.education.map((edu, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline font-bold text-neutral-900">
                <span className={sizeClasses.body}>{edu.institution}</span>
                <span className={`${sizeClasses.sub} font-medium`}>{edu.year}</span>
              </div>
              <div className="flex justify-between items-baseline text-neutral-700">
                <span className={`${sizeClasses.body} italic`}>{edu.degree}</span>
                {edu.gpa && <span className={sizeClasses.sub}>GPA: {edu.gpa}</span>}
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
        <h2 className={`${sizeClasses.h4} uppercase tracking-wider border-b border-black pb-0.5 mb-2`}>
          Projects
        </h2>
        <div className="space-y-3">
          {data.projects.map((project, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline font-bold text-neutral-900">
                <span className={sizeClasses.body}>
                  {project.name}
                  {project.link && (
                    <span className="font-normal text-neutral-500 ml-1 text-xs">
                      | {project.link}
                    </span>
                  )}
                </span>
              </div>
              <p className={`${sizeClasses.body} text-neutral-800 whitespace-pre-line mb-1`}>
                {project.description}
              </p>
              {project.technologies && project.technologies.length > 0 && (
                <div className={`${sizeClasses.sub} text-neutral-600`}>
                  <span className="font-semibold">Technologies:</span> {project.technologies.join(", ")}
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
        <h2 className={`${sizeClasses.h4} uppercase tracking-wider border-b border-black pb-0.5 mb-1.5`}>
          Skills
        </h2>
        <p className={`${sizeClasses.body} text-neutral-800 leading-normal`}>
          {data.skills.join(" • ")}
        </p>
      </section>
    );
  };

  const renderCertifications = () => {
    if (!data.certifications || data.certifications.length === 0) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <h2 className={`${sizeClasses.h4} uppercase tracking-wider border-b border-black pb-0.5 mb-2`}>
          Certifications
        </h2>
        <div className="space-y-1">
          {data.certifications.map((cert, idx) => (
            <div key={idx} className="flex justify-between items-baseline text-neutral-800 break-inside-avoid">
              <span className={sizeClasses.body}>
                <span className="font-semibold">{cert.name}</span> — {cert.issuer}
              </span>
              <span className={`${sizeClasses.sub} font-medium text-neutral-600`}>{cert.year}</span>
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
        <h2 className={`${sizeClasses.h4} uppercase tracking-wider border-b border-black pb-0.5 mb-2`}>
          Honors & Awards
        </h2>
        <div className="space-y-1">
          {data.awards.map((award, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline text-neutral-800">
                <span className={sizeClasses.body}>
                  <span className="font-semibold">{award.name}</span> — {award.issuer}
                </span>
                <span className={`${sizeClasses.sub} font-medium text-neutral-600`}>{award.year}</span>
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
        <h2 className={`${sizeClasses.h4} uppercase tracking-wider border-b border-black pb-0.5 mb-1.5`}>
          Languages
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
        <h2 className={`${sizeClasses.h4} uppercase tracking-wider border-b border-black pb-0.5 mb-1.5`}>
          Interests
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
        <h2 className={`${sizeClasses.h4} uppercase tracking-wider border-b border-black pb-0.5 mb-2`}>
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
    <div className={`p-8 bg-white text-black min-h-full ${fontClass} ${leadingClass}`}>
      {/* Header */}
      <header className="text-center mb-5 break-inside-avoid">
        <h1 className={`${sizeClasses.h1} font-bold tracking-wide uppercase mb-1`}>
          {data.name || "YOUR NAME"}
        </h1>
        {data.title && (
          <p className={`${sizeClasses.body} uppercase tracking-widest text-neutral-700 font-semibold mb-3`}>
            {data.title}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-3 text-xs text-neutral-600">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>• {data.phone}</span>}
          {data.location && <span>• {data.location}</span>}
          {data.website && (
            <span>
              • <a href={data.website} className="hover:underline">{data.website.replace(/^https?:\/\//, "")}</a>
            </span>
          )}
          {data.linkedin && (
            <span>
              • <a href={data.linkedin} className="hover:underline">linkedin.com/in/{data.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")}</a>
            </span>
          )}
          {data.github && (
            <span>
              • <a href={data.github} className="hover:underline">github.com/{data.github.replace(/^https?:\/\/(www\.)?github\.com\//, "")}</a>
            </span>
          )}
        </div>
      </header>

      {/* Render sections in order */}
      <main>
        {sections.map((sectionId) => (
          <div key={sectionId}>
            {renderSection(sectionId)}
          </div>
        ))}
      </main>
    </div>
  );
}
