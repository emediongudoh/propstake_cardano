import { Chip } from "@heroui/chip";
import { Link } from "@heroui/link";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { Snippet } from "@heroui/snippet";

import { useWallet } from "@/components/contexts/wallet/WalletContext";
import { title } from "@/components/primitives";
import * as Script from "@/config/script";

export default function ConnectedDashboard() {
  const [{ wallet, address }] = useWallet();

  return (
    <div className="flex flex-col text-center justify-center">
      {/* Title */}
      <h1 className={title()}>
        Welcome,{" "}
        <span className={title({ color: "violet", className: "capitalize" })}>
          {wallet?.name}
        </span>{" "}
        is Connected!
      </h1>

      {/* Subtitle */}
      <div className="mx-auto mt-4">
        <Snippet hideSymbol variant="bordered">
          {address}
        </Snippet>
      </div>

      {/* Information */}
      <div className="w-fit max-w-lg mx-auto mt-8 pt-3 pb-4 space-y-0.5">
        This is the{" "}
        <span className={title({ color: "violet", className: "!text-base" })}>
          {"Cardano Sandbox '25"}
        </span>{" "}
        capstone project, where you can&nbsp;
        <Chip as={Link} color="primary" href={"/mint"} variant="shadow">
          mint
        </Chip>
        ,&nbsp;
        <Chip as={Link} color="success" href={"/update"} variant="shadow">
          update
        </Chip>
        , or&nbsp;
        <Chip as={Link} color="danger" href={"/burn"} variant="shadow">
          burn
        </Chip>
        {" your "}
        <Popover backdrop="blur" placement="top">
          <PopoverTrigger>
            <Link
              className={title({
                color: "violet",
                className: "!text-base cursor-pointer",
              })}
              title="Click for Policy ID"
            >
              {"CS'25 NFTs"}
            </Link>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <div className="text-small font-bold">Policy ID</div>
              <Snippet hideSymbol variant="bordered">
                {Script.PolicyID}
              </Snippet>
            </div>
          </PopoverContent>
        </Popover>
        . This project demonstrates how&nbsp;
        <Link
          isExternal
          showAnchorIcon
          className="font-bold"
          href="https://github.com/cardano-foundation/CIPs/tree/master/CIP-0068"
          underline="hover"
        >
          CIP-68
        </Link>
        works.
      </div>
    </div>
  );
}
