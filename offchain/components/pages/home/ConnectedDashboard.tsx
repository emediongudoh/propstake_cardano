// import { Chip } from "@heroui/chip";
// import { Link } from "@heroui/link";
// import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
// import { Snippet } from "@heroui/snippet";

// import { useWallet } from "@/components/contexts/wallet/WalletContext";
// import { title } from "@/components/primitives";
// import * as Script from "@/config/script";

// export default function ConnectedDashboard() {
//   const [{ wallet, address }] = useWallet();

//   return (
//     <div className="z-50 flex flex-col justify-center pt-16 text-center">
//       {/* Title */}
//       <h1 className={title()}>
//         Welcome,{" "}
//         <span className={title({ color: "violet", className: "capitalize" })}>
//           {wallet?.name}
//         </span>{" "}
//         is Connected!
//       </h1>

//       {/* Subtitle */}
//       <div className="mx-auto mt-4">
//         <Snippet
//           hideSymbol
//           variant="bordered"
//         >
//           {address}
//         </Snippet>
//       </div>

//       {/* Information */}
//       <div className="mx-auto mt-8 w-fit max-w-lg space-y-0.5 pb-4 pt-3">
//         This is the{" "}
//         <span className={title({ color: "violet", className: "!text-base" })}>
//           {"Cardano Sandbox '25"}
//         </span>{" "}
//         capstone project, where you can&nbsp;
//         <Chip
//           as={Link}
//           color="primary"
//           href={"/mint"}
//           variant="shadow"
//         >
//           mint
//         </Chip>
//         ,&nbsp;
//         <Chip
//           as={Link}
//           color="success"
//           href={"/update"}
//           variant="shadow"
//         >
//           update
//         </Chip>
//         , or&nbsp;
//         <Chip
//           as={Link}
//           color="danger"
//           href={"/burn"}
//           variant="shadow"
//         >
//           burn
//         </Chip>
//         {" your "}
//         <Popover
//           backdrop="blur"
//           placement="top"
//         >
//           <PopoverTrigger>
//             <Link
//               className={title({
//                 color: "violet",
//                 className: "cursor-pointer !text-base",
//               })}
//               title="Click for Policy ID"
//             >
//               {"CS'25 NFTs"}
//             </Link>
//           </PopoverTrigger>
//           <PopoverContent>
//             <div className="px-1 py-2">
//               <div className="text-small font-bold">Policy ID</div>
//               <Snippet
//                 hideSymbol
//                 variant="bordered"
//               >
//                 {Script.PolicyID}
//               </Snippet>
//             </div>
//           </PopoverContent>
//         </Popover>
//         . This project demonstrates how&nbsp;
//         <Link
//           isExternal
//           showAnchorIcon
//           className="font-bold"
//           href="https://github.com/cardano-foundation/CIPs/tree/master/CIP-0068"
//           underline="hover"
//         >
//           CIP-68
//         </Link>
//         works.
//       </div>
//     </div>
//   );
// }

import Client from "@/app/client";
import { HeroImage } from "./HeroImage";
import { FeaturedCategories } from "./FeaturedCategories";
import { FeaturedProperties } from "./FeaturedProperties";
import { HowItWorks } from "./HowItWorks";
import { BuyOrSell } from "./BuyOrSell";
import { CTABanner } from "./CTABanner";

export default function ConnectedDashboard() {
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
