export const BuyOrSell = () => {
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-4 p-4 sm:gap-8 md:grid-cols-2">
      {/* Looking for the new home? */}
      <div className="flex flex-col gap-4 rounded-2xl bg-[#F4FFF4] p-6 text-gray-800 sm:p-8">
        <h2 className="text-xl font-medium">
          Looking for the new <br /> home?
        </h2>

        <div className="flex items-center">
          <div className="space-y-2">
            <p className="leading-loose">
              10 new offers every day. 350 offers on site, trusted by a
              community of thousands of users.
            </p>
            <button
              type="button"
              className="cursor-pointer rounded-lg bg-[#048904] px-4 py-2 text-white hover:opacity-80"
            >
              Get started &rarr;
            </button>
          </div>

          <img
            src="buy.png"
            alt="Looking for the new home?"
            loading="lazy"
            className="size-24 object-cover"
          />
        </div>
      </div>

      {/* Want to sell your home? */}
      <div className="flex flex-col gap-4 rounded-2xl bg-[#FFEEE9] p-6 text-gray-800 sm:p-8">
        <h2 className="text-xl font-medium">
          Want to sell your <br /> home?
        </h2>

        <div className="flex items-center">
          <div className="space-y-2">
            <p className="leading-loose">
              10 new offers every day. 350 offers on site, trusted by a
              community of thousands of users.
            </p>
            <button
              type="button"
              className="cursor-pointer rounded-lg bg-[#F08400] px-4 py-2 text-white hover:opacity-80"
            >
              Get started &rarr;
            </button>
          </div>

          <img
            src="sell.png"
            alt="Want to sell your home?"
            loading="lazy"
            className="size-24 object-cover"
          />
        </div>
      </div>
    </section>
  );
};
