import { Download, LayoutTemplate } from "lucide-react";

interface HeaderProps {
    selectedTemplate: string;
    setSelectedTemplate: (template: string) => void;
    onDownload: () => void;
    onSave?: () => void;
    isSaving?: boolean;
}

export default function Header({
    selectedTemplate,
    setSelectedTemplate,
    onDownload,
    onSave,
    isSaving
}: HeaderProps) {
    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <div className="bg-blue-600 p-2 rounded-lg text-white">
                    <LayoutTemplate size={24} />
                </div>
                <h1 className="text-xl font-bold tracking-tight">HireLens</h1>
            </div>

            <div className="flex items-center gap-4">


                {onSave && (
                    <button
                        onClick={onSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition-colors font-medium text-sm disabled:opacity-50"
                    >
                        {isSaving ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <span>Save</span>
                        )}
                    </button>
                )}

                <button
                    onClick={onDownload}
                    className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors font-medium text-sm"
                >
                    <Download size={18} />
                    <span>Download PDF</span>
                </button>
            </div>
        </header>
    );
}
