"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Globe,
    Copy,
    Check,
    UserPlus,
    Trash2,
    ShieldCheck,
    User,
    Mail,
    Link2,
    Users,
} from "lucide-react";

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    isPublicEdit: boolean;
    allowedEditors: string[];
    ownerEmail?: string;
    isOwner: boolean;
    onUpdateSharing: (newSettings: { isPublicEdit: boolean; allowedEditors: string[] }) => Promise<void>;
}

export default function ShareModal({
    isOpen,
    onClose,
    isPublicEdit: initialIsPublicEdit,
    allowedEditors: initialAllowedEditors,
    ownerEmail,
    isOwner,
    onUpdateSharing,
}: ShareModalProps) {
    const [isPublicEdit, setIsPublicEdit] = useState(initialIsPublicEdit);
    const [allowedEditors, setAllowedEditors] = useState<string[]>(initialAllowedEditors || []);
    const [newEmail, setNewEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [copied, setCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleCopyLink = () => {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    const handleAddEditor = (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError("");
        const email = newEmail.trim().toLowerCase();

        if (!email) return;

        // Simple email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address");
            return;
        }

        if (ownerEmail && email === ownerEmail.toLowerCase()) {
            setEmailError("Owner already has full edit access");
            return;
        }

        if (allowedEditors.some((e) => e.toLowerCase() === email)) {
            setEmailError("This email is already in the editor list");
            return;
        }

        const updated = [...allowedEditors, email];
        setAllowedEditors(updated);
        setNewEmail("");
    };

    const handleRemoveEditor = (emailToRemove: string) => {
        const updated = allowedEditors.filter((e) => e !== emailToRemove);
        setAllowedEditors(updated);
    };

    const handleSave = async () => {
        setIsSubmitting(true);
        try {
            await onUpdateSharing({
                isPublicEdit,
                allowedEditors,
            });
            onClose();
        } catch (err) {
            console.error("Failed to update sharing settings:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-neutral-100"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                                <Users className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-neutral-900 text-lg">Share Resume</h3>
                                <p className="text-xs text-neutral-500">Manage edit access & link sharing</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                        {/* Copy Link Section */}
                        <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/80 space-y-3">
                            <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider flex items-center gap-1.5">
                                <Link2 className="w-3.5 h-3.5 text-indigo-600" /> Shareable Link
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    readOnly
                                    value={typeof window !== "undefined" ? window.location.href : ""}
                                    className="flex-1 text-xs bg-white border border-neutral-200 rounded-lg px-3 py-2 text-neutral-600 select-all font-mono outline-hidden"
                                />
                                <button
                                    onClick={handleCopyLink}
                                    className="flex items-center gap-1.5 px-3 py-2 bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-xs"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-3.5 h-3.5 text-green-600" />
                                            <span className="text-green-600">Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-3.5 h-3.5 text-neutral-500" />
                                            <span>Copy Link</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Link Access Setting Toggle */}
                        {isOwner && (
                            <div className="flex items-center justify-between p-4 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 transition-colors">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600 mt-0.5">
                                        <Globe className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-neutral-900">Anyone with link can edit</h4>
                                        <p className="text-xs text-neutral-500 mt-0.5">
                                            {isPublicEdit
                                                ? "Anyone with this URL can view and edit this resume."
                                                : "Only you and explicitly invited editors can edit."}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsPublicEdit(!isPublicEdit)}
                                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                                        isPublicEdit ? "bg-indigo-600" : "bg-neutral-200"
                                    }`}
                                >
                                    <span
                                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                            isPublicEdit ? "translate-x-5" : "translate-x-0"
                                        }`}
                                    />
                                </button>
                            </div>
                        )}

                        {/* Invite Editor by Email */}
                        {isOwner && (
                            <div className="space-y-3">
                                <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider flex items-center gap-1.5">
                                    <UserPlus className="w-3.5 h-3.5 text-indigo-600" /> Invite Editor by Email
                                </label>
                                <form onSubmit={handleAddEditor} className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input
                                            type="email"
                                            placeholder="editor@example.com"
                                            value={newEmail}
                                            onChange={(e) => setNewEmail(e.target.value)}
                                            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-neutral-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-neutral-900 placeholder:text-neutral-400"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
                                    >
                                        <UserPlus className="w-4 h-4" />
                                        Add Access
                                    </button>
                                </form>
                                {emailError && <p className="text-xs text-red-500">{emailError}</p>}
                            </div>
                        )}

                        {/* Current Collaborators List */}
                        <div className="space-y-3">
                            <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" /> Access List
                            </label>
                            <div className="divide-y divide-neutral-100 border border-neutral-200 rounded-xl overflow-hidden bg-white">
                                {/* Owner */}
                                <div className="flex items-center justify-between p-3 bg-neutral-50/50">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-neutral-900">
                                                {ownerEmail || "Resume Owner"}
                                            </p>
                                            <p className="text-[11px] text-neutral-400">Creator</p>
                                        </div>
                                    </div>
                                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700">
                                        Owner
                                    </span>
                                </div>

                                {/* Allowed Editors */}
                                {allowedEditors.map((email) => (
                                    <div key={email} className="flex items-center justify-between p-3 hover:bg-neutral-50/50 transition-colors">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
                                                {email.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-neutral-800">{email}</p>
                                                <p className="text-[11px] text-neutral-400">Can edit</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                                                Editor
                                            </span>
                                            {isOwner && (
                                                <button
                                                    onClick={() => handleRemoveEditor(email)}
                                                    className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                                    title="Revoke access"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {allowedEditors.length === 0 && !isPublicEdit && (
                                    <div className="p-4 text-center text-xs text-neutral-400">
                                        No explicit editor emails added yet.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-100 bg-neutral-50/50">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-neutral-600 hover:bg-neutral-200/60 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        {isOwner && (
                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={isSubmitting}
                                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-indigo-500/20 disabled:opacity-50 cursor-pointer"
                            >
                                {isSubmitting ? "Saving..." : "Save Sharing Settings"}
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
