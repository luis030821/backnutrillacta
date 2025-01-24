import React, { useState, useRef, useEffect } from "react";

interface CarouselItem {
  icon: string;
  title: string;
  description: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerParent = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSlide = (index: number) => {
    setCurrentIndex(index);
    if (containerRef.current && containerParent.current) {
      const slideWidth = containerRef.current.clientWidth;
      containerParent.current.scrollTo({
        left: slideWidth * index,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    // Función que se ejecutará cada 5 segundos
    const e = (currentIndex + 1) % items.length;
    const intervalId = setInterval(() => {
      scrollToSlide(e);
    }, 5000);
    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, [currentIndex]); // Dependencia de currentIndex para evitar fugas de memoria

  return (
    <div
      className="mb-12"
      style={{ position: "relative", overflow: "revert-layer" }}
    >
      <div
        className="p-5 overflow-x-hidden flex md:gap-x-20"
        ref={containerParent}
      >
        {items.map((item, index) => (
          <div
            className="px-[4rem] py-[5rem] bg-black/20 border border-white/20 rounded-3xl w-full flex-shrink-0 max-w-[500px]"
            ref={containerRef}
            key={index}
            style={{
              boxSizing: "border-box",
            }}
          >
            <img
              className="block border border-[violet] rounded-full p-2 mb-2"
              src={item.icon}
              alt={item.title}
              style={{ maxWidth: "100%" }}
            />
            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-white text-[1.4rem]">
                {item.title}
              </h2>
              <p className="text-[1.1rem] text-[#ccc]">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "-50px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {items.map((_, index) => (
          <button
            key={index}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              margin: "0 5px",
              background: index === currentIndex ? "violet" : "gray",
              border: "none",
              cursor: "pointer",
              outline: "none",
            }}
            onClick={() => scrollToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const carouselItems: CarouselItem[] = [
    {
      icon: "/assets/png/mobile.png",
      title: "Desarrollo de Aplicaciones Móviles",
      description:
        "Extensión de la aplicación web a plataformas móviles. Diseño adaptativo e intuitivo para llegar a más usuarios.",
    },
    {
      icon: "/assets/png/dash.png",
      title: "Diseño y Desarrollo Web",
      description: "Desarrollo web utilizando las tecnologías más actuales, ",
    },
    {
      icon: "/assets/png/code.png",
      title: "Pruebas de Software",
      description:
        "Gestión de contenido en todas las plataformas y recopilación de datos.",
    },
    {
      icon: "/assets/png/code.png",
      title: "Código Limpio y Optimizado",
      description:
        "Entrega de la documentación y software de manera estructurada y legible.",
    },
    {
      icon: "/assets/png/shield.png",
      title: "Seguridad",
      description:
        "Aplicamos altos estándares de seguridad para proteger datos sensibles.",
    },
    {
      icon: "/assets/png/rocket.png",
      title: "Máxima Velocidad",
      description:
        "Tiempo de carga de la página menor de 2 segundos, sin importar la magnitud del proyecto.",
    },
  ];

  return (
    <div className="w-full py-20">
      <Carousel items={carouselItems} />
    </div>
  );
};

export default App;
