import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { ChatCompletionMessageParam } from "openai/resources";
import z from "zod";
import { produtosEmEstoque, produtosEmFalta } from "./database";

const client = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const schema = z.object({
  produtos: z.array(z.string()),
});

const tools = [
  {
    type: "function" as const,
    function: {
      name: "produtos_em_estoque",
      description: "Lista os produtos que estão em estoque.",
      parameters: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      strict: true,
    },
  },
  {
    type: "function" as const,
    function: {
      name: "produtos_em_falta",
      description: "Lista os produtos que estão em falta.",
      parameters: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      strict: true,
    },
  },
];

const generateCompletion = async (
  messages: ChatCompletionMessageParam[],
  format: any
) => {
  const completion = await client.chat.completions.parse({
    model: "gpt-4o-mini",
    max_tokens: 100,
    response_format: format,
    tools,
    messages,
  });

  if (completion.choices[0].message.refusal) {
    throw new Error("Erro ao processar a resposta da IA");
  }

  return completion;
};

export const generateProducts = async (message: string) => {
  const messages: ChatCompletionMessageParam[] = [
    {
      role: "developer",
      content:
        "Liste tres produtos que atendam a necessidade do usuario. Responda em JSON no formato { produtos: string[]}",
    },
    {
      role: "user",
      content: message,
    },
  ];

  const completion = await generateCompletion(
    messages,
    zodResponseFormat(schema, "produtos_schema")
  );

  const { tool_calls } = completion.choices[0].message;

  if (tool_calls) {
    const toolsMap = {
      produtos_em_estoque: produtosEmEstoque,
      produtos_em_falta: produtosEmFalta,
    };

    // 1. Adicione a mensagem do assistant que contém os tool_calls
    messages.push(completion.choices[0].message);

    // 2. Adicione a resposta de cada tool_call
    for (const tool_call of tool_calls) {
      const functionToCall = toolsMap[tool_call.function.name];
      if (!functionToCall) throw new Error("Função não encontrada");

      const result = functionToCall(tool_call.function.parsed_arguments);

      messages.push({
        role: "tool",
        tool_call_id: tool_call.id,
        content: result.toString(),
      });
    }

    // 3. Chame novamente a API com as novas mensagens
    const completion2 = await generateCompletion(
      messages,
      zodResponseFormat(schema, "produtos_schema")
    );

    return completion2.choices[0].message.parsed;
  }

  return completion.choices[0].message.parsed;
};
