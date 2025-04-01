"use client";

import { useTheme } from "next-themes";

import { Logo } from "./icons";

export default function CardanoLogo() {
  const { theme } = useTheme();

  return <Logo className={theme === "light" ? "invert" : undefined} />;
}
