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

export default function ExecutiveResume({ data }: TemplateProps) {
  const fontClass = getFontClass(data.customization?.fontFamily || "lora");
  const sizeClasses = getFontSizeClass(data.customization?.fontSize || "base");
  const leadingClass = getLineSpacingClass(data.customization?.lineSpacing || "normal");
  const accentColor = getAccentColor(data, "#1e293b"); // Slate/Navy executive tone
  const sections = getOrderedSections(data);

  const renderSummary = () => {
    if (!data.summary) return null;
    return (
      <section className="mb-5 break-inside-avoid">
        <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-800 mb-2">
          Executive Summary
        </h2>
        <div className="w-full h-px bg-neutral-300 mb-3" />
        <p className={`${sizeClasses.body} text-neutral-700 leading-relaxed text-justify italic`}>
          {data.summary}
        </p>
      </section>
    );
  };

  const renderExperience = () => {
    if (!data.experience || data.experience.length === 0) return null;
    return (
      <section className="mb-5 break-inside-avoid">
        <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-800 mb-2">
          Professional Leadership
        </h2>
        <div className="w-full h-px bg-neutral-300 mb-3" />
        <div className="space-y-5">
          {data.experience.map((exp, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline font-bold text-neutral-900 mb-1">
                <span className="text-sm">{exp.role}</span>
                <span className="text-xs text-neutral-500 font-semibold">{exp.duration}</span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-neutral-700 font-semibold mb-2">
                <span>{exp.company}</span>
                {data.location && <span>{data.location}</span>}
              </div>
              <p className={`${sizeClasses.body} text-neutral-600 whitespace-pre-line leading-relaxed`}>
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
      <section className="mb-5 break-inside-avoid">
        <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-800 mb-2">
          Education & Credentials
        </h2>
        <div className="w-full h-px bg-neutral-300 mb-3" />
        <div className="space-y-3">
          {data.education.map((edu, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline font-bold text-neutral-900">
                <span className="text-sm">{edu.institution}</span>
                <span className="text-xs text-neutral-500 font-semibold">{edu.year}</span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-neutral-700">
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
      <section className="mb-5 break-inside-avoid">
        <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-800 mb-2">
          Key Professional Initiatives
        </h2>
        <div className="w-full h-px bg-neutral-300 mb-3" />
        <div className="space-y-4">
          {data.projects.map((project, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline font-bold text-neutral-900 mb-1">
                <span className="text-sm">{project.name}</span>
                {project.link && (
                  <span className="font-normal text-xs text-neutral-500">
                    {project.link.replace(/^https?:\/\//, "")}
                  </span>
                )}
              </div>
              <p className={`${sizeClasses.body} text-neutral-600 leading-relaxed mb-1.5`}>
                {project.description}
              </p>
              {project.technologies && project.technologies.length > 0 && (
                <div className={`${sizeClasses.sub} text-neutral-500 italic`}>
                  Core Expertise: {project.technologies.join(", ")}
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
      <section className="mb-5 break-inside-avoid">
        <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-800 mb-2">
          Areas of Expertise
        </h2>
        <div className="w-full h-px bg-neutral-300 mb-3" />
        <p className={`${sizeClasses.body} text-neutral-700 leading-relaxed`}>
          {data.skills.join(" • ")}
        </p>
      </section>
    );
  };

  const renderCertifications = () => {
    if (!data.certifications || data.certifications.length === 0) return null;
    return (
      <section className="mb-5 break-inside-avoid">
        <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-800 mb-2">
          Certifications
        </h2>
        <div className="w-full h-px bg-neutral-300 mb-3" />
        <div className="space-y-2">
          {data.certifications.map((cert, idx) => (
            <div key={idx} className="flex justify-between items-baseline text-neutral-800 break-inside-avoid">
              <span className={sizeClasses.body}>
                <span className="font-semibold text-neutral-950">{cert.name}</span> — {cert.issuer}
              </span>
              <span className="text-xs text-neutral-500 font-semibold">{cert.year}</span>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderAwards = () => {
    if (!data.awards || data.awards.length === 0) return null;
    return (
      <section className="mb-5 break-inside-avoid">
        <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-800 mb-2">
          Corporate Honors & Board Roles
        </h2>
        <div className="w-full h-px bg-neutral-300 mb-3" />
        <div className="space-y-3.5">
          {data.awards.map((award, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline text-neutral-800">
                <span className={sizeClasses.body}>
                  <span className="font-bold text-neutral-950">{award.name}</span> — {award.issuer}
                </span>
                <span className="text-xs text-neutral-500 font-semibold">{award.year}</span>
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
      <section className="mb-5 break-inside-avoid">
        <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-800 mb-2">
          Languages
        </h2>
        <div className="w-full h-px bg-neutral-300 mb-3" />
        <p className={`${sizeClasses.body} text-neutral-700 leading-normal`}>
          {data.languages.map((lang) => `${lang.name} (${lang.level})`).join(", ")}
        </p>
      </section>
    );
  };

  const renderInterests = () => {
    if (!data.interests || data.interests.length === 0) return null;
    return (
      <section className="mb-5 break-inside-avoid">
        <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-800 mb-2">
          Affiliations & Interests
        </h2>
        <div className="w-full h-px bg-neutral-300 mb-3" />
        <p className={`${sizeClasses.body} text-neutral-700 leading-normal`}>
          {data.interests.join(", ")}
        </p>
      </section>
    );
  };

  const renderReferences = () => {
    if (!data.references || data.references.length === 0) return null;
    return (
      <section className="mb-5 break-inside-avoid">
        <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-800 mb-2">
          Professional Endorsements
        </h2>
        <div className="w-full h-px bg-neutral-300 mb-3" />
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
    <div className={`p-10 bg-white text-neutral-800 min-h-full border-t-[8px] ${fontClass} ${leadingClass}`} style={{ borderTopColor: accentColor }}>
      {/* Executive Header */}
      <header className="mb-6 pb-4 border-b-2 border-neutral-200 break-inside-avoid flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 uppercase mb-1">
          {data.name || "YOUR NAME"}
        </h1>
        {data.title && (
          <p className="text-xs font-semibold tracking-widest uppercase mb-4 text-neutral-600">
            {data.title}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-3 text-xs text-neutral-600 font-medium">
          {data.location && <span>{data.location}</span>}
          {data.phone && <span>• {data.phone}</span>}
          {data.email && (
            <span>
              • <a href={`mailto:${data.email}`} className="hover:underline">{data.email}</a>
            </span>
          )}
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
