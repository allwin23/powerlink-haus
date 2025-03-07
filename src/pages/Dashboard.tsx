import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { PowerSummary } from "@/components/PowerSummary";
import { RecentTransactions } from "@/components/RecentTransactions";
import { Header } from "@/components/Header";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Zap } from "lucide-react";

export default function Dashboard() {
  const { connected } = useWallet();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (connected) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [connected]);

  return (
    <div className="p-6 space-y-6">
      <Header />
      <h1 className="text-4xl font-bold text-whitesmoke mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PowerSummary />
      </div>

      {connected ? (
        loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <Zap className="h-12 w-12 text-yellow-400 animate-bounce" />
              <p className="text-lg text-yellow-300 font-semibold mt-2">
                Charging up the dashboard...
              </p>
            </div>
          </div>
        ) : (
          <RecentTransactions />
        )
      ) : null}
    </div>
  );
}
