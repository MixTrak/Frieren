import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client with OpenRouter baseURL
const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY ?? "",
});

// Frieren website assistant system prompt
const systemPrompt = `You are Frieren's AI assistant, a helpful chatbot for a premium web development company called Frieren.

About Frieren:
- We build custom websites with modern designs, animations, and responsive layouts
- We offer admin panels with secure authentication
- We integrate MongoDB for user management and file storage (GridFS)
- We support Uropay payment gateway integration
- Pricing: Modern Website (₹3,000), Animations + Custom Theme (₹5,000), Everything + 1 Revision (₹8,000)
- Backend: Modern Admin Panel (₹2,500), Premium with Animations (₹4,000)
- MongoDB: User Management (₹1,500), GridFS (₹1,000), Combo (₹2,000)
- Uropay: ₹500

Rules:
1. You are Frieren Assistant, an AI built for Frieren Web Development.
2. Always be polite, professional, and helpful.
3. If you don't know something, suggest visiting the /quote page.
4. Avoid using '**' around text.
5. Use emojis appropriately: ✨, 💻, 🚀, 👋, 💡
6. Keep answers concise (2-3 sentences max unless asked for details).
7. Guide users to /quote for getting a custom quote.
8. Don't reveal all pricing at once - answer based on what they ask.`;

/**
 * Extract readable text from various response formats
 */
function extractTextFromContent(content) {
    if (!content) return "";
    if (typeof content === "string") return content;

    if (Array.isArray(content)) {
        return content
            .map((blk) => {
                if (typeof blk === "string") return blk;
                if (typeof blk === "object" && blk !== null) {
                    if ("text" in blk && typeof blk.text === "string") return blk.text;
                    if ("content" in blk && typeof blk.content === "string") return blk.content;
                }
                return "";
            })
            .filter(Boolean)
            .join("\n\n");
    }

    if (typeof content === "object" && content !== null) {
        if ("text" in content && typeof content.text === "string") {
            return content.text;
        }
        if ("parts" in content && Array.isArray(content.parts)) {
            return content.parts.join("");
        }
        try {
            return JSON.stringify(content);
        } catch {
            return String(content);
        }
    }

    return String(content);
}

export async function POST(req) {
    try {
        const body = await req.json().catch(() => ({}));
        const input = (body.input ?? body.message ?? body.text ?? "").toString().trim();

        if (!input) {
            return NextResponse.json({ reply: "⚠️ No input provided." }, { status: 400 });
        }

        if (!process.env.OPENROUTER_API_KEY) {
            console.error("Missing OPENROUTER_API_KEY");
            return NextResponse.json(
                { reply: "⚠️ Chat service is not configured." },
                { status: 500 }
            );
        }

        const completion = await openai.chat.completions.create({
            model: "amazon/nova-2-lite-v1:free",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: input },
            ],
        });

        const choice = completion.choices?.[0];
        const rawContent = choice?.message?.content ?? choice ?? null;
        const text = extractTextFromContent(rawContent) || "⚠️ No reply from model.";

        return NextResponse.json({ reply: text });

    } catch (err) {
        console.error("Chat route error:", err);
        const message = err instanceof Error ? err.message : "⚠️ Error while fetching response";
        return NextResponse.json({ reply: message }, { status: 500 });
    }
}
