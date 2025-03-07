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
import { useState, useEffect } from "react";
import Identicon from 'react-identicons';

export function RecentTransactions() {
  const [transactions, setTransactions] = useState<Array<{
    amount: string;
    status: string;
    sender: string;
    receiver: string;
  }> | null>(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem('cachedTransactions');
    
    if (!storedData) {
      // Generate initial random values with full addresses
      const initialTransactions = Array.from({ length: 3 }).map(() => {
        const amount = (0.000014 + (Math.random() * 0.000003 - 0.0000015))
          .toFixed(7)
          .replace(/\.?0+$/, '');

        return {
          status: 'Success',
          sender: '0x2804c8ea1234567890abcdef', // Full sender address
          receiver: '0x885e174f4abcd12345abcdef', // Full receiver address
          amount: `${amount} APT`
        };
      });

      localStorage.setItem('cachedTransactions', JSON.stringify(initialTransactions));
      setTransactions(initialTransactions);
    } else {
      setTransactions(JSON.parse(storedData));
    }
  }, []);

  function truncateAddress(address: string): string {
    if (!address) return "";
    return address.substring(0, 6) + "…" + address.substring(address.length - 4);
  }

  if (!transactions) {
    return (
      <Card className="glass-panel p-6">
        <div className="text-center py-4">Loading transactions...</div>
      </Card>
    );
  }

  return (
    <Card className="glass-panel p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-whitesmoke">Recent Activity</h2>
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
            <TableHead>Status</TableHead>
            <TableHead>Sender</TableHead>
            <TableHead>Receiver</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx, index) => (
            <TableRow key={index}>
              <TableCell>
                <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded">
                  {tx.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Identicon 
                    address={tx.sender} 
                    size={24}
                    className="rounded-full"
                  />
                  <span>{truncateAddress(tx.sender)}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Identicon 
                    address={tx.receiver} 
                    size={24}
                    className="rounded-full"
                  />
                  <span>{truncateAddress(tx.receiver)}</span>
                </div>
              </TableCell>
              <TableCell className="font-mono">
                {tx.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}