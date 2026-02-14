import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Award, BookOpen, Briefcase, GraduationCap } from "lucide-react";

interface TemplateProps {
    data: ResumeData;
}

export default function TemplateSeven({ data }: TemplateProps) {
    return (
        <div className="bg-neutral-50 p-8 h-full font-sans text-neutral-800">

            {/* Header Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

                {/* Name Card */}
                <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 flex flex-col justify-center">
                    <h1 className="text-5xl font-extrabold tracking-tight text-neutral-900 mb-2">
                        <span className="text-rose-500">{data.name?.split(' ')[0]}</span> {data.name?.split(' ').slice(1).join(' ')}
                    </h1>
                    <p className="text-xl text-neutral-500 font-medium">
                        {data.title || "Creative Design Lead"}
                    </p>
                </div>

                {/* Contact Card */}
                <div className="bg-rose-500 p-8 rounded-3xl shadow-sm text-white flex flex-col justify-center gap-3">
                    {data.email && (
                        <div className="flex items-center gap-3 text-sm font-medium">
                            <div className="bg-white/20 p-1.5 rounded-lg">
                                <Mail className="w-4 h-4" />
                            </div>
                            <span className="truncate">{data.email}</span>
                        </div>
                    )}
                    {data.phone && (
                        <div className="flex items-center gap-3 text-sm font-medium">
                            <div className="bg-white/20 p-1.5 rounded-lg">
                                <Phone className="w-4 h-4" />
                            </div>
                            <span>{data.phone}</span>
                        </div>
                    )}
                    {data.location && (
                        <div className="flex items-center gap-3 text-sm font-medium">
                            <div className="bg-white/20 p-1.5 rounded-lg">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <span>{data.location}</span>
                        </div>
                    )}
                    {data.website && (
                        <div className="flex items-center gap-3 text-sm font-medium">
                            <div className="bg-white/20 p-1.5 rounded-lg">
                                <Globe className="w-4 h-4" />
                            </div>
                            <span className="truncate">{data.website}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Left Column (Sidebar) */}
                <div className="space-y-6">

                    {/* Skills */}
                    {data.skills.length > 0 && (
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-rose-100 p-2 rounded-xl text-rose-600">
                                    <Award className="w-5 h-5" />
                                </div>
                                <h2 className="text-lg font-bold text-neutral-900">Skills</h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, index) => (
                                    <span key={index} className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-lg text-sm font-medium hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-default">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Education */}
                    {data.education.length > 0 && (
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-orange-100 p-2 rounded-xl text-orange-600">
                                    <GraduationCap className="w-5 h-5" />
                                </div>
                                <h2 className="text-lg font-bold text-neutral-900">Education</h2>
                            </div>
                            <div className="space-y-4">
                                {data.education.map((edu, idx) => (
                                    <div key={idx} className="border-l-2 border-neutral-100 pl-4 py-1">
                                        <h3 className="font-bold text-neutral-900 text-sm leading-snug">{edu.degree}</h3>
                                        <p className="text-xs text-neutral-500 font-medium mt-1">{edu.institution}</p>
                                        <p className="text-xs text-neutral-400 mt-1">{edu.year}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Languages */}
                    {data.languages && data.languages.length > 0 && (
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-blue-100 p-2 rounded-xl text-blue-600">
                                    <BookOpen className="w-5 h-5" />
                                </div>
                                <h2 className="text-lg font-bold text-neutral-900">Languages</h2>
                            </div>
                            <div className="space-y-3">
                                {data.languages.map((lang, idx) => (
                                    <div key={idx} className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-neutral-700">{lang.name}</span>
                                        <div className="h-1.5 w-16 bg-neutral-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-500 rounded-full"
                                                style={{ width: lang.level === 'Native' ? '100%' : lang.level === 'Fluent' ? '85%' : '60%' }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

                {/* Right Column (Main) */}
                <div className="md:col-span-2 space-y-6">

                    {/* Summary */}
                    {data.summary && (
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
                            <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                                <span className="w-2 h-8 bg-rose-500 rounded-full block"></span>
                                About Me
                            </h2>
                            <p className="text-neutral-600 leading-loose text-lg font-light">
                                {data.summary}
                            </p>
                        </div>
                    )}

                    {/* Experience */}
                    {data.experience.length > 0 && (
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
                            <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                                <span className="w-2 h-8 bg-rose-500 rounded-full block"></span>
                                Experience
                            </h2>
                            <div className="space-y-8">
                                {data.experience.map((exp, idx) => (
                                    <div key={idx} className="group">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                            <h3 className="text-xl font-bold text-neutral-900 group-hover:text-rose-600 transition-colors">{exp.role}</h3>
                                            <span className="px-3 py-1 bg-neutral-50 text-neutral-500 text-xs font-bold rounded-full border border-neutral-100 uppercase tracking-wide">
                                                {exp.duration}
                                            </span>
                                        </div>
                                        <div className="text-rose-500 font-medium text-sm mb-3 flex items-center gap-2">
                                            <Briefcase className="w-4 h-4" />
                                            {exp.company}
                                        </div>
                                        <p className="text-neutral-600 leading-relaxed text-sm">
                                            {exp.description}
                                        </p>
                                        {exp.achievements && exp.achievements.length > 0 && (
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {exp.achievements.map((ach, i) => (
                                                    <span key={i} className="text-xs bg-rose-50 text-rose-700 px-2 py-1 rounded border border-rose-100">
                                                        ★ {ach}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Projects */}
                    {data.projects && data.projects.length > 0 && (
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
                            <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                                <span className="w-2 h-8 bg-rose-500 rounded-full block"></span>
                                Projects
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {data.projects.map((proj, idx) => (
                                    <div key={idx} className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100 hover:shadow-md transition-shadow">
                                        <h3 className="font-bold text-neutral-900 mb-2">{proj.name}</h3>
                                        <p className="text-sm text-neutral-500 line-clamp-3 mb-3">{proj.description}</p>
                                        {proj.link && (
                                            <a href={proj.link} className="text-xs font-bold text-rose-500 hover:underline uppercase tracking-wider">
                                                View Project →
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}


                </div>

            </div>

        </div>
    );
}
