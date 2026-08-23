import { ResumeData } from "@/types/resume";
import ResumePreview from "@/components/ResumePreview";

interface PreviewSectionProps {
    resumeData: ResumeData;
    selectedTemplate: string;
}

export default function PreviewSection({
    resumeData,
    selectedTemplate,
}: PreviewSectionProps) {
    return (
        <div className="h-full w-full flex flex-col relative overflow-hidden">
            <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md p-3 text-center border-b border-neutral-200 md:hidden">
                <p className="text-sm font-semibold text-neutral-800">Live Preview</p>
            </div>
            <div className="flex-1 w-full h-full relative overflow-hidden">
                <ResumePreview data={resumeData} template={selectedTemplate} />
            </div>
        </div>
    );
}

