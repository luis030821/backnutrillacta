import { H1, ICONS, Icons, Img, Span, Text } from "cllk";
import Marquee from "react-fast-marquee";
function Hero3() {
  const per = [
    { text: "Personal", icon: "IconUser" },
    { text: "Visual", icon: "IconBuildingCarousel" },
    { text: "Empresarial", icon: "IconCurrencyDollar" },
    { text: "Ecommerce", icon: "IconBrandShopee" },
    { text: "Pagos", icon: "IconTie" },
    { text: "Portafolio", icon: "IconBackpack" },
  ];

  return (
    <div className=" overflow-hidden bg-center bg-no-repeat bg-cover sm:h-screen relative">
      <div className="absolute top-0 left-0  h-full w-full">
        <Marquee speed={100}>
          {[...Array(15)].map((x, index) => (
            <Img
              link
              className="w-40 h-40 overflow-hidden object-cover"
              src={`https://app.llampukaq.com/llk/home/home/${index + 1}.webp`}
            ></Img>
          ))}
        </Marquee>
        <Marquee direction="right" speed={150}>
          {[...Array(10)].map((x, index) => (
            <Img
              link
              className="w-40 h-40 overflow-hidden object-cover"
              src={`https://app.llampukaq.com/llk/home/home/${index}.webp`}
            ></Img>
          ))}
        </Marquee>
        <Marquee speed={200}>
          {[...Array(10)].map((x, index) => (
            <Img
              link
              width="30"
              className="w-40 h-40 overflow-hidden object-cover"
              src={`https://app.llampukaq.com/llk/home/home/${index}.webp`}
            ></Img>
          ))}
        </Marquee>
        <Marquee speed={250} direction="right">
          {[...Array(10)].map((x, index) => (
            <Img
              link
              width="30"
              className="w-40 h-40 overflow-hidden object-cover"
              src={`https://app.llampukaq.com/llk/home/home/${index}.webp`}
            ></Img>
          ))}
        </Marquee>
        <Marquee speed={200}>
          {[...Array(10)].map((x, index) => (
            <Img
              link
              width="30"
              className="w-40 h-40 overflow-hidden object-cover"
              src={`https://app.llampukaq.com/llk/home/home/${index}.webp`}
            ></Img>
          ))}
        </Marquee>
        <Marquee speed={150} direction="right">
          {[...Array(10)].map((x, index) => (
            <Img
              link
              className="w-40 h-40 overflow-hidden object-cover"
              src={`https://app.llampukaq.com/llk/home/home/${index}.webp`}
            ></Img>
          ))}
        </Marquee>
      </div>
      <div className="flex items-center w-full h-full">
        <div className="flex flex-col items-center justify-center mx-auto space-y-10 z-30 bg-gradient-to-b from-gray-900/90 to-gray-900 w-full h-full py-40">
          <div className="flex flex-col justify-center items-center space-y-5">
            <div className="group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl bg-white/40 px-4 py-1.5 text-sm font-medium backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f] dark:bg-black/40">
              <div className="absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]" />
              🎉 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />{" "}
              <span className="inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
                Bienvenido
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 stroke-white"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
            <Text
              size
              type="H1"
              className={`text-center dark:text-neutral-200 text-3xl md:text-[70px] md:leading-none`}
            >
              La entrada a tu presencia
            </Text>
            <Text
              size
              type="H1"
              className={`px-3 mb-3 text-center text-white capitalize text-7xl md:text-[90px]`}
            >
              <Span gradient="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
                Online
              </Span>
            </Text>
            <div className="px-5">
              <Text
                size
                type="BodyLg(Medium)"
                className="text-white/50 max-w-xl mx-auto text-center text-[18px] md:text-[25px] leading-normal"
              >
                Descubre la plataforma que te brinda la libertad de crear,
                diseñar y desarrollar tu perfil en el mundo web.
              </Text>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-9 px-3 max-w-[600px] mx-auto">
            {per.map((x, index) => (
              <a
                href={`/signin?type_project=${x.text.toLowerCase()}`}
                key={index}
                className={`w-[155px] mx-auto bg-zinc-900/40 cursor-pointer justify-center flex-shrink-0 flex items-center px-1 duration-500 hover:bg-zinc-900 border-2 border-slate-700/80 hover:border-white/20 rounded-xl py-3 space-x-2`}
              >
                <Icons icon={x.icon as ICONS}></Icons>
                <H1>{x.text}</H1>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero3;
