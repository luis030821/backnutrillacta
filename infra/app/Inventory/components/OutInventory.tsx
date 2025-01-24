import { product } from "@/infra/products/hooks/useProducts";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useInventory } from "../hooks/useInventory";

import {
  Button,
  Icons,
  Img,
  Input,
  modal,
  ModalFooter,
  ModalTrigger,
  P,
  Text,
} from "cllk";
import { nanoid } from "nanoid";
import useScannerHardware from "@/hooks/useScannerHardware";

function OutInventory({
  product,
  productVariant,
  index,
}: {
  filter: "all" | "inventory" | "without";
  productVariant: any;
  product: product;
  index: number;
}) {
  return (
    <>
      <div className="dark:bg-zinc-800 bg-zinc-200 w-11/12 mx-auto rounded-3xl p-5 flex justify-between items-center ">
        <div className="flex flex-col sapce-y-5 items-center space-x-5">
          <div className="w-10 aspect-square">
            <Img width="60" link src={productVariant?.img?.src} />
          </div>
          <div className="w-20 md:w-full">
            <P>
              {product.title} {productVariant.name}
            </P>
            {product.private && (
              <div className="dark:bg-green-900 rounded-xl flex justify-center">
                <P color="text-white">Privado</P>
              </div>
            )}
          </div>
        </div>
        <div className="flex space-x-5 flex-col justify-center space-y-5 md:flex-row md:space-y-0">
          <div className="flex space-x-5">
            <div className="flex justify-center items-center">
              <P>Sin inventario agregado</P>
            </div>
          </div>

          <div>
            <ModalTrigger
              title={`Agregar inventario ${product.title} ${productVariant.name}`}
              trigger={
                <Button
                  title={`Agregar inventario`}
                  icon={<Icons icon="IconPlus" />}
                >
                  Agregar inventario
                </Button>
              }
            >
              {(modal) => (
                <BarcodeScannerForm
                  index={index}
                  modal={modal}
                  product={product}
                />
              )}
            </ModalTrigger>
          </div>
        </div>
      </div>
    </>
  );
}

export default OutInventory;
function BarcodeScannerForm({
  modal,
  product,
  index,
}: {
  modal: modal;
  product: any;
  index: any;
}) {
  const { register, reset, handleSubmit } = useForm();
  const { createInventory } = useInventory();
  const { barcode, resetBarcode } = useScannerHardware();
  return (
    <>
      <Text type="BodySm">
        Ten encuenta que el minimo y maximo te permiten organizar inventario,
        para poder hacer lista automatica de compras
      </Text>
      <Text type="BodyMd(Medium)">Barcode: {barcode}</Text>
      <form
        onSubmit={async (e) => {
          modal.close();
          handleSubmit(async (e) => {
            const add = {
              inventoryId: nanoid(11),
              productId: `${product.productId}${index}`,
              barcode,
              private: product.private ?? false,
              ...e,
            };
            await createInventory(add);
            resetBarcode();
            reset();
          })(e);
        }}
      >
        <Input register={register} name="stock" type="number" label="Stock" />
        <Input register={register} name="min" type="number" label="Minimo" />
        <Input register={register} name="max" type="number" label="Maximo" />
        <Input
          step={"any"}
          register={register}
          name="priceProvider"
          type="number"
          label="Precio de compra"
        />

        <ModalFooter type="submit" modal={modal}>
          Agregar
        </ModalFooter>
      </form>
    </>
  );
}
