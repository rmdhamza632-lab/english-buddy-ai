// Netlify Function: keeps your API key secret on the server. Uses the FREE Gemini API by default.
const hits = new Map();
const SYSTEM = "You are the engine of a language-learning app. Follow the formatting instructions exactly. When asked for JSON, return only valid JSON.";

exports.handler = async (event) => {
  const out = (statusCode, obj) => ({ statusCode, headers: { "content-type": "application/json" }, body: JSON.stringify(obj) });
  if (event.httpMethod !== "POST") return out(405, { error: "POST only" });

  // Optional: set ALLOWED_ORIGIN (for example https://yourdomain.com) so other sites cannot use your key.
  const allowed = process.env.ALLOWED_ORIGIN;
  const origin = event.headers.origin || "";
  if (allowed && origin && origin !== allowed) return out(403, { error: "Origin not allowed" });

  // Simple best-effort rate limit: 40 requests per 10 minutes per visitor.
  const ip = event.headers["x-nf-client-connection-ip"] || event.headers["client-ip"] || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  if (recent.length >= 40) return out(429, { error: "Too many requests. Please wait a few minutes." });
  recent.push(now);
  hits.set(ip, recent);

  const gk = process.env.GEMINI_API_KEY;      // free: https://aistudio.google.com
  const ak = process.env.ANTHROPIC_API_KEY;   // optional paid alternative
  if (!gk && !ak) return out(500, { error: "No API key set. Add GEMINI_API_KEY in Netlify environment variables." });

  let prompt = "";
  try { prompt = String(JSON.parse(event.body || "{}").prompt || "").slice(0, 8000); } catch (e) {}
  if (!prompt) return out(400, { error: "Missing prompt" });

  try {
    let text = "";
    if (gk) {
      const model = process.env.GEMINI_MODEL || "gemini-flash-latest";
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: "POST",
        headers: { "content-type": "application/json", "x-goog-api-key": gk },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM }] },
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 2500, responseMimeType: "application/json" },
        }),
      });
      const d = await r.json();
      if (!r.ok) return out(r.status === 429 ? 429 : 502, { error: (d.error && d.error.message) || "Upstream error" });
      const parts = (d.candidates && d.candidates[0] && d.candidates[0].content && d.candidates[0].content.parts) || [];
      text = parts.map((p) => p.text || "").join("");
    } else {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "content-type": "application/json", "x-api-key": ak, "anthropic-version": "2023-06-01" },
        body: JSON.stringify({ model: process.env.CLAUDE_MODEL || "claude-haiku-5-5", max_tokens: 1500, system: SYSTEM, messages: [{ role: "user", content: prompt }] }),
      });
      const d = await r.json();
      if (!r.ok) return out(502, { error: (d.error && d.error.message) || "Upstream error" });
      text = (d.content || []).filter((b) => b.type === "text").map((b) => b.text).join("");
    }
    return out(200, { text });
  } catch (e) {
    return out(502, { error: "Upstream request failed" });
  }
};
