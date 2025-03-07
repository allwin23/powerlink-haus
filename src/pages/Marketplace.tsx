
import { PowerTransferForm } from "@/components/PowerTransferForm";

export default function Receive() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-whitesmoke mb-8">Receive Power</h1>
      <PowerTransferForm type="receive" />
    </div>
  );
}
