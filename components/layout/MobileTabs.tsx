import { PenTool, Eye } from "lucide-react";

interface MobileTabsProps {
    activeTab: "edit" | "preview";
    setActiveTab: (tab: "edit" | "preview") => void;
}

export default function MobileTabs({
    activeTab,
    setActiveTab,
}: MobileTabsProps) {
    return (
        <div className="md:hidden flex items-center border-b border-neutral-200 bg-white/95 backdrop-blur-md sticky top-16 z-40 p-1.5 gap-1.5 shadow-xs">
            <button
                onClick={() => setActiveTab("edit")}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex justify-center items-center gap-2 ${
                    activeTab === "edit"
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                        : "text-neutral-600 hover:bg-neutral-100"
                }`}
            >
                <PenTool className="w-3.5 h-3.5" />
                <span>Editor View</span>
            </button>
            <button
                onClick={() => setActiveTab("preview")}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex justify-center items-center gap-2 ${
                    activeTab === "preview"
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                        : "text-neutral-600 hover:bg-neutral-100"
                }`}
            >
                <Eye className="w-3.5 h-3.5" />
                <span>Live Preview</span>
            </button>
        </div>
    );
}

