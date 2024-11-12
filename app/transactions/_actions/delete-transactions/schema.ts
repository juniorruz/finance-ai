import { z } from "zod";

export const deleteTransactionsSchema = z.object({
  transactionId: z.string().uuid(),
});

export type DeleteTransactionsSchema = z.infer<typeof deleteTransactionsSchema>;
