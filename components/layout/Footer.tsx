import Link from "next/link";
import { Heart, Github, Twitter, Linkedin, Mail } from "lucide-react";

const footerLinks = {
    product: [
        { name: "Features", href: "/features" },
        { name: "Templates", href: "/templates" },
        { name: "Pricing", href: "/pricing" },
        { name: "Changelog", href: "/changelog" },
    ],
    resources: [
        { name: "Blog", href: "/blog" },
        { name: "Guides", href: "/guides" },
        { name: "Help Center", href: "/help" },
        { name: "API Docs", href: "/api" },
    ],
    company: [
        { name: "About", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
        { name: "Partners", href: "/partners" },
    ],
    legal: [
        { name: "Privacy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
        { name: "Security", href: "/security" },
    ],
};

const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com/yourusername" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/yourusername" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/yourusername" },
    { name: "Email", icon: Mail, href: "mailto:hello@hirelens.com" },
];

export default function Footer() {
    return (
        <footer className="w-full bg-white border-t border-neutral-200 mt-auto">
            <div className="border-t border-neutral-100">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-neutral-500">
                            © {new Date().getFullYear()} HireLens. All rights reserved.
                        </p>

                        <p className="flex items-center gap-1.5 text-sm text-neutral-500">
                            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> by
                            <a
                                href="https://dayanandgawade.in"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-neutral-700 hover:text-blue-600 transition-colors ml-1"
                            >
                                Dayanand Gawade
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer >
    );
}