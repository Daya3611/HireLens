import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

interface TemplateProps {
    data: ResumeData;
}

export default function TemplateSix({ data }: TemplateProps) {
    return (
        <div className="bg-white p-12 h-full font-serif text-neutral-900 leading-normal">
            {/* Header */}
            <header className="border-b-4 border-neutral-800 pb-6 mb-8 text-center uppercase tracking-widest">
                <h1 className="text-4xl font-bold mb-2">
                    {data.name || "YOUR NAME"}
                </h1>
                <p className="text-lg font-medium text-neutral-700 mb-4 tracking-wide">
                    {data.title || "PROFESSIONAL TITLE"}
                </p>

                <div className="flex flex-wrap justify-center gap-6 text-sm font-sans text-neutral-600 font-medium">
                    {data.email && (
                        <span className="flex items-center gap-1">
                            {data.email}
                        </span>
                    )}
                    {data.phone && (
                        <span className="before:content-['•'] before:mr-6 flex items-center gap-1">
                            {data.phone}
                        </span>
                    )}
                    {data.location && (
                        <span className="before:content-['•'] before:mr-6 flex items-center gap-1">
                            {data.location}
                        </span>
                    )}
                    {data.linkedin && (
                        <span className="before:content-['•'] before:mr-6 flex items-center gap-1">
                            {data.linkedin.replace("https://www.", "").replace("linkedin.com/in/", "")}
                        </span>
                    )}
                </div>
            </header>

            {/* Two Column Layout */}
            <div className="grid grid-cols-[1fr_250px] gap-10">

                {/* Main Column */}
                <div className="space-y-8">

                    {/* Summary */}
                    {data.summary && (
                        <section>
                            <h2 className="text-lg font-bold border-b border-neutral-400 mb-3 pb-1 uppercase tracking-widest flex items-center">
                                <span className="bg-neutral-800 text-white w-6 h-6 flex items-center justify-center text-xs mr-2 rounded-sm">01</span>
                                Profile
                            </h2>
                            <p className="text-justify text-neutral-800 leading-relaxed text-md">
                                {data.summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {data.experience.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold border-b border-neutral-400 mb-4 pb-1 uppercase tracking-widest flex items-center">
                                <span className="bg-neutral-800 text-white w-6 h-6 flex items-center justify-center text-xs mr-2 rounded-sm">02</span>
                                Professional Experience
                            </h2>
                            <div className="space-y-6">
                                {data.experience.map((exp, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="text-lg font-bold text-neutral-900">
                                                {exp.role}
                                            </h3>
                                            <span className="text-sm font-sans font-bold text-neutral-600">
                                                {exp.duration}
                                            </span>
                                        </div>
                                        <div className="text-neutral-700 italic font-medium mb-2 border-l-2 border-neutral-300 pl-3">
                                            {exp.company}
                                        </div>
                                        <p className="text-neutral-800 text-sm leading-relaxed whitespace-pre-line text-justify">
                                            {exp.description}
                                        </p>
                                        {exp.achievements && exp.achievements.length > 0 && (
                                            <ul className="list-disc ml-4 mt-2 space-y-1 text-sm text-neutral-700">
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
                        <section>
                            <h2 className="text-lg font-bold border-b border-neutral-400 mb-4 pb-1 uppercase tracking-widest flex items-center">
                                <span className="bg-neutral-800 text-white w-6 h-6 flex items-center justify-center text-xs mr-2 rounded-sm">03</span>
                                Key Projects
                            </h2>
                            <div className="space-y-4">
                                {data.projects.map((proj, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="text-md font-bold text-neutral-900 flex items-center gap-2">
                                                {proj.name}
                                                {proj.link && <a href={proj.link} className="text-[10px] text-blue-800 uppercase border border-blue-800 px-1 rounded hover:bg-blue-50 font-sans">View</a>}
                                            </h3>
                                        </div>
                                        <p className="text-neutral-800 text-sm leading-relaxed text-justify">
                                            {proj.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                </div>

                {/* Sidebar Column */}
                <div className="space-y-8 border-l border-neutral-200 pl-6">

                    {/* Skills */}
                    {data.skills.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold border-b border-neutral-400 mb-3 pb-1 uppercase tracking-widest">
                                Skills & Expertise
                            </h2>
                            <ul className="text-sm space-y-2 font-medium text-neutral-700">
                                {data.skills.map((skill, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-neutral-800 rounded-full"></span>
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Education */}
                    {data.education.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold border-b border-neutral-400 mb-3 pb-1 uppercase tracking-widest">
                                Education
                            </h2>
                            <div className="space-y-4 text-sm">
                                {data.education.map((edu, index) => (
                                    <div key={index}>
                                        <div className="font-bold text-neutral-900">{edu.institution}</div>
                                        <div className="italic text-neutral-600">{edu.degree}</div>
                                        <div className="text-xs text-neutral-500 font-sans mt-1">{edu.year}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {data.languages && data.languages.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold border-b border-neutral-400 mb-3 pb-1 uppercase tracking-widest">
                                Languages
                            </h2>
                            <div className="space-y-2 text-sm">
                                {data.languages.map((lang, index) => (
                                    <div key={index} className="flex justify-between">
                                        <span className="font-medium text-neutral-800">{lang.name}</span>
                                        <span className="text-neutral-500 text-xs uppercase">{lang.level}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications */}
                    {data.certifications && data.certifications.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold border-b border-neutral-400 mb-3 pb-1 uppercase tracking-widest">
                                Certifications
                            </h2>
                            <div className="space-y-3 text-sm">
                                {data.certifications.map((cert, index) => (
                                    <div key={index}>
                                        <div className="font-medium text-neutral-900 leading-snug">{cert.name}</div>
                                        <div className="text-xs text-neutral-500 mt-0.5">{cert.issuer} • {cert.year}</div>
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
