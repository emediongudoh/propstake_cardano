import { siteProperties } from "@/config/site";
import { Listing } from "./Listing";

export const FeaturedProperties = () => {
  return (
    <section className="mx-auto max-w-4xl space-y-4 p-4 sm:space-y-8">
      <h2 className="text-center text-2xl text-[#6900EA] sm:text-4xl">
        Featured Properties
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8 md:grid-cols-3">
        {siteProperties.map((item, index) => (
          <Listing
            key={index}
            {...item}
          />
        ))}
      </div>
    </section>
  );
};
