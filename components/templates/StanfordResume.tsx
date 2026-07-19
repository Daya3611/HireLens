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

export default function StanfordResume({ data }: TemplateProps) {
  // Stanford CV template is compact and typically modern sans-serif
  const fontClass = getFontClass(data.customization?.fontFamily || "sans");
  const sizeClasses = getFontSizeClass(data.customization?.fontSize || "sm"); // default to slightly smaller font for density
  const leadingClass = getLineSpacingClass(data.customization?.lineSpacing || "snug");
  const sections = getOrderedSections(data);

  const renderSummary = () => {
    if (!data.summary) return null;
    return (
      <section className="mb-3 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b-2 border-neutral-800 pb-0.5 mb-1.5">
          Research Summary
        </h2>
        <p className={`${sizeClasses.body} text-neutral-800 leading-tight text-justify`}>
          {data.summary}
        </p>
      </section>
    );
  };

  const renderExperience = () => {
    if (!data.experience || data.experience.length === 0) return null;
    return (
      <section className="mb-3 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b-2 border-neutral-800 pb-0.5 mb-1.5">
          Professional & Research Experience
        </h2>
        <div className="space-y-2">
          {data.experience.map((exp, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline font-bold text-neutral-900">
                <span className={sizeClasses.body}>{exp.role}</span>
                <span className={`${sizeClasses.sub} text-neutral-500`}>{exp.duration}</span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-neutral-700 font-semibold mb-1">
                <span>{exp.company}</span>
                {data.location && <span>{data.location}</span>}
              </div>
              <p className={`${sizeClasses.body} text-neutral-700 whitespace-pre-line leading-tight`}>
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
      <section className="mb-3 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b-2 border-neutral-800 pb-0.5 mb-1.5">
          Education
        </h2>
        <div className="space-y-1.5">
          {data.education.map((edu, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline font-bold text-neutral-900">
                <span className={sizeClasses.body}>{edu.institution}</span>
                <span className={`${sizeClasses.sub} text-neutral-500`}>{edu.year}</span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-neutral-700">
                <span>{edu.degree}</span>
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
      <section className="mb-3 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b-2 border-neutral-800 pb-0.5 mb-1.5">
          Technical Projects
        </h2>
        <div className="space-y-2">
          {data.projects.map((project, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline font-bold text-neutral-900">
                <span>
                  {project.name}
                  {project.link && (
                    <span className="font-normal text-xs text-neutral-500 ml-1">
                      ({project.link.replace(/^https?:\/\//, "")})
                    </span>
                  )}
                </span>
              </div>
              <p className={`${sizeClasses.body} text-neutral-700 leading-tight mb-1`}>
                {project.description}
              </p>
              {project.technologies && project.technologies.length > 0 && (
                <div className={`${sizeClasses.sub} text-neutral-600`}>
                  <span className="font-semibold">Core Technologies:</span> {project.technologies.join(", ")}
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
      <section className="mb-3 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b-2 border-neutral-800 pb-0.5 mb-1 text-neutral-900">
          Technical Expertise
        </h2>
        <p className={`${sizeClasses.body} text-neutral-800 leading-tight`}>
          {data.skills.join(" • ")}
        </p>
      </section>
    );
  };

  const renderCertifications = () => {
    if (!data.certifications || data.certifications.length === 0) return null;
    return (
      <section className="mb-3 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b-2 border-neutral-800 pb-0.5 mb-1 text-neutral-900">
          Professional Certifications
        </h2>
        <div className="space-y-1">
          {data.certifications.map((cert, idx) => (
            <div key={idx} className="flex justify-between items-baseline text-neutral-800 break-inside-avoid">
              <span className={sizeClasses.body}>
                <span className="font-semibold text-neutral-950">{cert.name}</span> — {cert.issuer}
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
      <section className="mb-3 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b-2 border-neutral-800 pb-0.5 mb-1 text-neutral-900">
          Awards & Research Grants
        </h2>
        <div className="space-y-1">
          {data.awards.map((award, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline text-neutral-800">
                <span className={sizeClasses.body}>
                  <span className="font-bold text-neutral-950">{award.name}</span> — {award.issuer}
                </span>
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
      <section className="mb-3 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b-2 border-neutral-800 pb-0.5 mb-1 text-neutral-900">
          Languages
        </h2>
        <p className={`${sizeClasses.body} text-neutral-800 leading-tight`}>
          {data.languages.map((lang) => `${lang.name} (${lang.level})`).join(", ")}
        </p>
      </section>
    );
  };

  const renderInterests = () => {
    if (!data.interests || data.interests.length === 0) return null;
    return (
      <section className="mb-3 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b-2 border-neutral-800 pb-0.5 mb-1 text-neutral-900">
          Interests & Affiliations
        </h2>
        <p className={`${sizeClasses.body} text-neutral-800 leading-tight`}>
          {data.interests.join(", ")}
        </p>
      </section>
    );
  };

  const renderReferences = () => {
    if (!data.references || data.references.length === 0) return null;
    return (
      <section className="mb-3 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b-2 border-neutral-800 pb-0.5 mb-1 text-neutral-900">
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
    <div className={`p-8 bg-white text-neutral-900 min-h-full ${fontClass} ${leadingClass}`}>
      {/* Stanford Left-Aligned Header */}
      <header className="mb-4 pb-2 border-b-4 border-neutral-900 break-inside-avoid flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-950 uppercase mb-0.5 leading-none">
            {data.name || "YOUR NAME"}
          </h1>
          {data.title && (
            <p className="text-sm font-semibold tracking-wider text-neutral-700 uppercase">
              {data.title}
            </p>
          )}
        </div>
        <div className="text-right text-xs text-neutral-600 space-y-0.5 font-medium">
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
      <main className="space-y-3">
        {sections.map((sectionId) => (
          <div key={sectionId}>
            {renderSection(sectionId)}
          </div>
        ))}
      </main>
    </div>
  );
}
