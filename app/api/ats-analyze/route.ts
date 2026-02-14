import { NextResponse } from "next/server";
import mammoth from "mammoth";
import { geminiModel } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const jobDescription = formData.get("jobDescription") as string;

    if (!file || !jobDescription) {
      return NextResponse.json(
        { error: "Missing file or job description" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let resumeText = "";

    // Extract text
    if (file.type === "application/pdf") {
      console.log("Parsing PDF file...");
      const pdf = require("pdf-parse/lib/pdf-parse.js");
      const data = await pdf(buffer);
      resumeText = data.text;
      console.log("PDF parsed successfully. Text length:", resumeText.length);
    } else {
      console.log("Parsing DOCX file...");
      const result = await mammoth.extractRawText({ buffer });
      resumeText = result.value;
      console.log("DOCX parsed successfully. Text length:", resumeText.length);
    }

    if (!resumeText.trim()) {
        console.error("No text extracted from resume");
        return NextResponse.json(
            { error: "Could not extract text from the resume." },
            { status: 400 }
        );
    }

    const prompt = `
You are an ATS analyzer.

Return only JSON:

{
  "score": number, // 0-100
  "keywordMatchPercentage": number, // 0-100
  "missingKeywords": ["string"],
  "strengths": ["string"],
  "improvements": ["string"],
  "formattingIssues": ["string"]
}

Resume:
${resumeText.slice(0, 10000)}

Job Description:
${jobDescription.slice(0, 5000)}
`;

    const result = await geminiModel.generateContent(prompt);
    const text = result.response.text();
    console.log("Gemini response:", text);

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("ATS Analysis Error:", error);
    return NextResponse.json(
      { error: "Analysis failed. Please check the server logs." },
      { status: 500 }
    );
  }
}
