import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // kommt aus Env-Var (Vercel / local)
});

export default async function handler(req, res) {
    // Nur POST erlauben
    if (req.method !== "POST") {
        res.status(405).json({ error: "Use POST" });
        return;
    }

    try {
        const { messages } = req.body ?? {};

        // Minimal-Validierung
        if (!Array.isArray(messages)) {
            res.status(400).json({ error: "messages must be an array" });
            return;
        }

        // System-Prompt = „Persona“ + Fakten
        // Tipp: hier packst du später deine About-Infos rein, damit Antworten konsistent sind.
        const system = `
You are "Ask Nam", a friendly assistant on Nam's personal website.
Answer in English by default (switch to German if the user writes German).
Be concise, helpful, and honest. If you don't know something about Nam, say so.

Facts about Nam:
- Nam is 23, based in Berlin.
- Interests: tech, filmmaking, photography.
- Studies: B.Sc. Business Informatics (2024–2027, HTW Berlin).
- Tech: Java, JavaScript, HTML/CSS, Vue.js, SQL, R.
- Cameras: Sony A7 IV.
`.trim();

        // Wir nutzen die Responses API (empfohlen)
        const response = await client.responses.create({
            model: "gpt-5-mini",
            input: [
                { role: "system", content: system },
                ...messages,
            ],
            // Kosten- & UX-Control:
            max_output_tokens: 300,
        });

        res.status(200).json({ text: response.output_text });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}
