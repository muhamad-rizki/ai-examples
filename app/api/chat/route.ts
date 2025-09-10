const UPSTREAM_URL = "https://api.korinai.com/api/chat";

// Proxy POST to upstream SSE endpoint and stream events back to the client
export async function POST(req: Request) {
  try {
    // Try to read JSON body and enrich defaults; fall back to raw text if not JSON
    let upstreamBody: string;
    try {
      const parsed = await req.json();
      const participantEmail = process.env.KORINAI_PARTICIPANT_EMAIL;
      upstreamBody = JSON.stringify({
        participantEmail: parsed?.participantEmail ?? participantEmail,
        ...parsed,
      });
    } catch (_) {
      upstreamBody = await req.text();
    }

    const authorization = process.env.KORINAI_API_KEY;

    const upstream = await fetch(UPSTREAM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authorization ? { Authorization: `Bearer ${authorization}` } : {}),
      },
      body: upstreamBody,
      // Forward client aborts to upstream if supported
      signal: (req as any).signal,
    });

    if (!upstream.ok || !upstream.body) {
      const text = await upstream.text().catch(() => "");
      return new Response(
        JSON.stringify({
          error: "Upstream request failed",
          status: upstream.status,
          body: text,
        }),
        {
          status: upstream.status || 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Ensure proper SSE headers for the client connection
    const headers = new Headers();
    headers.set("Content-Type", "text/event-stream; charset=utf-8");
    headers.set("Cache-Control", "no-cache, no-transform");
    headers.set("Connection", "keep-alive");
    headers.set("X-Accel-Buffering", "no"); // disable buffering on some proxies (e.g., nginx)

    // Explicitly pipe upstream stream to client using TransformStream
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const reader = upstream.body.getReader();

    const abort = (req as any).signal as AbortSignal | undefined;

    const pump = async () => {
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          if (value) await writer.write(value);
        }
      } catch (e) {
        try {
          await writer.abort(e as any);
        } catch {}
      } finally {
        try {
          await writer.close();
        } catch {}
        try {
          reader.releaseLock?.();
        } catch {}
      }
    };

    // Start piping
    pump();

    // Cancel upstream if client disconnects
    abort?.addEventListener?.("abort", () => {
      try {
        reader.cancel("client aborted");
      } catch {}
      try {
        writer.abort("client aborted");
      } catch {}
    });

    return new Response(readable, { status: 200, headers });
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        error: "SSE proxy error",
        message: err?.message || String(err),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
