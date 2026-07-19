"use client";

import React from "react";
import { ResumeData, ResumeCustomization } from "@/types/resume";
import { GripVertical, Eye, EyeOff, ChevronUp, ChevronDown, Check } from "lucide-react";

interface CustomizerPanelProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const colorPresets = [
  { name: "Slate", hex: "#475569" },
  { name: "Navy", hex: "#1e3a8a" },
  { name: "Royal Blue", hex: "#2563eb" },
  { name: "Dev Blue", hex: "#0284c7" },
  { name: "Teal", hex: "#0f766e" },
  { name: "Emerald", hex: "#10b981" },
  { name: "Purple", hex: "#7c3aed" },
  { name: "Pink", hex: "#db2777" },
  { name: "Red", hex: "#dc2626" },
  { name: "Charcoal", hex: "#171717" }
];

const fontPresets = [
  { id: "sans", name: "Inter (Modern Sans)" },
  { id: "roboto", name: "Roboto (Clean Sans)" },
  { id: "outfit", name: "Outfit (Geometric Sans)" },
  { id: "serif", name: "Merriweather (Elegant Serif)" },
  { id: "lora", name: "Lora (Classic Serif)" },
  { id: "mono", name: "JetBrains Mono (Tech Mono)" }
];

const sectionNames: Record<string, string> = {
  summary: "Professional Summary",
  experience: "Work Experience",
  education: "Education",
  projects: "Projects",
  skills: "Skills & Tech Stack",
  certifications: "Certifications",
  awards: "Honors & Awards",
  languages: "Languages",
  interests: "Interests",
  references: "References"
};

const defaultCustomization: ResumeCustomization = {
  themeColor: "#2563eb",
  fontFamily: "sans",
  fontSize: "base",
  lineSpacing: "normal",
  sectionOrder: [
    "summary",
    "experience",
    "education",
    "projects",
    "skills",
    "certifications",
    "awards",
    "languages",
    "interests",
    "references"
  ],
  hiddenSections: []
};

