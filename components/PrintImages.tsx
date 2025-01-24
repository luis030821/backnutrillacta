import React, { ReactElement, ReactNode } from "react";

function PrintImages({
  img,
  children,
}: {
  img:
    | {
        src: string;
      }
    | {
        src: string;
      }[];
  children: ReactElement;
}) {
  return (
    <>
      {Array.isArray(img) ? (
        <>
          {img.map((x) => (
            <>{React.cloneElement(children, { src: x?.src })}</>
          ))}
        </>
      ) : (
        <>{React.cloneElement(children, { src: img?.src })}</>
      )}
    </>
  );
}

export default PrintImages;
