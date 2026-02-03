import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const profile = body.profile;

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      systemInstruction:
        "You are an educational gift expert. Always respond with valid JSON.",
    });

    const prompt = `Recommend 2 educational gifts for a child with the following profile:

        Age: ${profile.age}
        Gender: ${profile.gender}
        Interests: ${profile.interests.join(", ") || "various"}
        Learning Focus: ${profile.learningFocus.join(", ") || "general"}
        Budget: ${profile.budget}

        Return ONLY a JSON array with this structure:
      [
        { "name": "Gift Name", "skills": ["skill1", "skill2"], "why": "reasoning", "activity": "how to use it", "price": "price range", "image": "https://images.unsplash.com/photo-1", "onlineShops": [
  { "name": "Amazon", "url": "https://www.amazon.com/...", "note": "Use forwarder like MyUS" },
  { "name": "Taobao", "url": "https://world.taobao.com/", "note": "Direct shipping available" }
] }
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
