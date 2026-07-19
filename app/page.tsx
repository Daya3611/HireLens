"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  FileText,
  ScanLine,
  Sparkles,
  Zap,
  Shield,
  Download,
  Star,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Smart Builder",
    description: "Intuitive drag-and-drop editor with real-time preview. Build your resume section by section with AI-powered suggestions.",
    color: "blue",
    stats: "10+ Sections",
  },
  {
    icon: ScanLine,
    title: "ATS Scanner",
    description: "Check your resume against job descriptions. Get instant feedback on keyword matching and formatting compatibility.",
    color: "indigo",
    stats: "95% Success Rate",
  },
  {
    icon: CheckCircle,
    title: "Pro Templates",
    description: "Choose from recruiter-approved templates designed by industry experts. Stand out from the competition.",
    color: "violet",
    stats: "20+ Templates",
  },
];

const stats = [
  { value: "50K+", label: "Resumes Created" },
  { value: "95%", label: "ATS Pass Rate" },
  { value: "4.9", label: "User Rating" },
  { value: "2min", label: "Avg. Build Time" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative px-6 pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-100/20 to-transparent" />

          {/* Animated Blobs */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -5, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-3xl"
          />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-6 border border-blue-200"
                >
                  <Sparkles size={16} className="animate-pulse" />
                  <span>AI-Powered Resume Builder</span>
                </motion.div>

                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-neutral-900 mb-6 leading-[1.1]">
                  Build Your{" "}
                  <span className="relative">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                      Dream Career
                    </span>
                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                      <path d="M2 10C50 2 100 2 150 6C200 10 250 10 298 2" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round" />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="100%" stopColor="#6366F1" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </h1>

                <p className="text-xl text-neutral-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Create professional, ATS-friendly resumes in minutes. Our AI technology helps you stand out and get hired faster.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                  <Link
                    href="/dashboard"
                    className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Create My Resume
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>

                  <Link
                    href="/ats-scanner"
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-neutral-700 border-2 border-neutral-200 rounded-full font-bold text-lg hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300"
                  >
                    <ScanLine className="w-5 h-5 text-blue-600 group-hover:rotate-12 transition-transform" />
                    Check ATS Score
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-neutral-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Free to use</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>ATS Optimized</span>
                  </div>
                </div>
              </motion.div>

              {/* Right Content - Visual */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative hidden lg:block"
              >
                <div className="relative">
                  {/* Main Card */}
                  <div className="relative bg-white rounded-3xl shadow-2xl shadow-blue-900/10 p-6 border border-neutral-100">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-100">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                      <div className="flex-1 text-center text-sm text-neutral-400 font-medium">
                        Resume Preview
                      </div>
                    </div>

                    {/* Resume Content Mock */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex-shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="h-6 bg-neutral-200 rounded w-3/4" />
                          <div className="h-4 bg-neutral-100 rounded w-1/2" />
                          <div className="flex gap-2 mt-2">
                            <div className="h-6 bg-blue-100 rounded-full w-20" />
                            <div className="h-6 bg-indigo-100 rounded-full w-24" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 pt-4">
                        <div className="h-4 bg-neutral-200 rounded w-full" />
                        <div className="h-4 bg-neutral-100 rounded w-5/6" />
                        <div className="h-4 bg-neutral-100 rounded w-4/6" />
                      </div>

                      <div className="pt-4 space-y-3">
                        <div className="h-5 bg-blue-600 rounded w-32" />
                        <div className="space-y-2">
                          <div className="h-3 bg-neutral-200 rounded w-full" />
                          <div className="h-3 bg-neutral-200 rounded w-full" />
                          <div className="h-3 bg-neutral-100 rounded w-3/4" />
                        </div>
                      </div>
                    </div>

                    {/* Floating Badge */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -right-6 -top-6 bg-white rounded-2xl shadow-xl p-4 border border-neutral-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-neutral-900">ATS Score</div>
                          <div className="text-2xl font-bold text-green-600">98%</div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Another Floating Element */}
                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      className="absolute -left-8 bottom-20 bg-white rounded-2xl shadow-xl p-4 border border-neutral-100"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 border-2 border-white" />
                          ))}
                        </div>
                        <div className="text-sm font-medium text-neutral-600">
                          <span className="font-bold text-neutral-900">50K+</span> users
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-y border-neutral-100 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-neutral-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-500 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-6 bg-neutral-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm mb-4"
              >
                <Zap size={16} />
                Powerful Features
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4"
              >
                Everything you need to get hired
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-neutral-500 max-w-2xl mx-auto"
              >
                Professional tools designed to help you create the perfect resume and land your dream job.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                const colorClasses = {
                  blue: "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
                  indigo: "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white",
                  violet: "bg-violet-100 text-violet-600 group-hover:bg-violet-600 group-hover:text-white",
                }[feature.color];

                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 }}
                    className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl border border-neutral-100 hover:border-neutral-200 transition-all duration-500 hover:-translate-y-1"
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${colorClasses}`}>
                      <Icon size={28} />
                    </div>

                    <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs font-bold text-neutral-400 bg-neutral-100 px-3 py-1 rounded-full">
                        {feature.stats}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {feature.description}
                    </p>

                    <div className="mt-6 pt-6 border-t border-neutral-100">
                      <Link
                        href={feature.title === "ATS Scanner" ? "/ats-scanner" : "/dashboard"}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors"
                      >
                        Learn more
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-12 md:p-16 text-center overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '32px 32px'
                }} />
              </div>

              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Ready to build your resume?
                </h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Join thousands of job seekers who have landed their dream jobs using HireLens.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
                  >
                    <Download className="w-5 h-5" />
                    Start Building Free
                  </Link>
                  <Link
                    href="/ats-scanner"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-500/30 text-white border border-white/30 rounded-full font-bold text-lg hover:bg-blue-500/50 transition-colors backdrop-blur-sm"
                  >
                    <ScanLine className="w-5 h-5" />
                    Check ATS Score
                  </Link>
                </div>

                {/* Rating */}
                <div className="mt-8 flex items-center justify-center gap-2 text-blue-100">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                    ))}
                  </div>
                  <span className="font-semibold">4.9/5</span>
                  <span className="opacity-75">from 2,000+ reviews</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}