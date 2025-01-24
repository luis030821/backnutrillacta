import React from "react";
import { useProductSimple } from "../../Products";
import { useProductManager } from "../productManagement/ProductManagementProvider";
import { Button, Input, ModalDownTrigger, Text } from "cllk";
import SearchProduct from "@/components/developer/SearchProduct";

function SizeProducts({ variant, index }: { variant: any; index: number }) {
  const { products } = useProductSimple();
  const { handleVariantChange } = useProductManager();
  return (
    <section className="w-11/12 mx-auto dark:bg-zinc-800 rounded-3xl p-5">
      <Text className="dark:text-white" type="BodyLg(Medium)">
        Tamaño
      </Text>
      <Text className="dark:text-white/50" type="BodyMd">
        Modifique el tamaño para los envíos. Nosotros utilizaremos valores por
        defecto, pero no nos hacemos responsables por los errores que puedan
        ocurrir. Además, las tarifas de envío pueden cambiar si no se configuran
        correctamente.
      </Text>
      <div className="bg-zinc-800 rounded-3xl w-full p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
          <Input
            value={variant.weight}
            onChange={(e) => {
              handleVariantChange(e.target.value, index, "weight");
            }}
            label="Peso(Kg)"
          />
          <Input
            value={variant?.large}
            onChange={(e) => {
              handleVariantChange(e.target.value, index, "large");
            }}
            label="Largo(Cm)"
          />
          <Input
            value={variant?.width}
            onChange={(e) => {
              handleVariantChange(e.target.value, index, "width");
            }}
            label="Ancho(Cm)"
          />
          <Input
            value={variant?.depth}
            onChange={(e) => {
              handleVariantChange(e.target.value, index, "depth");
            }}
            label="Profundida(Cm)"
          />
        </div>
      </div>
    </section>
  );
}

export default SizeProducts;
