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

export default function MicrosoftStyle({ data }: TemplateProps) {
  const fontClass = getFontClass(data.customization?.fontFamily || "sans");
  const sizeClasses = getFontSizeClass(data.customization?.fontSize);
  const leadingClass = getLineSpacingClass(data.customization?.lineSpacing);
  const accentColor = getAccentColor(data, "#0078d4"); // Microsoft Blue accent
  const sections = getOrderedSections(data);

  const renderSummary = () => {
    if (!data.summary) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <div className="flex items-center gap-2 mb-1.5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
            Professional Summary
          </h2>
          <div className="flex-1 h-px bg-neutral-200" />
        </div>
        <p className={`${sizeClasses.body} text-neutral-700 leading-normal text-justify`}>
          {data.summary}
        </p>
      </section>
    );
  };

  const renderExperience = () => {
    if (!data.experience || data.experience.length === 0) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
            Experience
          </h2>
          <div className="flex-1 h-px bg-neutral-200" />
        </div>
        <div className="space-y-3.5">
          {data.experience.map((exp, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline font-bold text-neutral-900">
                <span className={sizeClasses.body}>{exp.role}</span>
                <span className={`${sizeClasses.sub} text-neutral-500 font-medium`}>{exp.duration}</span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-neutral-600 mb-1">
                <span className="font-semibold">{exp.company}</span>
                {data.location && <span>{data.location}</span>}
              </div>
              <p className={`${sizeClasses.body} text-neutral-700 whitespace-pre-line leading-normal`}>
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
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
            Education
          </h2>
          <div className="flex-1 h-px bg-neutral-200" />
        </div>
        <div className="space-y-2">
          {data.education.map((edu, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline font-bold text-neutral-900">
                <span className={sizeClasses.body}>{edu.institution}</span>
                <span className={`${sizeClasses.sub} text-neutral-500 font-medium`}>{edu.year}</span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-neutral-600">
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
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
            Projects
          </h2>
          <div className="flex-1 h-px bg-neutral-200" />
        </div>
        <div className="space-y-3.5">
          {data.projects.map((project, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline font-bold text-neutral-900">
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
              <p className={`${sizeClasses.body} text-neutral-700 whitespace-pre-line leading-normal mb-1`}>
                {project.description}
              </p>
              {project.technologies && project.technologies.length > 0 && (
                <div className={`${sizeClasses.sub} text-neutral-500`}>
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
        <div className="flex items-center gap-2 mb-1.5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
            Skills
          </h2>
          <div className="flex-1 h-px bg-neutral-200" />
        </div>
        <p className={`${sizeClasses.body} text-neutral-700 leading-normal`}>
          {data.skills.join(" • ")}
        </p>
      </section>
    );
  };

  const renderCertifications = () => {
    if (!data.certifications || data.certifications.length === 0) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
            Certifications
          </h2>
          <div className="flex-1 h-px bg-neutral-200" />
        </div>
        <div className="space-y-1.5">
          {data.certifications.map((cert, idx) => (
            <div key={idx} className="flex justify-between items-baseline text-neutral-800 break-inside-avoid">
              <span className={sizeClasses.body}>
                <span className="font-semibold">{cert.name}</span> — {cert.issuer}
              </span>
              <span className={`${sizeClasses.sub} text-neutral-500 font-medium`}>{cert.year}</span>
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
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
            Awards
          </h2>
          <div className="flex-1 h-px bg-neutral-200" />
        </div>
        <div className="space-y-2">
          {data.awards.map((award, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline text-neutral-800">
                <span className={sizeClasses.body}>
                  <span className="font-bold">{award.name}</span> — {award.issuer}
                </span>
                <span className={`${sizeClasses.sub} text-neutral-500 font-medium`}>{award.year}</span>
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
        <div className="flex items-center gap-2 mb-1.5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
            Languages
          </h2>
          <div className="flex-1 h-px bg-neutral-200" />
        </div>
        <p className={`${sizeClasses.body} text-neutral-700 leading-normal`}>
          {data.languages.map((lang) => `${lang.name} (${lang.level})`).join(", ")}
        </p>
      </section>
    );
  };

  const renderInterests = () => {
    if (!data.interests || data.interests.length === 0) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <div className="flex items-center gap-2 mb-1.5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
            Interests
          </h2>
          <div className="flex-1 h-px bg-neutral-200" />
        </div>
        <p className={`${sizeClasses.body} text-neutral-700 leading-normal`}>
          {data.interests.join(", ")}
        </p>
      </section>
    );
  };

  const renderReferences = () => {
    if (!data.references || data.references.length === 0) return null;
    return (
      <section className="mb-4 break-inside-avoid">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
            References
          </h2>
          <div className="flex-1 h-px bg-neutral-200" />
        </div>
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
      {/* Microsoft Corporate Header */}
      <header className="mb-5 pb-3 border-b-2 break-inside-avoid flex justify-between items-start" style={{ borderBottomColor: accentColor }}>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-1 tracking-tight">
            {data.name || "YOUR NAME"}
          </h1>
          {data.title && (
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: accentColor }}>
              {data.title}
            </p>
          )}
        </div>
        <div className="text-right text-xs text-neutral-500 space-y-0.5 font-medium">
          {data.location && <div>{data.location}</div>}
          {data.phone && <div>{data.phone}</div>}
          {data.email && <div><a href={`mailto:${data.email}`} className="hover:underline">{data.email}</a></div>}
          {data.website && (
            <div>
              <a href={data.website} className="hover:underline">{data.website.replace(/^https?:\/\//, "")}</a>
            </div>
          )}
          {data.linkedin && (
            <div>
              <a href={data.linkedin} className="hover:underline">linkedin.com/in/{data.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")}</a>
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
