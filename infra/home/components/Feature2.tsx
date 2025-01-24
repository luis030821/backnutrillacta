import { Button, Icons, Text } from "cllk";
import React from "react";

function Feature2() {
  const data = [
    {
      title: "Une a todo tu equipo",
      description:
        "Une a tu equipo, permitimos que exista mas de una persona en un empresa",
      icon: "",
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
      title: "Sistema de apps",
      description: "Aplciaicones que se adaptan a tus necesidades",
      icon: "",
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
      title: "Simple y practico de usar",
      description: "Dise;os practico y simples de usasr",
      icon: "",
      className: " lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
      title: "Optimizado para tus necesidades",
      description:
        "Obten gestion de inventario, facturas y todos lo que encesites lo dise;amos por ti",
      icon: "",
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
      title: "Gestiona tus ordenes, envios y pedidos",
      description: "Interfaz que se conecta con courier facilmente",
      icon: "",
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    },
    {
      title: "Despligue global",
      description: "Despligue facil y rapido con la mejor velocidad de datos",
      icon: "",
      className: "lg:col-span-2",
    },
    {
      title: "Soporte tecnico 24/7",
      description: "Tienes un problema?, nosotros te ayudamos",
      icon: "",
      className: "lg:col-span-1",
    },
  ];
  return (
    <>
      <div className="py-20 px-5 md:p-20 space-y-5">
        <div className="flex text-blue-500 stroke-blue-500 items-center">
          <Icons className="" icon="IconGlobe" size={30} />
          <Text size className="text-2xl" type="H4">
            Caracteristica
          </Text>
        </div>

        <Text
          size
          type="H4"
          className="text-white/50 text-left max-w-[800px] text-sm md:text-2xl"
        >
          <span className="text-white">Nuestras funciones </span>
          ayudan a tu equipo a mejorar
        </Text>
        <Button icon={<Icons icon="IconStars" />}>Start for free</Button>
      </div>
      <>
        <div className="mx-auto flex max-w-screen-xl flex-col gap-8 px-4 md:px-8">
          <div className="grid w-full auto-rows-[12rem] sm:auto-rows-[22rem] grid-cols-3 gap-4 lg:grid-rows-3 mt-5">
            {data.map((_, index) => (
              <div
                className={`group relative col-span-3 flex flex-col justify-end overflow-hidden rounded-xl bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:bg-[#0f0f0f] dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] ${_.className}`}
              >
                <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
                  <div className="h-12 w-12 mb-1 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75 group-hover:text-[var(--color-one)]">
                    <Icons size={40} icon="Icon123" />
                  </div>

                  <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
                    {_.title}
                  </h3>
                  <p className="max-w-lg text-neutral-500 dark:text-neutral-400">
                    {_.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    </>
  );
}

export default Feature2;
