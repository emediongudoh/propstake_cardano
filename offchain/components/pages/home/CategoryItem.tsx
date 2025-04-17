type CategoryItemProp = {
  icon: string;
  name: string;
  numOfProperties: number;
};

export const CategoryItem = ({
  icon,
  name,
  numOfProperties,
}: CategoryItemProp) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-[#1D0F43] p-6">
      <img
        src={icon}
        alt={name}
        loading="lazy"
      />
      <p>{name}</p>
      <span className="text-sm text-slate-300">
        {numOfProperties} properties
      </span>
    </div>
  );
};
