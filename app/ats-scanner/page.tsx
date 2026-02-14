"use client";

import { useState, useCallback } from "react";
import Navbar from "@/components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import {
    Upload,
    AlertTriangle,
    CheckCircle,
    XCircle,
    FileText,
    Briefcase,
    Sparkles,
    ArrowRight,
    RotateCcw,
    Download,
    Zap,
    Target,
    TrendingUp,
    AlertCircle,
} from "lucide-react";

interface ATSResult {
    score: number;
    keywordMatchPercentage: number;
    missingKeywords: string[];
    strengths: string[];
    improvements: string[];
    formattingIssues: string[];
}

export default function ATSUploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [jobDescription, setJobDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ATSResult | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
            setError(null);
        }
    }, []);

    const handleUpload = async () => {
        if (!file || !jobDescription) return;

        setLoading(true);
        setResult(null);
        setError(null);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("jobDescription", jobDescription);

        try {
            const res = await fetch("/api/ats-analyze", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to analyze resume");
            }

            setResult(data);
        } catch (error: any) {
            console.error(error);
            setError(error.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    const getScoreData = (score: number) => {
        if (score >= 80) return { color: "green", label: "Excellent", icon: CheckCircle };
        if (score >= 60) return { color: "yellow", label: "Good", icon: AlertCircle };
        return { color: "red", label: "Needs Work", icon: XCircle };
    };

    const scoreData = result ? getScoreData(result.score) : null;

    const clearAnalysis = () => {
        setResult(null);
        setFile(null);
        setJobDescription("");
    };

    return (
        <div className="min-h-screen bg-neutral-50">
            <Navbar />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 mt-12">
                {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12 pt-9"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-4">
                        <Sparkles size={16} />
                        AI-Powered Analysis
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                        ATS Resume Scanner
                    </h1>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        Upload your resume and paste the job description to get instant feedback on your ATS compatibility score.
                    </p>
                </motion.div> */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        🚧 Currently Under Development 🚧
                    </h1>
                    <p className="text-gray-600">
                        We’re working hard to launch this feature soon.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-8">
                    {/* <div className="lg:col-span-2 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100"
                        >
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-blue-600" />
                                    Upload Resume
                                </label>
                                <div
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${dragActive
                                        ? "border-blue-500 bg-blue-50"
                                        : file
                                            ? "border-green-500 bg-green-50"
                                            : "border-neutral-300 hover:border-neutral-400 bg-neutral-50"
                                        }`}
                                >
                                    <input
                                        type="file"
                                        accept=".pdf,.docx"
                                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />

                                    {file ? (
                                        <div className="space-y-2">
                                            <div className="w-12 h-12 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                                                <CheckCircle className="w-6 h-6 text-green-600" />
                                            </div>
                                            <p className="font-semibold text-neutral-900">{file.name}</p>
                                            <p className="text-sm text-neutral-500">Click or drag to replace</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <div className="w-12 h-12 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
                                                <Upload className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-neutral-900">Drop your resume here</p>
                                                <p className="text-sm text-neutral-500 mt-1">PDF or DOCX up to 5MB</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-blue-600" />
                            Job Description
                        </label>
                        <textarea
                            placeholder="Paste the job description here to compare against your resume..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            className="w-full h-48 p-4 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none text-sm"
                        />
                        <div className="mt-2 text-right text-xs text-neutral-400">
                            {jobDescription.length} characters
                        </div>
                    </div>

                    <button
                        onClick={handleUpload}
                        disabled={loading || !file || !jobDescription}
                        className="w-full group relative inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 overflow-hidden"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <Zap className="w-5 h-5" />
                                Analyze Resume
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 border border-blue-100"
                >
                    <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-blue-600" />
                        Pro Tips
                    </h3>
                    <ul className="space-y-3 text-sm text-neutral-600">
                        <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            Use standard section headings (Experience, Education, Skills)
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            Include keywords from the job description naturally
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            Avoid tables, headers/footers, and complex formatting
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            Save as PDF for best compatibility
                        </li>
                    </ul>
                </motion.div>
        </div>

                    {
        error && (
            <div className="lg:col-span-5 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 text-red-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
            </div>
        )
    }

    <div className="lg:col-span-3">
        <AnimatePresence mode="wait">
            {!result ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex items-center justify-center min-h-[500px]"
                >
                    <div className="text-center text-neutral-400">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-neutral-100 flex items-center justify-center">
                            <TrendingUp className="w-10 h-10 text-neutral-300" />
                        </div>
                        <p className="text-lg font-medium">Your analysis results will appear here</p>
                        <p className="text-sm mt-2">Upload your resume to get started</p>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="relative">
                                <svg className="w-32 h-32 transform -rotate-90">
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="56"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        className="text-neutral-100"
                                    />
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="56"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        strokeDasharray={`${2 * Math.PI * 56}`}
                                        strokeDashoffset={`${2 * Math.PI * 56 * (1 - (result.score ?? 0) / 100)}`}
                                        className={`${(result.score ?? 0) >= 80
                                            ? "text-green-500"
                                            : (result.score ?? 0) >= 60
                                                ? "text-yellow-500"
                                                : "text-red-500"
                                            } transition-all duration-1000 ease-out`}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-bold text-neutral-900">{result.score ?? 0}</span>
                                    <span className="text-xs text-neutral-500">/100</span>
                                </div>
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                    {scoreData && (
                                        <>
                                            <scoreData.icon
                                                className={`w-5 h-5 ${(result.score ?? 0) >= 80
                                                    ? "text-green-500"
                                                    : (result.score ?? 0) >= 60
                                                        ? "text-yellow-500"
                                                        : "text-red-500"
                                                    }`}
                                            />
                                            <span
                                                className={`font-bold ${(result.score ?? 0) >= 80
                                                    ? "text-green-600"
                                                    : (result.score ?? 0) >= 60
                                                        ? "text-yellow-600"
                                                        : "text-red-600"
                                                    }`}
                                            >
                                                {scoreData.label}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                                    ATS Compatibility Score
                                </h3>
                                <p className="text-neutral-600 mb-4">
                                    {(result.score ?? 0) >= 80
                                        ? "Great job! Your resume is well-optimized for ATS systems."
                                        : (result.score ?? 0) >= 60
                                            ? "Good start, but there's room for improvement."
                                            : "Your resume needs significant optimization to pass ATS filters."}
                                </p>
                                <div className="flex gap-3 justify-center md:justify-start">
                                    <button
                                        onClick={clearAnalysis}
                                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                                    >
                                        <RotateCcw className="w-4 h-4" />
                                        New Analysis
                                    </button>
                                    <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Download className="w-4 h-4" />
                                        Export Report
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-neutral-900 flex items-center gap-2">
                                <Target className="w-5 h-5 text-blue-600" />
                                Keyword Match
                            </h3>
                            <span className="text-2xl font-bold text-neutral-900">
                                {result.keywordMatchPercentage ?? 0}%
                            </span>
                        </div>
                        <div className="w-full bg-neutral-100 h-3 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${result.keywordMatchPercentage ?? 0}%` }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className={`h-full rounded-full ${(result.keywordMatchPercentage ?? 0) >= 70
                                    ? "bg-green-500"
                                    : (result.keywordMatchPercentage ?? 0) >= 50
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                    }`}
                            />
                        </div>
                        <p className="text-sm text-neutral-500 mt-2">
                            {result.keywordMatchPercentage ?? 0}% of required keywords found in your resume
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {result.missingKeywords?.length > 0 && (
                            <div className="bg-red-50 rounded-3xl p-6 border border-red-100">
                                <h3 className="font-bold text-red-700 mb-4 flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5" />
                                    Missing Keywords
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {result.missingKeywords.map((keyword, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1.5 bg-white text-red-700 rounded-lg text-sm font-medium border border-red-200"
                                        >
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {result.strengths?.length > 0 && (
                            <div className="bg-green-50 rounded-3xl p-6 border border-green-100">
                                <h3 className="font-bold text-green-700 mb-4 flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5" />
                                    Strengths
                                </h3>
                                <ul className="space-y-2">
                                    {result.strengths.map((strength, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-green-800">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                                            {strength}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {result.improvements?.length > 0 && (
                            <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100">
                                <h3 className="font-bold text-blue-700 mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5" />
                                    Suggested Improvements
                                </h3>
                                <ul className="space-y-2">
                                    {result.improvements.map((improvement, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-blue-800">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                                            {improvement}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {result.formattingIssues?.length > 0 && (
                            <div className="bg-yellow-50 rounded-3xl p-6 border border-yellow-100">
                                <h3 className="font-bold text-yellow-700 mb-4 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5" />
                                    Formatting Issues
                                </h3>
                                <ul className="space-y-2">
                                    {result.formattingIssues.map((issue, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-yellow-800">
                                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 flex-shrink-0" />
                                            {issue}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div> */
                    }
                </div >
            </main >
        </div >
    );
}