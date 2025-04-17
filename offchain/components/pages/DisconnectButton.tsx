import { Button } from "@heroui/button";

import { useWallet } from "../contexts/wallet/WalletContext";

export default function DisconnectButton() {
  const [, setWalletConnection] = useWallet();

  function disconnect() {
    setWalletConnection(walletConnection => {
      return {
        ...walletConnection,

        wallet: undefined,
        walletApi: undefined,

        address: "",
        pkh: "",

        stakeAddress: "",
        skh: "",
      };
    });
  }

  return (
    <Button
      className="absolute right-0 top-0 -translate-y-full"
      onPress={disconnect}
    >
      Disconnect
    </Button>
  );
}
