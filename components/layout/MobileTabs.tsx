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
        <div className="md:hidden flex border-b border-gray-200 bg-white sticky top-[73px] z-40">
            <button
                onClick={() => setActiveTab("edit")}
                className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "edit"
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500"
                    }`}
            >
                <span className="flex justify-center items-center gap-2">
                    <PenTool size={16} /> Edit
                </span>
            </button>
            <button
                onClick={() => setActiveTab("preview")}
                className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "preview"
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500"
                    }`}
            >
                <span className="flex justify-center items-center gap-2">
                    <Eye size={16} /> Preview
                </span>
            </button>
        </div>
    );
}
