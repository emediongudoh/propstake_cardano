import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import CardanoLogo from "./CardanoLogo";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon, TwitterIcon } from "@/components/icons";

export const Navbar = () => {
  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent
        className="basis-1/5 sm:basis-full"
        justify="start"
      >
        <NavbarBrand
          as="li"
          className="max-w-fit gap-3"
        >
          <NextLink
            className="flex items-center justify-start gap-1"
            href="/"
          >
            <CardanoLogo />
            <p className="font-bold text-inherit">{"Cardano Sandbox '25"}</p>
          </NextLink>
        </NavbarBrand>
        <ul className="ml-2 hidden justify-start gap-4 lg:flex">
          {siteConfig.navItems.map(item => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:font-medium data-[active=true]:text-primary"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden basis-1/5 sm:flex sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden gap-2 sm:flex">
          <Link
            isExternal
            aria-label="Twitter"
            href="https://x.com/UnifiedCardano"
          >
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link
            isExternal
            aria-label="Github"
            href="https://github.com/apcs-25/cardano_sandbox_25"
          >
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        className="basis-1 pl-4 sm:hidden"
        justify="end"
      >
        <Link
          isExternal
          aria-label="Twitter"
          href="https://x.com/UnifiedCardano"
        >
          <TwitterIcon className="text-default-500" />
        </Link>
        <Link
          isExternal
          aria-label="Github"
          href="https://github.com/apcs-25/cardano_sandbox_25"
        >
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
      </NavbarContent>
    </HeroUINavbar>
  );
};
