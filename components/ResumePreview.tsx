"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResumeData } from "@/types/resume";
import TemplateOne from "./templates/TemplateOne";
import TemplateTwo from "./templates/TemplateTwo";
import TemplateThree from "./templates/TemplateThree";
import TemplateFour from "./templates/TemplateFour";
import TemplateFive from "./templates/TemplateFive";
import TemplateSix from "./templates/TemplateSix";
import TemplateSeven from "./templates/TemplateSeven";
import { generatePDF } from "@/lib/generatePDF.client";
import {
    ZoomIn,
    ZoomOut,
    Download,
    FileText,
    CheckCircle2,
    Loader2,
    Maximize2,
    RotateCcw,
    Eye,
    Printer,
} from "lucide-react";

interface ResumePreviewProps {
    data: ResumeData;
    template: string;
}

const templates = {
    one: { name: "Modern", color: "from-blue-500 to-indigo-600" },
    two: { name: "Professional", color: "from-neutral-700 to-neutral-900" },
    three: { name: "Minimalist", color: "from-stone-500 to-stone-700" },
    four: { name: "Creative", color: "from-purple-500 to-violet-600" },
    five: { name: "Tech", color: "from-blue-600 to-cyan-500" },
    six: { name: "Executive", color: "from-emerald-700 to-emerald-900" },
    seven: { name: "Pink/Bold", color: "from-rose-500 to-pink-600" },
};

export default function ResumePreview({ data, template }: ResumePreviewProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.8);
    const [isGenerating, setIsGenerating] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Calculate optimal scale based on screen size
    useEffect(() => {
        const calculateScale = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth < 640) return 0.45;
            if (screenWidth < 768) return 0.6;
            if (screenWidth < 1024) return 0.75;
            return 0.85;
        };

        setScale(calculateScale());

        const handleResize = () => {
            if (!isFullscreen) {
                setScale(calculateScale());
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isFullscreen]);

    const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.1, 1.2));
    const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.4));
    const handleResetZoom = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 640) setScale(0.45);
        else if (screenWidth < 768) setScale(0.6);
        else if (screenWidth < 1024) setScale(0.75);
        else setScale(0.85);
    };

    const handleDownload = async () => {
        setIsGenerating(true);
        try {
            await generatePDF("resume-preview-id");
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const RenderTemplate = () => {
        switch (template) {
            case "two":
                return <TemplateTwo data={data} />;
            case "three":
                return <TemplateThree data={data} />;
            case "four":
                return <TemplateFour data={data} />;
            case "five":
                return <TemplateFive data={data} />;
            case "six":
                return <TemplateSix data={data} />;
            case "seven":
                return <TemplateSeven data={data} />;
            case "one":
            default:
                return <TemplateOne data={data} />;
        }
    };

    const currentTemplate = templates[template as keyof typeof templates] || templates.one;

    return (
        <div className={`flex flex-col h-full bg-neutral-100 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
            {/* <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border-b border-neutral-200 shadow-sm"
            >
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentTemplate.color} flex items-center justify-center shadow-lg`}>
                        <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-neutral-900">Resume Preview</h3>
                        <p className="text-sm text-neutral-500">
                            {currentTemplate.name} Template • A4 Size
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-neutral-100 rounded-lg p-1">
                        <button
                            onClick={handleZoomOut}
                            className="p-2 hover:bg-white hover:shadow-sm rounded-md transition-all"
                            title="Zoom Out"
                        >
                            <ZoomOut className="w-4 h-4 text-neutral-600" />
                        </button>
                        <span className="text-sm font-medium text-neutral-600 w-12 text-center">
                            {Math.round(scale * 100)}%
                        </span>
                        <button
                            onClick={handleZoomIn}
                            className="p-2 hover:bg-white hover:shadow-sm rounded-md transition-all"
                            title="Zoom In"
                        >
                            <ZoomIn className="w-4 h-4 text-neutral-600" />
                        </button>
                        <button
                            onClick={handleResetZoom}
                            className="p-2 hover:bg-white hover:shadow-sm rounded-md transition-all"
                            title="Reset Zoom"
                        >
                            <RotateCcw className="w-4 h-4 text-neutral-600" />
                        </button>
                    </div>

                    <div className="w-px h-8 bg-neutral-200 mx-2" />

                    <button
                        onClick={handlePrint}
                        className="hidden sm:flex items-center gap-2 px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                        <Printer className="w-4 h-4" />
                        <span className="text-sm font-medium">Print</span>
                    </button>

                    <button
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="hidden sm:flex items-center gap-2 px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                        <Maximize2 className="w-4 h-4" />
                        <span className="text-sm font-medium">
                            {isFullscreen ? "Exit" : "Fullscreen"}
                        </span>
                    </button>

                    <button
                        onClick={handleDownload}
                        disabled={isGenerating}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all hover:shadow-lg hover:shadow-indigo-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span className="hidden sm:inline">Generating...</span>
                            </>
                        ) : (
                            <>
                                <Download className="w-4 h-4" />
                                <span className="hidden sm:inline">Download PDF</span>
                            </>
                        )}
                    </button>
                </div>
            </motion.div> */}

            <div className="flex-1 overflow-auto p-4 sm:p-8 bg-neutral-100 relative">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(to right, neutral-400 1px, transparent 1px), linear-gradient(to bottom, neutral-400 1px, transparent 1px)`,
                        backgroundSize: '20px 20px'
                    }} />
                </div>

                <div className="flex justify-center items-start min-h-full">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: scale }}
                        transition={{ duration: 0.3 }}
                        className="origin-top shadow-2xl"
                        style={{ transformOrigin: "top center" }}
                    >
                        <div
                            id="resume-preview"
                            ref={containerRef}
                            className="w-[210mm] min-h-[297mm] bg-white mx-auto overflow-hidden relative"
                            style={{ aspectRatio: "210/297" }}
                        >
                            <RenderTemplate />
                        </div>
                    </motion.div>
                </div>

                <div className="fixed bottom-6 right-6 bg-white rounded-full shadow-lg px-4 py-2 text-sm font-medium text-neutral-600 border border-neutral-200">
                    Page 1 of 1
                </div>
            </div>

            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 z-50"
                    >
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-medium">PDF downloaded successfully!</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {!data.name && !data.email && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-neutral-100/90 backdrop-blur-sm flex items-center justify-center z-10"
                >
                    <div className="text-center p-8">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neutral-200 flex items-center justify-center">
                            <Eye className="w-10 h-10 text-neutral-400" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">
                            Start Building Your Resume
                        </h3>
                        <p className="text-neutral-500 max-w-sm">
                            Fill in your details in the editor to see your resume preview here in real-time.
                        </p>
                    </div>
                </motion.div>
            )}
        </div>
    );
}