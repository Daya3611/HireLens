"use client";

import { useState } from "react";

export default function ATSScanner() {
    const [file, setFile] = useState<File | null>(null);
    const [jd, setJd] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        if (!file || !jd) return;

        setLoading(true);
        setResult("");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("jobDescription", jd);

        const res = await fetch("/api/ats-analyze", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
            alert(data.error);
            return;
        }

        setResult(data.analysis);
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Resume ATS Checker</h1>

            <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
            />

            <textarea
                className="w-full border p-3 mt-4"
                rows={6}
                placeholder="Paste job description"
                value={jd}
                onChange={(e) => setJd(e.target.value)}
            />

            <button
                onClick={handleSubmit}
                className="mt-4 bg-black text-white px-6 py-3 rounded"
            >
                {loading ? "Analyzing..." : "Check ATS Score"}
            </button>

            {result && (
                <pre className="mt-6 bg-gray-100 p-4 whitespace-pre-wrap">
                    {result}
                </pre>
            )}
        </div>
    );
}
