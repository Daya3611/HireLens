"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, query, where, getDocs, deleteDoc, addDoc, doc } from "firebase/firestore";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "@/components/layout/Navbar";
import {
    Plus,
    FileText,
    Calendar,
    Edit3,
    Users,
    MoreVertical,
    Trash2,
    Copy,
    Share2,
    Search,
    Sparkles,
    CheckCircle2,
    ArrowUpRight,
    Briefcase,
    Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import ShareModal from "@/components/dashboard/ShareModal";
import LoadingScreen from "@/components/ui/LoadingScreen";


interface SavedResume {
    id: string;
    name?: string;
    title?: string;
    jobTitle?: string;
    updatedAt: any;
    isOwner?: boolean;
    ownerEmail?: string;
    template?: string;
    isPublicEdit?: boolean;
    allowedEditors?: string[];
    resumeData?: any;
    userId?: string;
}

export default function Dashboard() {
    const [resumes, setResumes] = useState<SavedResume[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterTab, setFilterTab] = useState<"all" | "owned" | "shared">("all");
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
    
    // Share Modal state
    const [shareTarget, setShareTarget] = useState<SavedResume | null>(null);

    const router = useRouter();

    const fetchResumes = async (currentUser: any) => {
        try {
            const resumeMap = new Map<string, SavedResume>();

            // 1. Fetch owned resumes
            const ownedQuery = query(
                collection(db, "resumes"),
                where("userId", "==", currentUser.uid)
            );
            const ownedSnapshot = await getDocs(ownedQuery);
            ownedSnapshot.forEach((docSnap) => {
                const data = docSnap.data();
                resumeMap.set(docSnap.id, {
                    id: docSnap.id,
                    ...data,
                    name: data.resumeData?.name || data.name || "Untitled Resume",
                    title: data.resumeData?.title || data.jobTitle || "Software Engineer",
                    isOwner: true,
                } as SavedResume);
            });

            // 2. Fetch resumes shared with current user's email
            if (currentUser.email) {
                try {
                    const sharedQuery = query(
                        collection(db, "resumes"),
                        where("allowedEditors", "array-contains", currentUser.email.toLowerCase())
                    );
                    const sharedSnapshot = await getDocs(sharedQuery);
                    sharedSnapshot.forEach((docSnap) => {
                        if (!resumeMap.has(docSnap.id)) {
                            const data = docSnap.data();
                            resumeMap.set(docSnap.id, {
                                id: docSnap.id,
                                ...data,
                                name: data.resumeData?.name || data.name || "Untitled Resume",
                                title: data.resumeData?.title || data.jobTitle || "Shared Resume",
                                isOwner: false,
                            } as SavedResume);
                        }
                    });
                } catch (e) {
                    console.error("Error fetching shared resumes:", e);
                }
            }

            const fetchedResumes = Array.from(resumeMap.values());
            // Sort by last updated
            fetchedResumes.sort((a, b) => {
                const dateA = a.updatedAt?.seconds ? new Date(a.updatedAt.seconds * 1000) : new Date();
                const dateB = b.updatedAt?.seconds ? new Date(b.updatedAt.seconds * 1000) : new Date();
                return dateB.getTime() - dateA.getTime();
            });

            setResumes(fetchedResumes);
        } catch (error) {
            console.error("Error fetching resumes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                await fetchResumes(currentUser);
            } else {
                router.push("/login");
            }
        });
        return () => unsubscribe();
    }, [router]);

    const handleDeleteResume = async (resumeId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (!confirm("Are you sure you want to delete this resume? This cannot be undone.")) return;

        try {
            await deleteDoc(doc(db, "resumes", resumeId));
            setResumes((prev) => prev.filter((r) => r.id !== resumeId));
        } catch (err) {
            console.error("Failed to delete resume:", err);
            alert("Failed to delete resume. You may not have permission.");
        } finally {
            setActiveMenuId(null);
        }
    };

    const handleDuplicateResume = async (resume: SavedResume, e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (!user) return;

        try {
            const newResumeData = {
                userId: user.uid,
                ownerEmail: user.email || "",
                resumeData: {
                    ...(resume.resumeData || {}),
                    name: `${resume.name || "Resume"} (Copy)`,
                },
                template: resume.template || "one",
                isPublicEdit: true,
                allowedEditors: [],
                updatedAt: new Date(),
                createdAt: new Date(),
            };

            const docRef = await addDoc(collection(db, "resumes"), newResumeData);
            await fetchResumes(user);
            router.push(`/dashboard/builder?id=${docRef.id}`);
        } catch (err) {
            console.error("Failed to duplicate resume:", err);
            alert("Failed to duplicate resume.");
        } finally {
            setActiveMenuId(null);
        }
    };

    const formatDate = (timestamp: any) => {
        if (!timestamp) return "Just now";
        const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const userName = user?.displayName
        ? user.displayName.split(" ")[0]
        : user?.email
        ? user.email.split("@")[0]
        : "User";

    // Filter resumes based on search query and filter tab
    const filteredResumes = resumes.filter((r) => {
        const matchesSearch =
            (r.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (r.title || "").toLowerCase().includes(searchQuery.toLowerCase());
        
        if (!matchesSearch) return false;
        if (filterTab === "owned") return r.isOwner;
        if (filterTab === "shared") return !r.isOwner;
        return true;
    });

    const ownedCount = resumes.filter((r) => r.isOwner).length;
    const sharedCount = resumes.filter((r) => !r.isOwner).length;

    if (loading) {
        return <LoadingScreen message="Loading your dashboard..." isFinished={!loading} />;
    }



    return (
        <div className="min-h-screen bg-slate-50/60 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-14 space-y-8">
                {/* Light Mode Hero Banner */}
                <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-500/10">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-1/3 -mb-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold mb-3">
                                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                                AI-Powered Resume Suite
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                                Welcome back, {userName} 👋
                            </h1>
                            <p className="text-indigo-100 text-sm sm:text-base mt-1.5 max-w-xl leading-relaxed">
                                Build ATS-friendly resumes, customize layout themes, and collaborate with your team in real-time.
                            </p>
                        </div>

                        {/* Light Mode Stats Badges */}
                        <div className="flex items-center gap-3 shrink-0">
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center min-w-[110px]">
                                <div className="text-2xl font-black text-white">{ownedCount}</div>
                                <div className="text-[11px] font-bold text-indigo-100 uppercase tracking-wider mt-0.5">My Resumes</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center min-w-[110px]">
                                <div className="text-2xl font-black text-emerald-300">{sharedCount}</div>
                                <div className="text-[11px] font-bold text-indigo-100 uppercase tracking-wider mt-0.5">Shared</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Tabs & Search Bar (Shadcn Light Style) */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
                    {/* Filter Tabs */}
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/60">
                        <button
                            onClick={() => setFilterTab("all")}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                filterTab === "all"
                                    ? "bg-white text-indigo-600 shadow-sm"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                            }`}
                        >
                            All ({resumes.length})
                        </button>
                        <button
                            onClick={() => setFilterTab("owned")}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                filterTab === "owned"
                                    ? "bg-white text-indigo-600 shadow-sm"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                            }`}
                        >
                            Mine ({ownedCount})
                        </button>
                        <button
                            onClick={() => setFilterTab("shared")}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                filterTab === "shared"
                                    ? "bg-white text-indigo-600 shadow-sm"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                            }`}
                        >
                            Shared ({sharedCount})
                        </button>
                    </div>

                    {/* Search Input */}
                    <div className="relative flex-1 sm:max-w-xs">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search resumes..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                    </div>
                </div>

                {/* Resumes Grid (Light Mode Shadcn Cards) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {/* Create New Resume Card */}
                    <Link href="/dashboard/builder">
                        <div className="group relative bg-white border-2 border-dashed border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/20 rounded-2xl p-6 h-64 flex flex-col items-center justify-center text-center cursor-pointer transition-colors shadow-xs">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mb-4 transition-colors shadow-xs">
                                <Plus className="w-7 h-7" />
                            </div>
                            <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                                Create New Resume
                            </h3>
                            <p className="text-xs text-slate-500 mt-1 max-w-[180px]">
                                Start from scratch with a professional layout
                            </p>
                        </div>
                    </Link>

                    {/* Saved Resume Cards */}
                    {filteredResumes.map((resume) => (
                        <div
                            key={resume.id}
                            className="group relative bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 h-64 flex flex-col justify-between shadow-xs transition-all overflow-hidden"
                        >
                            <div>
                                {/* Header: Icon + Badge + 3-dots Menu */}

                                <div className="flex items-center justify-between mb-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
                                        <FileText className="w-5 h-5" />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {!resume.isOwner ? (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                                                <Users className="w-3 h-3" /> Shared
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60 text-[10px] font-bold">
                                                Owner
                                            </span>
                                        )}

                                        {/* Actions Menu Trigger */}
                                        <div className="relative">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    setActiveMenuId(activeMenuId === resume.id ? null : resume.id);
                                                }}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                                            >
                                                <MoreVertical className="w-4 h-4" />
                                            </button>

                                            {/* Dropdown Menu */}
                                            <AnimatePresence>
                                                {activeMenuId === resume.id && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.95, y: -5 }}
                                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                                        exit={{ opacity: 0, scale: 0.95, y: -5 }}
                                                        transition={{ duration: 0.15 }}
                                                        className="absolute right-0 top-8 w-44 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1.5"
                                                    >
                                                        <Link
                                                            href={`/dashboard/builder?id=${resume.id}`}
                                                            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
                                                            onClick={() => setActiveMenuId(null)}
                                                        >
                                                            <Edit3 className="w-3.5 h-3.5 text-indigo-500" /> Edit Resume
                                                        </Link>
                                                        
                                                        {resume.isOwner && (
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setShareTarget(resume);
                                                                    setActiveMenuId(null);
                                                                }}
                                                                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-purple-600 hover:bg-slate-50 transition-colors cursor-pointer text-left"
                                                            >
                                                                <Share2 className="w-3.5 h-3.5 text-purple-500" /> Share Access
                                                            </button>
                                                        )}

                                                        <button
                                                            onClick={(e) => handleDuplicateResume(resume, e)}
                                                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer text-left"
                                                        >
                                                            <Copy className="w-3.5 h-3.5 text-blue-500" /> Duplicate
                                                        </button>

                                                        {resume.isOwner && (
                                                            <button
                                                                onClick={(e) => handleDeleteResume(resume.id, e)}
                                                                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-left border-t border-slate-100 mt-1 pt-2"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" /> Delete Resume
                                                            </button>
                                                        )}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>

                                {/* Title & Subtitle */}
                                <Link href={`/dashboard/builder?id=${resume.id}`} className="block group-hover:text-indigo-600 transition-colors">
                                    <h3 className="font-bold text-slate-900 text-base truncate">
                                        {resume.name}
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed font-normal">
                                        {resume.title}
                                    </p>
                                </Link>
                            </div>

                            {/* Card Footer */}
                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                                <span className="flex items-center gap-1.5 text-slate-400 font-medium">
                                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                                    {formatDate(resume.updatedAt)}
                                </span>
                                <Link
                                    href={`/dashboard/builder?id=${resume.id}`}
                                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                                >
                                    Open <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>


                {/* Empty State */}
                {filteredResumes.length === 0 && (
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center max-w-md mx-auto my-8 shadow-xs">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">No Resumes Found</h3>
                        <p className="text-xs text-slate-500 mb-6">
                            {searchQuery ? `No resumes match "${searchQuery}"` : "You haven't created any resumes yet."}
                        </p>
                        <Link
                            href="/dashboard/builder"
                            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-500/20"
                        >
                            <Plus className="w-4 h-4" /> Create Resume Now
                        </Link>
                    </div>
                )}
            </main>

            {/* Share Modal */}
            {shareTarget && (
                <ShareModal
                    isOpen={Boolean(shareTarget)}
                    onClose={() => setShareTarget(null)}
                    isPublicEdit={shareTarget.isPublicEdit ?? true}
                    allowedEditors={shareTarget.allowedEditors || []}
                    ownerEmail={shareTarget.ownerEmail || user?.email || ""}
                    isOwner={shareTarget.isOwner ?? true}
                    onUpdateSharing={async (newSettings) => {
                        const { updateDoc, doc } = await import("firebase/firestore");
                        const docRef = doc(db, "resumes", shareTarget.id);
                        await updateDoc(docRef, newSettings);
                        setResumes((prev) =>
                            prev.map((r) => (r.id === shareTarget.id ? { ...r, ...newSettings } : r))
                        );
                    }}
                />
            )}
        </div>
    );
}



