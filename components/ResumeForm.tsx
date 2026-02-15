"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResumeData } from "@/types/resume";
import {
    User,
    Mail,
    Phone,
    FileText,
    Plus,
    Trash2,
    Briefcase,
    GraduationCap,
    Wrench,
    ChevronDown,
    ChevronUp,
    GripVertical,
    Code,
    Globe,
} from "lucide-react";

interface ResumeFormProps {
    resumeData: ResumeData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

interface SectionProps {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
    isOpen?: boolean;
}

const FormSection = ({ title, icon: Icon, children, isOpen = true }: SectionProps) => {
    const [expanded, setExpanded] = useState(isOpen);

    return (
        <div className="border border-neutral-200 rounded-2xl overflow-hidden bg-white">
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between p-5 hover:bg-neutral-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h3 className="font-bold text-neutral-900 text-lg">{title}</h3>
                </div>
                {expanded ? (
                    <ChevronUp className="w-5 h-5 text-neutral-400" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-neutral-400" />
                )}
            </button>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="p-5 pt-0 border-t border-neutral-100">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const InputField = ({
    label,
    name,
    value,
    onChange,
    type = "text",
    placeholder,
    icon: Icon,
}: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    type?: string;
    placeholder: string;
    icon?: React.ElementType;
}) => (
    <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-neutral-700">
            {label}
        </label>
        <div className="relative">
            {Icon && (
                <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            )}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-neutral-400 ${Icon ? "pl-11" : ""
                    }`}
            />
        </div>
    </div>
);

const TextAreaField = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    rows = 4,
}: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    rows?: number;
}) => (
    <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-neutral-700">
            {label}
        </label>
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-neutral-400 resize-none"
        />
    </div>
);

export default function ResumeForm({ resumeData, setResumeData }: ResumeFormProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setResumeData((prev) => ({ ...prev, [name]: value }));
    };

    const addSkill = () => {
        setResumeData((prev) => ({ ...prev, skills: [...prev.skills, ""] }));
    };

    const updateSkill = (index: number, value: string) => {
        const newSkills = [...resumeData.skills];
        newSkills[index] = value;
        setResumeData((prev) => ({ ...prev, skills: newSkills }));
    };

    const removeSkill = (index: number) => {
        const newSkills = resumeData.skills.filter((_, i) => i !== index);
        setResumeData((prev) => ({ ...prev, skills: newSkills }));
    };

    const addExperience = () => {
        setResumeData((prev) => ({
            ...prev,
            experience: [
                ...prev.experience,
                { role: "", company: "", duration: "", description: "" },
            ],
        }));
    };

    const updateExperience = (
        index: number,
        field: keyof ResumeData["experience"][0],
        value: string
    ) => {
        const newExperience = [...resumeData.experience];
        newExperience[index] = { ...newExperience[index], [field]: value };
        setResumeData((prev) => ({ ...prev, experience: newExperience }));
    };

    const removeExperience = (index: number) => {
        const newExperience = resumeData.experience.filter((_, i) => i !== index);
        setResumeData((prev) => ({ ...prev, experience: newExperience }));
    };

    const addEducation = () => {
        setResumeData((prev) => ({
            ...prev,
            education: [
                ...prev.education,
                { degree: "", institution: "", year: "" },
            ],
        }));
    };

    const updateEducation = (
        index: number,
        field: keyof ResumeData["education"][0],
        value: string
    ) => {
        const newEducation = [...resumeData.education];
        newEducation[index] = { ...newEducation[index], [field]: value };
        setResumeData((prev) => ({ ...prev, education: newEducation }));
    };

    const removeEducation = (index: number) => {
        const newEducation = resumeData.education.filter((_, i) => i !== index);
        setResumeData((prev) => ({ ...prev, education: newEducation }));
    };

    const addProject = () => {
        setResumeData((prev) => ({
            ...prev,
            projects: [
                ...(prev.projects || []),
                { name: "", link: "", description: "", technologies: [] },
            ],
        }));
    };

    const updateProject = (
        index: number,
        field: keyof NonNullable<ResumeData["projects"]>[0],
        value: string
    ) => {
        const newProjects = [...(resumeData.projects || [])];
        if (field === "technologies") {
            const techs = value.split(",");
            newProjects[index] = { ...newProjects[index], technologies: techs };
        } else {
            newProjects[index] = { ...newProjects[index], [field]: value };
        }
        setResumeData((prev) => ({ ...prev, projects: newProjects }));
    };

    // Helper for direct string update for simple fields, to avoid the specialized technology logic above if confusing
    const updateProjectField = (index: number, field: string, value: string) => {
        const newProjects = [...(resumeData.projects || [])];
        // @ts-ignore
        newProjects[index] = { ...newProjects[index], [field]: value };
        setResumeData((prev) => ({ ...prev, projects: newProjects }));
    }


    const removeProject = (index: number) => {
        const newProjects = (resumeData.projects || []).filter((_, i) => i !== index);
        setResumeData((prev) => ({ ...prev, projects: newProjects }));
    };

    return (
        <div className="space-y-4">
            {/* Personal Information */}
            <FormSection title="Personal Information" icon={User}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <InputField
                        label="Full Name"
                        name="name"
                        value={resumeData.name || ""}
                        onChange={handleChange}
                        placeholder="John Doe"
                        icon={User}
                    />
                    <InputField
                        label="Email Address"
                        name="email"
                        type="email"
                        value={resumeData.email || ""}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        icon={Mail}
                    />
                    <InputField
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={resumeData.phone || ""}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        icon={Phone}
                    />
                    <InputField
                        label="Location"
                        name="location"
                        value={resumeData.location || ""}
                        onChange={handleChange}
                        placeholder="City, Country"
                    />
                </div>
                <div className="mt-4">
                    <TextAreaField
                        label="Professional Summary"
                        name="summary"
                        value={resumeData.summary || ""}
                        onChange={handleChange}
                        placeholder="Brief overview of your professional background and key achievements..."
                        rows={4}
                    />
                </div>
            </FormSection>

            {/* Skills */}
            <FormSection title="Skills" icon={Wrench}>
                <div className="pt-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {resumeData.skills.map((skill, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="group flex items-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-100 hover:border-indigo-300 transition-colors"
                            >
                                <input
                                    type="text"
                                    value={skill}
                                    onChange={(e) => updateSkill(index, e.target.value)}
                                    placeholder="Skill"
                                    className="bg-transparent border-none focus:outline-none text-sm font-medium w-24 min-w-0"
                                />
                                <button
                                    onClick={() => removeSkill(index)}
                                    className="opacity-0 group-hover:opacity-100 text-indigo-400 hover:text-red-500 transition-all"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                    <button
                        onClick={addSkill}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Skill
                    </button>
                </div>
            </FormSection>

            {/* Experience */}
            <FormSection title="Work Experience" icon={Briefcase}>
                <div className="space-y-4 pt-4">
                    <AnimatePresence>
                        {resumeData.experience.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="relative p-5 bg-neutral-50 rounded-xl border border-neutral-200 group"
                            >
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => removeExperience(index)}
                                        className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <InputField
                                        label="Job Title"
                                        name={`exp-role-${index}`}
                                        value={exp.role}
                                        onChange={(e) => updateExperience(index, "role", e.target.value)}
                                        placeholder="Senior Software Engineer"
                                    />
                                    <InputField
                                        label="Company"
                                        name={`exp-company-${index}`}
                                        value={exp.company}
                                        onChange={(e) => updateExperience(index, "company", e.target.value)}
                                        placeholder="Google"
                                    />
                                </div>
                                <div className="mb-4">
                                    <InputField
                                        label="Duration"
                                        name={`exp-duration-${index}`}
                                        value={exp.duration}
                                        onChange={(e) => updateExperience(index, "duration", e.target.value)}
                                        placeholder="Jan 2020 - Present"
                                    />
                                </div>
                                <TextAreaField
                                    label="Description"
                                    name={`exp-desc-${index}`}
                                    value={exp.description}
                                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                                    placeholder="Describe your responsibilities and achievements..."
                                    rows={3}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    <button
                        onClick={addExperience}
                        className="w-full py-3 border-2 border-dashed border-neutral-300 rounded-xl text-neutral-600 font-semibold hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all flex items-center justify-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Experience
                    </button>
                </div>
            </FormSection>

            {/* Education */}
            <FormSection title="Education" icon={GraduationCap}>
                <div className="space-y-4 pt-4">
                    <AnimatePresence>
                        {resumeData.education.map((edu, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="relative p-5 bg-neutral-50 rounded-xl border border-neutral-200 group"
                            >
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => removeEducation(index)}
                                        className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <InputField
                                        label="Degree / Major"
                                        name={`edu-degree-${index}`}
                                        value={edu.degree}
                                        onChange={(e) => updateEducation(index, "degree", e.target.value)}
                                        placeholder="Bachelor of Science in Computer Science"
                                    />
                                    <InputField
                                        label="Institution"
                                        name={`edu-institution-${index}`}
                                        value={edu.institution}
                                        onChange={(e) => updateEducation(index, "institution", e.target.value)}
                                        placeholder="Stanford University"
                                    />
                                </div>
                                <InputField
                                    label="Year of Graduation"
                                    name={`edu-year-${index}`}
                                    value={edu.year}
                                    onChange={(e) => updateEducation(index, "year", e.target.value)}
                                    placeholder="2020"
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    <button
                        onClick={addEducation}
                        className="w-full py-3 border-2 border-dashed border-neutral-300 rounded-xl text-neutral-600 font-semibold hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all flex items-center justify-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Education
                    </button>
                </div>
            </FormSection>

            {/* Projects */}
            <FormSection title="Projects" icon={Code}>
                <div className="space-y-4 pt-4">
                    <AnimatePresence>
                        {(resumeData.projects || []).map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="relative p-5 bg-neutral-50 rounded-xl border border-neutral-200 group"
                            >
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => removeProject(index)}
                                        className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <InputField
                                        label="Project Name"
                                        name={`proj-name-${index}`}
                                        value={project.name}
                                        onChange={(e) => updateProjectField(index, "name", e.target.value)}
                                        placeholder="Project Name"
                                    />
                                    <InputField
                                        label="Project Link"
                                        name={`proj-link-${index}`}
                                        value={project.link || ""}
                                        onChange={(e) => updateProjectField(index, "link", e.target.value)}
                                        placeholder="https://github.com/..."
                                        icon={Globe}
                                    />
                                </div>
                                <div className="mb-4">
                                    <TextAreaField
                                        label="Description"
                                        name={`proj-desc-${index}`}
                                        value={project.description}
                                        onChange={(e) => updateProjectField(index, "description", e.target.value)}
                                        placeholder="Briefly describe the project..."
                                        rows={3}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                                        Technologies (comma separated)
                                    </label>
                                    <input
                                        type="text"
                                        value={(project.technologies || []).join(",")}
                                        onChange={(e) => updateProject(index, "technologies", e.target.value)}
                                        placeholder="React, generic-ui, TypeScript"
                                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-neutral-400"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    <button
                        onClick={addProject}
                        className="w-full py-3 border-2 border-dashed border-neutral-300 rounded-xl text-neutral-600 font-semibold hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all flex items-center justify-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Project
                    </button>
                </div>
            </FormSection>
        </div>
    );
}