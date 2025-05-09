import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";
export const maxDuration = 30;

async function POST(req: Request) {
  try {
    console.log("API Key:", process.env.OPENAI_API_KEY ? "Present" : "Missing");

    // === 🔍 LOGGING THE RAW READABLE STREAM ===
    const body = await req.json();

    const { messages, selectedText, context } = body;

    if (!messages || !Array.isArray(messages) || !context) {
      console.error("Missing or invalid fields:", { messages, context });
      return new Response(
        JSON.stringify({ error: "Missing or invalid messages or context" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    let userMessage = messages[messages.length - 1]?.content;
    if (
      !userMessage ||
      typeof userMessage !== "string" ||
      userMessage.trim().length < 2
    ) {
      console.error("Invalid user message:", userMessage);
      return new Response(
        JSON.stringify({ error: "User message must be a non-empty string" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (selectedText && context === "improve") {
      userMessage = `Improve this text: ${selectedText}`;
    }

    let systemPrompt =
      "You are a helpful AI writing assistant for blog posts. Provide concise, well-structured content in Markdown format.";

    if (context === "improve") {
      systemPrompt +=
        " Improve the provided text by enhancing clarity, adding detail, and making it more engaging while maintaining the original meaning.";
    } else if (context === "introduction") {
      systemPrompt +=
        " Write an engaging introduction that hooks the reader and clearly outlines what the article will cover.";
    } else if (context === "conclusion") {
      systemPrompt +=
        " Write a conclusion that summarizes key points and leaves the reader with a memorable takeaway.";
    } else if (context === "section") {
      systemPrompt +=
        " Write a detailed section for the blog post that is informative and engaging.";
    }

    console.log("System Prompt:", systemPrompt);
    console.log("User Message:", userMessage);

    try {
      const result = await streamText({
        model: openai("gpt-4.1-2025-04-14"),
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
        maxTokens: 100,
      });

      // Optional: you can log result.toReadableStream() instead, but that may stall streaming
      console.log("[Streaming AI response initialized]");

      return result.toDataStreamResponse();
    } catch (streamError) {
      console.error(
        "StreamText error:",
        (streamError as Error).message,
        (streamError as Error).stack
      );
      return new Response(
        JSON.stringify({
          error: "Failed to process AI request",
          details: (streamError as Error).message,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error(
      "AI Assistant error:",
      (error as Error).message,
      (error as Error).stack
    );
    return new Response(
      JSON.stringify({
        error: "Failed to process request",
        details: (error as Error).message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export default POST;
