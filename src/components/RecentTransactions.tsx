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
import { getSwaps } from "@/utils/wattswap/viewFunctions";
import { createSurfClient } from "@thalalabs/surf";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Aptos, Network, AptosConfig } from "@aptos-labs/ts-sdk";
import { NETWORK } from "@/constants";

function formatTimestamp(timestamp: string): string {
  const date = new Date(parseInt(timestamp) * 1000);
  return date.toLocaleDateString();
}

function truncateAddress(address: string): string {
  if (!address) return "";
  return address.substring(0, 6) + "..." + address.substring(address.length - 4);
}

export function RecentTransactions() {
  console.log("RecentTransactions component rendered");
  const [filter, setFilter] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { account } = useWallet();

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        if (account && account.address) {
          const aptosClient = new Aptos(new AptosConfig({
            network: NETWORK as Network,
          }));
          const surfClient = createSurfClient(aptosClient);
          const swaps = await getSwaps(surfClient, account.address.toString());
          console.log("Swaps data:", swaps);
          setTransactions(swaps);
        } else {
          console.warn("Wallet not connected or address not found.");
        }
      } catch (error) {
        console.error("Error fetching transactions from getSwaps:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [account?.address]);

  const filteredTransactions = (transactions || []).filter((tx) =>
    Object.values(tx || {}).some((value) =>
      value.toString().toLowerCase().includes(filter.toLowerCase())
    )
  );

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
      {loading ? (
        <div>Loading transactions...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Counterparty</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((tx, index) => {
              const isBuyer = tx.buyers?.includes(account?.address?.toString());
              const isSeller = tx.seller === account?.address?.toString();
              const type = isBuyer ? "Buy" : "Sell";
              const counterparty = isSeller ? truncateAddress(tx.buyers?.[0] || "") : truncateAddress(tx.seller);
              const status = tx.is_active ? "Active" : "Inactive";
              const totalAmount = (parseFloat(tx.watt_amount) * parseFloat(tx.apt_price_per_watt)).toFixed(2);

              return (
                <TableRow key={index}>
                  <TableCell className={type === "Sell" ? "text-negative" : "text-positive"}>
                    {type}
                  </TableCell>
                  <TableCell>{totalAmount}</TableCell>
                  <TableCell>{counterparty}</TableCell>
                  <TableCell>{status}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
