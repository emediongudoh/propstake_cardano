import Link from "next/link";

// Local imports
import { CategoryItem } from "./CategoryItem";
import { siteCategories } from "@/config/site";

export const FeaturedCategories = () => {
  return (
    <section className="mx-auto max-w-6xl space-y-4 p-4 sm:space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="space-y-2">
          <h2 className="text-2xl text-[#6900EA] sm:text-4xl">
            Featured Categories
          </h2>
          <p className="text-slate-300">Blockchain-Verified Properties</p>
        </div>

        <Link href="/">View all categories &rarr;</Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8 md:grid-cols-6">
        {siteCategories.map((item, index) => (
          <CategoryItem
            key={index}
            icon={item.icon}
            name={item.name}
            numOfProperties={item.numOfProperties}
          />
        ))}
      </div>
    </section>
  );
};
