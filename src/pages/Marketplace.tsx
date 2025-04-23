import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useWallet } from "@aptos-labs/wallet-adapter-react"; // Import useWallet
import { MorphingDialog, MorphingDialogTrigger, MorphingDialogContent, MorphingDialogTitle, MorphingDialogSubtitle, MorphingDialogClose, MorphingDialogDescription, MorphingDialogContainer } from "../components/ui/MorphingDialog";
import { AnimatedGroup } from "../components/ui/AnimatedGroup";
import { Spotlight } from "../components/core/Spotlight";
import { Badge } from "@/components/ui/badge"; // Import Badge for UI indication

interface EnergyListing {
  seller: string; // Hexadecimal Aptos address
  amount: number; // Total kWh available
  price: number; // Price in APT
  minPurchase: number; // Minimum kWh a user can buy
  maxPurchase: number; // Maximum kWh a user can buy
  user_made?: boolean; // Optional flag for user-created listings
}

// Key specifically for user-created listings
const USER_LISTINGS_KEY = 'userEnergyListings';

// Define the original default listings (these will always be shown)
const defaultListings: EnergyListing[] = [
  { seller: "0x1a2b3c...", amount: 100, price: 1, minPurchase: 2, maxPurchase: 90 }, // Changed placeholder address
  { seller: "0x4d5e6f...", amount: 150, price: 2, minPurchase: 10, maxPurchase: 140 }, // Changed placeholder address
  { seller: "0x7g8h9i...", amount: 50, price: 3, minPurchase: 1, maxPurchase: 40 }, // Changed placeholder address
];


// Helper function for delays - Keep this if simulation is still needed
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
  currentUserAddress?: string; // Add current user address prop
}

function ListingItem({ listing, index, currentUserAddress }: ListingItemProps) {
  const [purchaseAmount, setPurchaseAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAmountChange = (value: string) => {
    setPurchaseAmount(value);
  };

  const handleBuyClick = async () => {
    if (isProcessing) return;

    // --- Self-purchase check ---
    if (currentUserAddress && listing.seller === currentUserAddress) {
      console.log("buyer trying to buy from themselves, aborting");
      toast.warning("You cannot buy your own listing.");
      return; // Abort the purchase
    }
    // --- End self-purchase check ---

    setIsProcessing(true);
    console.log(`Attempting to buy ${purchaseAmount} kWh from ${listing.seller}`);
    // TODO: Add actual transaction logic here BEFORE simulation

    try {
      // Simulate the backend flow based on the listing index
      // Note: The simulation logic might need adjustment if it relies on the hardcoded index
      const success = await simulateTransactionFlow(index, listing.seller, purchaseAmount);

      if (success) {
        toast.success("Transaction successful!");
        // TODO: Potentially update the listing amount in localStorage after successful purchase
      } else {
        toast.error("Transaction failed. Funds returned.");
      }
    } catch (error) {
      console.error("Simulation error:", error);
      toast.error("An unexpected error occurred during simulation.");
    } finally {
      setPurchaseAmount('');
      setIsProcessing(false);
    }
  };

  const isBuyDisabled =
    isProcessing ||
    !purchaseAmount ||
    isNaN(Number(purchaseAmount)) ||
    Number(purchaseAmount) < listing.minPurchase ||
    Number(purchaseAmount) > listing.maxPurchase ||
    (currentUserAddress && listing.seller === currentUserAddress); // Also disable if it's the user's own listing

  return (
    <MorphingDialog key={listing.seller + index}> {/* Use a more unique key */}
      <MorphingDialogTrigger
        className='relative flex flex-col overflow-hidden rounded-md border border-solid border-amber-yellow bg-raisin-black aspect-square group' // Added group for hover effects if needed
      >
        {listing.user_made && ( // --- User-made indicator ---
          <Badge variant="secondary" className="absolute top-1 right-1 z-10 bg-green-600 text-white">
            Your Listing
          </Badge>
        )}
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
              Seller: {listing.seller} {listing.user_made && "(You)"} {/* Indicate seller */}
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
                    {listing.seller === currentUserAddress ? "Your Listing" : "Buy"} {/* Change button text */}
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
  const [listings, setListings] = useState<EnergyListing[]>([]);
  const { account } = useWallet(); // Get account info
  const currentUserAddress = account?.address?.toString(); // Extract address as string

  // --- Function to load user listings, combine with defaults, and set state ---
  const loadAndSetCombinedListings = () => {
    console.log("Reloading and combining listings..."); // Add log for debugging
    let userListings: EnergyListing[] = [];
    const storedUserListings = localStorage.getItem(USER_LISTINGS_KEY);

    if (storedUserListings) {
      try {
        const parsedUserListings = JSON.parse(storedUserListings);
        if (Array.isArray(parsedUserListings)) {
          userListings = parsedUserListings.filter(item => typeof item === 'object' && item !== null && item.seller);
        } else {
          console.warn("Stored user listings data is not an array:", parsedUserListings);
          localStorage.removeItem(USER_LISTINGS_KEY);
        }
      } catch (error) {
        console.error("Failed to parse user listings from localStorage:", error);
        localStorage.removeItem(USER_LISTINGS_KEY);
      }
    }

    // Combine defaults and valid user listings
    const combinedListings = [...defaultListings, ...userListings];
    console.log("Combined listings:", combinedListings); // Add log for debugging
    setListings(combinedListings);
  };

  // --- Effect for Initial Load ---
  useEffect(() => {
    loadAndSetCombinedListings();
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- Effect for Storage Event Listener ---
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      // Only react to changes for the user listings key
      if (event.key === USER_LISTINGS_KEY) {
        console.log("Storage event detected for user listings."); // Add log
        loadAndSetCombinedListings(); // Reload and recombine using the dedicated function
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Dependency array is empty as the function reference is stable


  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-whitesmoke mb-8">Marketplace</h1>
      {listings.length === 0 ? ( // Should not happen now with defaults, but keep check
         <p className="text-whitesmoke text-center">Loading listings...</p>
      ) : (
        <AnimatedGroup
          className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'
          preset='scale'
        >
          {listings.map((listing, index) => (
            <ListingItem
              // Using a combination of seller and amount for potentially better key uniqueness
              key={`${listing.seller}-${listing.amount}-${index}`}
              listing={listing}
              index={index} // Note: index might not be reliable for simulation if list combines sources
              currentUserAddress={currentUserAddress} // Pass the address
            />
          ))}
        </AnimatedGroup>
      )}
    </div>
  );
}
