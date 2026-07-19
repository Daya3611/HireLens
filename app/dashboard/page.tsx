"use client";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "@/components/layout/Navbar";
import { Plus, FileText, Calendar, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface SavedResume {
    id: string;
    name: string;
    updatedAt: any;
    jobTitle?: string;
}

export default function Dashboard() {
    const [resumes, setResumes] = useState<SavedResume[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                try {
                    const q = query(
                        collection(db, "resumes"),
                        where("userId", "==", currentUser.uid)
                    );
                    const querySnapshot = await getDocs(q);
                    const fetchedResumes: SavedResume[] = [];
                    querySnapshot.forEach((doc) => {
                        fetchedResumes.push({ id: doc.id, ...doc.data() } as SavedResume);
                    });
                    // Client-side sort since Firestore compound query might value index
                    fetchedResumes.sort((a, b) => {
                        const dateA = a.updatedAt?.seconds ? new Date(a.updatedAt.seconds * 1000) : new Date();
                        const dateB = b.updatedAt?.seconds ? new Date(b.updatedAt.seconds * 1000) : new Date();
                        return dateB.getTime() - dateA.getTime();
                    });

                    setResumes(fetchedResumes);
                } catch (error) {
                    console.error("Error fetching resumes:", error);
                }
            } else {
                // optionally redirect to login if not handled by middleware
                router.push("/login");
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [router]);

    const formatDate = (timestamp: any) => {
        if (!timestamp) return "Just now";
        // Handle Firestore Timestamp
        const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50 font-sans">
            <Navbar />
            <main className="max-w-6xl mx-auto px-6 py-12 mt-12">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Resumes</h1>
                        <p className="text-gray-500 mt-1">Manage and edit your saved resumes</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Create New Card */}
                    <Link href="/dashboard/builder">
                        <motion.div
                            whileHover={{ y: -4 }}
                            className="bg-white border-2 border-dashed border-gray-300 rounded-2xl h-64 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all group"
                        >
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                                <Plus className="w-8 h-8 text-blue-600" />
                            </div>
                            <span className="font-semibold text-gray-900">Create New Resume</span>
                            <span className="text-sm text-gray-500 mt-1">Start from scratch</span>
                        </motion.div>
                    </Link>

                    {/* Resume Cards */}
                    {resumes.map((resume) => (
                        <motion.div
                            key={resume.id}
                            whileHover={{ y: -4 }}
                            className="bg-white border border-gray-200 rounded-2xl p-6 h-64 flex flex-col justify-between shadow-sm hover:shadow-md transition-all relative group"
                        >
                            <Link href={`/dashboard/builder?id=${resume.id}`} className="absolute inset-0" />
                            <div>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-indigo-50 rounded-xl">
                                        <FileText className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-10">
                                        {/* Add delete functionality later if needed */}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{resume.name}</h3>
                                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{resume.jobTitle || "Untitled Position"}</p>
                            </div>

                            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(resume.updatedAt)}
                                </span>
                                <span className="flex items-center gap-1 text-blue-600 font-medium">
                                    Edit <Edit className="w-3 h-3" />
                                </span>
                            </div>
                        </motion.div>
                    ))}

                    {resumes.length === 0 && (
                        <div className="hidden md:flex flex-col items-center justify-center text-gray-400 h-64 p-6 border border-transparent">
                            <p>No resumes found. Create your first one!</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
