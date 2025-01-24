import { product } from "@/infra/products/hooks/useProducts";
import { Icons, Text } from "cllk";
import React from "react";

const PrintProduct = ({
  count,
  product,
  index,
  min,
  plus,
}: {
  product: product | undefined;
  count: any;
  index: number;
  plus: any;
  min: any;
}) => {
  const variant = product?.variants[index];
  return (
    <div className="dark:bg-zinc-800 bg-zinc-200 p-2 flex flex-col justify-center rounded-2xl space-y-3 relative overflow-hidden">
      <Text type="BodySm(Medium)">
        {count} {product?.title} {variant?.name}
      </Text>
      <div className="flex justify-center space-x-3">
        <div
          onClick={min}
          className="w-10 flex justify-center items-center aspect-video rounded-sm bg-red-500"
        >
          <Icons icon="IconMinus"></Icons>
        </div>
        <Text type="BodyMd(Medium)">{count}</Text>
        <div
          onClick={plus}
          className="w-10 flex justify-center items-center aspect-video rounded-sm bg-green-500"
        >
          <Icons icon="IconPlus" />
        </div>
      </div>
      <div className="flex justify-center">
        <Text type="BodySm">
          {/* @ts-ignore */}
          Total: ${(count * parseFloat(variant?.price)).toFixed(2)}
        </Text>
      </div>
      <div
        onClick={min}
        className="absolute left-0 w-6/12 h-24 bg-transparent"
      ></div>
      <div
        onClick={plus}
        className="absolute right-0 w-6/12 h-24 bg-transparent"
      ></div>
    </div>
  );
};

export default PrintProduct;
