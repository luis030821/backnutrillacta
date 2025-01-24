import { Img } from "cllk";
import React from "react";
import Marquee from "react-fast-marquee";

function BusinessUsers() {
  return (
    <div>
      <div className="w-screen overflow-hidden bg-gradient-to-b from-gray-900 to-black/50">
        <div className="mx-auto mt-32 w-screen ">
          <div className="text-center text-3xl text-white">
            <span className="text-indigo-200">Trusted by experts.</span>
            <br />
            <span>Used by the leaders.</span>
          </div>
          <div className="mt-14">
            <Marquee>
              <Img
                width="1500"
                link
                q={50}
                src={"https://app.llampukaq.com/home/logolist.png"}
              ></Img>
              <Img
                width="1500"
                link
                q={50}
                src={"https://app.llampukaq.com/home/logolist.png"}
              ></Img>
              <Img
                width="1500"
                link
                q={50}
                src={"https://app.llampukaq.com/home/logolist.png"}
              ></Img>
            </Marquee>
          </div>
        </div>
        <div className="relative -mt-32 h-96 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#8350e8,transparent_70%)] before:opacity-40 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[100%] after:border-t after:border-[#7876c566] after:bg-zinc-900">
          <div
            id="sparkles-6355"
            className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
          >
            <canvas
              data-generated="true"
              style={{ width: "100%", height: "100%", pointerEvents: "none" }}
              aria-hidden="true"
              width={638}
              height={384}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessUsers;
