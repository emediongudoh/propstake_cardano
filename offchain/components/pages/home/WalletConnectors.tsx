// import { useEffect, useState } from "react";
// import { paymentCredentialOf, stakeCredentialOf } from "@lucid-evolution/lucid";
// import { Button } from "@heroui/button";
// import { Skeleton } from "@heroui/skeleton";
// import { Snippet } from "@heroui/snippet";
// import { Spinner } from "@heroui/spinner";

// import { useWallet } from "@/components/contexts/wallet/WalletContext";
// import { Wallet } from "@/types/cardano";
// import { handleError } from "@/components/utils";

// export default function WalletConnectors() {
//   const [walletConnection, setWalletConnection] = useWallet();
//   const { lucid } = walletConnection;

//   const [wallets, setWallets] = useState<Wallet[]>();

//   let isInit = false;

//   useEffect(() => {
//     if (isInit) return;
//     else isInit = true;

//     const wallets: Wallet[] = [];

//     const { cardano } = window;

//     for (const c in cardano) {
//       const wallet = cardano[c];

//       if (!wallet.apiVersion) continue; // skip non-wallet objects, if any
//       wallets.push(wallet);
//     }

//     wallets.sort((l, r) => {
//       return l.name.toUpperCase() < r.name.toUpperCase() ? -1 : 1;
//     });
//     setWallets(() => wallets);
//   }, []);

//   async function onConnectWallet(wallet: Wallet) {
//     try {
//       if (!lucid) throw "Uninitialized Lucid!!!";

//       const walletApi = await wallet.enable();

//       lucid.selectWallet.fromAPI(walletApi);

//       const address = await lucid.wallet().address();
//       const pkh = paymentCredentialOf(address).hash;

//       const stakeAddress = (await lucid.wallet().rewardAddress()) ?? "";
//       const skh = stakeAddress ? stakeCredentialOf(stakeAddress).hash : "";

//       setWalletConnection(walletConnection => {
//         return {
//           ...walletConnection,
//           wallet,
//           walletApi,
//           address,
//           pkh,
//           stakeAddress,
//           skh,
//         };
//       });
//     } catch (error) {
//       handleError(error);
//     }
//   }

//   if (!wallets)
//     return (
//       <Snippet
//         hideCopyButton
//         hideSymbol
//         variant="bordered"
//       >
//         <Spinner label="Browsing Cardano Wallets" />
//       </Snippet>
//     );

//   if (!wallets.length)
//     return (
//       <Snippet
//         hideCopyButton
//         hideSymbol
//         variant="bordered"
//       >
//         <p className="uppercase">No Cardano Wallet</p>
//       </Snippet>
//     );

//   return (
//     <div className="flex flex-wrap justify-center gap-4">
//       {wallets.map((wallet, w) => (
//         <Skeleton
//           key={`wallet.${w}`}
//           isLoaded={!!lucid}
//           className="rounded-lg"
//         >
//           <Button
//             type="button"
//             className="site-button"
//             onPress={() => onConnectWallet(wallet)}
//           >
//             {wallet.name}
//           </Button>
//         </Skeleton>
//       ))}
//     </div>
//   );
// }

import { useEffect, useState } from "react";

// Third party imports
import { paymentCredentialOf, stakeCredentialOf } from "@lucid-evolution/lucid";
import { Button } from "@heroui/button";
import { CircleX } from "lucide-react";

// Local imports
import { useWallet } from "@/components/contexts/wallet/WalletContext";
import { Wallet } from "@/types/cardano";
import { handleError } from "@/components/utils";

export default function WalletConnectors() {
  const [walletConnection, setWalletConnection] = useWallet();
  const { lucid } = walletConnection;

  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const cardanoWallets: Wallet[] = [];
    const { cardano } = window;

    for (const key in cardano) {
      const wallet = cardano[key];
      if (!wallet?.apiVersion) continue;
      cardanoWallets.push(wallet);
    }

    cardanoWallets.sort((a, b) => a.name.localeCompare(b.name));
    setWallets(cardanoWallets);
  }, []);

  async function onConnectWallet(wallet: Wallet) {
    try {
      if (!lucid) throw "Lucid not initialized";

      const walletApi = await wallet.enable();
      lucid.selectWallet.fromAPI(walletApi);

      const address = await lucid.wallet().address();
      const pkh = paymentCredentialOf(address).hash;

      const stakeAddress = (await lucid.wallet().rewardAddress()) ?? "";
      const skh = stakeAddress ? stakeCredentialOf(stakeAddress).hash : "";

      setWalletConnection(prev => ({
        ...prev,
        wallet,
        walletApi,
        address,
        pkh,
        stakeAddress,
        skh,
      }));

      setModalOpen(false);
    } catch (err) {
      handleError(err);
    }
  }

  return (
    <>
      {/* Main Button */}
      <Button
        onPress={() => setModalOpen(true)}
        className="site-button"
      >
        Connect Wallet
      </Button>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur">
          <div className="w-full max-w-xs rounded-2xl bg-[#090021]">
            <div className="flex items-center justify-between border-b border-slate-700 p-4">
              <h5>Connect Wallet</h5>{" "}
              <CircleX
                className="size-6 cursor-pointer"
                onClick={() => setModalOpen(false)}
              />
            </div>
            <div className="space-y-4 px-4 py-6">
              {wallets.map((wallet, index) => (
                <Button
                  key={index}
                  className="site-button w-full"
                  onPress={() => onConnectWallet(wallet)}
                >
                  {wallet.icon && (
                    <img
                      src={wallet.icon}
                      alt={`${wallet.name} icon`}
                      className="h-6 w-6 rounded-sm"
                    />
                  )}
                  <span>{wallet.name} wallet</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
