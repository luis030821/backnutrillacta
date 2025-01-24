import { product } from "@/infra/products/hooks/useProducts";
import React from "react";
import { useInventory } from "../hooks/useInventory";
import InInventory from "./InInventory";
import OutInventory from "./OutInventory";

const PrintInventory = ({
  product,
  productVariant,
  index,
  filter,
}: {
  filter: "all" | "inventory" | "without";
  productVariant: any;
  product: product;
  index: number;
}) => {
  const { inventory } = useInventory();
  const existInventory =
    inventory?.find((x) => x.productId == `${product.productId}${index}`) !=
    undefined;
  const singleInventory = inventory?.find(
    (x) => x.productId == `${product.productId}${index}`
  );

  return (
    <>
      {filter == "all" && (
        <>
          {existInventory ? (
            <InInventory
              filter={filter}
              index={index}
              product={product}
              productVariant={productVariant}
            />
          ) : (
            <OutInventory
              filter={filter}
              index={index}
              product={product}
              productVariant={productVariant}
            />
          )}
        </>
      )}
      {filter == "inventory" &&
        existInventory &&
        singleInventory?.stock != "0" && (
          <InInventory
            filter={filter}
            index={index}
            product={product}
            productVariant={productVariant}
          />
        )}
      {filter == "without" && (
        <>
          {existInventory ? (
            <>
              {singleInventory?.stock == "0" && (
                <InInventory
                  filter={filter}
                  index={index}
                  product={product}
                  productVariant={productVariant}
                />
              )}
            </>
          ) : (
            <OutInventory
              filter={filter}
              index={index}
              product={product}
              productVariant={productVariant}
            />
          )}
        </>
      )}
    </>
  );
};

export default PrintInventory;