export default function CustomizerPanel({ resumeData, setResumeData }: CustomizerPanelProps) {
  const customization = resumeData.customization || defaultCustomization;
  const sectionOrder = customization.sectionOrder || defaultCustomization.sectionOrder;
  const hiddenSections = customization.hiddenSections || defaultCustomization.hiddenSections;

  const updateCustomization = (updates: Partial<ResumeCustomization>) => {
    setResumeData((prev) => ({
      ...prev,
      customization: {
        themeColor: prev.customization?.themeColor ?? defaultCustomization.themeColor,
        fontFamily: prev.customization?.fontFamily ?? defaultCustomization.fontFamily,
        fontSize: prev.customization?.fontSize ?? defaultCustomization.fontSize,
        lineSpacing: prev.customization?.lineSpacing ?? defaultCustomization.lineSpacing,
        sectionOrder: prev.customization?.sectionOrder ?? defaultCustomization.sectionOrder,
        hiddenSections: prev.customization?.hiddenSections ?? defaultCustomization.hiddenSections,
        ...updates
      }
    }));
  };

  // Drag and Drop ordering
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    const sourceIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
    if (isNaN(sourceIndex) || sourceIndex === targetIndex) return;

    const newOrder = [...sectionOrder];
    const [removed] = newOrder.splice(sourceIndex, 1);
    newOrder.splice(targetIndex, 0, removed);

    updateCustomization({ sectionOrder: newOrder });
  };

  // Up/Down reordering
  const moveSection = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sectionOrder.length) return;

    const newOrder = [...sectionOrder];
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;

    updateCustomization({ sectionOrder: newOrder });
  };

  // Visibility toggle
  const toggleSectionVisibility = (sectionId: string) => {
    const isHidden = hiddenSections.includes(sectionId);
    let newHidden: string[];
    if (isHidden) {
      newHidden = hiddenSections.filter((id) => id !== sectionId);
    } else {
      newHidden = [...hiddenSections, sectionId];
    }
    updateCustomization({ hiddenSections: newHidden });
  };

  return (
    <div className="space-y-6 pt-4">
      {/* 1. Theme Color */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-neutral-800">
          Accent Color
        </label>
        <div className="flex flex-wrap gap-2">
          {colorPresets.map((preset) => (
            <button
              key={preset.hex}
              onClick={() => updateCustomization({ themeColor: preset.hex })}
              className="w-8 h-8 rounded-full border border-neutral-300 relative transition-transform hover:scale-110 active:scale-95"
              style={{ backgroundColor: preset.hex }}
              title={preset.name}
            >
              {customization.themeColor === preset.hex && (
                <Check className="w-4 h-4 text-white absolute inset-0 m-auto" />
              )}
            </button>
          ))}
          <div className="flex items-center gap-2 border border-neutral-200 rounded-xl p-1 bg-neutral-50">
            <input
              type="color"
              value={customization.themeColor || "#2563eb"}
              onChange={(e) => updateCustomization({ themeColor: e.target.value })}
              className="w-7 h-7 rounded-lg border-0 cursor-pointer p-0 overflow-hidden"
            />
            <input
              type="text"
              value={customization.themeColor || ""}
              onChange={(e) => updateCustomization({ themeColor: e.target.value })}
              placeholder="#000000"
              className="text-xs uppercase w-16 bg-transparent border-none focus:outline-none font-mono"
            />
          </div>
        </div>
      </div>

      {/* 2. Fonts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-bold text-neutral-800">
            Typography
          </label>
          <select
            value={customization.fontFamily || "sans"}
            onChange={(e) => updateCustomization({ fontFamily: e.target.value })}
            className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm text-neutral-800 font-medium"
          >
            {fontPresets.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.name}
              </option>
            ))}
          </select>
        </div>

        {/* Font size & Spacing */}
        <div className="space-y-1.5">
          <label className="block text-sm font-bold text-neutral-800">
            Font Size
          </label>
          <div className="grid grid-cols-3 gap-1 bg-neutral-100 p-1 rounded-xl">
            {(["sm", "base", "lg"] as const).map((sz) => (
              <button
                key={sz}
                onClick={() => updateCustomization({ fontSize: sz })}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all capitalize ${
                  customization.fontSize === sz
                    ? "bg-white text-indigo-600 shadow-xs"
                    : "text-neutral-500 hover:text-neutral-800"
                }`}
              >
                {sz === "base" ? "Normal" : sz}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-bold text-neutral-800">
            Line Spacing
          </label>
          <div className="grid grid-cols-3 gap-1 bg-neutral-100 p-1 rounded-xl">
            {(["snug", "normal", "relaxed"] as const).map((sp) => (
              <button
                key={sp}
                onClick={() => updateCustomization({ lineSpacing: sp })}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all capitalize ${
                  customization.lineSpacing === sp
                    ? "bg-white text-indigo-600 shadow-xs"
                    : "text-neutral-500 hover:text-neutral-800"
                }`}
              >
                {sp}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Section Reorder & Visibility */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-bold text-neutral-800">
            Section Order & Visibility
          </label>
          <span className="text-[10px] text-neutral-500 font-semibold italic">
            Drag items or use buttons to sort
          </span>
        </div>
        <div className="border border-neutral-200 rounded-2xl overflow-hidden bg-neutral-50 divide-y divide-neutral-200">
          {sectionOrder.map((sectionId, idx) => {
            const isHidden = hiddenSections.includes(sectionId);
            return (
              <div
                key={sectionId}
                draggable
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, idx)}
                className={`flex items-center justify-between p-3.5 bg-white transition-all ${
                  isHidden ? "opacity-50" : ""
                } hover:bg-neutral-50/50`}
              >
                {/* Left side: Grip and label */}
                <div className="flex items-center gap-3">
                  <div className="cursor-grab active:cursor-grabbing text-neutral-400 p-1 hover:text-neutral-600">
                    <GripVertical className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-neutral-800 select-none">
                    {sectionNames[sectionId] || sectionId}
                  </span>
                </div>

                {/* Right side: Reorder arrows & eye toggle */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => moveSection(idx, "up")}
                    disabled={idx === 0}
                    className="p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 rounded-md disabled:opacity-30 disabled:hover:bg-transparent"
                    title="Move Up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveSection(idx, "down")}
                    disabled={idx === sectionOrder.length - 1}
                    className="p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 rounded-md disabled:opacity-30 disabled:hover:bg-transparent"
                    title="Move Down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="w-px h-4 bg-neutral-200 mx-1" />
                  <button
                    onClick={() => toggleSectionVisibility(sectionId)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isHidden
                        ? "text-neutral-400 hover:bg-red-50 hover:text-red-500"
                        : "text-indigo-600 hover:bg-indigo-50"
                    }`}
                    title={isHidden ? "Show Section" : "Hide Section"}
                  >
                    {isHidden ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
