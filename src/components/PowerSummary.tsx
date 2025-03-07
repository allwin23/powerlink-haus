import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Zap } from "lucide-react";
import { SlidingNumber } from "@/components/ui/sliding-number";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export function PowerSummary() {
  const { connected } = useWallet();

  const stats = [
    {
      title: "Total Power Generated",
      value: connected ? "450 kWh" : "0 kWh",
      change: connected ? "+12.3%" : "0%",
      icon: Zap,
      colour: "text-primary",
      positive: true,
    },
    {
      title: "Power Sent",
      value: connected ? "320 kWh" : "0 kWh",
      change: connected ? "+8.1%" : "0%",
      icon: ArrowUpRight,
      colour: "text-green-500",
      positive: true,
    },
    {
      title: "Power Received",
      value: connected ? "130 kWh" : "0 kWh",
      change: connected ? "-5.4%" : "0%",
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
            <SlidingNumber value={parseFloat(stat.value.match(/\d+(\.\d+)?/)?.[0] || "0")} /> kWh
          </div>
          <p className={`text-sm ${stat.positive ? "text-positive" : "text-negative"}`}>
            {stat.change} from last month
          </p>
        </Card>
      ))}
    </>
  );
}
