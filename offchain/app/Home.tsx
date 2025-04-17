"use client";

import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Lucid } from "@lucid-evolution/lucid";

import { useWallet } from "@/components/contexts/wallet/WalletContext";
import { network, provider } from "@/config/lucid";
import { handleError } from "@/components/utils";
import WalletConnectors from "@/components/pages/home/WalletConnectors";
import ConnectedDashboard from "@/components/pages/home/ConnectedDashboard";
import DisconnectButton from "@/components/pages/DisconnectButton";
import { HeroImage } from "@/components/pages/home/HeroImage";
import { FeaturedCategories } from "@/components/pages/home/FeaturedCategories";
import { FeaturedProperties } from "@/components/pages/home/FeaturedProperties";
import { HowItWorks } from "@/components/pages/home/HowItWorks";
import { BuyOrSell } from "@/components/pages/home/BuyOrSell";
import { CTABanner } from "@/components/pages/home/CTABanner";

export default function Home() {
  const [walletConnection, setWalletConnection] = useWallet();
  const { address } = walletConnection;

  let isInit = false;

  useEffect(() => {
    if (isInit) return;
    else isInit = true;

    Lucid(provider, network)
      .then(lucid => {
        setWalletConnection(walletConnection => {
          return { ...walletConnection, lucid };
        });
      })
      .catch(handleError);
  }, []);

  if (address)
    return (
      <section className="relative flex flex-col items-center justify-center gap-4">
        <ConnectedDashboard />
        {/* <DisconnectButton /> */}
        <ToastContainer
          position="bottom-right"
          theme="dark"
        />
      </section>
    );

  return (
    <div className="flex flex-col gap-8">
      <HeroImage />
      <FeaturedCategories />
      <FeaturedProperties />
      <HowItWorks />
      <BuyOrSell />
      <CTABanner />
    </div>
  );
}
