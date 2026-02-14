"use client";

import { ResumeData } from "@/types/resume";
import ResumeParser from "@/components/ResumeParser";
import ResumeForm from "@/components/ResumeForm";
import { motion } from "framer-motion";
import {
    Palette,
    FileUp,
    Edit3,
    ChevronRight,
    Sparkles,
    Layout,
    CheckCircle2,
} from "lucide-react";

interface EditorSectionProps {
    resumeData: ResumeData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
    selectedTemplate: string;
    setSelectedTemplate: (template: string) => void;
}

const templates = [
    {
        id: "one",
        name: "Modern",
        description: "Clean & Minimal",
        color: "from-blue-500 to-indigo-600",
        features: ["Two-column layout", "Skills highlight", "Modern typography"],
    },
    {
        id: "two",
        name: "Professional",
        description: "Classic & Elegant",
        color: "from-neutral-700 to-neutral-900",
        features: ["Traditional format", "ATS optimized", "Executive style"],
    },
];

export default function EditorSection({
    resumeData,
    setResumeData,
    selectedTemplate,
    setSelectedTemplate,
}: EditorSectionProps) {
    return (
        <div className="max-w-2xl mx-auto space-y-6 pb-20">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                            <Edit3 className="w-3.5 h-3.5" />
                            Live Editor
                        </span>
                    </div>
                    <h2 className="text-3xl font-bold text-neutral-900">Resume Editor</h2>
                    <p className="text-neutral-500 mt-1">
                        Update your information and watch your resume update in real-time.
                    </p>
                </div>
            </motion.div>

            {/* Template Selector - Mobile */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:hidden bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm"
            >
                <div className="flex items-center gap-2 mb-4">
                    <Palette className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-bold text-neutral-900">Choose Template</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {templates.map((template) => (
                        <button
                            key={template.id}
                            onClick={() => setSelectedTemplate(template.id)}
                            className={`relative p-4 rounded-2xl border-2 text-left transition-all duration-300 ${selectedTemplate === template.id
                                    ? "border-indigo-600 bg-indigo-50/50 shadow-md"
                                    : "border-neutral-200 bg-white hover:border-neutral-300"
                                }`}
                        >
                            {selectedTemplate === template.id && (
                                <div className="absolute top-3 right-3">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                                </div>
                            )}

                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${template.color} mb-3 shadow-lg`} />
                            <div className="font-semibold text-neutral-900 text-sm">
                                {template.name}
                            </div>
                            <div className="text-xs text-neutral-500 mt-0.5">
                                {template.description}
                            </div>
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Template Info - Desktop */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="hidden lg:block bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-6 border border-indigo-100"
            >
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Layout className="w-5 h-5 text-indigo-600" />
                            <h3 className="font-bold text-neutral-900">Template Settings</h3>
                        </div>
                        <p className="text-sm text-neutral-600 mb-4">
                            You're using the <span className="font-semibold text-indigo-600">{templates.find(t => t.id === selectedTemplate)?.name}</span> template.
                            Switch templates anytime without losing your data.
                        </p>

                        <div className="flex gap-3">
                            {templates.map((template) => (
                                <button
                                    key={template.id}
                                    onClick={() => setSelectedTemplate(template.id)}
                                    className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-300 ${selectedTemplate === template.id
                                            ? "border-indigo-600 bg-white shadow-md"
                                            : "border-transparent bg-white/60 hover:bg-white hover:shadow-sm"
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${template.color} shadow-sm`} />
                                    <div className="text-left">
                                        <div className="font-semibold text-neutral-900 text-sm">
                                            {template.name}
                                        </div>
                                        <div className="text-xs text-neutral-500">
                                            {template.description}
                                        </div>
                                    </div>
                                    {selectedTemplate === template.id && (
                                        <CheckCircle2 className="w-5 h-5 text-indigo-600 ml-2" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="mt-6 pt-6 border-t border-indigo-100">
                    <div className="flex flex-wrap gap-2">
                        {templates
                            .find((t) => t.id === selectedTemplate)
                            ?.features.map((feature, idx) => (
                                <span
                                    key={idx}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-xs font-medium text-neutral-600 border border-indigo-100"
                                >
                                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                                    {feature}
                                </span>
                            ))}
                    </div>
                </div>
            </motion.div>

            {/* Import Resume */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden"
            >
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                            <FileUp className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-neutral-900">Import Existing Resume</h3>
                            <p className="text-sm text-neutral-500">
                                Upload a PDF or DOCX to auto-fill your information
                            </p>
                        </div>
                    </div>
                    <ResumeParser onDataParsed={setResumeData} />
                </div>
            </motion.div>

            {/* Resume Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden"
            >
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                            <Edit3 className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-neutral-900">Personal Information</h3>
                            <p className="text-sm text-neutral-500">
                                Edit your details below
                            </p>
                        </div>
                    </div>
                    <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
                </div>
            </motion.div>

            {/* Quick Tips */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-100"
            >
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-neutral-900 text-sm mb-1">
                            Pro Tip
                        </h4>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                            Use action verbs and quantify your achievements. Instead of "Managed team",
                            try "Led a team of 5 developers to deliver project 2 weeks ahead of schedule".
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}