import { Img, Marquee, SourceImg, Text } from "cllk";
import React from "react";

function Hero2() {
  return (
    <div className=" mt-12 space-y-28">
      <div className="px-3 w-12/12 mx-auto mb-12 space-y-14">
        <Text
          size
          type="H2"
          className="text-center text-white text-[40px] md:text-[100px] md:leading-none"
        >
          Poderosamente simple <span>🚀</span>
        </Text>
        <Text
          size
          type="BodyLg(Medium)"
          className="mx-auto max-w-[600px] text-center text-white/30 mt-2 text-[20px] md:text-[30px] leading-snug"
        >
          Nuestras funciones están diseñadas para mejorar su productividad y
          optimizar su flujo de trabajo.
        </Text>
      </div>
      <Marquee>
        <div className="flex">
          {[...Array(3)].map((_, index) => (
            <picture key={index}>
              <SourceImg
                link
                width="1200"
                breaking="2xl"
                srcSet="https://app.llampukaq.com/home/marquee.png"
              />
              <SourceImg
                link
                width="1200"
                breaking="xl"
                srcSet="https://app.llampukaq.com/home/marquee.png"
              />
              <SourceImg
                link
                width="1200"
                breaking="lg"
                srcSet="https://app.llampukaq.com/home/marquee.png"
              />
              <SourceImg
                link
                width="1200"
                breaking="md"
                srcSet="https://app.llampukaq.com/home/marquee.png"
              />
              <SourceImg
                link
                width="1200"
                breaking="sm"
                srcSet="https://app.llampukaq.com/home/marquee.png"
              />
              <Img
                width="800"
                q={50}
                link
                src={"https://app.llampukaq.com/home/marquee.png"}
              />
            </picture>
          ))}
        </div>
      </Marquee>
    </div>
  );
}

export default Hero2;
