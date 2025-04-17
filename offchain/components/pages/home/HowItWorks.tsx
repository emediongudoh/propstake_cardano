export const HowItWorks = () => {
  return (
    <section className="mx-auto max-w-5xl space-y-4 p-4 sm:space-y-8">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl sm:text-4xl">
          How it works? Find a <span className="text-[#6900EA]">perfect</span>{" "}
          home
        </h2>
        <p className="text-slate-300">How Propstake works</p>
      </div>

      <div className="grid grid-cols-1 gap-8 p-4 md:grid-cols-2">
        <ul className="flex flex-col gap-4">
          <li className="flex flex-col gap-2">
            <img
              src="secure_transactions.png"
              alt="Secure transactions"
              loading="lazy"
              className="size-8"
            />
            <h5 className="text-xl font-medium">Secure transactions</h5>
            <p className="leading-loose text-slate-300">
              All transactions are handled through smart contracts, ensuring
              transparency and security.
            </p>
          </li>
          <li className="flex flex-col gap-2">
            <img
              src="browse_properties.png"
              alt="List or browse properties"
              loading="lazy"
              className="size-8"
            />
            <h5 className="text-xl font-medium">List or browse properties</h5>
            <p className="leading-loose text-slate-300">
              Property owners can list their properties for sale or rent, while
              buyers and renters can browse through verified listings.
            </p>
          </li>
          <li className="flex flex-col gap-2">
            <img
              src="inspect_and_verify.png"
              alt="Inspect and verify"
              loading="lazy"
              className="size-8"
            />
            <h5 className="text-xl font-medium">Inspect & Verify</h5>
            <p className="leading-loose text-slate-300">
              Certified inspectors evaluate properties to ensure quality and
              eligibility, for sale, rent, or NFT minting.
            </p>
          </li>
          <li className="flex flex-col gap-2">
            <img
              src="take_the_keys.png"
              alt="Take the keys"
              loading="lazy"
              className="size-8"
            />
            <h5 className="text-xl font-medium">Take the keys</h5>
            <p className="leading-loose text-slate-300">
              Sumo petentium ut per, at his wisim utinam adipiscing. Est ei
              graeco Lorem ipsum dolor sit amet, consectetur adipiscing.
            </p>
          </li>
        </ul>

        <img
          src="how_it_works.png"
          alt="How it works"
          loading="lazy"
          className="w-full object-cover"
        />
      </div>
    </section>
  );
};
