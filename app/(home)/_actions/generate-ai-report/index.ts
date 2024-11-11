"use server";

import { db } from "@/app/_lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import OpenAI from "openai";
import { GenerateAiReportSchema, generateAiReportSchema } from "./schema";

export const generateAiReport = async ({ month }: GenerateAiReportSchema) => {
  generateAiReportSchema.parse({ month });
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user = await clerkClient().users.getUser(userId);

  const hasPremiumPlan = (user.publicMetadata.subscriptionPlan = "premium");
  if (!hasPremiumPlan) {
    throw new Error("You need a premium plan to generate an AI report");
  }
  const openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const transactions = await db.transaction.findMany({
    where: {
      date: {
        gte: new Date(`2024-${month}-01`),
        lt: new Date(`2024-${month}-31`),
      },
    },
  });
  const content = `Gere um relatório com insights sobre minhas finanças, com dicas e orientações de como melhorar minha vida financeira. As transações estão divididas por ponto e virgula. A estrutura de cara uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. são elas: ${transactions.map((transation) => `${transation.date.toLocaleDateString("pt-BR")}-R$${transation.amount}-${transation.type}-${transation.category}`).join(";")}`;
  const completion = await openAI.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Você é um especialista em gestão e organização de finanças pessoais. Você ajuda as pessoas a organizarem melhor as suas finanças.",
      },
      {
        role: "user",
        content,
      },
    ],
  });

  return completion.choices[0].message.content;
};
