
import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Zap } from "lucide-react";

export function PowerSummary() {
  const stats = [
    {
      title: "Total Power Generated",
      value: "450 kWh",
      change: "+12.3%",
      icon: Zap,
      positive: true,
    },
    {
      title: "Power Sent",
      value: "320 kWh",
      change: "+8.1%",
      icon: ArrowUpRight,
      positive: true,
    },
    {
      title: "Power Received",
      value: "130 kWh",
      change: "-5.4%",
      icon: ArrowDownRight,
      positive: false,
    },
  ];

  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title} className="glass-panel hover-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-whitesmoke">{stat.title}</h3>
            <stat.icon className="h-6 w-6 text-primary" />
          </div>
          <p className="text-3xl font-bold text-whitesmoke mb-2">{stat.value}</p>
          <p className={`text-sm ${stat.positive ? "text-positive" : "text-negative"}`}>
            {stat.change} from last month
          </p>
        </Card>
      ))}
    </>
  );
}
