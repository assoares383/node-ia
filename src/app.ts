import express from "express";
import { generateProducts } from "./openai";

const app = express();
app.use(express.json());

app.post("/generate", async (req, res) => {
  try {
    const products = await generateProducts(req.body.message);
    res.json(products);
  } catch (error) {
    console.error("Erro ao chamar a API:", error);
    res.status(500).json({ error: "Erro ao chamar a API" });
  }
});

export default app;
