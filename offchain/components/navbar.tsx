"use client";

import { Button } from "@heroui/button";

// Local imports
import { siteConfig } from "@/config/site";
import PropstakeLogo from "./PropstakeLogo";
import { NavItem } from "./nav-item";
import WalletConnectors from "@/components/pages/home/WalletConnectors";
import { useWallet } from "./contexts/wallet/WalletContext";
import { useEffect } from "react";
import { Lucid } from "@lucid-evolution/lucid";
import DisconnectButton from "./pages/DisconnectButton";
import { network, provider } from "@/config/lucid";
import { handleError } from "@/components/utils";

export const Navbar = () => {
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

  return (
    <header className="sticky top-0 z-50 bg-[#090021]/80 p-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        {/* Propstake logo */}
        <PropstakeLogo />

        {/* Nav items */}
        <nav className="hidden space-x-8 text-sm text-slate-300 md:flex">
          {siteConfig.navItems.map((item, index) => (
            <NavItem
              key={index}
              label={item.label}
              href={item.href}
            />
          ))}
        </nav>

        {address ? <DisconnectButton /> : <WalletConnectors />}
      </div>
    </header>
  );
};
