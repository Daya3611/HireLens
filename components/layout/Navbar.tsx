"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileText,
    Scan,
    LogOut,
    ChevronDown,
    User,
    LayoutDashboard,
    Sparkles,
    Menu,
    X,
} from "lucide-react";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setIsDropdownOpen(false);
            router.push("/");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const navLinks = [
        { name: "Builder", href: "/dashboard", icon: LayoutDashboard, requiresAuth: true },
        { name: "ATS Scanner", href: "/ats-scanner", icon: Scan, requiresAuth: false },
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-neutral-200/20 border-b border-neutral-100"
                    : "bg-white/50 backdrop-blur-sm"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: -5 }}
                                className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25"
                            >
                                <FileText className="w-5 h-5 text-white" />
                            </motion.div>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                HireLens
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => {
                                if (link.requiresAuth && !user) return null;
                                const Icon = link.icon;
                                const active = isActive(link.href);

                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${active
                                            ? "text-blue-600"
                                            : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                                            }`}
                                    >
                                        {active && (
                                            <motion.div
                                                layoutId="navPill"
                                                className="absolute inset-0 bg-blue-50 rounded-full -z-10"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <Icon className={`w-4 h-4 ${active ? "text-blue-600" : "text-neutral-400"}`} />
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-3">
                            {loading ? (
                                <div className="w-9 h-9 rounded-full bg-neutral-200 animate-pulse hidden md:block" />
                            ) : user ? (
                                <div className="relative hidden md:block" ref={dropdownRef}>
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-neutral-100 transition-all duration-300 border border-transparent hover:border-neutral-200"
                                    >
                                        {user.photoURL ? (
                                            <Image
                                                src={user.photoURL}
                                                alt="Profile"
                                                width={32}
                                                height={32}
                                                className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-sm"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                                                {user.email?.charAt(0).toUpperCase() || <User size={16} />}
                                            </div>
                                        )}
                                        <span className="hidden sm:block text-sm font-medium text-neutral-700 max-w-[100px] truncate">
                                            {user.displayName || user.email?.split("@")[0]}
                                        </span>
                                        <motion.div
                                            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ChevronDown className="w-4 h-4 text-neutral-400" />
                                        </motion.div>
                                    </button>

                                    <AnimatePresence>
                                        {isDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl shadow-neutral-900/10 border border-neutral-100 py-2 overflow-hidden"
                                            >
                                                {/* User Info Header */}
                                                <div className="px-4 py-3 bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-blue-100">
                                                    <p className="text-sm font-semibold text-neutral-900 truncate">
                                                        {user.displayName || "Welcome back"}
                                                    </p>
                                                    <p className="text-xs text-neutral-500 truncate mt-0.5">
                                                        {user.email}
                                                    </p>
                                                </div>

                                                {/* Menu Items */}
                                                <div className="p-2">
                                                    {navLinks.map((link) => {
                                                        if (link.requiresAuth && !user) return null;
                                                        const Icon = link.icon;
                                                        const active = isActive(link.href);

                                                        return (
                                                            <Link
                                                                key={link.name}
                                                                href={link.href}
                                                                onClick={() => setIsDropdownOpen(false)}
                                                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${active
                                                                    ? "bg-blue-50 text-blue-600"
                                                                    : "text-neutral-700 hover:bg-neutral-50"
                                                                    }`}
                                                            >
                                                                <Icon className={`w-4 h-4 ${active ? "text-blue-600" : "text-neutral-400"}`} />
                                                                {link.name}
                                                                {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />}
                                                            </Link>
                                                        );
                                                    })}

                                                    <div className="h-px bg-neutral-100 my-2" />

                                                    <button
                                                        onClick={handleSignOut}
                                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                                                    >
                                                        <LogOut className="w-4 h-4" />
                                                        Sign Out
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Link
                                        href="/login"
                                        className="hidden sm:block text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors px-4 py-2"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="group relative inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            <Sparkles className="w-4 h-4" />
                                            Get Started
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 rounded-xl hover:bg-neutral-100 transition-colors"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="w-5 h-5 text-neutral-700" />
                                ) : (
                                    <Menu className="w-5 h-5 text-neutral-700" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            key="mobile-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-neutral-900/20 backdrop-blur-sm z-40 md:hidden"
                        />
                        <motion.div
                            key="mobile-menu"
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-white z-50 shadow-2xl md:hidden"
                        >
                            <div className="p-6 h-full flex flex-col">
                                <div className="flex items-center justify-between mb-8">
                                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                            HireLens
                                        </span>
                                    </Link>
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="p-2 rounded-xl hover:bg-neutral-100"
                                    >
                                        <X className="w-5 h-5 text-neutral-700" />
                                    </button>
                                </div>

                                <div className="flex-1 space-y-2">
                                    {user && (
                                        <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl mb-6">
                                            {user.photoURL ? (
                                                <Image
                                                    src={user.photoURL}
                                                    alt="Profile"
                                                    width={48}
                                                    height={48}
                                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                                                    {user.email?.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-neutral-900 truncate">
                                                    {user.displayName || "User"}
                                                </p>
                                                <p className="text-sm text-neutral-500 truncate">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {navLinks.map((link, idx) => {
                                        if (link.requiresAuth && !user) return null;
                                        const Icon = link.icon;
                                        const active = isActive(link.href);

                                        return (
                                            <motion.div
                                                key={link.name}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className={`flex items-center gap-3 p-4 rounded-2xl font-medium transition-colors ${active
                                                        ? "bg-blue-50 text-blue-600"
                                                        : "text-neutral-700 hover:bg-neutral-50"
                                                        }`}
                                                >
                                                    <Icon className={`w-5 h-5 ${active ? "text-blue-600" : "text-neutral-400"}`} />
                                                    {link.name}
                                                </Link>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                <div className="pt-6 border-t border-neutral-100">
                                    {user ? (
                                        <button
                                            onClick={handleSignOut}
                                            className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                                        >
                                            <LogOut className="w-5 h-5" />
                                            Sign Out
                                        </button>
                                    ) : (
                                        <div className="space-y-3">
                                            <Link
                                                href="/login"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="block w-full text-center p-4 rounded-2xl font-medium text-neutral-700 bg-neutral-50 hover:bg-neutral-100 transition-colors"
                                            >
                                                Log in
                                            </Link>
                                            <Link
                                                href="/register"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="block w-full text-center p-4 rounded-2xl font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all"
                                            >
                                                Get Started
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}