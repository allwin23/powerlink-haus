
import { PowerTransferForm } from "@/components/PowerTransferForm";

export default function Send() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-whitesmoke mb-8">Create Listing</h1>
      <PowerTransferForm type="send" />
    </div>
  );
}
