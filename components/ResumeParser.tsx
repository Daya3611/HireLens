"use client";

import { useState } from "react";
import { Upload, FileUp, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { ResumeData } from "@/types/resume";

interface ResumeParserProps {
    onDataParsed: (data: ResumeData) => void;
}

export default function ResumeParser({ onDataParsed }: ResumeParserProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        setError(null);
        setSuccess(false);
        setFileName(file.name);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/parse-resume", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Parser failed");

            const parsedData = await response.json();
            onDataParsed(parsedData);
            setSuccess(true);
        } catch (err) {
            setError("Failed to parse resume. Ensure file is readable PDF/DOCX.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                    <FileUp className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Import Resume</h3>
                    <p className="text-sm text-gray-500">
                        Auto-fill from PDF or DOCX
                    </p>
                </div>
            </div>

            <div className="relative group">
                <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    disabled={loading}
                />

                <div className={`
                    border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
                    ${loading ? "bg-gray-50 border-gray-300" :
                        success ? "bg-green-50 border-green-300" :
                            error ? "bg-red-50 border-red-300" :
                                "bg-gray-50 border-gray-300 hover:border-indigo-400 hover:bg-indigo-50/30"}
                `}>
                    <div className="flex flex-col items-center justify-center gap-3">
                        {loading ? (
                            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                        ) : success ? (
                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                        ) : error ? (
                            <AlertCircle className="w-8 h-8 text-red-500" />
                        ) : (
                            <Upload className="w-8 h-8 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                        )}

                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-900">
                                {loading ? "Analyzing with AI..." :
                                    success ? "Resume imported!" :
                                        error ? "Upload failed" :
                                            fileName || "Click to upload resume"}
                            </p>
                            <p className="text-xs text-gray-500">
                                {!loading && !success && !error && "PDF or DOCX, max 5MB"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
}