import { WalletSelector } from "./WalletSelector";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export function Header() {
  const { connected } = useWallet();
  return (
    <div className="flex items-center justify-between px-4 py-2 max-w-screen-xl mx-auto w-full flex-wrap">
      {connected && (
        <h1 className="display">
          Connected to:{" "}
          <span className="text-blue-500 animate-fadeIn">
            Schneider Electric South Indian Microgrid
          </span>
        </h1>
      )}

      <div className="flex gap-2 items-center flex-wrap">
        <WalletSelector />
      </div>
    </div>
  );
}
