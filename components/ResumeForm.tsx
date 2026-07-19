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
    Languages,
    Trophy,
    Heart,
    Users,
    Camera,
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
    const [interestInput, setInterestInput] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setResumeData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setResumeData((prev) => ({ ...prev, profilePhoto: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const removePhoto = () => {
        setResumeData((prev) => ({ ...prev, profilePhoto: undefined }));
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

    const addCertification = () => {
        setResumeData((prev) => ({
            ...prev,
            certifications: [
                ...(prev.certifications || []),
                { name: "", issuer: "", year: "" },
            ],
        }));
    };

    const updateCertification = (index: number, field: string, value: string) => {
        const newCerts = [...(resumeData.certifications || [])];
        // @ts-ignore
        newCerts[index] = { ...newCerts[index], [field]: value };
        setResumeData((prev) => ({ ...prev, certifications: newCerts }));
    };

    const removeCertification = (index: number) => {
        const newCerts = (resumeData.certifications || []).filter((_, i) => i !== index);
        setResumeData((prev) => ({ ...prev, certifications: newCerts }));
    };

    const addAward = () => {
        setResumeData((prev) => ({
            ...prev,
            awards: [
                ...(prev.awards || []),
                { name: "", issuer: "", year: "", description: "" },
            ],
        }));
    };

    const updateAward = (index: number, field: string, value: string) => {
        const newAwards = [...(resumeData.awards || [])];
        // @ts-ignore
        newAwards[index] = { ...newAwards[index], [field]: value };
        setResumeData((prev) => ({ ...prev, awards: newAwards }));
    };

    const removeAward = (index: number) => {
        const newAwards = (resumeData.awards || []).filter((_, i) => i !== index);
        setResumeData((prev) => ({ ...prev, awards: newAwards }));
    };

    const addLanguage = () => {
        setResumeData((prev) => ({
            ...prev,
            languages: [
                ...(prev.languages || []),
                { name: "", level: "" },
            ],
        }));
    };

    const updateLanguage = (index: number, field: string, value: string) => {
        const newLangs = [...(resumeData.languages || [])];
        // @ts-ignore
        newLangs[index] = { ...newLangs[index], [field]: value };
        setResumeData((prev) => ({ ...prev, languages: newLangs }));
    };

    const removeLanguage = (index: number) => {
        const newLangs = (resumeData.languages || []).filter((_, i) => i !== index);
        setResumeData((prev) => ({ ...prev, languages: newLangs }));
    };

    const addInterest = (interest: string) => {
        if (!interest.trim()) return;
        setResumeData((prev) => ({
            ...prev,
            interests: [...(prev.interests || []), interest.trim()],
        }));
    };

    const removeInterest = (index: number) => {
        const newInterests = (resumeData.interests || []).filter((_, i) => i !== index);
        setResumeData((prev) => ({ ...prev, interests: newInterests }));
    };

    const addReference = () => {
        setResumeData((prev) => ({
            ...prev,
            references: [
                ...(prev.references || []),
                { name: "", title: "", company: "", contact: "" },
            ],
        }));
    };

    const updateReference = (index: number, field: string, value: string) => {
        const newRefs = [...(resumeData.references || [])];
        // @ts-ignore
        newRefs[index] = { ...newRefs[index], [field]: value };
        setResumeData((prev) => ({ ...prev, references: newRefs }));
    };

    const removeReference = (index: number) => {
        const newRefs = (resumeData.references || []).filter((_, i) => i !== index);
        setResumeData((prev) => ({ ...prev, references: newRefs }));
    };

    return (
        <div className="space-y-4">
            {/* Personal Information */}
            <FormSection title="Personal Information" icon={User}>
                <div className="flex flex-col sm:flex-row items-center gap-5 pt-4 pb-2 border-b border-neutral-100">
                    <div className="flex flex-col items-center gap-2">
                        {resumeData.profilePhoto ? (
                            <div className="relative group">
                                <img
                                    src={resumeData.profilePhoto}
                                    alt="Profile"
                                    className="w-20 h-20 rounded-full object-cover border-2 border-neutral-200"
                                />
                                <button
                                    onClick={removePhoto}
                                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                            </div>
                        ) : (
                            <div className="w-20 h-20 rounded-full bg-neutral-100 border-2 border-dashed border-neutral-300 flex items-center justify-center text-neutral-400">
                                <Camera className="w-6 h-6" />
                            </div>
                        )}
                        <label className="cursor-pointer bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-[11px] font-bold px-2 py-1 rounded transition-colors text-neutral-700">
                            Upload Photo
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                                className="hidden"
                            />
                        </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 w-full">
                        <InputField
                            label="Full Name"
                            name="name"
                            value={resumeData.name || ""}
                            onChange={handleChange}
                            placeholder="John Doe"
                            icon={User}
                        />
                        <InputField
                            label="Professional Title"
                            name="title"
                            value={resumeData.title || ""}
                            onChange={handleChange}
                            placeholder="Software Engineer"
                            icon={Briefcase}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
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
                    <InputField
                        label="Website Portfolio"
                        name="website"
                        value={resumeData.website || ""}
                        onChange={handleChange}
                        placeholder="https://myportfolio.com"
                        icon={Globe}
                    />
                    <InputField
                        label="LinkedIn Link"
                        name="linkedin"
                        value={resumeData.linkedin || ""}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/username"
                    />
                    <InputField
                        label="GitHub Link"
                        name="github"
                        value={resumeData.github || ""}
                        onChange={handleChange}
                        placeholder="https://github.com/username"
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

            {/* Certifications */}
            <FormSection title="Certifications" icon={FileText}>
                <div className="space-y-4 pt-4">
                    <AnimatePresence>
                        {(resumeData.certifications || []).map((cert, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="relative p-5 bg-neutral-50 rounded-xl border border-neutral-200 group"
                            >
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => removeCertification(index)}
                                        className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <InputField
                                        label="Certification Name"
                                        name={`cert-name-${index}`}
                                        value={cert.name}
                                        onChange={(e) => updateCertification(index, "name", e.target.value)}
                                        placeholder="AWS Certified Solutions Architect"
                                    />
                                    <InputField
                                        label="Issuing Organization"
                                        name={`cert-issuer-${index}`}
                                        value={cert.issuer}
                                        onChange={(e) => updateCertification(index, "issuer", e.target.value)}
                                        placeholder="Amazon Web Services"
                                    />
                                </div>
                                <InputField
                                    label="Year"
                                    name={`cert-year-${index}`}
                                    value={cert.year}
                                    onChange={(e) => updateCertification(index, "year", e.target.value)}
                                    placeholder="2022"
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    <button
                        onClick={addCertification}
                        className="w-full py-3 border-2 border-dashed border-neutral-300 rounded-xl text-neutral-600 font-semibold hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all flex items-center justify-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Certification
                    </button>
                </div>
            </FormSection>

            {/* Awards */}
            <FormSection title="Honors & Awards" icon={Trophy}>
                <div className="space-y-4 pt-4">
                    <AnimatePresence>
                        {(resumeData.awards || []).map((award, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="relative p-5 bg-neutral-50 rounded-xl border border-neutral-200 group"
                            >
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => removeAward(index)}
                                        className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <InputField
                                        label="Award Name"
                                        name={`award-name-${index}`}
                                        value={award.name}
                                        onChange={(e) => updateAward(index, "name", e.target.value)}
                                        placeholder="Employee of the Year"
                                    />
                                    <InputField
                                        label="Issuing Organization"
                                        name={`award-issuer-${index}`}
                                        value={award.issuer}
                                        onChange={(e) => updateAward(index, "issuer", e.target.value)}
                                        placeholder="Tech Corp"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="md:col-span-1">
                                        <InputField
                                            label="Year"
                                            name={`award-year-${index}`}
                                            value={award.year}
                                            onChange={(e) => updateAward(index, "year", e.target.value)}
                                            placeholder="2023"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <InputField
                                            label="Brief Description (Optional)"
                                            name={`award-desc-${index}`}
                                            value={award.description || ""}
                                            onChange={(e) => updateAward(index, "description", e.target.value)}
                                            placeholder="Selected out of 500+ employees"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    <button
                        onClick={addAward}
                        className="w-full py-3 border-2 border-dashed border-neutral-300 rounded-xl text-neutral-600 font-semibold hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all flex items-center justify-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Honor/Award
                    </button>
                </div>
            </FormSection>

            {/* Languages */}
            <FormSection title="Languages" icon={Languages}>
                <div className="space-y-4 pt-4">
                    <AnimatePresence>
                        {(resumeData.languages || []).map((lang, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="relative p-5 bg-neutral-50 rounded-xl border border-neutral-200 group"
                            >
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => removeLanguage(index)}
                                        className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField
                                        label="Language"
                                        name={`lang-name-${index}`}
                                        value={lang.name}
                                        onChange={(e) => updateLanguage(index, "name", e.target.value)}
                                        placeholder="English"
                                    />
                                    <InputField
                                        label="Proficiency Level"
                                        name={`lang-level-${index}`}
                                        value={lang.level}
                                        onChange={(e) => updateLanguage(index, "level", e.target.value)}
                                        placeholder="Native / Fluent / Intermediate"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    <button
                        onClick={addLanguage}
                        className="w-full py-3 border-2 border-dashed border-neutral-300 rounded-xl text-neutral-600 font-semibold hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all flex items-center justify-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Language
                    </button>
                </div>
            </FormSection>

            {/* Interests */}
            <FormSection title="Interests" icon={Heart}>
                <div className="pt-4 space-y-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={interestInput}
                            onChange={(e) => setInterestInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    addInterest(interestInput);
                                    setInterestInput("");
                                }
                            }}
                            placeholder="Add interest (e.g. Open Source, Running)"
                            className="flex-1 px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-neutral-400 text-sm"
                        />
                        <button
                            onClick={() => {
                                addInterest(interestInput);
                                setInterestInput("");
                            }}
                            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-colors"
                        >
                            Add
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {(resumeData.interests || []).map((interest, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="group flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 border border-neutral-200 text-neutral-700 rounded-lg text-sm font-semibold transition-colors"
                            >
                                <span>{interest}</span>
                                <button
                                    onClick={() => removeInterest(index)}
                                    className="text-neutral-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </FormSection>

            {/* References */}
            <FormSection title="References" icon={Users}>
                <div className="space-y-4 pt-4">
                    <AnimatePresence>
                        {(resumeData.references || []).map((ref, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="relative p-5 bg-neutral-50 rounded-xl border border-neutral-200 group"
                            >
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => removeReference(index)}
                                        className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <InputField
                                        label="Reference Name"
                                        name={`ref-name-${index}`}
                                        value={ref.name}
                                        onChange={(e) => updateReference(index, "name", e.target.value)}
                                        placeholder="Jane Smith"
                                    />
                                    <InputField
                                        label="Job Title / Company"
                                        name={`ref-title-${index}`}
                                        value={`${ref.title ? ref.title + ", " : ""}${ref.company || ""}`}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            const parts = val.split(",");
                                            const title = parts[0]?.trim() || "";
                                            const company = parts.slice(1).join(",").trim() || "";
                                            updateReference(index, "title", title);
                                            updateReference(index, "company", company);
                                        }}
                                        placeholder="VP of Engineering, Google"
                                    />
                                </div>
                                <InputField
                                    label="Contact Information (Email / Phone)"
                                    name={`ref-contact-${index}`}
                                    value={ref.contact}
                                    onChange={(e) => updateReference(index, "contact", e.target.value)}
                                    placeholder="jane.smith@example.com / +1 (555) 019-2834"
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    <button
                        onClick={addReference}
                        className="w-full py-3 border-2 border-dashed border-neutral-300 rounded-xl text-neutral-600 font-semibold hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all flex items-center justify-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Reference
                    </button>
                </div>
            </FormSection>
        </div>
    );
}