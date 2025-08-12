import dotenv from "dotenv";
import express from "express";
import OpenAI from "openai";
import z from "zod";
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
      response_format: { type: "json_object" },
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

    const output = JSON.parse(completion.choices[0].message.content ?? "");

    const schema = z.object({
      produtos: z.array(z.string()),
    });

    const result = schema.safeParse(output);

    if (!result.success) {
      return res.status(400).json({
        error: "Resposta inválida da IA",
        details: result.error.errors,
      });
    }

    res.json(output);
  } catch (error) {
    console.error("Erro ao chamar a API:", error);
    res.status(500).json({ error: "Erro ao chamar a API" });
  }
});

export default app;
