import { Icons, Text } from "cllk";
import React from "react";

function Resume() {
  return (
    <div className="p-10 flex gap-10 flex-wrap">
      {[...Array(10)].map((x, index) => (
        <div className="bg-zinc-800 p-10 flex rounded-3xl w-min space-x-5 mx-auto">
          <Icons size={100} icon="IconBuildingStore" />
          <div>
            <Text type="BodyLg(Medium)">Productos</Text>
            <div className="flex justify-center">
              <Text type="BodyLG">1</Text>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Resume;
