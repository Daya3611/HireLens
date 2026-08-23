"use client";
import { useState, useEffect } from "react";
import { ResumeData } from "@/types/resume";
import { generatePDF } from "@/lib/generatePDF.client";

import Header from "@/components/layout/Header";
import MobileTabs from "@/components/layout/MobileTabs";
import EditorSection from "@/components/dashboard/EditorSection";
import PreviewSection from "@/components/dashboard/PreviewSection";
import ShareModal from "@/components/dashboard/ShareModal";
import { useSearchParams, useRouter } from "next/navigation";
import { doc, getDoc, setDoc, addDoc, collection } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Lock, AlertCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";
import LoadingScreen from "@/components/ui/LoadingScreen";

import { Suspense } from "react";


function BuilderContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const resumeId = searchParams.get("id");

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    // Share & permission state
    const [isPublicEdit, setIsPublicEdit] = useState(true);
    const [allowedEditors, setAllowedEditors] = useState<string[]>([]);
    const [ownerEmail, setOwnerEmail] = useState<string>("");
    const [resumeOwnerId, setResumeOwnerId] = useState<string>("");
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [unauthorized, setUnauthorized] = useState(false);


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
            if (resumeId) {
                // Fetch existing resume
                try {
                    const docRef = doc(db, "resumes", resumeId);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        const isOwner = currentUser && data.userId === currentUser.uid;
                        const publicEdit = data.isPublicEdit !== false;
                        const editors: string[] = Array.isArray(data.allowedEditors) ? data.allowedEditors : [];

                        const userEmail = currentUser?.email?.toLowerCase();
                        const isAllowedEditor = userEmail ? editors.some((e) => e.toLowerCase() === userEmail) : false;

                        // Check authorization: Owner OR Public Edit OR Listed Editor
                        if (isOwner || publicEdit || isAllowedEditor) {
                            setResumeData(data.resumeData as ResumeData);
                            setSelectedTemplate(data.template || "one");
                            setIsPublicEdit(publicEdit);
                            setAllowedEditors(editors);
                            setOwnerEmail(data.ownerEmail || "");
                            setResumeOwnerId(data.userId || "");
                            setUnauthorized(false);
                        } else {
                            setUnauthorized(true);
                        }
                    } else {
                        setUnauthorized(true);
                    }
                } catch (error) {
                    console.error("Error fetching resume:", error);
                    setUnauthorized(true);
                }
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [resumeId]);

    const isOwner = Boolean(user && resumeOwnerId ? user.uid === resumeOwnerId : !resumeId);
    const isSharedEditor = Boolean(resumeId && !isOwner);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const dataToSave: any = {
                resumeData,
                template: selectedTemplate,
                updatedAt: new Date(),
                name: resumeData.name || "Untitled Resume",
                jobTitle: resumeData.summary ? resumeData.summary.split(".")[0].slice(0, 50) : "Resume",
                isPublicEdit,
                allowedEditors,
            };

            if (!resumeId) {
                // Creating a brand new resume
                dataToSave.userId = user?.uid || "anonymous";
                dataToSave.ownerEmail = user?.email || "";
                dataToSave.createdAt = new Date();
                
                const docRef = await addDoc(collection(db, "resumes"), dataToSave);
                router.push(`/dashboard/builder?id=${docRef.id}`);
                alert("Resume saved successfully!");
            } else {
                // Updating existing document (either owner or editor)
                if (isOwner && user?.email) {
                    dataToSave.ownerEmail = user.email;
                }
                await setDoc(doc(db, "resumes", resumeId), dataToSave, { merge: true });
                alert("Resume updated successfully!");
            }
        } catch (error) {
            console.error("Error saving resume:", error);
            alert("Failed to save resume.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleUpdateSharing = async (newSettings: { isPublicEdit: boolean; allowedEditors: string[] }) => {
        setIsPublicEdit(newSettings.isPublicEdit);
        setAllowedEditors(newSettings.allowedEditors);

        if (resumeId) {
            try {
                await setDoc(
                    doc(db, "resumes", resumeId),
                    {
                        isPublicEdit: newSettings.isPublicEdit,
                        allowedEditors: newSettings.allowedEditors,
                        updatedAt: new Date(),
                    },
                    { merge: true }
                );
            } catch (error) {
                console.error("Failed to update sharing settings in database:", error);
                alert("Failed to save sharing settings.");
            }
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

    if (loading) return <LoadingScreen message="Loading resume builder..." />;


    if (unauthorized) {
        return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-neutral-200 text-center max-w-md w-full">
                    <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-2">Access Restricted</h2>
                    <p className="text-neutral-500 text-sm mb-6">
                        You do not have permission to view or edit this resume. Please ask the owner for edit access.
                    </p>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-md shadow-indigo-500/20"
                    >
                        <ChevronLeft className="w-4 h-4" /> Go to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col bg-gray-50 font-sans text-gray-900 overflow-hidden">
            <Header
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
                onSave={handleSave}
                isSaving={isSaving}
                onDownload={handleDownload}
                isDownloading={isDownloading}
                onShare={() => setIsShareModalOpen(true)}
                onPrint={() => window.print()}
                isSharedEditor={isSharedEditor}
                isPublicEdit={isPublicEdit}
            />

            <MobileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="flex-1 max-w-screen-2xl w-full mx-auto overflow-hidden">
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
                        className={`w-full md:w-1/2 lg:w-3/5 bg-slate-100 overflow-hidden h-full flex flex-col relative ${activeTab === "edit" ? "hidden md:block" : "block"
                            }`}
                    >
                        <PreviewSection
                            resumeData={resumeData}
                            selectedTemplate={selectedTemplate}
                        />
                    </div>
                </div>
            </main>


            {/* Share Modal */}
            <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                isPublicEdit={isPublicEdit}
                allowedEditors={allowedEditors}
                ownerEmail={ownerEmail || (isOwner ? user?.email : "")}
                isOwner={isOwner}
                onUpdateSharing={handleUpdateSharing}
            />
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

