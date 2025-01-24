import { product } from "@/infra/products/hooks/useProducts";
import { useDebounce } from "@uidotdev/usehooks";
import { Icons, Img, Text } from "cllk";
import React, { useState } from "react";

function SearchProduct({
  returnAll = false,
  products,
  onClick,
  voidProduct = false,
}: {
  returnAll?: boolean;
  products: product[] | undefined;
  onClick?: (data: {
    description: string;
    priceUnit: string;
    id: string;
  }) => void;
  voidProduct?: boolean;
}) {
  const [valueSearch, setValue] = useState<string>("");
  const value = useDebounce(valueSearch, 0);
  const filteredProducts = products?.filter((product) => {
    const formattedTitle = product?.title
      ?.toLowerCase()
      ?.replace(/\s+|(.)\1+/g, "$1");
    //@ts-ignore
    return formattedTitle?.includes(
      value?.toLowerCase().replace(/\s+|(.)\1+/g, "$1")
    );
  });
  const returnProduct = () => {
    if (value === "" && voidProduct) {
      return [];
    } else if (value === "") {
      return products;
    } else {
      return filteredProducts;
    }
  };
  const fil = returnProduct();
  return (
    <div className="space-y-5">
      <div className="border-2 max-w-[300px] rounded-3xl py-1 pr-1 pl-4 flex justify-between mx-auto border-white/20 overflow-y-auto">
        <input
          className="bg-transparent outline-none w-full dark:text-white"
          placeholder="Buscar"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <div className="dark:bg-white/20 rounded-full w-min p-1">
          <Icons icon="IconSearch"></Icons>
        </div>
      </div>
      <div className="my-5 flex flex-wrap gap-3 mx-auto">
        {fil?.map((product, index) => (
          <>
            {product?.variants?.map((productVariant, key) => (
              <div
                onClick={() => {
                  if (returnAll) {
                    const data = {
                      type: "STANDAR",
                      value: Number(productVariant.price).toFixed(2),
                      description: `${product.title} ${productVariant.name}`,
                      sku: `${product.productId}${key}`,
                      volume: 2000,
                      weight: 1,
                    };
                    //@ts-ignore
                    onClick?.(data);
                  }
                  if (!returnAll) {
                    onClick?.({
                      id: `${product.productId}${key}`,
                      description: `${product.title} ${productVariant.name}`,
                      priceUnit: Number(productVariant.price).toFixed(2),
                    });
                  }
                }}
                key={index}
                className="dark:bg-zinc-800 bg-zinc-200 flex flex-col justify-center rounded-2xl w-40 mx-auto"
              >
                <div className="w-full aspect-square">
                  <Img width="300" link src={productVariant.img.src}></Img>
                </div>
                <div className="p-2 flex justify-between">
                  <Text type="BodyMd(Medium)">
                    {product.title} {productVariant.name}
                  </Text>
                  <Text type="BodyMd">
                    ${Number(productVariant.price).toFixed(2)}
                  </Text>
                </div>
              </div>
            ))}
          </>
        ))}
      </div>
    </div>
  );
}

export default SearchProduct;
