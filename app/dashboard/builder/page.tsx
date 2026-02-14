"use client";
import { useState, useEffect } from "react";
import { ResumeData } from "@/types/resume";
import { generatePDF } from "@/lib/generatePDF.client";

import Header from "@/components/layout/Header";
import MobileTabs from "@/components/layout/MobileTabs";
import EditorSection from "@/components/dashboard/EditorSection";
import PreviewSection from "@/components/dashboard/PreviewSection";
import { useSearchParams, useRouter } from "next/navigation";
import { doc, getDoc, setDoc, addDoc, collection } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

import { Suspense } from "react";


function BuilderContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const resumeId = searchParams.get("id");

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    const [resumeData, setResumeData] = useState<ResumeData>({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 234 567 890",
        summary:
            "Senior Software Engineer with 5+ years of experience in building scalable web applications.",
        skills: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS"],
        education: [
            {
                degree: "Bachelor of Science in Computer Science",
                institution: "University of Technology",
                year: "2018",
            },
        ],
        experience: [
            {
                role: "Senior Frontend Developer",
                company: "Tech Corp",
                duration: "2020 - Present",
                description:
                    "Leading the frontend team, migrating legacy code to React, and improving performance by 40%.",
            },
        ],
    });

    const [selectedTemplate, setSelectedTemplate] = useState("one");
    const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser && resumeId) {
                // Fetch existing resume
                try {
                    const docRef = doc(db, "resumes", resumeId);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        // Verify ownership
                        if (data.userId === currentUser.uid) {
                            setResumeData(data.resumeData as ResumeData);
                            setSelectedTemplate(data.template || "one");
                        }
                    }
                } catch (error) {
                    console.error("Error fetching resume:", error);
                }
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [resumeId]);

    const handleSave = async () => {
        if (!user) return;
        setIsSaving(true);
        try {
            const dataToSave = {
                userId: user.uid,
                resumeData,
                template: selectedTemplate,
                updatedAt: new Date(),
                name: resumeData.name || "Untitled Resume", // For listing
                jobTitle: resumeData.summary ? resumeData.summary.split(".")[0].slice(0, 50) : "Resume",
            };

            if (resumeId) {
                // Update existing
                await setDoc(doc(db, "resumes", resumeId), dataToSave, { merge: true });
                alert("Resume updated successfully!");
            } else {
                // Create new
                const docRef = await addDoc(collection(db, "resumes"), {
                    ...dataToSave,
                    createdAt: new Date(),
                });
                // Redirect to the same page with the ID to enable duplicate referencing issues
                router.push(`/dashboard/builder?id=${docRef.id}`);
                alert("Resume saved successfully!");
            }
        } catch (error) {
            console.error("Error saving resume:", error);
            alert("Failed to save resume.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            const success = await generatePDF("resume-preview");
            if (!success) {
                alert("Failed to download PDF. Please try again or check console for details.");
            }
        } catch (error) {
            console.error("Download error:", error);
            alert("An error occurred while downloading.");
        } finally {
            setIsDownloading(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <Header
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
                onSave={handleSave}
                isSaving={isSaving}
            />

            <MobileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="max-w-screen-2xl mx-auto h-[calc(100vh-80px)] md:h-[calc(100vh-73px)] overflow-hidden">
                <div className="flex h-full">
                    {/* Editor Section - Left Column */}
                    <div
                        className={`w-full md:w-1/2 lg:w-2/5 border-r border-gray-200 bg-white overflow-y-auto h-full p-6 md:p-8 ${activeTab === "preview" ? "hidden md:block" : "block"
                            }`}
                    >
                        <EditorSection
                            resumeData={resumeData}
                            setResumeData={setResumeData}
                            selectedTemplate={selectedTemplate}
                            setSelectedTemplate={setSelectedTemplate}
                            onDownload={handleDownload}
                            isDownloading={isDownloading}
                        />
                    </div>

                    {/* Preview Section - Right Column */}
                    <div
                        className={`w-full md:w-1/2 lg:w-3/5 bg-gray-100 overflow-y-auto h-full relative ${activeTab === "edit" ? "hidden md:block" : "block"
                            }`}
                    >
                        <PreviewSection
                            resumeData={resumeData}
                            selectedTemplate={selectedTemplate}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function BuilderPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BuilderContent />
        </Suspense>
    );
}
