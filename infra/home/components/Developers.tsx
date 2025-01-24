import { Img, SourceImg } from "cllk";
import React from "react";

function Developers() {
  const data = [
    {
      title: "Api",
      description: "Integra la api facilmente",
      img: "https://app.llampukaq.com/home/dev/api.jpg",
    },
    {
      title: "Imagenes",
      description: "Optimiza tus imagenes",
      img: "https://app.llampukaq.com/home/dev/images.jpg",
    },
    {
      title: "Editor de codigo",
      description: "Usalo siempre en la nube",
      img: "https://app.llampukaq.com/home/dev/editor.jpg",
    },
    {
      title: "Web builder",
      description: "Contruye tu pagina simple",
      img: "https://app.llampukaq.com/home/dev/webbuilder.jpg",
    },
    {
      title: "IA",
      description: "Usa tus credencial y accede a varios modelos",
      img: "https://app.llampukaq.com/home/dev/ia.jpg",
    },
    {
      title: "Github",
      description: "Mira nuestros repo publicos y sorprente",
      img: "https://app.llampukaq.com/home/dev/github.jpg",
    },
    {
      title: "Mucha mas",
      description: "Siempre estamos en desarrollo nuevos",
      img: "https://app.llampukaq.com/home/dev/much.webp",
    },
  ];
  return (
    <div>
      <div className="w-full h-full py-20">
        <h2 className="max-w-7xl pl-4 text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
          Developers
        </h2>
        <div className="relative w-full">
          <div className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none]">
            <div className="absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l" />
            <div className="flex flex-row justify-start gap-4 pl-4 max-w-7xl">
              {data.map((x, index) => (
                <div
                  className="last:pr-[5%] md:last:pr-[33%]  rounded-3xl"
                  style={{ opacity: 1, transform: "none" }}
                >
                  <button className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[40rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10">
                    <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
                    <div className="relative z-40 p-8">
                      <p className="text-white text-sm md:text-base font-medium font-sans text-left">
                        {x.title}
                      </p>
                      <p className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2">
                        {x.description}
                      </p>
                    </div>
                    <picture>
                      <SourceImg link breaking="md" srcSet={x.img} />
                      <Img
                        width="300"
                        link
                        decoding="async"
                        data-nimg="fill"
                        className="transition duration-300 blur-0 object-cover absolute z-10 inset-0"
                        sizes="100vw"
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: 0,
                          color: "transparent",
                        }}
                        src={x.img}
                      ></Img>
                    </picture>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Developers;
