import React, { useEffect, useState } from "react";
import { useCP } from "../context/CategoryProductProvider";
export interface Shop {
  productId: string;
  count: number;
}
function useCart() {
  const { products } = useCP();
  const [shop, setShop] = useState<Shop[]>([]);
  const addCart = (id: string | undefined, count: number = 1) => {
    const exist = shop?.find((x) => x.productId == id);
    if (exist) {
      if (exist.count) {
        const r = shop?.map((x) =>
          x.productId == id ? { ...x, count: x.count + count } : x
        );
        setShop(r);
      }
      if (!exist.count) {
        const r = shop?.map((x) => (x.productId == id ? { ...x, count } : x));
        setShop(r);
      }
    }
    if (!exist) {
      //@ts-ignore
      const r = [...shop, { productId: id, count }];
      //@ts-ignore
      setShop(r);
    }
  };
  const removeCartItem = (id: string | undefined, count: number = 1) => {
    const updatedCart = shop
      ?.map((item) => {
        if (item.productId === id) {
          if (item.count && item.count > 1) {
            const res = item.count - count;
            if (res == 0) {
              return null;
            }
            if (res != 0) {
              return { ...item, count: item.count - count };
            }
          } else {
            return null;
          }
        }
        return item;
      })
      .filter(Boolean);
    //@ts-ignore
    setShop(updatedCart);
  };
  const [all, setall] = useState(0);
  useEffect(() => {
    const all = shop
      // ?.filter(
      //   (x) =>
      //     x.productId ==
      //     inventory?.find((e) => e.productId == x.productId)?.productId
      // )
      .map((e) => {
        const count = e.count;
        const index = parseFloat(e.productId.charAt(e.productId.length - 1));
        const product = products?.find(
          (x) => x.productId == e.productId.substring(0, e.productId.length - 1)
        );
        return (parseFloat(product?.variants[index].price as any) *
          count) as number;
      })
      .reduce((a, b) => a + b, 0);
    setall(all);
  }, [shop]);
  return { addCart, removeCartItem, shop, all: all.toFixed(2), setShop };
}

export default useCart;
