import React, { useEffect, useState } from "react";
import { useInventory } from "../hooks/useInventory";
import { Icons, Text } from "cllk";

function InventorySearch({
  setFilter,
  filter,
  setPro,
}: {
  setFilter: any;
  filter: any;
  setPro: any;
}) {
  const { products, inventory } = useInventory();
  const [value, setValue] = useState("");
  const data: {
    title: string;
    id: "all" | "inventory" | "without";
    number?: number;
  }[] = [
    {
      title: "Todos los productos",
      id: "all",
      //@ts-ignore
      number: inventory?.length + (products?.length - inventory?.length),
    },
    { title: "En Inventario", id: "inventory", number: inventory?.length },
    {
      title: "Sin Inventario",
      id: "without",
      //@ts-ignore
      number: products?.length - inventory?.length,
    },
  ];
  const filteredProducts = products?.filter((product) => {
    const formattedTitle = product?.title
      ?.toLowerCase()
      ?.replace(/\s+|(.)\1+/g, "$1");
    //@ts-ignore
    return formattedTitle?.includes(
      value?.toLowerCase().replace(/\s+|(.)\1+/g, "$1")
    );
  });

  useEffect(() => {
    setPro(value == "" ? products : filteredProducts);
  }, [value, products]);
  return (
    <>
      <div className="flex justify-center space-x-5 items-center my-2">
        <Text type="H3">Inventario</Text>
      </div>
      <div className="border-2 max-w-[300px] rounded-3xl py-1 pr-1 pl-4 flex justify-between mx-auto border-white/20">
        <input
          className="bg-transparent outline-none w-full dark:text-white"
          placeholder="Buscar"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <div className="dark:bg-white/20 rounded-full w-min p-1">
          <Icons icon="IconSearch" />
        </div>
      </div>
      <div className="flex space-x-3 justify-center md:justify-end w-11/12 mx-auto mt-2">
        {data.map((x, index) => (
          <div
            onClick={() => {
              setFilter(x.id);
            }}
            key={index}
            className={`${
              filter == x.id ? "dark:bg-green-900" : "dark:bg-zinc-900"
            }  w-min rounded-xl p-2 flex justify-center items-center space-x-2`}
          >
            <Text type="BodySm">{x.title}</Text>
            <Text type="BodyMd(Medium)">({x?.number})</Text>
          </div>
        ))}
      </div>
    </>
  );
}

export default InventorySearch;
