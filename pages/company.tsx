// CompanyInfo.js

import { Icons } from "cllk";
import React from "react";
const valores = [
  {
    title: "Afrontar Desafíos",
    text: "No importa qué tan grande sea el desafío, nosotros lo afrontamos.",
  },
  {
    title: "Aprendizaje rápido",
    text: "Capaces de aprender tecnologías del momento para aplicarlas en los proyectos.",
  },
  {
    title: "Inspiración",
    text: "Motivados por la pasión a la programación, encontramos inspiración para realizar el trabajo con amor.",
  },
];


const company = () => {
  return (
    <div className="w-full items-center justify-center flex flex-col px-4 lg:px-0">
      <div className="w-full h-[80vh] max-w-[1100px] flex gap-2 items-center">
        <div className="w-full px-3">
          <h1 className="text-4xl font-bold mb-6 mt-6 text-white">
            La empresa
          </h1>
          <p className="text-white/90 lg:text-[1.2rem]">
            En febrero de 2021, nació <strong>Llampukaq</strong> empresa de
            software tecnológico que ha dejado una huella significativa en la
            industria desde sus primeros pasos. Desde su inicio, la compañía ha
            demostrado un compromiso inquebrantable con la excelencia y la
            innovación, centrándose en el desarrollo de soluciones tecnológicas
            de vanguardia. A lo largo de estos años, la empresa ha experimentado
            un crecimiento impresionante gracias a su dedicación a la calidad
            del trabajo.
          </p>
        </div>

        <div className="w-full">
          <img
            className="w-full rounded-[12px]"
            src="/assets/png/general/company_1.png"
            alt=""
          />
        </div>
      </div>
      <div className="full-bleed  bg-[#f3efe5] inverse w-full flex items-center justify-center">
        <div className="max-w-[1200px] ">
          <h1 className="text-[3rem] lg:text-[5rem] font-bold inverse text-left pl-12 bg-[#f3efe5]">
            Nuestros valores
          </h1>
          <div className="pl-12 flex  items-center justify-between w-full">
            {valores.map((e) => (
              <div>
                <Icons className="" icon="IconDiamondsFilled"></Icons>
                <h1 className="font-bold my-3 lg:text-[1.1rem]">{e.title}</h1>
                <p className="text-black/90 pr-2">{e.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-white h-[100vh] w-full flex flex-col items-center justify-center dinamic-bg-company">
        <div className="w-max text-center  ">
          <h1 className="bg-text font-bold title-font-main text-[1.5rem] lg:text-[5rem]">Estamos dispuestos a<span className="block"></span> dar lo mejor,
          siempre.</h1> 
          <p className="text-white/60 text-left lg:text-[1.2rem] mt-4 ">
            Gracias a nuestro clientes podemos ser lo que ahora somos.
          </p>
        </div>
      </div>
    </div>
    // <div className="bg-gray-800 text-white h-screen flex items-center justify-center">
    //   <div className="max-w-3xl p-8 rounded-lg shadow-lg">
    //     <h2 className="text-4xl font-bold mb-6">Acerca de nuestra empresa</h2>

    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    //       <div>
    //         <h3 className="text-2xl font-semibold mb-4">Nuestra Historia</h3>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
    //         </p>
    //       </div>

    //       <div>
    //         <h3 className="text-2xl font-semibold mb-4">Misión y Visión</h3>
    //         <p>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
    //         </p>
    //       </div>
    //     </div>

    //     <div className="mt-8">
    //       <h3 className="text-2xl font-semibold mb-4">Valores de la Empresa</h3>
    //       <ul className="list-disc list-inside">
    //         <li>Compromiso con la excelencia</li>
    //         <li>Innovación constante</li>
    //         <li>Enfoque en el cliente</li>
    //       </ul>
    //     </div>
    //   </div>
    // </div>
  );
};

export default company;
