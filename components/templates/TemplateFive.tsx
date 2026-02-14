import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Terminal, Code2, Database, Cpu } from "lucide-react";

interface TemplateProps {
    data: ResumeData;
}

export default function TemplateFive({ data }: TemplateProps) {
    return (
        <div className="bg-slate-50 min-h-full font-mono text-slate-800 p-8 sm:p-12">

            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start border-b-2 border-blue-500 pb-8 mb-8 bg-white p-6 rounded-t-xl shadow-sm">
                <div className="flex-1">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2 font-sans">
                        <span className="text-blue-600">&lt;</span>
                        {data.name || "Developer Name"}
                        <span className="text-blue-600">/&gt;</span>
                    </h1>
                    <p className="text-xl text-blue-600 font-medium font-sans mb-4">
                        {data.title || "Full Stack Developer"}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-600 font-sans">
                        {data.email && (
                            <div className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                                <Mail className="w-4 h-4 text-blue-500" />
                                <span>{data.email}</span>
                            </div>
                        )}
                        {data.phone && (
                            <div className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                                <Phone className="w-4 h-4 text-blue-500" />
                                <span>{data.phone}</span>
                            </div>
                        )}
                        {data.location && (
                            <div className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                                <MapPin className="w-4 h-4 text-blue-500" />
                                <span>{data.location}</span>
                            </div>
                        )}
                        {data.website && (
                            <div className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                                <Globe className="w-4 h-4 text-blue-500" />
                                <span className="truncate max-w-[200px]">{data.website}</span>
                            </div>
                        )}
                        {data.linkedin && (
                            <div className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                                <Linkedin className="w-4 h-4 text-blue-500" />
                                <span className="truncate max-w-[200px]">{data.linkedin.replace("https://", "")}</span>
                            </div>
                        )}
                        {data.github && (
                            <div className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                                <Github className="w-4 h-4 text-blue-500" />
                                <span className="truncate max-w-[200px]">{data.github.replace("https://", "")}</span>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Column */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Summary */}
                    {data.summary && (
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h2 className="text-xl font-bold bg-slate-100 inline-block px-3 py-1 rounded text-slate-800 mb-4 font-sans flex items-center gap-2">
                                <Terminal className="w-5 h-5 text-blue-600" />
                                Professional Summary
                            </h2>
                            <p className="text-slate-600 leading-relaxed font-sans">
                                {data.summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {data.experience.length > 0 && (
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h2 className="text-xl font-bold bg-slate-100 inline-block px-3 py-1 rounded text-slate-800 mb-6 font-sans flex items-center gap-2">
                                <Database className="w-5 h-5 text-blue-600" />
                                Experience
                            </h2>
                            <div className="space-y-8 font-sans">
                                {data.experience.map((exp, index) => (
                                    <div key={index} className="relative pl-6 border-l-2 border-blue-100">
                                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-white"></div>
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                                            <h3 className="text-lg font-bold text-slate-900">{exp.role}</h3>
                                            <span className="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">{exp.duration}</span>
                                        </div>
                                        <div className="text-slate-500 font-medium mb-2">{exp.company}</div>
                                        <p className="text-slate-600 text-sm leading-relaxed mb-3">
                                            {exp.description}
                                        </p>
                                        {exp.achievements && exp.achievements.length > 0 && (
                                            <ul className="list-disc ml-4 space-y-1 text-sm text-slate-600">
                                                {exp.achievements.map((ach, i) => (
                                                    <li key={i}>{ach}</li>
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
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h2 className="text-xl font-bold bg-slate-100 inline-block px-3 py-1 rounded text-slate-800 mb-6 font-sans flex items-center gap-2">
                                <Code2 className="w-5 h-5 text-blue-600" />
                                Key Projects
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                                {data.projects.map((proj, idx) => (
                                    <div key={idx} className="bg-slate-50 p-4 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
                                        <h3 className="font-bold text-slate-900 mb-1 flex items-center justify-between">
                                            {proj.name}
                                            {proj.link && <a href={proj.link} className="text-blue-500 text-xs hover:underline">Link ↗</a>}
                                        </h3>
                                        <p className="text-xs text-slate-600 mb-3">{proj.description}</p>
                                        {proj.technologies && (
                                            <div className="flex flex-wrap gap-1">
                                                {proj.technologies.slice(0, 3).map((tech, i) => (
                                                    <span key={i} className="text-[10px] uppercase font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">
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

                </div>

                {/* Sidebar Column */}
                <div className="space-y-8">

                    {/* Skills */}
                    {data.skills.length > 0 && (
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h2 className="text-lg font-bold text-slate-800 mb-4 font-sans flex items-center gap-2">
                                <Cpu className="w-5 h-5 text-blue-600" />
                                Tech Stack
                            </h2>
                            <div className="flex flex-wrap gap-2 font-mono text-sm">
                                {data.skills.map((skill, index) => (
                                    <span key={index} className="px-3 py-1.5 bg-slate-800 text-green-400 rounded-md">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {data.education.length > 0 && (
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h2 className="text-lg font-bold text-slate-800 mb-4 font-sans">Education</h2>
                            <div className="space-y-4 font-sans">
                                {data.education.map((edu, idx) => (
                                    <div key={idx} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                                        <h3 className="font-bold text-slate-900 text-sm">{edu.institution}</h3>
                                        <div className="text-blue-600 text-xs font-medium my-1">{edu.degree}</div>
                                        <div className="flex justify-between text-xs text-slate-500">
                                            <span>{edu.year}</span>
                                            {edu.gpa && <span>GPA: {edu.gpa}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications */}
                    {data.certifications && data.certifications.length > 0 && (
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h2 className="text-lg font-bold text-slate-800 mb-4 font-sans">Certifications</h2>
                            <div className="space-y-3 font-sans">
                                {data.certifications.map((cert, idx) => (
                                    <div key={idx} className="bg-slate-50 p-3 rounded border border-slate-200">
                                        <div className="font-bold text-slate-900 text-sm">{cert.name}</div>
                                        <div className="text-xs text-slate-500 mt-1">{cert.issuer} • {cert.year}</div>
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
