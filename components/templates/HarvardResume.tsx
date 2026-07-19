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

export default function HarvardResume({ data }: TemplateProps) {
  // Harvard recommends Georgia or Times/Merriweather serif font
  const fontClass = getFontClass(data.customization?.fontFamily || "serif");
  const sizeClasses = getFontSizeClass(data.customization?.fontSize);
  const leadingClass = getLineSpacingClass(data.customization?.lineSpacing);
  const sections = getOrderedSections(data);

  const renderSummary = () => {
    if (!data.summary) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-neutral-800 pb-0.5 mb-1.5 text-neutral-900">
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
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-neutral-800 pb-0.5 mb-2 text-neutral-900">
          Work Experience
        </h2>
        <div className="space-y-3">
          {data.experience.map((exp, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline text-neutral-900">
                <span className={`${sizeClasses.body} font-bold`}>{exp.company}</span>
                <span className={`${sizeClasses.sub} font-semibold`}>{exp.duration}</span>
              </div>
              <div className="flex justify-between items-baseline text-neutral-700 italic mb-1">
                <span className={sizeClasses.body}>{exp.role}</span>
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
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-neutral-800 pb-0.5 mb-2 text-neutral-900">
          Education
        </h2>
        <div className="space-y-2">
          {data.education.map((edu, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline text-neutral-900">
                <span className={`${sizeClasses.body} font-bold`}>{edu.institution}</span>
                <span className={`${sizeClasses.sub} font-semibold`}>{edu.year}</span>
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
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-neutral-800 pb-0.5 mb-2 text-neutral-900">
          Projects & Activities
        </h2>
        <div className="space-y-3">
          {data.projects.map((project, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline text-neutral-900">
                <span className={`${sizeClasses.body} font-bold`}>
                  {project.name}
                </span>
                {project.link && (
                  <span className={`${sizeClasses.sub} text-neutral-500 font-normal`}>
                    {project.link.replace(/^https?:\/\//, "")}
                  </span>
                )}
              </div>
              <p className={`${sizeClasses.body} text-neutral-800 whitespace-pre-line leading-normal`}>
                {project.description}
              </p>
              {project.technologies && project.technologies.length > 0 && (
                <div className={`${sizeClasses.sub} text-neutral-600 italic mt-0.5`}>
                  Selected Technologies: {project.technologies.join(", ")}
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
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-neutral-800 pb-0.5 mb-1.5 text-neutral-900">
          Skills
        </h2>
        <p className={`${sizeClasses.body} text-neutral-800 leading-normal`}>
          <span className="font-bold">Skills:</span> {data.skills.join(", ")}
        </p>
      </section>
    );
  };

  const renderCertifications = () => {
    if (!data.certifications || data.certifications.length === 0) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-neutral-800 pb-0.5 mb-2 text-neutral-900">
          Certifications
        </h2>
        <div className="space-y-1">
          {data.certifications.map((cert, idx) => (
            <div key={idx} className="flex justify-between items-baseline text-neutral-800 break-inside-avoid">
              <span className={sizeClasses.body}>
                <span className="font-semibold">{cert.name}</span> — <span className="italic">{cert.issuer}</span>
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
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-neutral-800 pb-0.5 mb-2 text-neutral-900">
          Awards & Honors
        </h2>
        <div className="space-y-1">
          {data.awards.map((award, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline text-neutral-800">
                <span className={sizeClasses.body}>
                  <span className="font-bold">{award.name}</span> — {award.issuer}
                </span>
                <span className={`${sizeClasses.sub} font-semibold text-neutral-600`}>{award.year}</span>
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
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-neutral-800 pb-0.5 mb-1.5 text-neutral-900">
          Languages
        </h2>
        <p className={`${sizeClasses.body} text-neutral-800 leading-normal`}>
          <span className="font-bold">Languages:</span> {data.languages.map((lang) => `${lang.name} (${lang.level})`).join(", ")}
        </p>
      </section>
    );
  };

  const renderInterests = () => {
    if (!data.interests || data.interests.length === 0) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-neutral-800 pb-0.5 mb-1.5 text-neutral-900">
          Interests
        </h2>
        <p className={`${sizeClasses.body} text-neutral-800 leading-normal`}>
          <span className="font-bold">Interests:</span> {data.interests.join(", ")}
        </p>
      </section>
    );
  };

  const renderReferences = () => {
    if (!data.references || data.references.length === 0) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-neutral-800 pb-0.5 mb-2 text-neutral-900">
          References
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {data.references.map((ref, idx) => (
            <div key={idx} className="text-neutral-800 break-inside-avoid">
              <div className="font-bold text-sm">{ref.name}</div>
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
    <div className={`p-10 bg-white text-black min-h-full ${fontClass} ${leadingClass}`}>
      {/* Centered Harvard Header */}
      <header className="text-center mb-6 break-inside-avoid">
        <h1 className="text-2xl font-bold tracking-normal text-neutral-900 mb-1">
          {data.name || "YOUR NAME"}
        </h1>
        <div className="flex flex-wrap justify-center gap-1.5 text-xs text-neutral-700 font-medium">
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
