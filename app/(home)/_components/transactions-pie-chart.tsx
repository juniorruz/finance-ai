"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionType } from "@prisma/client";

import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/types";
import PercentageItem from "@/app/_components/percentage-item";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "investido",
    color: "#FFFFFF",
  },
  [TransactionType.DEPOSIT]: {
    label: "Receita",
    color: "#55B03E",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#E93B30",
  },
} satisfies ChartConfig;

interface TransactionsPieChartProps {
  typesPercentage: TransactionPercentagePerType;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
}
const TransactionPieChart = ({
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  typesPercentage,
}: TransactionsPieChartProps) => {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: "#55B03E",
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: "#E93B30",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: "#FFFFFF",
    },
  ];
  return (
    <Card className="flex flex-col p-12">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>

      <div className="space-y-3">
        <PercentageItem
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          value={typesPercentage[TransactionType.DEPOSIT]}
        />
        <PercentageItem
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Despesas"
          value={typesPercentage[TransactionType.EXPENSE]}
        />
        <PercentageItem
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          value={typesPercentage[TransactionType.INVESTMENT]}
        />
      </div>
    </Card>
  );
};

export default TransactionPieChart;