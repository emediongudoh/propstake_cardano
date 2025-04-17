export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Propstake",
  description: "Real estate marketplace app",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Properties",
      href: "/properties",
    },
    {
      label: "How it works",
      href: "/how-it-works",
    },
    {
      label: "About us",
      href: "/about-us",
    },
    {
      label: "Support",
      href: "/support",
    },
  ],
};

export const siteCategories = [
  {
    icon: "town_house.png",
    name: "Town house",
    numOfProperties: 2,
  },
  {
    icon: "modern_villa.png",
    name: "Modern villa",
    numOfProperties: 10,
  },
  {
    icon: "apartment.png",
    name: "Apartment",
    numOfProperties: 3,
  },
  {
    icon: "office.png",
    name: "Office",
    numOfProperties: 3,
  },
  {
    icon: "single_family.png",
    name: "Single family",
    numOfProperties: 5,
  },
  {
    icon: "shop_house.png",
    name: "Shop house",
    numOfProperties: 2,
  },
];

export const siteProperties = [
  {
    image: "property1.png",
    name: "Skyper Pool Apartment",
    address: "1020 Bloomingdale Avenue",
    bathrooms: 4,
    bedrooms: 4,
    area: 450,
    price: 280000,
  },
  {
    image: "property2.png",
    name: "Skyper Pool Apartment",
    address: "1020 Bloomingdale Avenue",
    bathrooms: 4,
    bedrooms: 4,
    area: 450,
    price: 280000,
  },
  {
    image: "property3.png",
    name: "Skyper Pool Apartment",
    address: "1020 Bloomingdale Avenue",
    bathrooms: 4,
    bedrooms: 4,
    area: 450,
    price: 280000,
  },
];
