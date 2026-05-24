import type { AiMessage, AiContext } from "@/types/ai";

export async function POST(req: Request) {
  try {
    console.log("AI API: Request received");
    const body = await req.json();
    const { messages, context }: { messages: AiMessage[]; context: AiContext } = body;

    console.log("AI API: Context received", context);
    console.log("AI API: Messages received", messages);

    const openaiApiKey = process.env.OPENAI_API_KEY;
    console.log("AI API: OpenAI API Key present?", !!openaiApiKey);
    if (!openaiApiKey) {
      console.error("AI API: OpenAI API key is missing!");
      const fallbackMessage = "Welcome to Niels Privé Concierge! Please set your OPENAI_API_KEY in .env.local to use the full AI concierge features. For now, I'm happy to answer basic questions about our luxury hospitality platform!";
      return Response.json({
        success: true,
        message: fallbackMessage,
      });
    }

    const systemPrompt = `You are Niels Privé Concierge, a luxury hospitality AI assistant for Niels Privé, a premium hospitality SaaS platform.

You are talking to a ${context.userRole === "partner" ? "partner (property owner/manager)" : "guest"}.

Current context:
- Current page: ${context.pathname}
${context.propertyName ? `- Current property: ${context.propertyName}` : ""}
${context.roomName ? `- Current room: ${context.roomName}` : ""}
${context.dashboardSection ? `- Dashboard section: ${context.dashboardSection}` : ""}

Your role:
- Be elegant, professional, and luxury-focused
- Help with booking assistance, reservation support, property/room questions, amenities, check-in/out, cancellations, payments
- For partners: help with dashboard, inventory, reservations, analytics, operations
- Keep responses concise but helpful
- Never reveal you are an AI unless asked directly`;

    console.log("AI API: Calling OpenAI API...");
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    console.log("AI API: OpenAI response status:", response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API: OpenAI API error text:", errorText);
      return Response.json(
        { success: false, error: "Failed to get AI response" },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log("AI API: OpenAI response data:", data);
    const assistantMessage = data.choices[0].message.content;

    console.log("AI API: Assistant message generated:", assistantMessage);

    return Response.json({
      success: true,
      message: assistantMessage,
    });
  } catch (error) {
    console.error("AI API: Unhandled error:", error);
    return Response.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
