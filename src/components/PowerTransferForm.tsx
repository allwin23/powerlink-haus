import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react"; // Import useWallet
import { toast } from "sonner"; // Import toast

// Define the type and key again here, ideally move to shared files (e.g., src/types.ts, src/constants.ts)
interface EnergyListing {
  seller: string;
  amount: number;
  price: number;
  minPurchase: number;
  maxPurchase: number;
  user_made?: boolean;
}
// Use the same key as Marketplace.tsx for user listings
const USER_LISTINGS_KEY = 'userEnergyListings';


interface PowerTransferFormProps {
  type: "send" | "receive";
}

export function PowerTransferForm({ type }: PowerTransferFormProps) {
  const { account, connected } = useWallet(); // Get account and connection status
  const currentUserAddress = account?.address?.toString();

  // --- Form State ---
  // Note: 'amount' seems unused for listing creation based on Marketplace.tsx, keeping it for now
  const [amount, setAmount] = useState(""); // This might be 'Total kWh Available' now? Renaming for clarity.
  // const [address, setAddress] = useState(""); // 'address' field seems irrelevant for creating a listing (seller is the user)
  const [totalKwh, setTotalKwh] = useState(""); // Renamed from 'amount' for clarity if it represents total available
  const [pricePerKwh, setPricePerKwh] = useState("");
  const [minKwh, setMinKwh] = useState("");
  const [maxKwh, setMaxKwh] = useState("");
  // Optional fields, keeping them but they aren't part of EnergyListing
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [powerFactor, setPowerFactor] = useState("0");

  // Dynamically calculate power factor (Keep if needed for other purposes)
  useEffect(() => {
    if (voltage && current && totalKwh) { // Ensure totalKwh is also present
      const calculatedPF = (parseFloat(totalKwh) / (parseFloat(voltage) * parseFloat(current))).toFixed(2);
      setPowerFactor(isNaN(parseFloat(calculatedPF)) ? "0" : calculatedPF);
    } else {
      setPowerFactor("0");
    }
  }, [voltage, current, totalKwh]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Only handle listing creation ("send" type)
    if (type !== "send") {
      console.log("Form type is not 'send', skipping listing creation.");
      // Handle 'receive' logic if needed elsewhere
      return;
    }

    if (!connected || !currentUserAddress) {
      toast.error("Please connect your wallet first.");
      return;
    }

    // --- Create and Save Listing ---
    try {
      // 1. Create the new listing object
      const newListing: EnergyListing = {
        seller: currentUserAddress,
        amount: parseFloat(totalKwh) || 0, // Use totalKwh for amount
        price: parseFloat(pricePerKwh) || 0,
        minPurchase: parseFloat(minKwh) || 0,
        maxPurchase: parseFloat(maxKwh) || 0,
        user_made: true, // Mark as user-made
      };

      // Basic validation (add more as needed)
      if (newListing.amount <= 0 || newListing.price <= 0 || newListing.minPurchase < 0 || newListing.maxPurchase < newListing.minPurchase || newListing.maxPurchase > newListing.amount) {
         toast.error("Please enter valid listing details (Amount > 0, Price > 0, Max >= Min, Max <= Amount).");
         return;
      }


      // 2. Get existing USER listings from localStorage
      const storedUserListings = localStorage.getItem(USER_LISTINGS_KEY); // Use correct key
      let existingUserListings: EnergyListing[] = [];
      if (storedUserListings) {
        try {
          const parsed = JSON.parse(storedUserListings);
          if (Array.isArray(parsed)) {
             // Basic validation
             existingUserListings = parsed.filter(item => typeof item === 'object' && item !== null && item.seller);
          } else {
             console.warn("Invalid data found in localStorage for user listings, resetting.");
             localStorage.removeItem(USER_LISTINGS_KEY); // Clear invalid data using correct key
          }
        } catch (parseError) {
          console.error("Failed to parse existing user listings, resetting.", parseError);
          localStorage.removeItem(USER_LISTINGS_KEY); // Clear corrupted data using correct key
        }
      }

      // 3. Add the new listing to the USER listings
      const updatedUserListings = [...existingUserListings, newListing];

      // 4. Save the updated USER listings back to localStorage
      localStorage.setItem(USER_LISTINGS_KEY, JSON.stringify(updatedUserListings)); // Use correct key
      console.log("New user listing added:", newListing);
      console.log("Updated user listings stored:", updatedUserListings);
      toast.success("Listing created successfully!");

      // 5. Clear relevant input fields
      // setAmount(""); // Clear if it was used
      setTotalKwh("");
      setPricePerKwh("");
      setMinKwh("");
      setMaxKwh("");
      // Clear optional fields too if desired
      setVoltage("");
      setCurrent("");
      setPowerFactor("0"); // Reset calculated field

    } catch (error) {
       console.error("Error creating listing:", error);
       toast.error("Failed to create listing. See console for details.");
    }
  };


  // Only render the form if type is "send" or adjust fields based on type
  if (type !== "send") {
     // Optionally render a different form or message for "receive"
     return <p>Receive functionality not implemented in this form.</p>;
  }

  return (
    <Card className="glass-panel max-w-lg mx-auto p-8">
      {/* Removed the DC-DC label, add back if needed */}
      <form onSubmit={handleSubmit} className="space-y-4">
         {/* Removed 'Amount (kWh)' and 'Recipient Address' fields as they seem irrelevant for listing creation */}
        <div>
          <label className="text-sm font-medium text-whitesmoke">Total kWh Available</label>
          <Input required type="number" step="any" min="0.01" value={totalKwh} onChange={(e) => setTotalKwh(e.target.value)} placeholder="e.g., 150" className="bg-raisin-black border-stone-700 text-whitesmoke" />
        </div>
        <div>
          <label className="text-sm font-medium text-whitesmoke">Price Per kWh (APT)</label>
          <Input required type="number" step="any" min="0.000001" value={pricePerKwh} onChange={(e) => setPricePerKwh(e.target.value)} placeholder="e.g., 0.5" className="bg-raisin-black border-stone-700 text-whitesmoke" />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-whitesmoke">Min Purchase (kWh)</label>
            <Input required type="number" step="any" min="0.01" value={minKwh} onChange={(e) => setMinKwh(e.target.value)} placeholder="e.g., 1" className="bg-raisin-black border-stone-700 text-whitesmoke" />
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium text-whitesmoke">Max Purchase (kWh)</label>
            <Input required type="number" step="any" min="0.01" value={maxKwh} onChange={(e) => setMaxKwh(e.target.value)} placeholder="e.g., 100" className="bg-raisin-black border-stone-700 text-whitesmoke" />
          </div>
        </div>
         {/* Keep optional fields if they are needed for display or other logic, otherwise remove */}
        <div>
           <label className="text-sm font-medium text-whitesmoke">Rated Voltage (V) <span className="text-xs text-stone-400">(Optional)</span></label>
           <Input type="number" value={voltage} onChange={(e) => setVoltage(e.target.value)} placeholder="Enter voltage" className="bg-raisin-black border-stone-700 text-whitesmoke" />
        </div>
        <div>
           <label className="text-sm font-medium text-whitesmoke">Rated Current (A) <span className="text-xs text-stone-400">(Optional)</span></label>
           <Input type="number" value={current} onChange={(e) => setCurrent(e.target.value)} placeholder="Enter current" className="bg-raisin-black border-stone-700 text-whitesmoke" />
        </div>
        <div>
           <label className="text-sm font-medium text-whitesmoke">Power Factor <span className="text-xs text-stone-400">(Calculated)</span></label>
           <Input type="text" value={powerFactor} readOnly placeholder="Power factor" className="bg-raisin-black border-stone-700 text-whitesmoke" />
        </div>
        <Button type="submit" className="w-full bg-amber-yellow text-raisin-black hover:bg-amber-yellow/90 font-bold">
          Create Listing
        </Button>
      </form>
    </Card>
  );
}
