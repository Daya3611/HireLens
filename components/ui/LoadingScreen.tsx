"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText } from "lucide-react";

interface LoadingScreenProps {
    message?: string;
    isFinished?: boolean;
    onComplete?: () => void;
}

const MESSAGES = [
    "Preparing your workspace",
    "Fetching your data",
    "Setting things up",
    "Almost ready",
];

export default function LoadingScreen({
    message,
    isFinished = false,
    onComplete,
}: LoadingScreenProps) {
    const [msgIndex, setMsgIndex] = useState(0);
    const [progress, setProgress] = useState(10);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        if (isFinished || isDone) return;

        const interval = setInterval(() => {
            setMsgIndex((prev) => {
                const next = (prev + 1) % MESSAGES.length;
                setProgress((p) => Math.min(88, p + 18));
                return next;
            });
        }, 1500);

        return () => clearInterval(interval);
    }, [isFinished, isDone]);

    useEffect(() => {
        if (isFinished && !isDone) {
            setProgress(100);
            setIsDone(true);

            const timer = setTimeout(() => {
                onComplete?.();
            }, 350);

            return () => clearTimeout(timer);
        }
    }, [isFinished, isDone, onComplete]);

    const currentMessage = isDone
        ? "Ready"
        : message || MESSAGES[msgIndex];

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50 font-sans">
            {/* Barely-visible ambient radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_50%_45%,rgba(99,102,241,0.06),transparent_70%)] pointer-events-none" />

            {/* Centered content — no card, no border, no shadow box */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative flex flex-col items-center gap-5"
            >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                    <FileText className="w-6 h-6 stroke-[1.8]" />
                </div>

                {/* Brand + Message */}
                <div className="flex flex-col items-center gap-1.5">
                    <span className="text-[15px] font-semibold text-slate-800 tracking-tight">
                        HireLens
                    </span>

                    <div className="h-4 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={currentMessage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="text-[13px] text-slate-400 font-normal"
                            >
                                {currentMessage}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Thin progress line */}
                <div className="w-56 bg-slate-200/70 h-[3px] rounded-full overflow-hidden">
                    <motion.div
                        className="bg-indigo-600 h-full rounded-full"
                        initial={{ width: "10%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                </div>
            </motion.div>
        </div>
    );
}
