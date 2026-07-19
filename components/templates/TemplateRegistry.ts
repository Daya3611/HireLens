import dynamic from "next/dynamic";
import React from "react";

export interface TemplateMetadata {
  id: string;
  name: string;
  description: string;
  color: string;
  features: string[];
  compatibility: number;
}

export const TEMPLATES: TemplateMetadata[] = [
  {
    id: "one",
    name: "ATS Classic",
    description: "Corporate & Clean CV",
    color: "bg-neutral-800",
    features: ["Single column", "High ATS score", "Black & white", "Standard margins"],
    compatibility: 100,
  },
  {
    id: "two",
    name: "Modern Professional",
    description: "Elegant Two-Column Layout",
    color: "bg-blue-600",
    features: ["Sidebar info", "Clean section headers", "Accented layout"],
    compatibility: 85,
  },
  {
    id: "three",
    name: "Harvard Resume",
    description: "Classic Ivy League Standard",
    color: "bg-red-800",
    features: ["Serif headings", "Garamond style", "Academic standard", "Compact"],
    compatibility: 98,
  },
  {
    id: "four",
    name: "Stanford Resume",
    description: "Data-Dense Engineering Format",
    color: "bg-red-600",
    features: ["Minimal spacing", "Engineering focused", "Clear impact focus"],
    compatibility: 95,
  },
  {
    id: "five",
    name: "Google Style",
    description: "Clean & Impact Focused",
    color: "bg-blue-500",
    features: ["Google Blue accents", "Generous whitespace", "Perfect readability"],
    compatibility: 96,
  },
  {
    id: "six",
    name: "Microsoft Style",
    description: "Balanced Business Format",
    color: "bg-cyan-600",
    features: ["Corporate accents", "Thin dividers", "Result-driven layout"],
    compatibility: 94,
  },
  {
    id: "seven",
    name: "Startup Resume",
    description: "Bold & Contemporary",
    color: "bg-violet-600",
    features: ["Bold headings", "Skill tag styling", "Project highlighted"],
    compatibility: 90,
  },
  {
    id: "eight",
    name: "Executive Resume",
    description: "Distinguished Leadership Format",
    color: "bg-emerald-800",
    features: ["Regal serif typography", "Subtle borders", "Accomplishments list"],
    compatibility: 92,
  },
  {
    id: "nine",
    name: "Creative Designer",
    description: "Visual Portfolio Focus",
    color: "bg-pink-600",
    features: ["Elegant profile photo", "Colored sidebar bg", "Designed grid style"],
    compatibility: 75,
  },
  {
    id: "ten",
    name: "Minimal White",
    description: "Raw Typographical Cleanliness",
    color: "bg-stone-400",
    features: ["Extremely clean", "Zero graphic clutter", "Highly readable"],
    compatibility: 100,
  },
  {
    id: "eleven",
    name: "Developer Resume",
    description: "Tech Stack & Project Focus",
    color: "bg-indigo-600",
    features: ["Tech-chips categorised", "GitHub and Links", "Project columns"],
    compatibility: 88,
  },
  {
    id: "twelve",
    name: "Academic Resume",
    description: "Standard Publications CV",
    color: "bg-gray-700",
    features: ["Education first", "Publications focus", "Conferences details"],
    compatibility: 95,
  },
];

const ATSClassic = dynamic(() => import("./ATSClassic"));
const ModernProfessional = dynamic(() => import("./ModernProfessional"));
const HarvardResume = dynamic(() => import("./HarvardResume"));
const StanfordResume = dynamic(() => import("./StanfordResume"));
const GoogleStyle = dynamic(() => import("./GoogleStyle"));
const MicrosoftStyle = dynamic(() => import("./MicrosoftStyle"));
const StartupResume = dynamic(() => import("./StartupResume"));
const ExecutiveResume = dynamic(() => import("./ExecutiveResume"));
const CreativeDesigner = dynamic(() => import("./CreativeDesigner"));
const MinimalWhite = dynamic(() => import("./MinimalWhite"));
const DeveloperResume = dynamic(() => import("./DeveloperResume"));
const AcademicResume = dynamic(() => import("./AcademicResume"));

export const getTemplateComponent = (id: string) => {
  switch (id) {
    case "one":
      return ATSClassic;
    case "two":
      return ModernProfessional;
    case "three":
      return HarvardResume;
    case "four":
      return StanfordResume;
    case "five":
      return GoogleStyle;
    case "six":
      return MicrosoftStyle;
    case "seven":
      return StartupResume;
    case "eight":
      return ExecutiveResume;
    case "nine":
      return CreativeDesigner;
    case "ten":
      return MinimalWhite;
    case "eleven":
      return DeveloperResume;
    case "twelve":
      return AcademicResume;
    default:
      return ATSClassic;
  }
};
