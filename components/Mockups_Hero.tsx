import { Icons } from "cllk";
import React, { useEffect, useRef, useState } from "react";

export default function Mockups_Hero() {
  const contenedorRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasReset, setHasReset] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (contenedorRef.current) {
        //@ts-ignore
        const contenedorRect = contenedorRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const contenedorEnPantalla =
          contenedorRect.top < windowHeight && contenedorRect.bottom >= 0;

        if (contenedorEnPantalla && !isVisible) {
          setIsVisible(true);
          setHasReset(false);
        } else if (!contenedorEnPantalla && isVisible) {
          setHasReset(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isVisible]);
  return (
    <div className=" mt-20 h-auto lg:h-[70vh] items-center justify-center flex flex-col-reverse lg:flex-row-reverse">
      <div ref={contenedorRef} className="w-max h-max relative  ">
        <img
          loading="lazy"
          className="w-full max-w-[450px] lg:max-w-[620px]"
          src="https://wsrv.nl/?url=https://app.llampukaq.com/assets/cases/rezilla/pc.png&output=webp&w=500&q=50"
          alt=""
        />
        <img
          loading="lazy"
          className="max-w-[450px] lg:max-w-[520px] absolute left-[0%] bottom-[-18px]"
          style={{
            transitionDelay: "4s",
            transition: "all 1s",
            transform: `${
              isVisible ? `translateX(0px)` : "translateX(250px)"
            } `,
            opacity: `${isVisible ? `1` : "0"} `,
          }}
          src="https://wsrv.nl/?url=https://app.llampukaq.com/assets/cases/rezilla/laptop.png&output=webp&w=500&q=50"
          alt=""
        />
        <img
          loading="lazy"
          className="max-w-[80px] lg:max-w-[120px] absolute left-[0%] bottom-0"
          style={{
            transitionDelay: "2s",
            transition: "all 3s",
            transform: `${
              isVisible ? `translateX(0px)` : "translateX(250px)"
            } `,
            opacity: `${isVisible ? `1` : "0"} `,
          }}
          src="https://wsrv.nl/?url=https://app.llampukaq.com/assets/cases/rezilla/mobile.png&output=webp&w=120&q=50"
          alt=""
        />
      </div>
      <div className="h-full w-full px-10 lg:px-0 lg:w-[40%] items-start lg:items-center lg:justify-center flex flex-col">
        <div className="text-[1.2rem]">
          <h1 className="title-second leading-none text-[5.6rem] ml-[50px] mt-[-20px] sm:ml-0 sm:mt-0 text-white">
            <span className="bg-text">No</span> existen{" "}
            <span className="bg-text">limites</span>
          </h1>
          {/* <p className="text-white/80">
            Nuestros desarroladores estan capacitados para brindarte toda la
            cobertura posible.
          </p> */}
          <div className="text-white/80 my-3">
            <p className="mb-3 text-white/90 ">
              {" "}
              Interfaz Web adaptable a diferentes plataformas
            </p>

            <span className="ml-2 flex flex-col items-start">
              <span className="flex flex-row-reverse gap-2 items-start justify-center px-2">
                Mobile
                <Icons className="svg-color" icon="IconCheck"></Icons>
              </span>
              <span className="flex flex-row-reverse gap-2 items-start justify-center px-2">
                Laptop
                <Icons className="svg-color" icon="IconCheck"></Icons>
              </span>
              <span className="flex flex-row-reverse gap-2 items-start justify-center px-2">
                Pc
                <Icons className="svg-color" icon="IconCheck"></Icons>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
