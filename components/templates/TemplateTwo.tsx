import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";


interface TemplateProps {
  data: ResumeData;
}

export default function TemplateThree({ data }: TemplateProps) {
  // Helper to get initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Helper to format date
  const formatDate = (dateStr: string) => {
    return dateStr;
  };

  return (
    <div className="min-h-full bg-white font-sans text-neutral-800">
      {/* Header Section */}
      <header className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              {data.name || "Your Name"}
            </h1>
            <p className="text-emerald-100 text-lg mb-4 font-medium">
              {data.title || "Professional Title"}
            </p>

            {/* Contact Grid */}
            <div className="flex flex-wrap gap-4 text-sm">
              {data.email && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Mail className="w-4 h-4" />
                  <span>{data.email}</span>
                </div>
              )}
              {data.phone && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Phone className="w-4 h-4" />
                  <span>{data.phone}</span>
                </div>
              )}
              {data.location && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <MapPin className="w-4 h-4" />
                  <span>{data.location}</span>
                </div>
              )}
              {data.website && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Globe className="w-4 h-4" />
                  <span>{data.website}</span>
                </div>
              )}
              {data.linkedin && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Linkedin className="w-4 h-4" />
                  <span>{data.linkedin}</span>
                </div>
              )}
              {data.github && (
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Github className="w-4 h-4" />
                  <span>{data.github}</span>
                </div>
              )}
            </div>
          </div>

          {/* Profile Image Placeholder */}
          <div className="ml-8">
            <div className="w-28 h-28 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center text-3xl font-bold">
              {data.name ? getInitials(data.name) : "YN"}
            </div>
          </div>
        </div>
      </header>

      <div className="p-10 grid grid-cols-[2fr_1fr] gap-10">
        {/* Main Content - Left Column */}
        <div className="space-y-8">
          {/* Summary */}
          {data.summary && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 font-bold text-lg">01</span>
                </div>
                <h2 className="text-xl font-bold text-neutral-900 uppercase tracking-wide">
                  Professional Summary
                </h2>
              </div>
              <p className="text-neutral-600 leading-relaxed pl-13 border-l-2 border-emerald-100 ml-5 pl-6">
                {data.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 font-bold text-lg">02</span>
                </div>
                <h2 className="text-xl font-bold text-neutral-900 uppercase tracking-wide">
                  Work Experience
                </h2>
              </div>

              <div className="space-y-6 ml-5 border-l-2 border-emerald-100 pl-6">
                {data.experience.map((exp, index) => (
                  <div key={index} className="relative">
                    {/* Timeline Dot */}
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm" />

                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-neutral-900">
                          {exp.role}
                        </h3>
                        <p className="text-emerald-600 font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 bg-neutral-100 text-neutral-600 text-sm font-medium rounded-full mt-2 sm:mt-0">
                        {exp.duration}
                      </span>
                    </div>

                    <p className="text-neutral-600 text-sm leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>

                    {/* Achievements if available */}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="mt-3 space-y-1">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-neutral-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects if available */}
          {data.projects && data.projects.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 font-bold text-lg">03</span>
                </div>
                <h2 className="text-xl font-bold text-neutral-900 uppercase tracking-wide">
                  Projects
                </h2>
              </div>

              <div className="grid gap-4 ml-5">
                {data.projects.map((project, index) => (
                  <div
                    key={index}
                    className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 hover:border-emerald-200 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-neutral-900">
                        {project.name}
                      </h3>
                      {project.link && (
                        <a
                          href={project.link}
                          className="text-xs text-emerald-600 hover:underline"
                        >
                          View Project →
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-neutral-600 mb-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies?.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar - Right Column */}
        <div className="space-y-8">
          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 font-bold text-sm">04</span>
                </div>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-neutral-100 text-neutral-700 text-sm font-medium rounded-lg border border-neutral-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 font-bold text-sm">05</span>
                </div>
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-br from-neutral-50 to-white rounded-xl border border-neutral-100"
                  >
                    <h3 className="font-bold text-neutral-900 mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-emerald-600 text-sm font-medium mb-2">
                      {edu.institution}
                    </p>
                    <span className="inline-flex items-center px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                      {edu.year}
                    </span>
                    {edu.gpa && (
                      <p className="text-xs text-neutral-500 mt-2">
                        GPA: {edu.gpa}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications if available */}
          {data.certifications && data.certifications.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 font-bold text-sm">06</span>
                </div>
                Certifications
              </h2>
              <div className="space-y-3">
                {data.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-neutral-50 rounded-lg"
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-neutral-900 text-sm">
                        {cert.name}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {cert.issuer} • {cert.year}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages if available */}
          {data.languages && data.languages.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 font-bold text-sm">07</span>
                </div>
                Languages
              </h2>
              <div className="space-y-2">
                {data.languages.map((lang, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-neutral-700">{lang.name}</span>
                    <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>


    </div>
  );
}