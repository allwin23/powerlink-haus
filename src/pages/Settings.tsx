import { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Button } from "@/components/ui/button"
import { truncateAddress } from "@aptos-labs/wallet-adapter-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { WalletSelector } from '@/components/WalletSelector';
import { NETWORK } from "@/constants";

export default function Settings() {
  const { account, connected, disconnect } = useWallet();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

return (
    <div className="space-y-4">
      <div className="p-4">
        <h2 className="text-lg font-medium">Connected Wallet</h2>
        <div className="flex items-center space-x-2">
          {connected ? (
            <>
              <span>{truncateAddress(account?.address.toStringLong())}</span>
              <Button variant="secondary" onClick={() => disconnect()}>Disconnect</Button>
            </>
          ) : (
            <>
              <span>Not Connected</span>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="secondary">Connect a Wallet</Button>
                </DialogTrigger>
                <WalletSelector />
              </Dialog>
            </>

          )}
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-medium">Network</h2>
        <div className="flex items-center space-x-2">
          <Select
            value={NETWORK}
            onValueChange={() => {}}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a network" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="testnet">Testnet</SelectItem>
              <SelectItem value="mainnet">Mainnet</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="p-4">
          <h2 className="text-lg font-medium">Theme</h2>
          <div className="flex items-center space-x-2">
            <Switch
              checked={theme === 'light'}
              onCheckedChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            />
            <span>{theme === 'light' ? 'Light' : 'Dark'}</span>
          </div>
        </div>

      <div className="p-4">
        <h2 className="text-lg font-medium">Notifications</h2>
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={notificationsEnabled}
            onCheckedChange={(checked) => setNotificationsEnabled(checked === true)}
          />
          <span>Enable Notifications</span>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-medium">Language</h2>
        <div className="flex items-center space-x-2">
        <Select
            value={"english"}
            onValueChange={() => {}}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
