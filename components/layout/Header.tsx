import { LayoutTemplate, Home, Download, Save, ChevronLeft, Sparkles, Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
    selectedTemplate: string;
    setSelectedTemplate: (template: string) => void;
    onSave?: () => void;
    isSaving?: boolean;
    onDownload?: () => void;
    isDownloading?: boolean;
    lastSaved?: Date;
}

const templates = [
    { id: "one", name: "Modern", color: "bg-blue-500" },
    { id: "two", name: "Professional", color: "bg-neutral-700" },
    { id: "three", name: "Minimalist", color: "bg-stone-500" },
    { id: "four", name: "Creative", color: "bg-purple-500" },
    { id: "five", name: "Tech", color: "bg-cyan-500" },
    { id: "six", name: "Executive", color: "bg-emerald-700" },
    { id: "seven", name: "Modern Grid", color: "bg-rose-500" },
];

export default function Header({
    selectedTemplate,
    setSelectedTemplate,
    onSave,
    isSaving,
    onDownload,
    isDownloading,
    lastSaved,
}: HeaderProps) {
    const currentTemplate = templates.find((t) => t.id === selectedTemplate);

    return (
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Left Section */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors group"
                        >
                            <div className="p-2 rounded-lg bg-neutral-100 group-hover:bg-neutral-200 transition-colors">
                                <ChevronLeft className="w-5 h-5" />
                            </div>
                            <span className="hidden sm:block text-sm font-medium">Back</span>
                        </Link>

                        <div className="h-6 w-px bg-neutral-200 hidden sm:block" />

                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow">
                                <LayoutTemplate className="w-5 h-5 text-white" />
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-lg font-bold text-neutral-900 leading-tight">
                                    HireLens
                                </h1>
                                <p className="text-xs text-neutral-500">Resume Builder</p>
                            </div>
                        </Link>
                    </div>

                    {/* Center - Template Info */}
                    <div className="hidden md:flex items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 rounded-full">
                            <div className={`w-2 h-2 rounded-full ${currentTemplate?.color || "bg-blue-500"}`} />
                            <span className="text-sm font-medium text-neutral-700">
                                {currentTemplate?.name || "Modern"}
                            </span>
                            <span className="text-xs text-neutral-400">Template</span>
                        </div>

                        {lastSaved && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-xs text-neutral-400 flex items-center gap-1"
                            >
                                <Check className="w-3 h-3 text-green-500" />
                                Saved {lastSaved.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </motion.span>
                        )}
                    </div>

                    {/* Right Section - Actions */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* <Link
                            href="/dashboard"
                            className="p-2.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 rounded-xl transition-colors"
                            title="Dashboard"
                        >
                            <Home className="w-5 h-5" />
                        </Link> */}

                        {onDownload && (
                            <button
                                onClick={onDownload}
                                disabled={isDownloading}
                                className="group flex items-center gap-2 px-4 py-2.5 text-neutral-700 bg-white border border-neutral-200 rounded-xl hover:border-neutral-300 hover:bg-neutral-50 transition-all font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isDownloading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                                )}
                                <span className="hidden sm:inline">
                                    {isDownloading ? "Generating..." : "Export"}
                                </span>
                            </button>
                        )}

                        {onSave && (
                            <button
                                onClick={onSave}
                                disabled={isSaving}
                                className="group relative flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all font-medium text-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span className="hidden sm:inline">Saving...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            <span className="hidden sm:inline">Save</span>
                                        </>
                                    )}
                                </span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Template Bar */}
            <div className="md:hidden border-t border-neutral-100 px-4 py-2 bg-neutral-50/50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-indigo-500" />
                        <span className="text-sm font-medium text-neutral-700">
                            {currentTemplate?.name} Template
                        </span>
                    </div>
                    {lastSaved && (
                        <span className="text-xs text-neutral-400 flex items-center gap-1">
                            <Check className="w-3 h-3 text-green-500" />
                            Saved
                        </span>
                    )}
                </div>
            </div>
        </header>
    );
}