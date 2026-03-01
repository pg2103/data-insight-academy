// api/sentiment.js
import { InferenceClient } from "@huggingface/inference";
const client = new InferenceClient({ apiKey: process.env.HF_TOKEN });

export default async function handler(req, res) {
  const text =
    req.method === "POST" ? req.body?.text || "" : req.query.text || "";
  if (!text) return res.status(400).json({ error: "text required" });
  try {
    const hfResp = await client.textClassification({
      model: "ProsusAI/finbert",
      inputs: text.slice(0, 800),
    });
    return res.status(200).json({ result: hfResp[0] });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}
