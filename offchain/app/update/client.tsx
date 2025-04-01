"use client";

import dynamic from "next/dynamic";

const Update = dynamic(() => import("./Update"), { ssr: false });

export default function Client() {
  return <Update />;
}
