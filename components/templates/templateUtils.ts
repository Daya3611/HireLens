import { ResumeData } from "@/types/resume";

export const DEFAULT_SECTION_ORDER = [
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
];

export const getFontClass = (font?: string) => {
  switch (font) {
    case "font-sans":
    case "sans":
      return "font-[family:var(--font-inter)]";
    case "font-roboto":
    case "roboto":
      return "font-[family:var(--font-roboto)]";
    case "font-outfit":
    case "outfit":
      return "font-[family:var(--font-outfit)]";
    case "font-serif":
    case "serif":
      return "font-[family:var(--font-merriweather)]";
    case "font-lora":
    case "lora":
      return "font-[family:var(--font-lora)]";
    case "font-mono":
    case "mono":
      return "font-[family:var(--font-mono)]";
    default:
      return "font-[family:var(--font-inter)]";
  }
};

export const getFontSizeClass = (size?: "sm" | "base" | "lg") => {
  switch (size) {
    case "sm":
      return {
        body: "text-xs",
        sub: "text-[10px]",
        h4: "text-xs font-bold",
        h3: "text-sm font-bold",
        h2: "text-base font-bold",
        h1: "text-2xl font-bold"
      };
    case "lg":
      return {
        body: "text-base",
        sub: "text-sm",
        h4: "text-base font-bold",
        h3: "text-lg font-bold",
        h2: "text-xl font-bold",
        h1: "text-4xl font-bold"
      };
    case "base":
    default:
      return {
        body: "text-sm",
        sub: "text-xs",
        h4: "text-sm font-bold",
        h3: "text-base font-bold",
        h2: "text-lg font-bold",
        h1: "text-3xl font-bold"
      };
  }
};

export const getLineSpacingClass = (spacing?: "snug" | "normal" | "relaxed") => {
  switch (spacing) {
    case "snug":
      return "leading-snug";
    case "relaxed":
      return "leading-relaxed";
    case "normal":
    default:
      return "leading-normal";
  }
};

export const getAccentColor = (data: ResumeData, defaultColor: string) => {
  return data.customization?.themeColor || defaultColor;
};

export const isSectionVisible = (data: ResumeData, sectionName: string) => {
  if (!data.customization?.hiddenSections) return true;
  return !data.customization.hiddenSections.includes(sectionName);
};

export const getOrderedSections = (data: ResumeData) => {
  return data.customization?.sectionOrder || DEFAULT_SECTION_ORDER;
};
