import { useState } from "react";
import { toast } from "sonner";
import { MorphingDialog, MorphingDialogTrigger, MorphingDialogContent, MorphingDialogTitle, MorphingDialogSubtitle, MorphingDialogClose, MorphingDialogDescription, MorphingDialogContainer } from "../components/ui/MorphingDialog";
import { AnimatedGroup } from "../components/ui/AnimatedGroup";
import { Spotlight } from "../components/core/Spotlight";

interface EnergyListing {
  seller: string; // Hexadecimal Aptos address
  amount: number; // Total kWh available
  price: number; // Price in APT
  minPurchase: number; // Minimum kWh a user can buy
  maxPurchase: number; // Maximum kWh a user can buy
}

const listings: EnergyListing[] = [
  { seller: "0x885e106...", amount: 100, price: 1, minPurchase: 2, maxPurchase: 90 },
  { seller: "0x885e106...", amount: 150, price: 2, minPurchase: 10, maxPurchase: 140 },
  { seller: "0x885e106...", amount: 50, price: 3, minPurchase: 1, maxPurchase: 40 },
];

// Helper function for delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulation function
async function simulateTransactionFlow(listingIndex: number, sellerAddress: string, amount: string) {
  console.log("----------------------------------------");
  console.log(`Initiating purchase of ${amount} kWh from ${sellerAddress} (Listing ${listingIndex + 1})`);
  console.log("1. Order received on orderbook");
  await delay(1000);
  console.log("2. Verifying sender...");
  await delay(1500);
  console.log("3. Sender verified");
  await delay(500);
  console.log("4. Sending transfer request to grid controller...");
  await delay(2000);
  console.log("5. Funds placed in escrow");
  await delay(1000);

  if (listingIndex === 0) { // Success Scenario (First Listing)
    console.log("6. Power transfer started");
    await delay(5500); // Increased delay for power transfer simulation
    console.log("7. Pinging receiver smart meter for confirmation...");
    await delay(1500);
    console.log("8. Power transfer complete");
    await delay(500);
    console.log("9. Pinging grid controller to terminate transfer...");
    await delay(1000);
    console.log("10. Releasing escrowed funds to seller");
    await delay(500);
    console.log("✅ Transaction Complete");
    console.log("----------------------------------------");
    return true; // Indicate success
  } else if (listingIndex === 1) { // Failure Scenario (Second Listing - Bad Actor)
    console.log("6. Power transfer started (Attempting...)");
    await delay(2500);
    console.log("7. Pinging receiver smart meter for confirmation...");
    await delay(1500);
    console.error("❌ ERROR: Receiver smart meter unresponsive or validation failed!");
    await delay(500);
    console.log("8. Power transfer failed");
    await delay(500);
    console.log("9. Notifying grid controller of failure...");
    await delay(1000);
    console.log("10. Releasing escrowed funds back to buyer");
    await delay(200);
    console.log("Transaction Failed - Funds Returned");
    console.log("----------------------------------------");
    return false; // Indicate failure
  } else {
    // Default success for other listings for now
    console.log("6. Power transfer started");
    await delay(1000);
    console.log("8. Power transfer complete");
    await delay(500);
    console.log("10. Releasing escrowed funds to seller");
    await delay(500);
    console.log("✅ Transaction Complete");
    console.log("----------------------------------------");
    return true; // Indicate success
  }
}


// New ListingItem component
interface ListingItemProps {
  listing: EnergyListing;
  index: number;
}

