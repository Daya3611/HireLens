import { ResumeData } from "@/types/resume";
import ATSAnalyzer from "@/components/ATSAnalyzer";
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
        <>
            <div className="sticky top-0 z-10 bg-gray-100/80 backdrop-blur-md p-4 text-center border-b border-gray-200 md:hidden">
                <p className="text-sm font-medium text-gray-600">Live Preview</p>
            </div>
            <div className="h-full flex flex-col items-center justify-start pt-8 pb-20 relative">
                <div className="w-full max-w-[210mm] px-4 md:px-0 mb-6 flex justify-end">
                    {/* <div className="w-full md:w-auto">
                        <ATSAnalyzer resumeData={resumeData} />
                    </div> */}
                </div>
                <ResumePreview data={resumeData} template={selectedTemplate} />
            </div>
        </>
    );
}
