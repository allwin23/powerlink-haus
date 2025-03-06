
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useState } from "react";

interface PowerTransferFormProps {
  type: "send" | "receive";
}

export function PowerTransferForm({ type }: PowerTransferFormProps) {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle transfer logic here
    console.log("Transfer:", { type, amount, address });
  };

  return (
    <Card className="glass-panel max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-whitesmoke">Amount (kWh)</label>
          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-background/50"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-whitesmoke">
            {type === "send" ? "Recipient" : "Sender"} Address
          </label>
          <Input
            placeholder="Enter wallet address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="bg-background/50"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-primary text-background hover:bg-primary/90"
        >
          {type === "send" ? "Send Power" : "Request Power"}
        </Button>
      </form>
    </Card>
  );
}
