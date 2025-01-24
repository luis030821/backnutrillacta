import { Button } from "cllk";
import React from "react";

function Start() {
  return (
    <div>
      <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/50 antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0 space-y-5">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            Deja <br /> de perder el tiempo
          </h1>
          <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
            Empieza completamente gratis con nosotros, sin letras pequeñas
          </p>
          <Button center>Start for free</Button>
        </div>
      </div>
    </div>
  );
}

export default Start;
