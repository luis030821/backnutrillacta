import { P } from "cllk";
import React from "react";
import { useWS } from "../hooks/useWebServices";

function DominiosWebServices({ i }: { i: number }) {
  const { webservices: WS } = useWS();
  return (
    <>
      <div className="space-y-5">
        {WS?.domain?.map((x, index) => (
          <a
            className="cursor-pointer"
            key={index}
            target="_blank"
            href={`https://${x}`}
          >
            <P>{`${x}`}</P>
          </a>
        ))}
      </div>
    </>
  );
}

export default DominiosWebServices;
