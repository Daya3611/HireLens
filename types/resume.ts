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
  skills: string[];
  experience: Experience[];
  education: Education[];
  projects?: Project[];
  certifications?: Certification[];
  languages?: Language[];
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
