import SearchProduct from "@/components/developer/SearchProduct";
import { Button, Img, ModalDownTrigger, Text } from "cllk";
import React from "react";
import { useProductSimple } from "../../Products";

import { useProductManager } from "../productManagement/ProductManagementProvider";
import { product } from "../../hooks/useProducts";

function RecomendedProductsCreate() {
  const { products } = useProductSimple();
  const { setRecomended, recomended } = useProductManager();
  return (
    <section className="w-11/12 mx-auto dark:bg-zinc-800 rounded-3xl p-5">
      <Text className="dark:text-white" type="BodyLg(Medium)">
        Recomendados
      </Text>
      <Text className="dark:text-white/50" type="BodyMd">
        Pon aqui todos los productos que recomiendes,esto se hace con el fin de
        que seas tu quien decide los productos recomendados
      </Text>
      <div className="flex">
        {recomended?.map((x, index) => (
          <div key={index}>
            <PrintProduct
              key={index}
              index={parseFloat(x?.charAt(x?.length - 1))}
              product={products?.find(
                (e) => e.productId == x?.substring(0, x.length - 1)
              )}
            />
          </div>
        ))}
      </div>
      <ModalDownTrigger
        trigger={
          <Button center className="my-10">
            Agregar Productos
          </Button>
        }
        title="Productos"
      >
        {(modalProductos) => (
          <SearchProduct
            onClick={(data) => {
              const productId = data.id;
              //@ts-ignore
              setRecomended((prev) => {
                return [...prev, productId];
              });
              modalProductos.close();
            }}
            products={products}
          />
        )}
      </ModalDownTrigger>
    </section>
  );
}

export default RecomendedProductsCreate;

export const PrintProduct = ({
  product,
  index,
}: {
  product: product | undefined;

  index: number;
}) => {
  const variant = product?.variants[index];
  return (
    <div className="flex flex-col p-2 rounded-xl items-center w-full">
      <div className="w-12 h-12 rounded-xl">
        <Img width="40" link src={variant?.img?.src} className="rounded-xl" />
      </div>
      <div className="px-2">
        <Text type="BodySm(Medium)" className="text-center">
          {product?.title} {variant?.name}
        </Text>
      </div>
    </div>
  );
};
