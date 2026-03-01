// api/news.js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const dataPath = path.join(
      process.cwd(),
      "backend",
      "data",
      "sentiments.json"
    );
    if (!fs.existsSync(dataPath)) {
      return res.status(404).json({
        error: "No sentiments.json found. Run the scraper and sentiment job.",
      });
    }
    const raw = fs.readFileSync(dataPath, "utf8");
    const parsed = JSON.parse(raw);
    // parsed is expected: { updated_at: "...", articles: [...] }
    const articles = parsed.articles || parsed;
    return res.status(200).json(articles);
  } catch (err) {
    console.error("api/news error:", err);
    return res.status(500).json({ error: "Failed to read news data" });
  }
}
