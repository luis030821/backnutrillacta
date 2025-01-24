import { Button, Icons, Img, NavLink, Text } from "cllk";
import React from "react";

function Feature1() {
  return (
    <>
      <div className="py-20 px-5 md:p-20 space-y-5">
        <div className="flex text-blue-500 stroke-blue-500 items-center">
          <Icons className="" icon="IconGlobe" size={30} />
          <Text size className="text-2xl" type="H4">
            Publish
          </Text>
        </div>

        <Text
          size
          type="H4"
          className="text-white/50 text-left max-w-[800px] text-sm md:text-2xl"
        >
          <span className="text-white">Despliega tu página web </span>
          en minutos, con nuestra infraestrutura global de datos
        </Text>
        <Button icon={<Icons icon="IconStars" />}>Start for free</Button>
      </div>
      <div className="w-10/12 mx-auto">
        <Img width="400I" link src={"http://www.llampukaq.com/home/example.jpg"}></Img>
      </div>
    </>
  );
}

export default Feature1;
