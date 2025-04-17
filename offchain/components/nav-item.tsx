"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavItemProp = {
  label: string;
  href: string;
};

export const NavItem = ({ label, href }: NavItemProp) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative h-fit w-fit"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={href}
        className="relative"
      >
        <span>{label}</span>
        <span
          style={{
            transform: open || isActive ? "scaleX(1)" : "scaleX(0)",
          }}
          className="absolute -bottom-2 left-0 right-0 h-1 origin-left rounded-full bg-[#6900EA] transition-transform duration-300 ease-out"
        />
      </Link>
    </div>
  );
};
