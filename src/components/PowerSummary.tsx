
import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Zap } from "lucide-react";
import { SlidingNumber } from "@/components/ui/sliding-number";

export function PowerSummary() {
  const stats = [
    {
      title: "Total Power Generated",
      value: "450 kWh",
      change: "+12.3%",
      icon: Zap,
      colour: "text-primary",
      positive: true,
    },
    {
      title: "Power Sent",
      value: "320 kWh",
      change: "+8.1%",
      icon: ArrowUpRight,
      colour: "text-green-500",
      positive: true,
    },
    {
      title: "Power Received",
      value: "130 kWh",
      change: "-5.4%",
      icon: ArrowDownRight,
      colour: "text-red-500",
      positive: false,
    },
  ];

  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title} className="glass-panel hover-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-whitesmoke">{stat.title}</h3>
            <stat.icon className={`h-6 w-6 ${stat.colour}`} />
          </div>
          <div className="text-3xl font-bold text-whitesmoke mb-2 inline-flex items-center gap-1 font-mono">
            <SlidingNumber value={parseFloat(stat.value.match(/\d+(\.\d+)?/)?.[0] || '0')} /> kWh
          </div>
          <p className={`text-sm ${stat.positive ? 'text-positive' : 'text-negative'}`}>
            {stat.change} from last month
          </p>
        </Card>
      ))}
    </>
  );
}
