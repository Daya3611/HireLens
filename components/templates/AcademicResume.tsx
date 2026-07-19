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

export default function AcademicResume({ data }: TemplateProps) {
  // Academic CVs are traditionally serif (Times/Georgia) and highly clean
  const fontClass = getFontClass(data.customization?.fontFamily || "serif");
  const sizeClasses = getFontSizeClass(data.customization?.fontSize || "base");
  const leadingClass = getLineSpacingClass(data.customization?.lineSpacing || "normal");
  const sections = getOrderedSections(data);

  // For Academic resumes, we ensure "education" is rendered first.
  // We can filter out education from the normal section list, render it at the top,
  // and render the rest below. This satisfies "education first".
  const orderedSections = getOrderedSections(data);
  const topSections = ["education"];
  const otherSections = orderedSections.filter((s) => s !== "education");

  const renderSummary = () => {
    if (!data.summary) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-800 pb-0.5 mb-1.5">
          Research Interests & Statement
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
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-800 pb-0.5 mb-2">
          Academic Appointments & Experience
        </h2>
        <div className="space-y-3">
          {data.experience.map((exp, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline text-neutral-950 font-bold">
                <span className={sizeClasses.body}>{exp.role}</span>
                <span className={`${sizeClasses.sub} font-semibold text-neutral-600`}>{exp.duration}</span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-neutral-700 italic mb-1.5">
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
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-800 pb-0.5 mb-2">
          Education
        </h2>
        <div className="space-y-3">
          {data.education.map((edu, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline text-neutral-950 font-bold">
                <span className={sizeClasses.body}>{edu.institution}</span>
                <span className={`${sizeClasses.sub} font-semibold text-neutral-600`}>{edu.year}</span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-neutral-750">
                <span className="italic">{edu.degree}</span>
                {edu.gpa && <span>GPA: {edu.gpa}</span>}
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
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-800 pb-0.5 mb-2">
          Research Grants & Selected Projects
        </h2>
        <div className="space-y-3">
          {data.projects.map((project, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline font-bold text-neutral-950 mb-0.5">
                <span className={sizeClasses.body}>{project.name}</span>
                {project.link && (
                  <span className={`${sizeClasses.sub} font-normal text-neutral-500`}>
                    {project.link.replace(/^https?:\/\//, "")}
                  </span>
                )}
              </div>
              <p className={`${sizeClasses.body} text-neutral-700 whitespace-pre-line leading-relaxed mb-1.5`}>
                {project.description}
              </p>
              {project.technologies && project.technologies.length > 0 && (
                <div className={`${sizeClasses.sub} text-neutral-600 italic`}>
                  Key Tools / Methodologies: {project.technologies.join(", ")}
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
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-800 pb-0.5 mb-1.5">
          Research Expertise & Methods
        </h2>
        <p className={`${sizeClasses.body} text-neutral-800 leading-relaxed`}>
          {data.skills.join(", ")}
        </p>
      </section>
    );
  };

  const renderCertifications = () => {
    if (!data.certifications || data.certifications.length === 0) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-800 pb-0.5 mb-2">
          Affiliations & Teaching Certifications
        </h2>
        <div className="space-y-1">
          {data.certifications.map((cert, idx) => (
            <div key={idx} className="flex justify-between items-baseline text-neutral-800 break-inside-avoid">
              <span className={sizeClasses.body}>
                <span className="font-semibold">{cert.name}</span> — {cert.issuer}
              </span>
              <span className={`${sizeClasses.sub} font-semibold text-neutral-600`}>{cert.year}</span>
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
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-800 pb-0.5 mb-2">
          Scholarships, Fellowships & Awards
        </h2>
        <div className="space-y-2">
          {data.awards.map((award, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline text-neutral-800 mb-0.5">
                <span className={sizeClasses.body}>
                  <span className="font-bold">{award.name}</span> — {award.issuer}
                </span>
                <span className={`${sizeClasses.sub} font-semibold text-neutral-600`}>{award.year}</span>
              </div>
              {award.description && (
                <p className={`${sizeClasses.sub} text-neutral-600`}>{award.description}</p>
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
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-800 pb-0.5 mb-1.5">
          Languages
        </h2>
        <p className={`${sizeClasses.body} text-neutral-800 leading-relaxed`}>
          {data.languages.map((lang) => `${lang.name} (${lang.level})`).join(", ")}
        </p>
      </section>
    );
  };

  const renderInterests = () => {
    if (!data.interests || data.interests.length === 0) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-800 pb-0.5 mb-1.5">
          Interests
        </h2>
        <p className={`${sizeClasses.body} text-neutral-800 leading-relaxed`}>
          {data.interests.join(", ")}
        </p>
      </section>
    );
  };

  const renderReferences = () => {
    if (!data.references || data.references.length === 0) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-800 pb-0.5 mb-2">
          Academic References
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {data.references.map((ref, idx) => (
            <div key={idx} className="text-neutral-800 break-inside-avoid">
              <div className="font-bold text-sm text-neutral-950">{ref.name}</div>
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
    <div className={`p-10 bg-white text-neutral-950 min-h-full ${fontClass} ${leadingClass}`}>
      {/* Classic CV Centered Header */}
      <header className="text-center mb-6 break-inside-avoid">
        <h1 className="text-2xl font-bold tracking-wide uppercase text-neutral-900 mb-1">
          {data.name || "YOUR NAME"}
        </h1>
        {data.title && (
          <p className="text-xs font-semibold tracking-widest text-neutral-600 uppercase mb-3">
            {data.title}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-neutral-500 font-medium">
          {data.location && <span>{data.location}</span>}
          {data.phone && <span>| {data.phone}</span>}
          {data.email && (
            <span>
              | <a href={`mailto:${data.email}`} className="hover:underline">{data.email}</a>
            </span>
          )}
          {data.website && (
            <span>
              | <a href={data.website} className="hover:underline">{data.website.replace(/^https?:\/\//, "")}</a>
            </span>
          )}
          {data.linkedin && (
            <span>
              | <a href={data.linkedin} className="hover:underline">linkedin.com/in/{data.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")}</a>
            </span>
          )}
        </div>
      </header>

      {/* Render sections in order, Education first */}
      <main className="space-y-4">
        {topSections.map((sectionId) => (
          <div key={sectionId}>
            {renderSection(sectionId)}
          </div>
        ))}
        {otherSections.map((sectionId) => (
          <div key={sectionId}>
            {renderSection(sectionId)}
          </div>
        ))}
      </main>
    </div>
  );
}
