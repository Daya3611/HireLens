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

export default function CreativeDesigner({ data }: TemplateProps) {
  const fontClass = getFontClass(data.customization?.fontFamily || "sans");
  const sizeClasses = getFontSizeClass(data.customization?.fontSize);
  const leadingClass = getLineSpacingClass(data.customization?.lineSpacing);
  const accentColor = getAccentColor(data, "#db2777"); // Creative designer pink/rose accent
  const sections = getOrderedSections(data);

  // Main column sections
  const mainSections = sections.filter(
    (s) =>
      s !== "skills" &&
      s !== "languages" &&
      s !== "interests" &&
      s !== "references"
  );

  const renderSummary = () => {
    if (!data.summary) return null;
    return (
      <section className="mb-5 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: accentColor }}>
          About Me
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
      <section className="mb-5 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accentColor }}>
          Work History
        </h2>
        <div className="space-y-4">
          {data.experience.map((exp, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline font-bold text-neutral-900">
                <span className={sizeClasses.body}>{exp.role}</span>
                <span className={`${sizeClasses.sub} text-neutral-500 font-medium`}>{exp.duration}</span>
              </div>
              <div className="text-xs text-neutral-600 font-medium mb-1.5">{exp.company}</div>
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
        <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accentColor }}>
          Education
        </h2>
        <div className="space-y-3">
          {data.education.map((edu, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline font-bold text-neutral-900">
                <span className={sizeClasses.body}>{edu.institution}</span>
                <span className={`${sizeClasses.sub} text-neutral-500 font-medium`}>{edu.year}</span>
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
      <section className="mb-5 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accentColor }}>
          Portfolio / Projects
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {data.projects.map((project, idx) => (
            <div key={idx} className="border border-neutral-200 rounded-xl p-4 break-inside-avoid bg-neutral-50">
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
              <p className={`${sizeClasses.body} text-neutral-600 leading-relaxed mb-2`}>
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

  const renderCertifications = () => {
    if (!data.certifications || data.certifications.length === 0) return null;
    return (
      <section className="mb-5 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accentColor }}>
          Certifications
        </h2>
        <div className="space-y-2">
          {data.certifications.map((cert, idx) => (
            <div key={idx} className="flex justify-between items-baseline break-inside-avoid">
              <div>
                <span className={`${sizeClasses.body} font-bold text-neutral-900`}>{cert.name}</span>
                <span className="text-neutral-500 text-xs"> — {cert.issuer}</span>
              </div>
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
        <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accentColor }}>
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

  const renderSection = (sectionId: string) => {
    if (!isSectionVisible(data, sectionId)) return null;
    switch (sectionId) {
      case "summary": return renderSummary();
      case "experience": return renderExperience();
      case "education": return renderEducation();
      case "projects": return renderProjects();
      case "certifications": return renderCertifications();
      case "awards": return renderAwards();
      default: return null;
    }
  };

  return (
    <div className={`flex bg-white min-h-full ${fontClass} ${leadingClass}`}>
      {/* Designer Side Panel */}
      <aside className="w-[32%] text-white p-6 flex flex-col gap-6" style={{ backgroundColor: accentColor }}>
        {/* Photo Container */}
        {data.profilePhoto ? (
          <div className="flex justify-center mb-1">
            <img
              src={data.profilePhoto}
              alt={data.name || "Profile"}
              className="w-28 h-28 rounded-2xl object-cover border-4 border-white/20 shadow-md rotate-[-2deg] hover:rotate-0 transition-transform"
            />
          </div>
        ) : (
          <div className="w-24 h-24 rounded-2xl bg-white/10 border-2 border-dashed border-white/20 mx-auto flex items-center justify-center text-sm font-bold opacity-50">
            PHOTO
          </div>
        )}

        {/* Contact info */}
        <div>
          <h3 className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-3">
            Contact
          </h3>
          <div className="space-y-2 text-xs text-white/90">
            {data.email && (
              <div>
                <span className="font-bold text-white block text-[9px] uppercase tracking-wider mb-0.5">Email</span>
                {data.email}
              </div>
            )}
            {data.phone && (
              <div>
                <span className="font-bold text-white block text-[9px] uppercase tracking-wider mb-0.5">Phone</span>
                {data.phone}
              </div>
            )}
            {data.location && (
              <div>
                <span className="font-bold text-white block text-[9px] uppercase tracking-wider mb-0.5">Location</span>
                {data.location}
              </div>
            )}
            {data.website && (
              <div>
                <span className="font-bold text-white block text-[9px] uppercase tracking-wider mb-0.5">Portfolio</span>
                <a href={data.website} className="underline hover:text-white">{data.website.replace(/^https?:\/\//, "")}</a>
              </div>
            )}
            {data.linkedin && (
              <div>
                <span className="font-bold text-white block text-[9px] uppercase tracking-wider mb-0.5">LinkedIn</span>
                <a href={data.linkedin} className="underline hover:text-white">linkedin.com/in/{data.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")}</a>
              </div>
            )}
            {data.github && (
              <div>
                <span className="font-bold text-white block text-[9px] uppercase tracking-wider mb-0.5">GitHub</span>
                <a href={data.github} className="underline hover:text-white">github.com/{data.github.replace(/^https?:\/\/(www\.)?github\.com\//, "")}</a>
              </div>
            )}
          </div>
        </div>

        {/* Skills section */}
        {isSectionVisible(data, "skills") && data.skills && data.skills.length > 0 && (
          <div>
            <h3 className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-3">
              Skills
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-white/10 hover:bg-white/20 text-white text-[11px] rounded transition-colors font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages section */}
        {isSectionVisible(data, "languages") && data.languages && data.languages.length > 0 && (
          <div>
            <h3 className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-3">
              Languages
            </h3>
            <div className="space-y-1.5">
              {data.languages.map((lang, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs text-white/95">
                  <span className="font-semibold">{lang.name}</span>
                  <span className="opacity-75 italic text-[10px]">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interests section */}
        {isSectionVisible(data, "interests") && data.interests && data.interests.length > 0 && (
          <div>
            <h3 className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-3">
              Interests
            </h3>
            <div className="flex flex-wrap gap-1">
              {data.interests.map((interest, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-white/10 text-white text-[11px] rounded"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* References in Sidebar */}
        {isSectionVisible(data, "references") && data.references && data.references.length > 0 && (
          <div className="mt-auto">
            <h3 className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-3">
              References
            </h3>
            <div className="space-y-2.5">
              {data.references.map((ref, idx) => (
                <div key={idx} className="text-white/90 text-[11px]">
                  <div className="font-semibold text-white">{ref.name}</div>
                  <div className="text-white/70">{ref.title}, {ref.company}</div>
                  <div className="text-white/60 mt-0.5 break-all">{ref.contact}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Primary Designer Content */}
      <main className="w-[68%] p-8 flex flex-col">
        {/* Name and title */}
        <header className="mb-6 break-inside-avoid">
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 mb-1.5 leading-none">
            {data.name || "YOUR NAME"}
          </h1>
          {data.title && (
            <p className="text-sm font-semibold tracking-wider uppercase" style={{ color: accentColor }}>
              {data.title}
            </p>
          )}
        </header>

        {/* Main layout flow */}
        <div className="flex-1">
          {mainSections.map((sectionId) => (
            <div key={sectionId}>
              {renderSection(sectionId)}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
