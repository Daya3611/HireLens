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

export default function MinimalWhite({ data }: TemplateProps) {
  const fontClass = getFontClass(data.customization?.fontFamily || "sans");
  const sizeClasses = getFontSizeClass(data.customization?.fontSize);
  const leadingClass = getLineSpacingClass(data.customization?.lineSpacing);
  const sections = getOrderedSections(data);

  const renderSummary = () => {
    if (!data.summary) return null;
    return (
      <section className="mb-6 break-inside-avoid">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
          Summary
        </h2>
        <p className={`${sizeClasses.body} text-neutral-800 leading-relaxed text-justify`}>
          {data.summary}
        </p>
      </section>
    );
  };

  const renderExperience = () => {
    if (!data.experience || data.experience.length === 0) return null;
    return (
      <section className="mb-6 break-inside-avoid">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">
          Experience
        </h2>
        <div className="space-y-4">
          {data.experience.map((exp, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline font-bold text-neutral-900 mb-0.5">
                <span className={sizeClasses.body}>{exp.role}</span>
                <span className={`${sizeClasses.sub} text-neutral-500 font-normal`}>{exp.duration}</span>
              </div>
              <div className="text-xs text-neutral-600 mb-2">{exp.company}</div>
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
      <section className="mb-6 break-inside-avoid">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">
          Education
        </h2>
        <div className="space-y-3">
          {data.education.map((edu, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline font-bold text-neutral-900">
                <span className={sizeClasses.body}>{edu.institution}</span>
                <span className={`${sizeClasses.sub} text-neutral-500 font-normal`}>{edu.year}</span>
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
      <section className="mb-6 break-inside-avoid">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">
          Projects
        </h2>
        <div className="space-y-4">
          {data.projects.map((project, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline font-bold text-neutral-900 mb-0.5">
                <span className={sizeClasses.body}>{project.name}</span>
                {project.link && (
                  <span className={`${sizeClasses.sub} text-neutral-400 font-normal`}>
                    {project.link.replace(/^https?:\/\//, "")}
                  </span>
                )}
              </div>
              <p className={`${sizeClasses.body} text-neutral-700 whitespace-pre-line leading-relaxed mb-2`}>
                {project.description}
              </p>
              {project.technologies && project.technologies.length > 0 && (
                <div className={`${sizeClasses.sub} text-neutral-500`}>
                  <span className="font-semibold text-neutral-600">Technologies:</span> {project.technologies.join(", ")}
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
      <section className="mb-6 break-inside-avoid">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
          Skills
        </h2>
        <p className={`${sizeClasses.body} text-neutral-700 leading-relaxed`}>
          {data.skills.join("  /  ")}
        </p>
      </section>
    );
  };

  const renderCertifications = () => {
    if (!data.certifications || data.certifications.length === 0) return null;
    return (
      <section className="mb-6 break-inside-avoid">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">
          Certifications
        </h2>
        <div className="space-y-1.5">
          {data.certifications.map((cert, idx) => (
            <div key={idx} className="flex justify-between items-baseline text-neutral-850 break-inside-avoid">
              <span className={sizeClasses.body}>
                <span className="font-semibold">{cert.name}</span> — {cert.issuer}
              </span>
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
      <section className="mb-6 break-inside-avoid">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">
          Awards
        </h2>
        <div className="space-y-2">
          {data.awards.map((award, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline text-neutral-850">
                <span className={sizeClasses.body}>
                  <span className="font-bold">{award.name}</span> — {award.issuer}
                </span>
                <span className={`${sizeClasses.sub} text-neutral-500`}>{award.year}</span>
              </div>
              {award.description && (
                <p className={`${sizeClasses.sub} text-neutral-500 mt-0.5`}>{award.description}</p>
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
      <section className="mb-6 break-inside-avoid">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
          Languages
        </h2>
        <p className={`${sizeClasses.body} text-neutral-700 leading-relaxed`}>
          {data.languages.map((lang) => `${lang.name} (${lang.level})`).join("  /  ")}
        </p>
      </section>
    );
  };

  const renderInterests = () => {
    if (!data.interests || data.interests.length === 0) return null;
    return (
      <section className="mb-6 break-inside-avoid">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
          Interests
        </h2>
        <p className={`${sizeClasses.body} text-neutral-700 leading-relaxed`}>
          {data.interests.join("  /  ")}
        </p>
      </section>
    );
  };

  const renderReferences = () => {
    if (!data.references || data.references.length === 0) return null;
    return (
      <section className="mb-6 break-inside-avoid">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">
          References
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {data.references.map((ref, idx) => (
            <div key={idx} className="text-neutral-800 break-inside-avoid">
              <div className="font-bold text-sm text-neutral-900">{ref.name}</div>
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
    <div className={`p-12 bg-white text-neutral-950 min-h-full ${fontClass} ${leadingClass}`}>
      {/* Centered Minimal Header */}
      <header className="mb-8 flex flex-col items-center break-inside-avoid text-center">
        <h1 className="text-2xl font-light tracking-widest text-neutral-900 uppercase mb-2">
          {data.name || "YOUR NAME"}
        </h1>
        {data.title && (
          <p className="text-xs font-semibold tracking-wider text-neutral-400 uppercase mb-4">
            {data.title}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-neutral-500">
          {data.email && <a href={`mailto:${data.email}`} className="hover:underline">{data.email}</a>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>{data.location}</span>}
          {data.website && (
            <a href={data.website} className="hover:underline">{data.website.replace(/^https?:\/\//, "")}</a>
          )}
          {data.linkedin && (
            <a href={data.linkedin} className="hover:underline">linkedin.com/in/{data.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")}</a>
          )}
        </div>
      </header>

      {/* Render sections in order */}
      <main className="max-w-2xl mx-auto space-y-5">
        {sections.map((sectionId) => (
          <div key={sectionId}>
            {renderSection(sectionId)}
          </div>
        ))}
      </main>
    </div>
  );
}