function ListingItem({ listing, index }: ListingItemProps) {
  const [purchaseAmount, setPurchaseAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false); // Add processing state

  const handleAmountChange = (value: string) => {
    setPurchaseAmount(value);
  };

  const handleBuyClick = async () => { // Make async
    if (isProcessing) return; // Prevent double clicks

    setIsProcessing(true); // Set processing state
    console.log(`Attempting to buy ${purchaseAmount} kWh from ${listing.seller}`);
    // TODO: Add actual transaction logic here BEFORE simulation

    try {
      // Simulate the backend flow based on the listing index
      const success = await simulateTransactionFlow(index, listing.seller, purchaseAmount);

      if (success) {
        toast.success("Transaction successful!");
      } else {
        toast.error("Transaction failed. Funds returned.");
      }
    } catch (error) {
      console.error("Simulation error:", error);
      toast.error("An unexpected error occurred during simulation.");
    } finally {
      // Clear the input and reset processing state regardless of outcome
      setPurchaseAmount('');
      setIsProcessing(false);
      // Dialog should close automatically on click outside or via close button (if applicable)
    }
  };

  const isBuyDisabled =
    isProcessing || // Disable button while processing
    !purchaseAmount ||
    isNaN(Number(purchaseAmount)) ||
    Number(purchaseAmount) < listing.minPurchase ||
    Number(purchaseAmount) > listing.maxPurchase;

  return (
    <MorphingDialog key={index}>
      <MorphingDialogTrigger
        className='relative flex flex-col overflow-hidden rounded-md border border-solid border-amber-yellow bg-raisin-black aspect-square'
      >
        <Spotlight className='bg-amber-yellow' size={150} />
        <div className='flex grow flex-col items-center justify-center p-3 text-center'>
          <div>
            <MorphingDialogTitle className='text-whitesmoke text-lg'>
              {listing.amount} kWh
            </MorphingDialogTitle>
            <MorphingDialogSubtitle className='text-whitesmoke text-base'>
              {listing.price} APT
            </MorphingDialogSubtitle>
          </div>
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent
          className='pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 sm:w-[500px]'
        >
          <div className='p-6'>
            <MorphingDialogTitle className='text-2xl text-zinc-950 dark:text-zinc-50'>
              {listing.seller}
            </MorphingDialogTitle>
            <MorphingDialogSubtitle className='text-zinc-700 dark:text-zinc-400'>
              Total Available: {listing.amount} kWh
            </MorphingDialogSubtitle>
            <MorphingDialogDescription>
              <p className='mt-2 text-zinc-500 dark:text-zinc-500'>
                Price per kWh: {listing.price} APT
              </p>
              <p className='text-zinc-500 dark:text-zinc-500'>
                Minimum Purchase: {listing.minPurchase} kWh
              </p>
              <p className='text-zinc-500 dark:text-zinc-500'>
                Maximum Purchase: {listing.maxPurchase} kWh
              </p>
              {isProcessing ? (
                <div className="mt-4 flex flex-col items-center justify-center h-24">
                  {/* You could add a spinner component here */}
                  <p className="text-zinc-600 dark:text-zinc-400 animate-pulse">
                    Processing transaction...
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">
                    Please check the console for details.
                  </p>
                </div>
              ) : (
                <>
                  <input
                    type="number"
                    min={listing.minPurchase}
                    max={listing.maxPurchase}
                    value={purchaseAmount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    placeholder={`Enter kWh (min: ${listing.minPurchase}, max: ${listing.maxPurchase})`}
                    className='mt-2 w-full rounded-md border border-zinc-300 px-3 py-2 text-black dark:bg-raisin-black dark:text-whitesmoke dark:border-zinc-500'
                  />
                  <button
                    onClick={handleBuyClick}
                    className='mt-4 w-full rounded-md bg-amber-yellow px-4 py-2 text-raisin-black font-bold disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled={isBuyDisabled}
                  >
                    Buy
                  </button>
                </>
              )}
            </MorphingDialogDescription>
          </div>
          <MorphingDialogClose className='text-zinc-50' />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}


export default function Marketplace() {
  // Removed purchaseAmounts state and handlers

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-whitesmoke mb-8">Marketplace</h1>
      <AnimatedGroup
        className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'
        preset='scale'
      >
        {listings.map((listing, index) => (
          // Use the new ListingItem component
          <ListingItem key={index} listing={listing} index={index} />
        ))}
      </AnimatedGroup>
    </div>
  );
}
