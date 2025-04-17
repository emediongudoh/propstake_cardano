import Image from "next/image";

// Third-party imports
import { Button } from "@heroui/button";

export const HeroImage = () => {
  return (
    <section
      style={{ backgroundImage: `url(hero_image.png)` }}
      className="flex min-h-[80vh] flex-col items-center justify-center gap-4 bg-cover bg-center bg-no-repeat p-8 sm:min-h-screen"
    >
      <h2 className="mt-20 bg-gradient-to-r from-[#801DF9] to-[#FFFFFF] bg-clip-text text-center text-3xl font-semibold text-transparent sm:text-6xl">
        Revolutionizing Real Estate <br /> with Propstake
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button
          type="button"
          className="site-button"
        >
          Explore listings
        </Button>
        <Button
          type="button"
          className="site-button"
        >
          List your property
        </Button>
      </div>

      <img
        src="3d_house.png"
        alt="3D house"
        loading="lazy"
      />
    </section>
  );
};
