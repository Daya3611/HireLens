export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  summary: string;
  location?: string;
  skills: string[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  experience: {
    role: string;
    company: string;
    duration: string;
    description: string;
  }[];
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
