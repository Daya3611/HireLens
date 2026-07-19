import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PDFParse } from "pdf-parse";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ---------- Gemini setup ---------- */
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const jobDescription = formData.get("jobDescription") as string | null;

    if (!file || !jobDescription) {
      return NextResponse.json(
        { error: "Resume file and job description are required" },
        { status: 400 }
      );
    }

    if (!file.type.includes("pdf")) {
      return NextResponse.json(
        { error: "Only PDF resumes are supported" },
        { status: 400 }
      );
    }

    /* ---------- Extract PDF text ---------- */
    const buffer = Buffer.from(await file.arrayBuffer());
    const parser = new PDFParse({ data: buffer });
    const pdfData = await parser.getText();
    const extractedText = pdfData.text;

    if (!extractedText || extractedText.length < 300) {
      return NextResponse.json(
        {
          error:
            "Resume appears to be scanned or empty. Please upload a text-based PDF.",
        },
        { status: 400 }
      );
    }

    /* ---------- Gemini Prompt (from your Streamlit code) ---------- */
    const prompt = `
You are an advanced and highly experienced Applicant Tracking System (ATS).

Evaluate the resume against the job description.

Responsibilities:
1. Identify missing keywords
2. Give ATS match score (1–100)
3. Provide improvement feedback
4. Suggest skills, keywords, and achievements
5. Give an application success rate (1–100)

Resume:
${extractedText}

Job Description:
${jobDescription}

Respond ONLY in the following format:

• Job Description Match:
• Missing Keywords:
• Profile Summary:
• Personalized suggestions for skills, keywords and achievements:
• Application Success Rate:
`;

    const result = await model.generateContent(prompt);

    return NextResponse.json({
      analysis: result.response.text(),
      extractedVia: "pdf-parse + gemini-pro",
    });
  } catch (err: any) {
    console.error("ATS API Error:", err);
    return NextResponse.json(
      { error: "ATS analysis failed", message: err.message },
      { status: 500 }
    );
  }
}
