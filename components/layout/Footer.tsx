import { H1, Icons, NavLink, P, useTailwdincss } from "cllk";
import React from "react";

function Footer() {
  const { border } = useTailwdincss();
  const datafooter = [
    { link: "/company", es: "Compañia", en: "Company" },
    {
      link: "/privacy",
      es: "Politica de Privacidad",
      en: "Privacy Policy",
    },
    { link: "/teem", es: "Equipo", en: "Teem" },
    { link: "/faq", es: "Preguntas Frecuentes", en: "Frequent questions" },
  ];
  const redes = [
    {
      link: "https://github.com/llampukaq-technology",
      icon: <Icons size={40} icon={"IconBrandGithub"} />,
    },
    {
      link: "https://www.linkedin.com/company/llampukaq-tecnology",
      icon: <Icons size={40} icon={"IconBrandLinkedin"} />,
    },
    {
      link: "https://www.facebook.com/llampukaqtechnology/",
      icon: <Icons size={40} icon="IconBrandFacebook" />,
    },
  ];
  return (
    <footer className={`w-full border-t-2 ${border}`}>
      <div className="w-full max-w-[1000px] mx-auto p-4 md:py-8">
        <div className="flex justify-center items-center mb-4 sm:mb-0">
          <div className="w-10">
            <img
              loading="lazy"
              width="192"
              src="/icons/logo192.webp"
              className="h-10"
              alt="Llampukaq Logo"
            />
          </div>

          <H1 position="text-left" size={"1.3em"}>
            Llampukaq Technology
          </H1>
        </div>
        <ul className="flex flex-wrap justify-center items-center text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 gap-2 my-5">
          {datafooter.map((x, index) => (
            <P key={index}>
              <NavLink
                href={x.link}
                className="hover:underline duration-200 md:mr-6 "
              >
                {x.es}
              </NavLink>
            </P>
          ))}
        </ul>
        <div className="mt-5">
          <P>Email:services@llampukaq.com</P>
          <P>Numero de telefono: +593 95 943 4867</P>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="flex items-center space-y-5 sm:space-y-0 sm:justify-between flex-col sm:flex-row">
          <div className="flex space-x-3">
            {redes.map((x) => (
              <>
                <a target="_blank" href={x.link}>
                  {x.icon}
                </a>
              </>
            ))}
          </div>
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {new Date().getFullYear()}. Todos los derechos reservados
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
