import { H1, P, Span, Text } from "cllk";
const dataDeImpulsaIdeas = [
  {
    title: "Diseños Cómodos",
    text: "Crea tu sitio web con una alta legibilidad para cualquier tipo de usuario. La experiencia es cómoda y agradable para tus visitantes.",
  },
  {
    title: "Gran Infraestructura",
    text: "Contamos con una arquitectura escalable y optimizada. Tu página web cargará en milisegundos, gracias a nuestra infraestructura robusta y eficiente.",
  },
  {
    title: "Crece Tu Empresa",
    text: "Permite que tus clientes te encuentren en cualquier parte y ofréceles un servicio con un plus. Te proporcionamos las herramientas para destacar en el mercado y expandir tu alcance.",
  },
];
export default function ImpulsaIdeas() {
  return (
    <section className=" text-white p-4 flex flex-col w-full justify-center items-center pt-40 pb-20">
      <div className="max-w-[1020px]">
        <div className=" overflow-hidden space-y-2">
          <Text type="H2" className="bg-text text-center">
            <Span gradient="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
              Impulsa tus ideas
            </Span>
          </Text>
          <Text className="text-white/70 text-center" type="BodyLg(Medium)">
            Ten acceso a toda nuestra plataforma, crea y gestiona todo tu
            empresa de manera sencilla
          </Text>
        </div>
        <div className="flex flex-col md:flex-row gap-8 lg:gap-0 p-10">
          {dataDeImpulsaIdeas.map((e, l) => (
            <div className="md:w-1/3 relative overflow-hidden">
              <div className="absolute w-full rounded-full h-[2px] bg-white/40"></div>
              <div className="flex flex-col gap-2 mt-3">
                <H1 className="font-bold title-texto text-[1.5rem] ">
                  {e.title}{" "}
                </H1>
                <Text
                  className="text-white/60 text-center"
                  type="BodyMd(Medium)"
                >
                  {e.text}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
