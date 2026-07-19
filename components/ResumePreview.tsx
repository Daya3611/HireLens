"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResumeData } from "@/types/resume";
import { getTemplateComponent, TEMPLATES } from "./templates/TemplateRegistry";
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

export default function ResumePreview({ data, template }: ResumePreviewProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.85);
    const [isGenerating, setIsGenerating] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Page break counting state
    const [pageCount, setPageCount] = useState(1);
    const [pageHeight, setPageHeight] = useState(1122); // A4 ratio px height

    useEffect(() => {
        const updateLayoutAndPageCount = () => {
            const element = containerRef.current;
            if (!element) return;

            const width = element.offsetWidth;
            if (width === 0) return;

            const H = Math.round(width * 1.4142); // single page height in px
            setPageHeight(H);

            // 1. Reset all previously applied margins
            const breakElements = element.querySelectorAll(".break-inside-avoid, .resume-item") as NodeListOf<HTMLElement>;
            breakElements.forEach((el) => {
                el.style.marginTop = "";
            });
            const headings = element.querySelectorAll("h2, h3, h4") as NodeListOf<HTMLElement>;
            headings.forEach((el) => {
                el.style.marginTop = "";
            });

            // 2. Perform page-break avoidance
            const containerRect = element.getBoundingClientRect();

            // Helper function to check and adjust an element
            function adjustElement(el: HTMLElement) {
                const rect = el.getBoundingClientRect();
                const top = (rect.top - containerRect.top) / scale;
                const height = rect.height / scale;
                const bottom = top + height;

                const pageIndex = Math.floor(top / H);
                const boundary = (pageIndex + 1) * H;

                if (bottom > boundary && height < H) {
                    const pushAmount = boundary - top;
                    if (pushAmount > 0) {
                        el.style.marginTop = `${pushAmount}px`;
                    }
                }
            }

            // Select all sections
            const sections = element.querySelectorAll("section");
            
            sections.forEach((section) => {
                const childAvoids = Array.from(section.querySelectorAll(".break-inside-avoid, .resume-item")) as HTMLElement[];
                
                // Filter for leaf avoids (those that don't contain other avoids)
                const leafItems = childAvoids.filter((item) => {
                    return item.querySelectorAll(".break-inside-avoid, .resume-item").length === 0;
                });

                const heading = section.querySelector("h2, h3, h4") as HTMLElement | null;

                if (leafItems.length === 0) {
                    // Treat the entire section as a leaf item
                    adjustElement(section);
                } else {
                    // We have leaf items
                    const firstItem = leafItems[0];
                    
                    if (heading) {
                        const headingRect = heading.getBoundingClientRect();
                        const firstItemRect = firstItem.getBoundingClientRect();
                        
                        const headingTop = (headingRect.top - containerRect.top) / scale;
                        const firstItemBottom = (firstItemRect.bottom - containerRect.top) / scale;

                        const headingPage = Math.floor(headingTop / H);
                        const boundary = (headingPage + 1) * H;

                        const firstItemTop = (firstItemRect.top - containerRect.top) / scale;
                        const firstItemPage = Math.floor(firstItemTop / H);

                        // If the first item's bottom crosses the page boundary, OR if it already sits on the next page
                        // relative to the heading (meaning they are split)
                        if (firstItemBottom > boundary || firstItemPage > headingPage) {
                            const pushAmount = boundary - headingTop;
                            const totalHeaderAndItemHeight = firstItemBottom - headingTop;
                            if (pushAmount > 0 && totalHeaderAndItemHeight < H) {
                                heading.style.marginTop = `${pushAmount}px`;
                            }
                        }
                    }

                    // Adjust subsequent leaf items (from index 1 onwards)
                    for (let i = 1; i < leafItems.length; i++) {
                        adjustElement(leafItems[i]);
                    }
                }
            });

            // 3. Measure final scroll height and update pageCount state
            const scrollHeight = element.scrollHeight;
            const count = Math.max(1, Math.ceil(scrollHeight / H));
            setPageCount(count);
        };

        // Run updates on mount or parameter changes
        updateLayoutAndPageCount();

        // Run when fonts are loaded
        document.fonts?.ready.then(() => {
            updateLayoutAndPageCount();
        });

        window.addEventListener("resize", updateLayoutAndPageCount);
        return () => {
            window.removeEventListener("resize", updateLayoutAndPageCount);
        };
    }, [data, template, scale]);

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
            await generatePDF("resume-preview");
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

    // Load dynamic template component
    const TemplateComponent = getTemplateComponent(template);

    return (
        <div className={`flex flex-col h-full bg-neutral-100 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
            {/* Top Toolbar */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border-b border-neutral-200 shadow-sm"
            >
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg text-white`}>
                        <FileText className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-neutral-900">Resume Preview</h3>
                        <p className="text-sm text-neutral-500">
                            {TEMPLATES.find((t) => t.id === template)?.name || "Classic"} Template • A4 Size
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-neutral-100 rounded-lg p-1">
                        <button
                            onClick={handleZoomOut}
                            className="p-2 hover:bg-white hover:shadow-sm rounded-md transition-all cursor-pointer"
                            title="Zoom Out"
                        >
                            <ZoomOut className="w-4 h-4 text-neutral-600" />
                        </button>
                        <span className="text-sm font-medium text-neutral-600 w-12 text-center select-none">
                            {Math.round(scale * 100)}%
                        </span>
                        <button
                            onClick={handleZoomIn}
                            className="p-2 hover:bg-white hover:shadow-sm rounded-md transition-all cursor-pointer"
                            title="Zoom In"
                        >
                            <ZoomIn className="w-4 h-4 text-neutral-600" />
                        </button>
                        <button
                            onClick={handleResetZoom}
                            className="p-2 hover:bg-white hover:shadow-sm rounded-md transition-all cursor-pointer"
                            title="Reset Zoom"
                        >
                            <RotateCcw className="w-4 h-4 text-neutral-600" />
                        </button>
                    </div>

                    <div className="w-px h-8 bg-neutral-200 mx-2" />

                    <button
                        onClick={handlePrint}
                        className="hidden sm:flex items-center gap-2 px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                    >
                        <Printer className="w-4 h-4" />
                        <span className="text-sm font-medium">Print</span>
                    </button>

                    <button
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="hidden sm:flex items-center gap-2 px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                    >
                        <Maximize2 className="w-4 h-4" />
                        <span className="text-sm font-medium">
                            {isFullscreen ? "Exit" : "Fullscreen"}
                        </span>
                    </button>

                    <button
                        onClick={handleDownload}
                        disabled={isGenerating}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all hover:shadow-lg hover:shadow-indigo-500/25 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
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
            </motion.div>

            {/* Resume Sheet Container */}
            <div className="flex-1 overflow-auto p-4 sm:p-8 bg-neutral-100 relative">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(to right, #404040 1px, transparent 1px), linear-gradient(to bottom, #404040 1px, transparent 1px)`,
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
                            className="w-[210mm] bg-white mx-auto overflow-hidden relative"
                            style={{ 
                                minHeight: `${pageCount * pageHeight}px`,
                            }}
                        >
                            {/* Template Content */}
                            <TemplateComponent data={data} />

                            {/* Page Break Dotted Indicators */}
                            {Array.from({ length: pageCount - 1 }).map((_, idx) => (
                                <div
                                    key={idx}
                                    className="absolute left-0 right-0 border-t-2 border-dashed border-red-400 pointer-events-none z-30 opacity-70 print:hidden"
                                    style={{ top: `${(idx + 1) * pageHeight}px` }}
                                >
                                    <span className="absolute right-4 -top-2.5 bg-red-100 text-red-700 px-1.5 py-0.5 rounded text-[9px] font-bold shadow-xs">
                                        PAGE {idx + 1} BREAK
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="fixed bottom-6 right-6 bg-white rounded-full shadow-lg px-4 py-2 text-sm font-semibold text-neutral-600 border border-neutral-200 z-40 select-none">
                    Page 1 of {pageCount}
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
                    className="absolute inset-0 bg-neutral-100/90 backdrop-blur-xs flex items-center justify-center z-10"
                >
                    <div className="text-center p-8">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neutral-200 flex items-center justify-center">
                            <Eye className="w-10 h-10 text-neutral-400" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">
                            Start Building Your Resume
                        </h3>
                        <p className="text-neutral-500 max-w-sm text-sm">
                            Fill in your details in the editor to see your resume preview here in real-time.
                        </p>
                    </div>
                </motion.div>
            )}
        </div>
    );
}