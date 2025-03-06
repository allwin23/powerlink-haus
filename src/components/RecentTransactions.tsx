
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function RecentTransactions() {
  const [filter, setFilter] = useState("");
  
  const transactions = [
    {
      id: "1",
      type: "Send",
      amount: "45 kWh",
      recipient: "0x1234...5678",
      date: "2024-02-20",
      status: "Completed",
    },
    {
      id: "2",
      type: "Receive",
      amount: "30 kWh",
      recipient: "0x8765...4321",
      date: "2024-02-19",
      status: "Pending",
    },
  ];

  const filteredTransactions = transactions.filter((tx) =>
    Object.values(tx).some((value) =>
      value.toString().toLowerCase().includes(filter.toLowerCase())
    )
  );

  return (
    <Card className="glass-panel p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-whitesmoke">Recent Transactions</h2>
        <Input
          placeholder="Filter transactions..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-xs bg-background/50"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Recipient</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell className={tx.type === "Send" ? "text-negative" : "text-positive"}>
                {tx.type}
              </TableCell>
              <TableCell>{tx.amount}</TableCell>
              <TableCell>{tx.recipient}</TableCell>
              <TableCell>{tx.date}</TableCell>
              <TableCell>{tx.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
