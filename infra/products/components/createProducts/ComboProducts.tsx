import React from "react";
import { useProductSimple } from "../../Products";
import { useProductManager } from "../productManagement/ProductManagementProvider";
import { Button, ModalDownTrigger, Text } from "cllk";
import SearchProduct from "@/components/developer/SearchProduct";
import { PrintProduct } from "./RecomendedProductsCreate";
function ComboProducts() {
  const { products } = useProductSimple();
  const { setCombo, combo } = useProductManager();
  return (
    <section className="w-11/12 mx-auto dark:bg-zinc-800 rounded-3xl p-5">
      <Text className="dark:text-white" type="BodyLg(Medium)">
        Combos
      </Text>
      <Text className="dark:text-white/50" type="BodyMd">
        A continuación, enumere todos los productos que forman parte de una
        promoción combinada, con el propósito de facilitar la gestión del
        inventario.
      </Text>
      <div className="flex">
        {combo?.map((x, index) => (
          <div key={index}>
            <div key={index}>
              <PrintProduct
                key={index}
                index={parseFloat(x?.charAt(x?.length - 1))}
                product={products?.find(
                  (e) => e.productId == x?.substring(0, x.length - 1)
                )}
              />
            </div>
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
              setCombo((prev) => {
                return [...(prev ?? []), productId];
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

export default ComboProducts;
