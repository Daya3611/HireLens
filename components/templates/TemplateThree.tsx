import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

interface TemplateProps {
    data: ResumeData;
}

export default function TemplateThree({ data }: TemplateProps) {
    return (
        <div className="bg-white p-12 h-full font-serif text-neutral-800">
            {/* Header */}
            <header className="text-center border-b-2 border-neutral-900 pb-8 mb-8">
                <h1 className="text-5xl font-bold tracking-tight mb-3 text-neutral-900">
                    {data.name || "Your Name"}
                </h1>
                <p className="text-xl text-neutral-600 mb-6 italic">
                    {data.title || "Professional Title"}
                </p>

                <div className="flex flex-wrap justify-center gap-6 text-sm font-sans text-neutral-600">
                    {data.email && (
                        <div className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5" />
                            <span>{data.email}</span>
                        </div>
                    )}
                    {data.phone && (
                        <div className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5" />
                            <span>{data.phone}</span>
                        </div>
                    )}
                    {data.location && (
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{data.location}</span>
                        </div>
                    )}
                    {data.website && (
                        <div className="flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5" />
                            <span>{data.website}</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap justify-center gap-6 text-sm font-sans text-neutral-600 mt-2">
                    {data.linkedin && (
                        <div className="flex items-center gap-1.5">
                            <Linkedin className="w-3.5 h-3.5" />
                            <span>{data.linkedin}</span>
                        </div>
                    )}
                    {data.github && (
                        <div className="flex items-center gap-1.5">
                            <Github className="w-3.5 h-3.5" />
                            <span>{data.github}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <div className="space-y-8 max-w-3xl mx-auto">

                {/* Summary */}
                {data.summary && (
                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-widest border-b border-neutral-200 mb-4 pb-1">
                            Profile
                        </h2>
                        <p className="text-neutral-700 leading-relaxed font-sans">
                            {data.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {data.experience.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-widest border-b border-neutral-200 mb-6 pb-1">
                            Experience
                        </h2>
                        <div className="space-y-8">
                            {data.experience.map((exp, index) => (
                                <div key={index} className="font-sans">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-lg font-bold text-neutral-900">
                                            {exp.role}
                                        </h3>
                                        <span className="text-sm text-neutral-500 font-medium">
                                            {exp.duration}
                                        </span>
                                    </div>
                                    <div className="text-neutral-700 font-medium mb-2 italic">
                                        {exp.company}
                                    </div>
                                    <p className="text-neutral-600 text-sm leading-relaxed whitespace-pre-line">
                                        {exp.description}
                                    </p>
                                    {exp.achievements && exp.achievements.length > 0 && (
                                        <ul className="mt-2 list-disc list-outside ml-4 space-y-1">
                                            {exp.achievements.map((ach, i) => (
                                                <li key={i} className="text-sm text-neutral-600 pl-1">{ach}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
                {/* Projects */}
                {data.projects && data.projects.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-widest border-b border-neutral-200 mb-6 pb-1">
                            Projects
                        </h2>
                        <div className="space-y-6 font-sans">
                            {data.projects.map((project, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-lg font-bold text-neutral-900">
                                            {project.name}
                                            {project.link && (
                                                <a href={project.link} className="ml-2 text-sm text-neutral-500 hover:text-neutral-800" target="_blank" rel="noopener noreferrer">
                                                    (View)
                                                </a>
                                            )}
                                        </h3>
                                    </div>
                                    <p className="text-neutral-600 text-sm leading-relaxed whitespace-pre-line mb-2">
                                        {project.description}
                                    </p>
                                    {project.technologies && project.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech, i) => (
                                                <span key={i} className="text-xs text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {data.education.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-widest border-b border-neutral-200 mb-6 pb-1">
                            Education
                        </h2>
                        <div className="grid grid-cols-1 gap-6 font-sans">
                            {data.education.map((edu, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-lg font-bold text-neutral-900">
                                            {edu.institution}
                                        </h3>
                                        <span className="text-sm text-neutral-500 font-medium">
                                            {edu.year}
                                        </span>
                                    </div>
                                    <div className="text-neutral-700">{edu.degree}</div>
                                    {edu.gpa && <div className="text-sm text-neutral-500 mt-1">GPA: {edu.gpa}</div>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {data.skills.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-widest border-b border-neutral-200 mb-6 pb-1">
                            Skills
                        </h2>
                        <div className="flex flex-wrap gap-x-2 gap-y-2 font-sans text-sm text-neutral-700">
                            {data.skills.join(" • ")}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
