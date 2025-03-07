import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";

interface PowerTransferFormProps {
  type: "send" | "receive";
}

export function PowerTransferForm({ type }: PowerTransferFormProps) {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [totalKwh, setTotalKwh] = useState("");
  const [pricePerKwh, setPricePerKwh] = useState("");
  const [minKwh, setMinKwh] = useState("");
  const [maxKwh, setMaxKwh] = useState("");
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [powerFactor, setPowerFactor] = useState("0");

  // Dynamically calculate power factor whenever voltage or current changes
  useEffect(() => {
    if (voltage && current) {
      const calculatedPF = (parseFloat(totalKwh) / (parseFloat(voltage) * parseFloat(current))).toFixed(2);
      setPowerFactor(isNaN(parseFloat(calculatedPF)) ? "0" : calculatedPF);
    } else {
      setPowerFactor("0");
    }
  }, [voltage, current, totalKwh]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const transferData = {
      type,
      amount,
      address,
      totalKwh,
      pricePerKwh,
      minKwh,
      maxKwh,
      voltage,
      current,
      powerFactor,
    };

    // Store data in localStorage
    localStorage.setItem("powerTransfer", JSON.stringify(transferData));
    console.log("Data stored:", transferData);

    // Clear all input fields
    setAmount("");
    setAddress("");
    setTotalKwh("");
    setPricePerKwh("");
    setMinKwh("");
    setMaxKwh("");
    setVoltage("");
    setCurrent("");
    setPowerFactor("");
  };

  return (
    <Card className="glass-panel max-w-lg mx-auto p-8">
      <div className="flex justify-end px-2 font-bold">DC-DC(solar)</div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Amount (kWh)</label>
          <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" />
        </div>
        <div>
          <label className="text-sm font-medium">{type === "send" ? "Recipient" : "Sender"} Address</label>
          <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter wallet address" />
        </div>
        <div>
          <label className="text-sm font-medium">Total kWh Available</label>
          <Input type="number" value={totalKwh} onChange={(e) => setTotalKwh(e.target.value)} placeholder="Enter total kWh" />
        </div>
        <div>
          <label className="text-sm font-medium">Price Per kWh</label>
          <Input type="number" value={pricePerKwh} onChange={(e) => setPricePerKwh(e.target.value)} placeholder="Enter price per kWh" />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="text-sm font-medium">Min kWh</label>
            <Input type="number" value={minKwh} onChange={(e) => setMinKwh(e.target.value)} placeholder="Min kWh" />
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium">Max kWh</label>
            <Input type="number" value={maxKwh} onChange={(e) => setMaxKwh(e.target.value)} placeholder="Max kWh" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Rated Voltage (V)</label>
          <Input type="number" value={voltage} onChange={(e) => setVoltage(e.target.value)} placeholder="Enter voltage" />
        </div>
        <div>
          <label className="text-sm font-medium">Rated Current (A)</label>
          <Input type="number" value={current} onChange={(e) => setCurrent(e.target.value)} placeholder="Enter current" />
        </div>
        <div>
          <label className="text-sm font-medium">Power Factor</label>
          <Input type="text" value={powerFactor} onChange={(e) => setPowerFactor(e.target.value)} placeholder="Power factor" />
        </div>
        <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90">
          {type === "send" ? "Create Listing" : "Request Power"}
        </Button>
      </form>
    </Card>
  );
}
