"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import {
    Lock,
    Mail,
    ArrowRight,
    Sparkles,
    Eye,
    EyeOff,
    AlertCircle,
    CheckCircle2,
    UserPlus,
    Shield,
    Zap,
    FileText,
} from "lucide-react";


export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push("/dashboard");
        } catch (err: any) {
            setError(getErrorMessage(err.code));
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        setIsLoading(true);
        setError("");
        try {
            await signInWithPopup(auth, googleProvider);
            router.push("/dashboard");
        } catch (err: any) {
            setError(getErrorMessage(err.code));
        } finally {
            setIsLoading(false);
        }
    };

    const getErrorMessage = (code: string) => {
        const errors: Record<string, string> = {
            "auth/email-already-in-use": "An account with this email already exists",
            "auth/invalid-email": "Invalid email address",
            "auth/weak-password": "Password should be at least 6 characters",
            "auth/popup-closed-by-user": "Sign up cancelled",
            "auth/network-request-failed": "Network error. Please try again",
        };
        return errors[code] || "An error occurred. Please try again";
    };

    const features = [
        { icon: FileText, text: "Unlimited resume builds" },
        { icon: Zap, text: "AI-powered suggestions" },
        { icon: Shield, text: "ATS optimization tools" },
    ];

    return (
        <div className="min-h-screen bg-neutral-50">

            <div className="flex min-h-[calc(100vh-64px)]">
                {/* Left Side - Visual */}
                <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-blue-700" />

                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                            backgroundSize: '40px 40px'
                        }} />
                    </div>

                    {/* Animated Blobs */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
                    />

                    <div className="relative z-10 flex flex-col justify-center px-16 text-white">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                                <Sparkles className="w-4 h-4" />
                                <span className="text-sm font-medium">Start Your Journey</span>
                            </div>

                            <h2 className="text-5xl font-bold mb-6 leading-tight">
                                Create Your Free Account Today
                            </h2>
                            <p className="text-xl text-indigo-100 mb-12 max-w-md leading-relaxed">
                                Join thousands of job seekers who have transformed their careers with AI-powered resume building.
                            </p>

                            {/* Features List */}
                            <div className="space-y-4">
                                {features.map((feature, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + idx * 0.1 }}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                                            <feature.icon className="w-6 h-6" />
                                        </div>
                                        <span className="text-lg font-medium">{feature.text}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Testimonial */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
                            >
                                <p className="text-indigo-100 italic mb-4">
                                    "HireLens helped me land 3 interviews in just one week. The ATS scanner is a game-changer!"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-300 to-indigo-300" />
                                    <div>
                                        <div className="font-semibold">Sarah M.</div>
                                        <div className="text-sm text-indigo-200">Product Manager at Google</div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-md"
                    >
                        {/* Mobile Header */}
                        <div className="lg:hidden text-center mb-8">
                            <h1 className="text-3xl font-bold text-neutral-900">Create Account</h1>
                            <p className="text-neutral-500 mt-2">Join HireLens and start building your resume</p>
                        </div>

                        <div className="bg-white rounded-3xl shadow-xl shadow-neutral-200/50 p-8 sm:p-10 border border-neutral-100">
                            <div className="hidden lg:block mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900">Get Started</h2>
                                <p className="text-neutral-500 mt-1">Create your free account in seconds</p>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3"
                                >
                                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-red-700">{error}</p>
                                </motion.div>
                            )}

                            <form onSubmit={handleRegister} className="space-y-5">
                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-neutral-400"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-12 pr-12 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-neutral-400"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                    <p className="mt-1.5 text-xs text-neutral-500">
                                        Must be at least 6 characters
                                    </p>
                                </div>

                                {/* Confirm Password Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full pl-12 pr-12 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-neutral-400"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full group relative inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {isLoading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Creating account...
                                            </>
                                        ) : (
                                            <>
                                                <UserPlus className="w-5 h-5" />
                                                Create Account
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </span>
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-neutral-200" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-neutral-500 font-medium">
                                        Or sign up with
                                    </span>
                                </div>
                            </div>

                            {/* Google Sign Up */}
                            <button
                                onClick={handleGoogleSignup}
                                disabled={isLoading}
                                className="w-full group flex items-center justify-center gap-3 px-6 py-3.5 bg-white border-2 border-neutral-200 rounded-xl font-semibold text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50 transition-all duration-300 disabled:opacity-70"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                <span>Sign up with Google</span>
                            </button>

                            {/* Login Link */}
                            <div className="mt-8 text-center">
                                <p className="text-neutral-600">
                                    Already have an account?{" "}
                                    <Link
                                        href="/login"
                                        className="font-semibold text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-1 group"
                                    >
                                        Sign in
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Terms Note */}
                        <div className="mt-8 text-center">
                            <p className="text-xs text-neutral-400">
                                By creating an account, you agree to our{" "}
                                <Link href="/terms" className="text-neutral-600 hover:text-neutral-900 underline">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="/privacy" className="text-neutral-600 hover:text-neutral-900 underline">
                                    Privacy Policy
                                </Link>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}