import client from "@/client";
import { useMessage } from "cllk";

function useOptimization(
  files: Array<File & { preview: string }> | undefined,
  setFilesOp: (data: { name: string; img: Blob }[]) => void,
  data: object
) {
  const { messagePromise } = useMessage();

  const optimizationFetch = async () => {
    const params = {
      ...data,
    };
    const p = new URLSearchParams(params);
    const url = `${client.image}${p}`;
    if (files !== undefined) {
      const p = async () => {
        const res = await Promise.all(
          files.map(async (file) => {
            const form = new FormData();
            form.append("image", file);
            const response = await fetch(url, {
              method: "POST",
              headers: {
                "Access-Control-Allow-Origin": "*",
              },
              body: form,
            });
            const img = await response.blob();
            const rt = {
              img,
              name: eliminarExtension(file.name),
            };
            return rt;
          })
        );
        setFilesOp(res);
      }; //@ts-ignore
      messagePromise(p, {
        pending: "Optimizando imagenes",
        success: "Imagenes optimizadas correctamente",
        error: "Error",
      });
    }
  };
  return { optimizationFetch };
}

export default useOptimization;
export function eliminarExtension(nombreArchivo: string) {
  const ultimoPunto = nombreArchivo.lastIndexOf(".");
  if (ultimoPunto !== -1) {
    return nombreArchivo.substring(0, ultimoPunto);
  }
  return nombreArchivo;
}
export const formats = [
  { value: "png", key: "png" },
  { value: "webp", key: "webp" },
  { value: "jpeg", key: "jpeg" },
];
export function mostrarPesoArchivo(size: number) {
  const pesoKB = size / 1024; // Peso en KB
  if (pesoKB >= 1000) {
    const pesoMB = pesoKB / 1024; // Peso en MB
    return `${pesoMB.toFixed(2)} MB.`;
  } else {
    return `${pesoKB.toFixed(2)} KB.`;
  }
}
