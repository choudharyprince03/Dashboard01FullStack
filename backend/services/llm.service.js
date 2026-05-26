import OpenAI from "openai";
import "dotenv/config";

console.log("runLLM called");


const client = new OpenAI({
  baseURL: process.env.OPENROUTER_BASE_URL,
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost:5173",
    "X-OpenRouter-Title": process.env.OPENROUTER_APP_NAME || "Nexus Dashboard",
  },
});

const runLLM = async (prompt) => {
  console.log("runLLM called");
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is missing");
  }

  try {
    const response = await client.chat.completions.create({
      model: process.env.OPENROUTER_MODEL || process.env.DEFAULT_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an analytical assistant. Return concise, factual productivity insights for a dashboard.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
    });
    
    console.log("✅ Model used:", response.model);

    return {
      content: response.choices?.[0]?.message?.content?.trim() || "AI insight is temporarily unavailable.",
      modelUsed: response.model || process.env.OPENROUTER_MODEL || "unknown"
    };
  } catch (error) {
      console.error("FULL ERROR:");
      console.error(error);

       console.error("MESSAGE:", error.message);

    throw error;
  }
};

export default runLLM;
