import { data } from "@/data";
import {  modal, Text } from "cllk";
import React, { useState } from "react";

function Colorsbg({ onChange, modal }: { onChange?: any; modal: modal }) {
  const [background, setBg] = useState("black");
  const [fill, setFill] = useState("white");
  const [opacity, setO] = useState<any>(100);
  return (
    <div>
      <div className="my-10 flex space-x-10 justify-center items-center">
        <div>
          <Text type="BodySm(Medium)">Fondo</Text>
          <input
            type="color"
            value={background}
            onChange={(e) => setBg(e.target.value)}
          />
        </div>
        <div>
          <Text type="BodySm(Medium)">Fill</Text>
          <input
            type="color"
            value={fill}
            onChange={(e) => {
              setFill(e.target.value);
            }}
          />
        </div>
        <div>
          <Text type="BodySm(Medium)">Opacacidad</Text>
          <input
            type="range"
            min={1}
            max={100}
            value={opacity}
            onChange={(e) => setO(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-10">
        {data.patterns.map((x, index) => (
          <div
            className="min-w-[300px]"
            key={index}
            onClick={() => {
              onChange?.(
                `.back {background: ${background} ${bgPattern(
                  fill,
                  opacity,
                  x?.image
                )}}`
              );
              modal.close();
            }}
          >
            <Text
              className="text-center dark:text-white/80"
              type="BodySm(Medium)"
            >
              {x.name}
            </Text>
            <PatternGalleryItem
              key={x.image}
              background={background}
              fill={fill}
              opacity={opacity}
              image={x.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Colorsbg;

const bgPattern = (fill: any, opacity: any, img?: any) => {
  const svg = img
    ?.replace(
      'fill="#000"',
      `fill="${fill}" fill-opacity="${parseInt(opacity) / 100}"`
    )
    ?.replace(/\"/g, "'")
    ?.replace(/\</g, "%3C")
    ?.replace(/\>/g, "%3E")
    ?.replace(/\&/g, "%26")
    ?.replace(/\#/g, "%23");
  return `url("data:image/svg+xml,${svg}")`;
};

const PatternGalleryItem = ({ background, fill, opacity, image }: any) => {
  const bgImage = () => bgPattern(fill, opacity, image);
  return (
    <div
      style={{ background: `${background} ${bgImage()}` }}
      className="h-[400px] rounded-3xl overflow-hidden w-full"
    />
  );
};
