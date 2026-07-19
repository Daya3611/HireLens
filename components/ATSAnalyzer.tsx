"use client";
import { useState } from "react";
import { Copy, Check, CircleX } from "lucide-react";
import { ATSAnalysis, ResumeData } from "@/types/resume";

export default function ATSAnalyzer({ resumeData }: { resumeData: ResumeData }) {
    const [loading, setLoading] = useState(false);
    const [jobDescription, setJobDescription] = useState("");
    const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null);

    const handleAnalyze = async () => {
        if (!jobDescription) return;

        setLoading(true);
        setAnalysis(null);

        const response = await fetch("/api/ats-analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resumeData, jobDescription }),
        });

        const data = await response.json();
        setAnalysis(data);
        setLoading(false);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-6 md:mt-0 max-w-sm sticky top-24">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
                AI ATS Scanner
            </h3>
            <p className="text-sm text-gray-500 mb-4">
                Paste a job description to check your resume score.
            </p>

            <textarea
                placeholder="Paste Job Description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={6}
                className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm resize-none"
            />

            <button
                onClick={handleAnalyze}
                disabled={loading || !jobDescription}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
            >
                {loading ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                    "Scan Resume"
                )}
            </button>

            {analysis && (
                <div className="mt-6 animate-in slide-in-from-top-4 duration-500">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-gray-900">Match Score</h4>
                        <span
                            className={`text-2xl font-bold ${analysis.score >= 80
                                ? "text-green-600"
                                : analysis.score >= 60
                                    ? "text-yellow-600"
                                    : "text-red-600"
                                }`}
                        >
                            {analysis.score}/100
                        </span>
                    </div>

                    <div className="space-y-4 text-sm">
                        {analysis.missingKeywords?.length > 0 && (
                            <div className="bg-red-50 p-3 rounded-md border border-red-100">
                                <h5 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                                    <CircleX size={16} /> Missing Keywords
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                    {analysis.missingKeywords.map((k) => (
                                        <span
                                            key={k}
                                            className="bg-white text-red-600 px-2 py-1 rounded text-xs border border-red-200 font-medium"
                                        >
                                            {k}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {analysis.improvements?.length > 0 && (
                            <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                                <h5 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                                    💡 Suggestions
                                </h5>
                                <ul className="list-disc pl-4 text-blue-900 space-y-1">
                                    {analysis.improvements.map((imp, i) => (
                                        <li key={i}>{imp}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {analysis.strengths?.length > 0 && (
                            <div className="bg-green-50 p-3 rounded-md border border-green-100">
                                <h5 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                                    <Check size={16} /> Strengths
                                </h5>
                                <ul className="list-disc pl-4 text-green-900 space-y-1">
                                    {analysis.strengths.map((s, i) => (
                                        <li key={i}>{s}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
