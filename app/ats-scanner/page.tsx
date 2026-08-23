"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import {
    UploadCloud,
    FileText,
    CheckCircle2,
    AlertTriangle,
    Sparkles,
    Check,
    X,
    Copy,
    ArrowRight,
    RefreshCw,
    ShieldCheck,
    Briefcase,
    Zap,
    Loader2,
    Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AnalysisResult {
    score: number;
    matchRate: number;
    summary: string;
    missingKeywords: string[];
    matchingKeywords: string[];
    suggestions: string[];
    formatScore?: number;
    formatFeedback?: string;
}

const SAMPLE_JD = `Senior Software Engineer Requirements:
- 5+ years of experience with React, Next.js, and TypeScript.
- Strong proficiency in state management (TanStack Query, Redux) and Tailwind CSS.
- Experience building RESTful APIs, Node.js microservices, and GraphQL integrations.
- Familiarity with CI/CD pipelines, Docker, Kubernetes, and AWS cloud architecture.
- Demonstrated track record of optimizing Core Web Vitals and frontend page speed.`;

export default function ATSScannerPage() {
    const [file, setFile] = useState<File | null>(null);
    const [jd, setJd] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleFileDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile && droppedFile.type.includes("pdf")) {
            setFile(droppedFile);
        } else {
            alert("Please upload a PDF document.");
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleAnalyze = async () => {
        if (!file) {
            alert("Please upload your PDF resume.");
            return;
        }
        if (!jd.trim()) {
            alert("Please paste a job description.");
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("jobDescription", jd);

            const res = await fetch("/api/ats-analyze", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (!res.ok) {
                alert(data.error || "Analysis failed.");
                return;
            }

            setResult(data.analysis);
        } catch (error) {
            console.error("ATS analysis error:", error);
            alert("Failed to analyze resume. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text: string, idx: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(idx);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-emerald-600 bg-emerald-50 border-emerald-200";
        if (score >= 60) return "text-amber-600 bg-amber-50 border-amber-200";
        return "text-rose-600 bg-rose-50 border-rose-200";
    };

    const getScoreBadge = (score: number) => {
        if (score >= 80) return "Excellent Match";
        if (score >= 65) return "Good Fit";
        return "Needs Optimization";
    };

    return (
        <div className="min-h-screen bg-slate-50/60 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
            <Navbar />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-14 space-y-6">
                {/* Under Development Banner */}
                <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 text-amber-900 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm flex items-center gap-2">
                            ATS Scanner is Under Active Development 🚧
                            <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-extrabold uppercase">Beta Preview</span>
                        </h3>
                        <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                            We are actively improving AI PDF text extraction and keyword matching algorithms. Full accuracy fine-tuning is currently in progress.
                        </p>
                    </div>
                </div>

                {/* Hero Header */}

                <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-indigo-500/10">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-bold mb-4">
                            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                            AI ATS Resume Auditor
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                            ATS Resume Matcher & Checker
                        </h1>
                        <p className="text-indigo-100 text-sm sm:text-base mt-2 leading-relaxed">
                            Upload your PDF resume and paste the job description to get an instant ATS compatibility score, missing keyword breakdown, and recruiter optimization tips.
                        </p>
                    </div>
                </div>

                {/* Input Grid (File Dropzone & Job Description) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column: PDF Dropzone */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                                        1
                                    </div>
                                    <h3 className="font-bold text-slate-900 text-base">Upload Resume PDF</h3>
                                </div>
                                {file && (
                                    <button
                                        onClick={() => setFile(null)}
                                        className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 cursor-pointer"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" /> Remove
                                    </button>
                                )}
                            </div>

                            {/* Dropzone */}
                            {!file ? (
                                <div
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        setIsDragging(true);
                                    }}
                                    onDragLeave={() => setIsDragging(false)}
                                    onDrop={handleFileDrop}
                                    className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer relative min-h-[220px] ${
                                        isDragging
                                            ? "border-indigo-600 bg-indigo-50/50 scale-[1.01]"
                                            : "border-slate-300 hover:border-indigo-400 bg-slate-50/50 hover:bg-indigo-50/20"
                                    }`}
                                >
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileSelect}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mb-3 shadow-xs">
                                        <UploadCloud className="w-7 h-7" />
                                    </div>
                                    <p className="font-bold text-slate-900 text-sm">
                                        Click to upload or drag & drop PDF
                                    </p>
                                    <p className="text-xs text-slate-500 mt-1">
                                        Supports text-based PDF files (Max 10MB)
                                    </p>
                                </div>
                            ) : (
                                <div className="border border-indigo-200 bg-indigo-50/40 rounded-2xl p-5 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/20">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-slate-900 text-sm truncate">{file.name}</h4>
                                        <p className="text-xs text-slate-500 mt-0.5">
                                            {(file.size / 1024).toFixed(1)} KB • PDF Document
                                        </p>
                                    </div>
                                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                                </div>
                            )}
                        </div>

                        <div className="pt-2">
                            <p className="text-xs text-slate-400 flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                Resumes are processed privately and never shared publicly.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Job Description TextArea */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                                        2
                                    </div>
                                    <h3 className="font-bold text-slate-900 text-base">Job Description</h3>
                                </div>
                                <button
                                    onClick={() => setJd(SAMPLE_JD)}
                                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer"
                                >
                                    Paste Sample JD
                                </button>
                            </div>

                            <div className="relative">
                                <textarea
                                    value={jd}
                                    onChange={(e) => setJd(e.target.value)}
                                    rows={8}
                                    placeholder="Paste target job description requirements, skills, and qualifications here..."
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none leading-relaxed"
                                />
                                <div className="absolute bottom-3 right-3 text-[10px] text-slate-400 font-semibold bg-white/80 px-2 py-0.5 rounded border border-slate-200">
                                    {jd.length} chars
                                </div>
                            </div>
                        </div>

                        {/* Analyze Button */}
                        <button
                            onClick={handleAnalyze}
                            disabled={loading || !file || !jd.trim()}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3.5 rounded-xl hover:shadow-lg transition-all font-bold text-sm shadow-md shadow-indigo-500/20 disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Auditing Resume against ATS...</span>
                                </>
                            ) : (
                                <>
                                    <Zap className="w-4 h-4" />
                                    <span>Check ATS Score & Keywords</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Analysis Results Dashboard */}
                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6 pt-4"
                        >
                            {/* Score Overview Card */}
                            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                                    {/* Radial Score Meter */}
                                    <div className="flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
                                        <div className="relative w-36 h-36 flex items-center justify-center">
                                            {/* Outer Ring */}
                                            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                                <path
                                                    className="text-slate-100"
                                                    strokeWidth="3.5"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                />
                                                <path
                                                    className="text-indigo-600 transition-all duration-1000"
                                                    strokeDasharray={`${result.score}, 100`}
                                                    strokeWidth="3.5"
                                                    strokeLinecap="round"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                />
                                            </svg>
                                            <div className="absolute flex flex-col items-center">
                                                <span className="text-3xl font-black text-slate-900">{result.score}</span>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">/ 100 ATS</span>
                                            </div>
                                        </div>

                                        <div className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-extrabold ${getScoreColor(result.score)}`}>
                                            <Sparkles className="w-3.5 h-3.5" />
                                            {getScoreBadge(result.score)}
                                        </div>
                                    </div>

                                    {/* Breakdown Metrics */}
                                    <div className="md:col-span-2 space-y-4">
                                        <h3 className="font-bold text-slate-900 text-lg">Analysis Summary</h3>
                                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                            {result.summary}
                                        </p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/60">
                                                <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
                                                    <span>Keyword Match Rate</span>
                                                    <span className="text-indigo-600">{result.matchRate}%</span>
                                                </div>
                                                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                                    <div className="bg-indigo-600 h-full rounded-full transition-all duration-700" style={{ width: `${result.matchRate}%` }} />
                                                </div>
                                            </div>

                                            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/60">
                                                <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
                                                    <span>Format & Parsing Score</span>
                                                    <span className="text-emerald-600">{result.formatScore || 90}%</span>
                                                </div>
                                                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                                    <div className="bg-emerald-600 h-full rounded-full transition-all duration-700" style={{ width: `${result.formatScore || 90}%` }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Keywords Grid (Missing vs Matching) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Missing Keywords */}
                                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                                            <X className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm">Missing Job Keywords ({result.missingKeywords.length})</h4>
                                            <p className="text-[11px] text-slate-500">Add these to your resume to pass ATS filters</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {result.missingKeywords.map((keyword, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => copyToClipboard(keyword, idx)}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/80 text-xs font-semibold transition-colors cursor-pointer"
                                                title="Click to copy keyword"
                                            >
                                                <span>{keyword}</span>
                                                {copiedIndex === idx ? (
                                                    <Check className="w-3 h-3 text-emerald-600" />
                                                ) : (
                                                    <Copy className="w-3 h-3 text-rose-400" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Matching Keywords */}
                                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                            <Check className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm">Matching Keywords ({result.matchingKeywords.length})</h4>
                                            <p className="text-[11px] text-slate-500">Great job! These terms were detected</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {result.matchingKeywords.map((keyword, idx) => (
                                            <span
                                                key={idx}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-semibold"
                                            >
                                                <Check className="w-3 h-3" />
                                                <span>{keyword}</span>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Suggestions & Action Plan */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                        <Sparkles className="w-4 h-4" />
                                    </div>
                                    <h4 className="font-bold text-slate-900 text-base">Actionable Recommendations</h4>
                                </div>

                                <div className="space-y-3">
                                    {result.suggestions.map((suggestion, idx) => (
                                        <div
                                            key={idx}
                                            className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 flex items-start gap-3"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                                {idx + 1}
                                            </div>
                                            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                                                {suggestion}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

