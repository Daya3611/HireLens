import { ResumeData } from "@/types/resume";

interface TemplateProps {
    data: ResumeData;
}

export default function TemplateOne({ data }: TemplateProps) {
    return (
        <div className="bg-white p-10 h-full font-sans text-gray-800">
            <header className="border-b-2 border-gray-800 pb-6 mb-8">
                <h1 className="text-4xl font-bold uppercase tracking-wider text-gray-900 mb-2">
                    {data.name || "YOUR NAME"}
                </h1>
                <p className="text-xl text-gray-600 font-medium mb-4 uppercase tracking-wide">
                    {data.title || "Professional Title"}
                </p>
                <div className="flex flex-wrap text-sm text-gray-600 gap-4 mt-2">
                    {data.email && (
                        <span className="flex items-center gap-1">
                            📧 {data.email}
                        </span>
                    )}
                    {data.phone && (
                        <span className="flex items-center gap-1">
                            📞 {data.phone}
                        </span>
                    )}
                </div>
                <p className="mt-4 text-gray-700 leading-relaxed">
                    {data.summary || "Professional summary goes here..."}
                </p>
            </header>

            <main className="space-y-8">
                {data.experience.length > 0 && (
                    <section>
                        <h3 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 mb-4 pb-1">
                            Experience
                        </h3>
                        <div className="space-y-6">
                            {data.experience.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="text-md font-bold text-gray-900">{exp.role}</h4>
                                        <span className="text-sm text-gray-500 italic">{exp.duration}</span>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-700 mb-2">{exp.company}</p>
                                    <p className="text-sm text-gray-600 whitespace-pre-line">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
                {/* Projects */}
                {data.projects && data.projects.length > 0 && (
                    <section>
                        <h3 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 mb-4 pb-1">
                            Projects
                        </h3>
                        <div className="space-y-6">
                            {data.projects.map((project, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="text-md font-bold text-gray-900">
                                            {project.name}
                                            {project.link && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="ml-2 text-xs text-blue-600 hover:underline font-normal"
                                                >
                                                    (Link)
                                                </a>
                                            )}
                                        </h4>
                                    </div>
                                    <p className="text-sm text-gray-600 whitespace-pre-line mb-2">
                                        {project.description}
                                    </p>
                                    {project.technologies && project.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                            {project.technologies.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs"
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
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {data.education.length > 0 && (
                        <section>
                            <h3 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 mb-4 pb-1">
                                Education
                            </h3>
                            <div className="space-y-4">
                                {data.education.map((edu, index) => (
                                    <div key={index}>
                                        <h4 className="font-bold text-gray-900">{edu.institution}</h4>
                                        <p className="text-sm text-gray-700">{edu.degree}</p>
                                        <p className="text-xs text-gray-500">{edu.year}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.skills.length > 0 && (
                        <section>
                            <h3 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 mb-4 pb-1">
                                Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
}
