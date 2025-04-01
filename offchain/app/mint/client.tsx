"use client";

import dynamic from "next/dynamic";

const Mint = dynamic(() => import("./Mint"), { ssr: false });

export default function Client() {
  return <Mint />;
}
