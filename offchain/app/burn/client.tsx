"use client";

import dynamic from "next/dynamic";

const Burn = dynamic(() => import("./Burn"), { ssr: false });

export default function Client() {
  return <Burn />;
}
