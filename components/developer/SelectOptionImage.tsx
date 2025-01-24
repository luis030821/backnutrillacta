import useDownload from "@/hooks/useDownload";
import { formats, mostrarPesoArchivo } from "@/hooks/useImageOtimization";
import { Button, H1, Option, Select, useMessage } from "cllk";
import React, { useState } from "react";

function SelectOptionImage({
  files,

  images,
  filesOp,
  setFilesOp,
}: {
  files: any;
  images: any;
  filesOp: any;
  setFilesOp: any;
}) {
  const [format, setFormat] = useState("webp");
  const [quality, setQ] = useState("80");
  const ArraysSizeOp = (files: unknown[]) => {
    let sum = 0;
    //@ts-ignore
    files.forEach((x: { img: { size: number } }) => {
      sum = x.img.size + sum;
    });
    return sum;
  };

  const { optimizationFetch } = useOptimization(
    files?.[0],
    images,
    //@ts-ignore
    setFilesOp,
    {
      quality,
      format,
    }
  ); //@ts-ignore
  const { download } = useDownload(filesOp);
  return (
    <>
      <div className=" flex justify-around items-center">
        <Select defaultKey={"webp"} defaultValue={"webp"}>
          {formats.map((x, index) => (
            <Option value={x.value}>{x.key}</Option>
          ))}
        </Select>

        {filesOp != undefined ? (
          <>
            <Button onClick={optimizationFetch}>Generar</Button>
            <Button onClick={download}>Descargar</Button>
          </>
        ) : (
          <Button onClick={optimizationFetch}>Generar</Button>
        )}
      </div>
      <div>
        {filesOp != undefined && (
          <H1>
            El peso optimizado total es:{" "}
            {mostrarPesoArchivo(ArraysSizeOp(filesOp))}
          </H1>
        )}
      </div>
      <div className="flex flex-col justify-center w-[300px] mx-auto">
        <H1> Calidad de imagen al {quality}%</H1>
        <input
          type="range"
          min={1}
          max={100}
          value={quality}
          onChange={(e) => {
            setQ(e.target.value);
          }}
        />
      </div>
    </>
  );
}

export default SelectOptionImage;

function useOptimization(
  icon: (File & { preview: string }) | undefined,
  //@ts-ignore
  images: typeof imagesData,
  setFilesOp: (data: unknown[]) => void,
  data: object
) {
  const { messagePromise } = useMessage();
  const optimizationFetch = async () => {
    const url = `https://imagescompress-luisgarrido0987.b4a.run/?`;

    if (icon != undefined) {
      messagePromise(
        //@ts-ignore
        async () => {
          const s = await fetch(icon.preview);
          const blob = await s.blob();
          const form = new FormData();
          form.append("image", blob);
          const res = await Promise.all(
            //@ts-ignore
            images.map(async (imgs) => {
              const params = {
                ...data,
                width: imgs.width.toString(),
                height: imgs.height.toString(),
              };
              const p = new URLSearchParams(params);
              const response = await fetch(url + p, {
                method: "POST",
                headers: {
                  "Access-Control-Allow-Origin": "*",
                },
                body: form,
              });
              const img = await response.blob();
              const rt = {
                img,
                name: imgs.title,
              };
              return rt;
            })
          );
          //@ts-ignore
          setFilesOp(res);
        },
        {
          pending: "Optimizando imagenes",
          success: "Imagenes generadas correctamente",
          error: "Error",
        }
      );
    }
  };
  return { optimizationFetch };
}
