import { H1, ICONS, Icons, Img, useCss } from "cllk";

import React from "react";
export interface link {
  img: string | undefined;
  name: string | undefined;
  description:
    | {
        en: string;
        es: string;
      }
    | undefined;
  bg: string;
  navs: {
    icon: ICONS;
    name: string;
    to: string;
    bg: string;
  }[];
}
const PrintSocialMedia = ({ data }: { data: link }) => {
  useCss(data.bg);
  return (
    <div className="back">
      <div className="w-full mx-auto min-h-screen space-y-5 pt-10 backdrop-blur-sm">
        <div className="w-[300px] h-[300px] flex justify-center items-center overflow-hidden mx-auto bg-zinc-800 rounded-full ">
          <Img className="rounded-full" src={data.img} />
        </div>
        <H1 size={"2em"}>{data.name}</H1>
        <H1 size={"1.5em"}>{data?.description?.es}</H1>
        <div className="space-y-3 max-w-[300px] mx-auto">
          {data.navs.map((x, index) => (
            <div
              onClick={() => {
                //     window.open("");
              }}
              key={index}
              className={`${x.bg} rounded-3xl max-w-[300px] flex justify-center items-center p-3 space-x-3 hover:scale-105 duration-300 active:scale-95 hover:saturate-200 active:saturate-100`}
            >
              <Icons size={35} icon={x.icon} />
              <H1 size={"1.5em"}>{x.name}</H1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrintSocialMedia;
