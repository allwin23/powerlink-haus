"use client";

// Internal components
import { useToast } from "@/components/ui/use-toast";
// Internal constants
import { APTOS_API_KEY, NETWORK } from "@/constants";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import type { PropsWithChildren } from "react";

export function WalletProvider({ children }: PropsWithChildren) {
  const { toast } = useToast();

  //console.log("WalletProvider: ", { NETWORK, APTOS_API_KEY });
  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      dappConfig={{ network: NETWORK, aptosApiKeys: {[NETWORK]: APTOS_API_KEY} }}
      // optInWallets={["Continue with Google","Petra","Nightly","Pontem Wallet", "Mizu Wallet"]}
      onError={(error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error || "Unknown wallet error",
        });
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
}
