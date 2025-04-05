import { redirect } from "next/navigation";
import { Link } from "@heroui/link";
import { ToastContainer } from "react-toastify";

import { useWallet } from "@/components/contexts/wallet/WalletContext";
import { title } from "@/components/primitives";
import TokenUpdater from "@/components/pages/update/TokenUpdater";
import DisconnectButton from "@/components/pages/DisconnectButton";

import "react-toastify/dist/ReactToastify.css";

export default function Update() {
  const [{ address }] = useWallet();

  if (!address) return redirect("/");

  return (
    <>
      {/* Title */}
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>
          {"CS'25 NFT"}&nbsp;
          <span className={title({ color: "violet" })}>Updater</span>
        </h1>
      </div>

      <div className="flex flex-col items-center gap-4 mt-4">
        <TokenUpdater />
        <Link href="/">&laquo; Go Back</Link>
      </div>

      <ToastContainer position="bottom-right" theme="dark" />
      <DisconnectButton />
    </>
  );
}
