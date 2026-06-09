"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Carrosel() {
  const banners = [
    "/carrosel/banner3.png",
    "/carrosel/banner namorados (1).png",
    "/carrosel/banner6.png",
  ];

  const autoplayPlugin = React.useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );

  const [imageErrors, setImageErrors] = React.useState<boolean[]>(
    new Array(banners.length).fill(false)
  );

  const handleImageError = (index: number) => {
    setImageErrors((prev) => {
      const newErrors = [...prev];
      newErrors[index] = true;
      return newErrors;
    });
  };

  return (
    <div className="w-full">
      <Carousel
        plugins={[autoplayPlugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
        onMouseEnter={() => autoplayPlugin.current.stop()}
        onMouseLeave={() => autoplayPlugin.current.play()}
      >
        <CarouselContent>
          {banners.map((src, index) => {
            const encodedSrc = encodeURI(src);
            const hasError = imageErrors[index];

            return (
              <CarouselItem key={index}>
                <div className="relative w-full h-[260px] md:h-[400px] overflow-hidden bg-[#0A0A0A]">
                  {!hasError ? (
                    <Image
                      src={encodedSrc}
                      alt={`Banner ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      onError={() => handleImageError(index)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] text-[#C5A059]/50 text-xs tracking-wider">
                      Lumière Sora
                    </div>
                  )}
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
}

