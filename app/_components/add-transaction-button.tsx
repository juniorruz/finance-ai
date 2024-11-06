"use client";

import { useState } from "react";
import UpsertTransactionDialog from "./upsert-transaction-dialog";
import { Button } from "./ui/button";
import { ArrowDownUpIcon } from "lucide-react";

const AddTransactionButton = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Button
        className="rounded-full font-bold"
        onClick={() => setDialogOpen(true)}
      >
        Adicionar Transação
        <ArrowDownUpIcon />
      </Button>
      <UpsertTransactionDialog isOpen={dialogOpen} setIsOpen={setDialogOpen} />
    </>
  );
};

export default AddTransactionButton;
