import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables")
}
console.log(!apiKey)
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const profile = body.profile;

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      systemInstruction: "You are an educational gift expert.",
    });

    const prompt = `
  You are an expert Child Development Consultant. Recommend 3 distinct types of educational gifts based on the UNICEF/UNESCO core skills framework.

  ### DEVELOPMENTAL STAGES:
  - Early Childhood (0-8y): Brain plasticity, motor skills, socio-emotional foundations.
  - Primary (9-12y): Literacy, numeracy, and social cooperation.
  - Adolescence (13-19y): Critical thinking, resilience, and identity.

  ### USER PROFILE:
  - Age: ${profile.age}
  - Gender: ${profile.gender}
  - Interests: ${profile.interests.join(", ") || "various"}
  - Learning Focus: ${profile.learningFocus.join(", ") || "UNICEF Core Skills"}
  - Budget: ${profile.budget}

  ### CATEGORY DEFINITIONS FOR THE 3 OBJECTS:
  1. CATEGORY 1: PHYSICAL GIFT - A tangible item for independent or home play.
  2. CATEGORY 2: EXPERIENCE GIFT - A gift card or ticket for a workshop, training center, or class.
  3. CATEGORY 3: THE MASTERY BUNDLE - A combination of a small physical tool plus a related activity.

  ### INSTRUCTIONS:
  - Return ONLY a JSON array with exactly 3 objects.
  - Match suggestions to the Learning Focus and Age Stage precisely.
  - The "activity" field should explain how a parent supports the skill development.

  [
    { 
      "category": "Physical / Experience / Combined",
      "name": "Gift/Workshop Name", 
      "skills": ["Skill from UNICEF list"], 
      "why": "Developmental reasoning for age ${profile.age}", 
      "activity": "Actionable parent-child involvement", 
      "price": "${profile.budget}", 
      "image": "Keywords for high-quality image search", 
      "onlineShops": [
        { "name": "Amazon", "url": "...", "note": "Best for Physical" },
        { "name": "Taobao", "url": "...", "note": "Direct shipping" },
        { "name": "Training Hub", "url": "...", "note": "Search for local centers nearby" }
      ] 
    }
  ]
`;
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseModalities: ["TEXT", "IMAGE"],
      } as any,
    });
    const response = await result.response;
    const text = response.text();
    const cleanedText = text.replace(/```json|```/g, "").trim();
    return NextResponse.json(JSON.parse(cleanedText));
  } catch (error) {
    console.error("Gemini Error:", error);
    return NextResponse.json(
      { error: "Failed to generate gifts" },
      { status: 500 },
    );
  }
}
