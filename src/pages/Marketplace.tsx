
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

export default function Marketplace() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-whitesmoke mb-8">Marketplace</h1>
      <AnimatedGroup
        className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'
        preset='scale'
      >
        {listings.map((listing, index) => (
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
                    <input
                      type="number"
                      min={listing.minPurchase}
                      max={listing.maxPurchase}
                      placeholder={`Enter kWh (min: ${listing.minPurchase}, max: ${listing.maxPurchase})`}
                      className='mt-2 w-full rounded-md border border-zinc-300 px-3 py-2 text-black dark:bg-raisin-black dark:text-whitesmoke dark:border-zinc-500'
                    />
                    <button className='mt-4 w-full rounded-md bg-amber-yellow px-4 py-2 text-raisin-black font-bold'>
                      Buy
                    </button>
                  </MorphingDialogDescription>
                </div>
                <MorphingDialogClose className='text-zinc-50' />
              </MorphingDialogContent>
            </MorphingDialogContainer>
          </MorphingDialog>
        ))}
      </AnimatedGroup>
    </div>
  );
}
