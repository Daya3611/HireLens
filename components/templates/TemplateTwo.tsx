import { ResumeData } from "@/types/resume";

interface TemplateProps {
    data: ResumeData;
}

export default function TemplateTwo({ data }: TemplateProps) {
    return (
        <div className="grid grid-cols-[1fr_2fr] h-full shadow-lg bg-gray-100">
            <aside className="bg-slate-800 text-white p-8 space-y-8">
                <div className="mb-8">
                    <div className="w-24 h-24 rounded-full bg-slate-600 mb-4 mx-auto flex items-center justify-center text-4xl font-bold">
                        {data.name ? data.name[0] : ""}
                    </div>
                    <h1 className="text-2xl font-bold text-center uppercase tracking-wider mb-2">
                        {data.name || "YOUR NAME"}
                    </h1>
                    <p className="text-center text-slate-300 text-sm">
                        {/* Optional Role or tagline could go here */}
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-bold border-b border-slate-600 pb-2 mb-4 uppercase tracking-wider">
                        Contact
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-300">
                        {data.email && (
                            <li className="flex items-center gap-2">
                                ✉️ {data.email}
                            </li>
                        )}
                        {data.phone && (
                            <li className="flex items-center gap-2">
                                📱 {data.phone}
                            </li>
                        )}
                        {/* Add more contacts if needed */}
                    </ul>
                </div>

                {data.skills.length > 0 && (
                    <div>
                        <h3 className="text-lg font-bold border-b border-slate-600 pb-2 mb-4 uppercase tracking-wider">
                            Skills
                        </h3>
                        <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                            {data.skills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {data.education.length > 0 && (
                    <div>
                        <h3 className="text-lg font-bold border-b border-slate-600 pb-2 mb-4 uppercase tracking-wider">
                            Education
                        </h3>
                        <div className="space-y-4 text-sm text-slate-300">
                            {data.education.map((edu, index) => (
                                <div key={index}>
                                    <p className="font-bold text-white mb-1">{edu.institution}</p>
                                    <p className="italic mb-1">{edu.degree}</p>
                                    <span className="text-xs bg-slate-700 px-2 py-0.5 rounded text-slate-200">
                                        {edu.year}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </aside>

            <main className="bg-white p-8 space-y-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-200 pb-2 mb-4 uppercase tracking-wider">
                        Profile
                    </h2>
                    <p className="text-slate-600 leading-relaxed">
                        {data.summary || "Summary description..."}
                    </p>
                </div>

                {data.experience.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-200 pb-2 mb-6 uppercase tracking-wider">
                            Work Experience
                        </h2>
                        <div className="space-y-8">
                            {data.experience.map((exp, index) => (
                                <div key={index} className="relative pl-6 border-l-2 border-slate-200">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-300 border-2 border-white"></div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-xl font-bold text-slate-800">{exp.role}</h3>
                                        <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                            {exp.duration}
                                        </span>
                                    </div>
                                    <p className="text-md font-medium text-slate-700 mb-2">{exp.company}</p>
                                    <p className="text-slate-600 text-sm whitespace-pre-line leading-relaxed">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
