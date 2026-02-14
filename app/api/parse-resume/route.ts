import { NextResponse } from "next/server";
import { geminiModel } from "@/lib/gemini";
// @ts-ignore
import pdf from "pdf-parse/lib/pdf-parse";
import mammoth from "mammoth";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let text = "";

    if (file.type === "application/pdf") {
      const data = await pdf(buffer);
      text = data.text;
    } else if (
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
    }

    const prompt = `
      Extract structured resume data from the following text into the specified JSON format.
      Be concise and factual. Do not hallucinate. If a field is missing, leave it as an empty string or empty array.

      Required JSON Format:
      {
        "name": "string",
        "email": "string",
        "phone": "string",
        "location": "string",
        "summary": "string",
        "skills": ["string"],
        "education": [
          {
            "degree": "string",
            "institution": "string",
            "year": "string"
          }
        ],
        "experience": [
          {
            "role": "string",
            "company": "string",
            "duration": "string",
            "description": "string"
          }
        ]
      }

      Resume Text:
      ${text}
    `;

    const model = geminiModel;
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json(JSON.parse(responseText));
  } catch (error) {
    console.error("Resume parsing error:", error);
    return NextResponse.json(
      { error: "Failed to parse resume" },
      { status: 500 }
    );
  }
}
