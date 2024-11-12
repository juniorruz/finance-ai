"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";

import { BotIcon, Loader2Icon } from "lucide-react";
import { generateAiReport } from "../_actions/generate-ai-report";
import { useState } from "react";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import Markdown from "react-markdown";
import Link from "next/link";

interface AiReportButtonProps {
  hasPremiumPlan: boolean;
  month: string;
}

const AiReportButton = ({ month, hasPremiumPlan }: AiReportButtonProps) => {
  const [report, setReport] = useState<string | null>();
  const [reportLoading, setReportLoading] = useState(false);
  const handleGenerateReportClick = async () => {
    try {
      setReportLoading(true);

      const timeout = setTimeout(() => {
        setReportLoading(false);
      }, 15000);
      const aiReport = await generateAiReport({ month });
      clearTimeout(timeout);
      setReport(aiReport);
    } catch (error) {
      console.error(error);
    } finally {
      setReportLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          Relatório IA
          <BotIcon />
        </Button>
      </DialogTrigger>
      {hasPremiumPlan ? (
        <>
          <DialogContent className="max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>
              <DialogDescription>
                Use inteligência artificial para gerar um relatório com insights
                sobre suas finanças.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="prose max-h-[450px] text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white">
              <Markdown>{report}</Markdown>
            </ScrollArea>
            <DialogFooter>
              <DialogClose>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
              <Button
                onClick={handleGenerateReportClick}
                disabled={reportLoading}
              >
                {reportLoading && <Loader2Icon className="animate-spin" />}{" "}
                Gerar relatório
              </Button>
            </DialogFooter>
          </DialogContent>
        </>
      ) : (
        <>
          <DialogContent className="max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>
              <DialogDescription>
                Você precisa ter uma assinatura premium para gerar relatórios
                com IA.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
              <Button asChild>
                <Link href="/subscription ">Assinar plano premium</Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default AiReportButton;
