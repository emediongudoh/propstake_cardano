export const CTABanner = () => {
  return (
    <section
      style={{ backgroundImage: `url(cta_banner.png)` }}
      className="mx-auto flex min-h-80 w-full max-w-6xl flex-col items-center justify-center gap-4 rounded-2xl border-2 border-[#948BFC] bg-cover bg-center bg-no-repeat p-8"
    >
      <div className="space-y-2 text-center">
        <h2 className="text-2xl sm:text-4xl">
          Experience the Future of Real Estate <br /> with Propstake
        </h2>
        <p className="text-slate-300">
          Join the Blockchain Property Revolution Today!
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          className="site-button"
        >
          Explore listings
        </button>
        <button
          type="button"
          className="site-button"
        >
          Connect wallet
        </button>
      </div>
    </section>
  );
};
