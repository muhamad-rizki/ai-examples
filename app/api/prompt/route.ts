import { UIMessage } from "ai";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    if (!query || typeof query !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing 'query' in request body" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Build a fresh roomId for this single-turn prompt generation
    const roomId = `prompt-${Date.now()}`;

    // Compose system instruction to produce a clean, high-quality prompt only
    const systemInstruction =
      "You are a world-class prompt engineer." +
      "Given a user goal, craft a single, well-structured prompt that is clear, concise, and actionable." +
      "Do not include any commentary or explanations—ONLY return the final prompt.";

    // Build request body expected by our /api/chat proxy (which forwards to the upstream SSE API)
    const chatBody = {
      roomId,
      messages: [
        {
          role: "user",
          parts: [
            { type: "text", text: systemInstruction },
            { type: "text", text: `Goal: ${query}` },
          ],
        },
      ] as UIMessage[],
    } as any;

    // Resolve our own origin to call the local API route
    const url = new URL(req.url);
    const chatUrl = `${url.origin}/api/chat`;

    const upstream = await fetch(chatUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chatBody),
      signal: (req as any).signal,
    });

    if (!upstream.ok || !upstream.body) {
      const text = await upstream.text().catch(() => "");
      return new Response(
        JSON.stringify({
          error: "Chat endpoint failed",
          status: upstream.status,
          body: text,
        }),
        {
          status: upstream.status || 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Consume SSE stream using the provided working parser pattern
    const reader = upstream.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let finalText = "";
    let metadata: any = undefined;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";
      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const data = line.slice(6);
        if (data === "[DONE]") break;
        try {
          const evt = JSON.parse(data);
          if (evt.type === "text-delta" && typeof evt.delta === "string") {
            finalText += evt.delta;
          } else if (evt.type === "message-metadata") {
            metadata = evt.metadata;
          }
        } catch {}
      }
    }

    const prompt = finalText.trim();
    return new Response(JSON.stringify({ prompt }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        error: "Prompt generation failed",
        message: err?.message || String(err),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
