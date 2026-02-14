import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

interface TemplateProps {
    data: ResumeData;
}

export default function TemplateFour({ data }: TemplateProps) {
    // Helper to get initials
    const getInitials = (name: string) => {
        return name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "YN";
    };

    return (
        <div className="flex bg-white h-full overflow-hidden">
            {/* Sidebar - Dark */}
            <div className="w-1/3 min-h-screen bg-slate-900 text-white p-8 space-y-12">
                <div className="text-center">
                    <div className="w-32 h-32 mx-auto rounded-full bg-slate-700 flex items-center justify-center text-4xl font-bold mb-6 border-4 border-slate-600">
                        {getInitials(data.name || "")}
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">
                        {data.name || "Your Name"}
                    </h1>
                    <p className="text-slate-400 text-lg">
                        {data.title || "Creative Professional"}
                    </p>
                </div>

                {/* Contact Info */}
                <div className="space-y-4 text-sm font-light">
                    {data.email && (
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0">
                                <Mail className="w-4 h-4 text-slate-300" />
                            </div>
                            <span className="break-all">{data.email}</span>
                        </div>
                    )}
                    {data.phone && (
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0">
                                <Phone className="w-4 h-4 text-slate-300" />
                            </div>
                            <span>{data.phone}</span>
                        </div>
                    )}
                    {data.location && (
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-4 h-4 text-slate-300" />
                            </div>
                            <span>{data.location}</span>
                        </div>
                    )}
                    {data.website && (
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0">
                                <Globe className="w-4 h-4 text-slate-300" />
                            </div>
                            <span className="break-all">{data.website}</span>
                        </div>
                    )}
                    {data.linkedin && (
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0">
                                <Linkedin className="w-4 h-4 text-slate-300" />
                            </div>
                            <span className="break-all">{data.linkedin.replace("linkedin.com/in/", "")}</span>
                        </div>
                    )}
                </div>

                {/* Skills - In Sidebar */}
                {data.skills.length > 0 && (
                    <div>
                        <h2 className="text-lg font-bold uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-700 pb-2">
                            Skills
                        </h2>
                        <div className="flex flex-wrap gap-2 text-sm">
                            {data.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Languages - In Sidebar */}
                {data.languages && data.languages.length > 0 && (
                    <div>
                        <h2 className="text-lg font-bold uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-700 pb-2">
                            Languages
                        </h2>
                        <ul className="space-y-2">
                            {data.languages.map((lang, idx) => (
                                <li key={idx} className="flex justify-between items-center text-sm">
                                    <span>{lang.name}</span>
                                    <span className="text-slate-500 text-xs">{lang.level}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

            </div>

            {/* Main Content - White */}
            <div className="flex-1 p-12 space-y-10 overflow-y-auto">
                {/* Summary */}
                {data.summary && (
                    <section>
                        <h2 className="text-2xl font-bold uppercase tracking-wider text-slate-800 mb-6 flex items-center gap-3">
                            <span className="w-8 h-1 bg-slate-800 block"></span>
                            About Me
                        </h2>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            {data.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {data.experience.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold uppercase tracking-wider text-slate-800 mb-8 flex items-center gap-3">
                            <span className="w-8 h-1 bg-slate-800 block"></span>
                            Work Experience
                        </h2>
                        <div className="space-y-8 pl-4 border-l-2 border-slate-200">
                            {data.experience.map((exp, index) => (
                                <div key={index} className="relative pl-6">
                                    <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-slate-800 border-4 border-white"></div>
                                    <h3 className="text-xl font-bold text-slate-900 leading-none mb-1">
                                        {exp.role}
                                    </h3>
                                    <div className="flex items-center justify-between text-slate-500 text-sm mb-3 uppercase tracking-wide font-medium">
                                        <span>{exp.company}</span>
                                        <span>{exp.duration}</span>
                                    </div>
                                    <p className="text-slate-600 leading-relaxed mb-3">
                                        {exp.description}
                                    </p>
                                    {exp.achievements && exp.achievements.length > 0 && (
                                        <ul className="list-disc ml-5 space-y-1 text-slate-600">
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

                {/* Education */}
                {data.education.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold uppercase tracking-wider text-slate-800 mb-8 flex items-center gap-3">
                            <span className="w-8 h-1 bg-slate-800 block"></span>
                            Education
                        </h2>
                        <div className="grid grid-cols-1 gap-6">
                            {data.education.map((edu, idx) => (
                                <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                    <h3 className="font-bold text-lg text-slate-900">{edu.institution}</h3>
                                    <p className="text-slate-600 font-medium">{edu.degree}</p>
                                    <div className="flex justify-between items-center mt-2 text-sm text-slate-500">
                                        <span>{edu.year}</span>
                                        {edu.gpa && <span>GPA: {edu.gpa}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.projects && data.projects.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold uppercase tracking-wider text-slate-800 mb-8 flex items-center gap-3">
                            <span className="w-8 h-1 bg-slate-800 block"></span>
                            Projects
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {data.projects.map((proj, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200">
                                    <h3 className="font-bold text-slate-900 mb-1">{proj.name}</h3>
                                    <p className="text-slate-600 text-sm mb-2 line-clamp-2">{proj.description}</p>
                                    {proj.link && <a href={proj.link} className="text-blue-600 text-xs hover:underline">View Project</a>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

            </div>
        </div>
    );
}
