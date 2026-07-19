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

export default function StartupResume({ data }: TemplateProps) {
  // Startup templates look great with Outfit or modern geometric sans fonts
  const fontClass = getFontClass(data.customization?.fontFamily || "outfit");
  const sizeClasses = getFontSizeClass(data.customization?.fontSize);
  const leadingClass = getLineSpacingClass(data.customization?.lineSpacing);
  const accentColor = getAccentColor(data, "#7c3aed"); // Startup violet accent
  const sections = getOrderedSections(data);

  const renderSummary = () => {
    if (!data.summary) return null;
    return (
      <section className="mb-5 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">
          About Me
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
      <section className="mb-5 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">
          Experience
        </h2>
        <div className="space-y-4">
          {data.experience.map((exp, idx) => (
            <div key={idx} className="relative pl-4 border-l-2 break-inside-avoid" style={{ borderColor: accentColor }}>
              <div className="flex justify-between items-baseline font-bold text-neutral-900">
                <span className={sizeClasses.body}>{exp.role}</span>
                <span className={`${sizeClasses.sub} text-neutral-500 font-medium`}>{exp.duration}</span>
              </div>
              <div className="text-xs font-semibold text-neutral-600 mb-1.5">{exp.company}</div>
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
        <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">
          Education
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.education.map((edu, idx) => (
            <div key={idx} className="bg-neutral-50 border border-neutral-200 rounded-xl p-3.5 break-inside-avoid">
              <div className="flex justify-between items-start mb-1">
                <div className="font-bold text-neutral-900 text-sm">{edu.institution}</div>
                <span className="text-[10px] bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded-full font-bold">{edu.year}</span>
              </div>
              <div className="text-xs text-neutral-600 italic mb-1">{edu.degree}</div>
              {edu.gpa && <div className="text-[11px] text-neutral-500 font-medium">GPA: {edu.gpa}</div>}
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
        <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">
          Projects & Hackathons
        </h2>
        <div className="space-y-4">
          {data.projects.map((project, idx) => (
            <div key={idx} className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 break-inside-avoid hover:shadow-xs transition-shadow">
              <div className="flex justify-between items-baseline font-bold text-neutral-900 mb-1">
                <span className="text-sm">{project.name}</span>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold hover:underline"
                    style={{ color: accentColor }}
                  >
                    View Project &rarr;
                  </a>
                )}
              </div>
              <p className={`${sizeClasses.body} text-neutral-600 leading-relaxed mb-2.5`}>
                {project.description}
              </p>
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-neutral-800 border border-neutral-200"
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
      <section className="mb-5 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2.5">
          Stack & Skills
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {data.skills.map((skill, idx) => (
            <span
              key={idx}
              className="text-xs font-bold px-3 py-1 rounded-full text-white shadow-xs"
              style={{ backgroundColor: accentColor }}
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
      <section className="mb-5 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">
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
      <section className="mb-5 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">
          Awards & Recognitions
        </h2>
        <div className="space-y-3">
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
      <section className="mb-5 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">
          Languages
        </h2>
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
        <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">
          Interests
        </h2>
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
        <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">
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
    <div className={`p-8 bg-white text-neutral-800 min-h-full ${fontClass} ${leadingClass}`}>
      {/* Bold Startup Header */}
      <header className="mb-6 flex flex-col sm:flex-row justify-between items-start gap-4 break-inside-avoid">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-950 mb-1 leading-none">
            {data.name || "YOUR NAME"}
          </h1>
          {data.title && (
            <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: accentColor }}>
              {data.title}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end text-xs text-neutral-600 font-medium">
          {data.email && <span className="px-2.5 py-1 bg-neutral-100 rounded-lg">{data.email}</span>}
          {data.phone && <span className="px-2.5 py-1 bg-neutral-100 rounded-lg">{data.phone}</span>}
          {data.location && <span className="px-2.5 py-1 bg-neutral-100 rounded-lg">{data.location}</span>}
          {data.website && (
            <a href={data.website} className="px-2.5 py-1 bg-neutral-100 rounded-lg hover:underline" style={{ color: accentColor }}>
              {data.website.replace(/^https?:\/\//, "")}
            </a>
          )}
          {data.github && (
            <a href={data.github} className="px-2.5 py-1 bg-neutral-100 rounded-lg hover:underline" style={{ color: accentColor }}>
              github.com/{data.github.replace(/^https?:\/\/(www\.)?github\.com\//, "")}
            </a>
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
