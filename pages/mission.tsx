import { H1, Img, P, Text } from "cllk";
import React from "react";

function mission() {
  const data = [
    {
      h1: "Misión",
      p: "En nuestra misión, nos dedicamos a proporcionar soluciones de software excepcionales para empresas e individuos registrados en nuestra aplicación. Buscamos transformar la forma en que las empresas y las personas interactúan con la tecnología, mejorando la eficiencia y la calidad de sus operaciones. Trabajamos incansablemente para ofrecer productos innovadores que superen las expectativas y contribuyan al éxito de nuestros clientes.",
      img: "https://app.llampukaq.com/backgrounds/17.png",
    },
    {
      h1: "Visión",
      p: "Nuestra visión es convertirnos en líderes destacados en la industria del desarrollo de software. Aspiramos a ser reconocidos por nuestra dedicación a la excelencia y la mejora continua. Visualizamos un futuro donde nuestra tecnología impacta positivamente en la vida de las personas, transformando la manera en que interactúan con el mundo digital. Nos esforzamos por inspirar a otros a través de nuestra innovación y contribución a la comunidad global.",
      img: "https://app.llampukaq.com/backgrounds/19.png",
    },
    {
      h1: "Ahora",
      p: "En este momento, nos enfocamos en mejorar la calidad y eficiencia de nuestras soluciones de software. Estamos comprometidos con la optimización constante de la experiencia del usuario en nuestras aplicaciones web y móviles. Además, trabajamos en perfeccionar nuestro código, adoptando las mejores prácticas y estándares para garantizar la fiabilidad y la seguridad de nuestras soluciones. Estamos emocionados por el presente y preparados para enfrentar los desafíos del futuro.",
      img: "https://app.llampukaq.com/backgrounds/20.png",
    },
  ];

  return (
    <div className="space-y-10 my-5 w-full mx-auto max-w-[1200px] ">
      {data.map((x, index) => (
        <div
          key={index}
          className={`flex flex-col-reverse rounded-3xl dark:bg-zinc-800 bg-zinc-100 ${
            index % 2 == 1 ? "md:flex-row" : "md:flex-row-reverse"
          } items-center w-full min-h-screen`}
        >
          <div className="my-5 md:my-0 md:mx-5">
            <Text className="text-center dark:text-white text-black" type="H4">
              {x.h1}
            </Text>
            <Text
              type="BodyMd"
              className="max-w-[600px] mx-auto dark:text-white/50"
            >
              {x.p}
            </Text>
          </div>
          <div className="w-6/12 h-full rounded-3xl flex-shrink-0 ">
            <Img
              className="h-full w-full"
              width="500"
              link
              q={70}
              src={x.img}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default mission;
