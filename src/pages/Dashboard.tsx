
import { Card } from "@/components/ui/card";
import { PowerSummary } from "@/components/PowerSummary";
import { RecentTransactions } from "@/components/RecentTransactions";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-4xl font-bold text-whitesmoke mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PowerSummary />
      </div>
      <RecentTransactions />
    </div>
  );
}
