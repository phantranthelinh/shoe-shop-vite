import Autoplay from "embla-carousel-autoplay";
import { useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";

const DELAY_AUTOPLAY_SLIDE = 3000;
const Hero = () => {
  const [_, setApi] = useState<CarouselApi>();

  return (
    <section className="relative text-white text-[20px] w-full max-w-[1360px] mx-auto">
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: DELAY_AUTOPLAY_SLIDE,
          }),
        ]}
      >
        <CarouselContent>
          {Array.from({ length: 3 }).map((_, index) => {
            return (
              <CarouselItem key={index} className="relative ">
                <img
                  src={`/slide-${index + 1}.png`}
                  alt={`carousel-image-${index + 1}`}
                  className="aspect-[16/10] md:aspect-auto object-cover"
                />
                <div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
                  Mua ngay
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default Hero;
