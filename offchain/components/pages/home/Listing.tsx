import { Bath, Bed, LandPlot, MapPin } from "lucide-react";

type ListingProp = {
  image: string;
  name: string;
  address: string;
  bathrooms: number;
  bedrooms: number;
  area: number;
  price: number;
};

export const Listing = ({
  image,
  name,
  address,
  bathrooms,
  bedrooms,
  area,
  price,
}: ListingProp) => {
  return (
    <div className="space-y-2">
      <img
        src={image}
        alt={name}
        loading="lazy"
        className="rounded-2xl"
      />
      <p>{name}</p>
      <p className="flex items-center gap-2 text-sm text-slate-400">
        <MapPin /> {address}
      </p>
      <div className="flex items-center justify-between border-t border-t-slate-400 py-2">
        <span className="flex items-center gap-2 text-sm text-slate-400">
          <span className="flex items-center gap-1">
            <Bed /> {bedrooms}
          </span>
          &middot;{" "}
          <span className="flex items-center gap-1">
            <Bath /> {bathrooms}
          </span>
          &middot;{" "}
          <span className="flex items-center gap-1">
            <LandPlot /> {area}
          </span>
        </span>{" "}
        <span className="site-money">${price}</span>
      </div>
    </div>
  );
};
