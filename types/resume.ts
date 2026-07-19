export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string;
  achievements?: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  gpa?: string;
}

export interface Project {
  name: string;
  link?: string;
  description: string;
  technologies?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Award {
  name: string;
  issuer: string;
  year: string;
  description?: string;
}

export interface Reference {
  name: string;
  title: string;
  company: string;
  contact: string;
}

export interface ResumeCustomization {
  themeColor: string;
  fontFamily: string;
  fontSize: "sm" | "base" | "lg";
  lineSpacing: "snug" | "normal" | "relaxed";
  sectionOrder: string[];
  hiddenSections: string[];
}

export interface ResumeData {
  name?: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary?: string;
  profilePhoto?: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  projects?: Project[];
  certifications?: Certification[];
  languages?: Language[];
  awards?: Award[];
  interests?: string[];
  references?: Reference[];
  customization?: ResumeCustomization;
}

export interface ATSAnalysis {
  score: number;
  keywordMatchPercentage: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  sectionScores: {
    skills: number;
    experience: number;
    education: number;
    summary: number;
  };
  strengths: string[];
  improvements: string[];
  formattingIssues: string[];
}
