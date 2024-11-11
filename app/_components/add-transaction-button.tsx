"use client";

import { useState } from "react";
import UpsertTransactionDialog from "./upsert-transaction-dialog";
import { Button } from "./ui/button";
import { ArrowDownUpIcon } from "lucide-react";
import { Tooltip, TooltipTrigger } from "./ui/tooltip";
import { TooltipContent, TooltipProvider } from "@radix-ui/react-tooltip";

interface AddTransactionButtonProps {
  userCanAddTransactions?: boolean;
}

const AddTransactionButton = ({
  userCanAddTransactions,
}: AddTransactionButtonProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="rounded-full font-bold"
              onClick={() => setDialogOpen(true)}
              disabled={!userCanAddTransactions}
            >
              Adicionar Transação
              <ArrowDownUpIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {!userCanAddTransactions &&
              "Você atingiu o limite de transações por mês. Atualize seu plano para adicionar mais transações."}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <UpsertTransactionDialog isOpen={dialogOpen} setIsOpen={setDialogOpen} />
    </>
  );
};

export default AddTransactionButton;
