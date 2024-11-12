"use server";

import { db } from "@/app/_lib/prisma";
import { DeleteTransactionsSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const deleteTransactions = async ({
  transactionId,
}: DeleteTransactionsSchema) => {
  await db.transaction.deleteMany({
    where: {
      id: transactionId,
    },
  });
  revalidatePath("/transactions");
  revalidatePath("/");
};
