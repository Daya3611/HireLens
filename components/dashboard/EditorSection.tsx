"use client";

import { useState } from "react";
import { ResumeData } from "@/types/resume";
import ResumeForm from "@/components/ResumeForm";
import CustomizerPanel from "./CustomizerPanel";
import { TEMPLATES } from "../templates/TemplateRegistry";
import { motion, AnimatePresence } from "framer-motion";
import {
    Palette,
    Edit3,
    Sparkles,
    Layout,
    CheckCircle2,
    Download,
    Loader2,
    FileText,
} from "lucide-react";

interface EditorSectionProps {
    resumeData: ResumeData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
    selectedTemplate: string;
    setSelectedTemplate: (template: string) => void;
    onDownload: () => void;
    isDownloading: boolean;
}

export default function EditorSection({
    resumeData,
    setResumeData,
    selectedTemplate,
    setSelectedTemplate,
    onDownload,
    isDownloading,
}: EditorSectionProps) {
    const [activeEditorTab, setActiveEditorTab] = useState<"content" | "design" | "template">("content");

    const currentTemplate = TEMPLATES.find((t) => t.id === selectedTemplate);

    return (
        <div className="w-full space-y-5 pb-16">
            {/* Navigation Tabs Header */}
            <div className="bg-neutral-100 p-1.5 rounded-2xl flex items-center gap-1 border border-neutral-200/80 sticky top-0 z-20 shadow-xs">
                <button
                    onClick={() => setActiveEditorTab("content")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        activeEditorTab === "content"
                            ? "bg-white text-indigo-600 shadow-sm border border-neutral-200/60"
                            : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50"
                    }`}
                >
                    <Edit3 className="w-4 h-4 text-indigo-500" />
                    <span>Content</span>
                </button>
                <button
                    onClick={() => setActiveEditorTab("design")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        activeEditorTab === "design"
                            ? "bg-white text-purple-600 shadow-sm border border-neutral-200/60"
                            : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50"
                    }`}
                >
                    <Palette className="w-4 h-4 text-purple-500" />
                    <span>Design</span>
                </button>
                <button
                    onClick={() => setActiveEditorTab("template")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        activeEditorTab === "template"
                            ? "bg-white text-blue-600 shadow-sm border border-neutral-200/60"
                            : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50"
                    }`}
                >
                    <Layout className="w-4 h-4 text-blue-500" />
                    <span>Templates</span>
                </button>
            </div>

            {/* Tab Contents */}
            <AnimatePresence mode="wait">
                {/* 1. CONTENT TAB */}
                {activeEditorTab === "content" && (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                    >
                        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/80 shadow-xs">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                    <FileText className="w-4 h-4" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-neutral-900 text-base">Resume Content</h3>
                                    <p className="text-xs text-neutral-500">Fill in your personal, education, and career details</p>
                                </div>
                            </div>
                            <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
                        </div>
                    </motion.div>
                )}

                {/* 2. DESIGN TAB */}
                {activeEditorTab === "design" && (
                    <motion.div
                        key="design"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                    >
                        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/80 shadow-xs">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                                    <Palette className="w-4 h-4" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-neutral-900 text-base">Design & Customization</h3>
                                    <p className="text-xs text-neutral-500">Customize colors, fonts, spacing, and section layout</p>
                                </div>
                            </div>
                            <CustomizerPanel resumeData={resumeData} setResumeData={setResumeData} />
                        </div>
                    </motion.div>
                )}

                {/* 3. TEMPLATES TAB */}
                {activeEditorTab === "template" && (
                    <motion.div
                        key="template"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                    >
                        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/80 shadow-xs">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <Layout className="w-4 h-4" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-neutral-900 text-base">Choose Template</h3>
                                    <p className="text-xs text-neutral-500">Switch templates anytime — data is automatically preserved</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                {TEMPLATES.map((template) => {
                                    const isSelected = selectedTemplate === template.id;
                                    return (
                                        <button
                                            key={template.id}
                                            onClick={() => setSelectedTemplate(template.id)}
                                            className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                                                isSelected
                                                    ? "border-indigo-600 bg-indigo-50/40 shadow-sm ring-2 ring-indigo-500/20"
                                                    : "border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-xs"
                                            }`}
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className={`w-10 h-10 rounded-lg ${template.color} shadow-sm flex items-center justify-center text-white font-bold text-xs`}>
                                                    CV
                                                </div>
                                                {isSelected && (
                                                    <span className="bg-indigo-600 text-white rounded-full p-1 shadow-xs">
                                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                                    </span>
                                                )}
                                            </div>

                                            <div>
                                                <h4 className="font-bold text-neutral-900 text-sm">{template.name}</h4>
                                                <p className="text-xs text-neutral-500 mt-1 line-clamp-2">{template.description}</p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Template Features Pill Badges */}
                            {currentTemplate && (
                                <div className="mt-5 pt-4 border-t border-neutral-100">
                                    <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                                        Features of {currentTemplate.name}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {currentTemplate.features.map((feature, idx) => (
                                            <span
                                                key={idx}
                                                className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-100 rounded-full text-xs font-medium text-neutral-600 border border-neutral-200/60"
                                            >
                                                <Sparkles className="w-3 h-3 text-indigo-500" />
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Quick Tips Box */}
            <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-100 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                    <h4 className="font-bold text-neutral-900 text-xs uppercase tracking-wider mb-0.5">Pro Tip</h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                        Quantify achievements with metrics (e.g. "Increased sales by 35% across 12 regions").
                    </p>
                </div>
            </div>

            {/* Mobile/Desktop Download PDF Button */}
            <button
                onClick={onDownload}
                disabled={isDownloading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:shadow-lg transition-all font-semibold text-sm shadow-md shadow-indigo-500/20 disabled:opacity-50 cursor-pointer"
            >
                {isDownloading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Generating High-Res PDF...</span>
                    </>
                ) : (
                    <>
                        <Download className="w-4 h-4" />
                        <span>Download PDF Resume</span>
                    </>
                )}
            </button>
        </div>
    );
}