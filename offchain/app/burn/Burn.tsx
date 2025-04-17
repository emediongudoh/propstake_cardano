import { redirect } from "next/navigation";
import { Link } from "@heroui/link";
import { ToastContainer } from "react-toastify";

import { useWallet } from "@/components/contexts/wallet/WalletContext";
import { title } from "@/components/primitives";
import TokenBurner from "@/components/pages/burn/TokenBurner";
import DisconnectButton from "@/components/pages/DisconnectButton";

import "react-toastify/dist/ReactToastify.css";

export default function Burn() {
  const [{ address }] = useWallet();

  if (!address) return redirect("/");

  return (
    <>
      {/* Title */}
      <div className="inline-block max-w-lg justify-center text-center">
        <h1 className={title()}>
          {"CS'25 NFT"}&nbsp;
          <span className={title({ color: "violet" })}>Burner</span>
        </h1>
      </div>

      <div className="mt-4 flex flex-col items-center gap-4">
        <TokenBurner />
        <Link href="/">&laquo; Go Back</Link>
      </div>

      <ToastContainer
        position="bottom-right"
        theme="dark"
      />
      <DisconnectButton />
    </>
  );
}
