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

export default function ModernProfessional({ data }: TemplateProps) {
  const fontClass = getFontClass(data.customization?.fontFamily);
  const sizeClasses = getFontSizeClass(data.customization?.fontSize);
  const leadingClass = getLineSpacingClass(data.customization?.lineSpacing);
  const accentColor = getAccentColor(data, "#2563eb"); // default royal blue
  const sections = getOrderedSections(data);

  // Filter sections that should render in the main column
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
        <h2 className={`${sizeClasses.h4} uppercase tracking-wider mb-2 font-bold`} style={{ color: accentColor }}>
          Summary
        </h2>
        <div className="w-full h-0.5 bg-neutral-200 mb-3" />
        <p className={`${sizeClasses.body} text-neutral-700 text-justify`}>
          {data.summary}
        </p>
      </section>
    );
  };

  const renderExperience = () => {
    if (!data.experience || data.experience.length === 0) return null;
    return (
      <section className="mb-5 break-inside-avoid">
        <h2 className={`${sizeClasses.h4} uppercase tracking-wider mb-2 font-bold`} style={{ color: accentColor }}>
          Experience
        </h2>
        <div className="w-full h-0.5 bg-neutral-200 mb-3" />
        <div className="space-y-4">
          {data.experience.map((exp, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline font-bold text-neutral-900">
                <span className={sizeClasses.body}>{exp.role}</span>
                <span className={`${sizeClasses.sub} text-neutral-500 font-medium`}>{exp.duration}</span>
              </div>
              <div className="text-neutral-700 italic text-xs mb-1.5">{exp.company}</div>
              <p className={`${sizeClasses.body} text-neutral-600 whitespace-pre-line`}>
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
        <h2 className={`${sizeClasses.h4} uppercase tracking-wider mb-2 font-bold`} style={{ color: accentColor }}>
          Education
        </h2>
        <div className="w-full h-0.5 bg-neutral-200 mb-3" />
        <div className="space-y-3">
          {data.education.map((edu, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between items-baseline font-bold text-neutral-900">
                <span className={sizeClasses.body}>{edu.institution}</span>
                <span className={`${sizeClasses.sub} text-neutral-500 font-medium`}>{edu.year}</span>
              </div>
              <div className="text-neutral-700 text-xs italic">
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
        <h2 className={`${sizeClasses.h4} uppercase tracking-wider mb-2 font-bold`} style={{ color: accentColor }}>
          Projects
        </h2>
        <div className="w-full h-0.5 bg-neutral-200 mb-3" />
        <div className="space-y-4">
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
                      className="ml-2 text-xs font-normal underline hover:text-neutral-800"
                      style={{ color: accentColor }}
                    >
                      View Project
                    </a>
                  )}
                </span>
              </div>
              <p className={`${sizeClasses.body} text-neutral-600 whitespace-pre-line mb-1.5`}>
                {project.description}
              </p>
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded text-[10px] font-semibold border border-neutral-200"
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
        <h2 className={`${sizeClasses.h4} uppercase tracking-wider mb-2 font-bold`} style={{ color: accentColor }}>
          Certifications
        </h2>
        <div className="w-full h-0.5 bg-neutral-200 mb-3" />
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
        <h2 className={`${sizeClasses.h4} uppercase tracking-wider mb-2 font-bold`} style={{ color: accentColor }}>
          Awards
        </h2>
        <div className="w-full h-0.5 bg-neutral-200 mb-3" />
        <div className="space-y-2.5">
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
      {/* Left Column (Sidebar) */}
      <aside className="w-[32%] bg-neutral-50 border-r border-neutral-200 p-6 flex flex-col gap-6">
        {/* Profile Photo */}
        {data.profilePhoto && (
          <div className="flex justify-center mb-2">
            <img
              src={data.profilePhoto}
              alt={data.name || "Profile"}
              className="w-28 h-28 rounded-full object-cover border-2 border-neutral-300 shadow-sm"
            />
          </div>
        )}

        {/* Contact info */}
        <div>
          <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">
            Contact Details
          </h3>
          <div className="space-y-2.5 text-xs text-neutral-700">
            {data.email && (
              <div className="break-all">
                <span className="font-semibold block text-neutral-900">Email</span>
                {data.email}
              </div>
            )}
            {data.phone && (
              <div>
                <span className="font-semibold block text-neutral-900">Phone</span>
                {data.phone}
              </div>
            )}
            {data.location && (
              <div>
                <span className="font-semibold block text-neutral-900">Location</span>
                {data.location}
              </div>
            )}
            {data.website && (
              <div className="break-all">
                <span className="font-semibold block text-neutral-900">Website</span>
                <a href={data.website} className="hover:underline">{data.website.replace(/^https?:\/\//, "")}</a>
              </div>
            )}
            {data.linkedin && (
              <div className="break-all">
                <span className="font-semibold block text-neutral-900">LinkedIn</span>
                <a href={data.linkedin} className="hover:underline">linkedin.com/in/{data.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")}</a>
              </div>
            )}
            {data.github && (
              <div className="break-all">
                <span className="font-semibold block text-neutral-900">GitHub</span>
                <a href={data.github} className="hover:underline">github.com/{data.github.replace(/^https?:\/\/(www\.)?github\.com\//, "")}</a>
              </div>
            )}
          </div>
        </div>

        {/* Skills sidebar section */}
        {isSectionVisible(data, "skills") && data.skills && data.skills.length > 0 && (
          <div>
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">
              Skills
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-white border border-neutral-200 text-neutral-800 text-[11px] font-medium rounded shadow-2xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages sidebar section */}
        {isSectionVisible(data, "languages") && data.languages && data.languages.length > 0 && (
          <div>
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">
              Languages
            </h3>
            <div className="space-y-1.5">
              {data.languages.map((lang, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-neutral-900">{lang.name}</span>
                  <span className="text-neutral-500 italic text-[11px]">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interests sidebar section */}
        {isSectionVisible(data, "interests") && data.interests && data.interests.length > 0 && (
          <div>
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">
              Interests
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {data.interests.map((interest, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-neutral-200/50 text-neutral-700 text-[11px] rounded"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* References in Sidebar if placed at bottom of sidebar */}
        {isSectionVisible(data, "references") && data.references && data.references.length > 0 && (
          <div className="mt-auto">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">
              References
            </h3>
            <div className="space-y-2.5">
              {data.references.map((ref, idx) => (
                <div key={idx} className="text-neutral-800 text-[11px]">
                  <div className="font-semibold">{ref.name}</div>
                  <div className="text-neutral-500">{ref.title}, {ref.company}</div>
                  <div className="text-neutral-400 mt-0.5 break-all">{ref.contact}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Right Column (Main Content) */}
      <main className="w-[68%] p-8 flex flex-col">
        {/* Name and title */}
        <header className="mb-6 break-inside-avoid">
          <h1 className={`${sizeClasses.h1} font-bold text-neutral-900 leading-tight mb-1.5`}>
            {data.name || "YOUR NAME"}
          </h1>
          {data.title && (
            <p className="text-sm font-semibold tracking-wider uppercase" style={{ color: accentColor }}>
              {data.title}
            </p>
          )}
        </header>

        {/* Main Sections */}
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
