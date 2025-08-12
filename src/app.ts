import dotenv from "dotenv";
import express from "express";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import z from "zod";

dotenv.config();

const app = express();
const client = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

app.use(express.json());

const schema = z.object({
  produtos: z.array(z.string()),
});

app.post("/generate", async (req, res) => {
  try {
    const completion = await client.chat.completions.parse({
      model: "gpt-4o-mini",
      max_completion_tokens: 100,
      response_format: zodResponseFormat(schema, "produtos_schema"),
      messages: [
        {
          role: "developer",
          content:
            "Liste tres produtos que atendam a necessidade do usuario. Responda em JSON no formato { produtos: string[]}",
        },
        {
          role: "user",
          content: req.body.message,
        },
      ],
    });

    if (!completion.choices[0].message.refusal) {
      return res
        .status(400)
        .json({ error: "Erro ao processar a resposta da IA" });
    }

    res.json(completion.choices[0].message.parsed?.produtos);
  } catch (error) {
    console.error("Erro ao chamar a API:", error);
    res.status(500).json({ error: "Erro ao chamar a API" });
  }
});

export default app;
