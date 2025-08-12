import dotenv from "dotenv";
import express from "express";
import OpenAI from "openai";
dotenv.config();

const app = express();
const client = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

app.use(express.json());

app.post("/generate", async (req, res) => {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      max_completion_tokens: 100,
      temperature: 0.7,
      messages: [
        {
          role: "developer",
          content: "Liste tres produtos que atendam a necessidade do usuario.",
        },
        {
          role: "user",
          content: req.body.message,
        },
      ],
    });
    res.json({ message: completion.choices[0].message.content });
  } catch (error) {
    console.error("Erro ao chamar a API:", error);
    res.status(500).json({ error: "Erro ao chamar a API" });
  }
});

export default app;
