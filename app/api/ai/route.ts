import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    console.log("=== AI API TEST START ===");

    const geminiApiKey = process.env.GEMINI_API_KEY;
    console.log("1. API Key present:", !!geminiApiKey);
    if (!geminiApiKey) {
      return Response.json({
        success: true,
        message: "Please set GEMINI_API_KEY in .env.local",
      });
    }

    console.log("2. Initializing GoogleGenerativeAI...");
    const genAI = new GoogleGenerativeAI(geminiApiKey);

    console.log("3. Getting model: gemini-1.5-flash...");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    console.log("4. Calling generateContent with simple prompt...");
    const result = await model.generateContent("Hello! Introduce yourself as Niels Privé Concierge in 2 sentences.");
    console.log("5. Got result from Gemini!");

    const response = await result.response;
    const text = response.text();
    console.log("6. Extracted text:", text);

    console.log("=== AI API TEST SUCCESS ===");
    return Response.json({
      success: true,
      message: text,
    });
  } catch (error) {
    console.error("=== AI API TEST FAILED ===");
    console.error("Full error object:", error);
    return Response.json(
      { success: false, error: "Failed" },
      { status: 500 }
    );
  }
}