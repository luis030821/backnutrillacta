import { product } from "@/infra/products/hooks/useProducts";
import React from "react";
import { useForm } from "react-hook-form";
import { useInventory } from "../hooks/useInventory";
import {
  Button,
  Icons,
  Img,
  Input,
  modal,
  ModalDownTrigger,
  ModalFooter,
  P,
  Text,
} from "cllk";
import { formatInteger, formatPrice } from "@/services/Number";
import useScannerHardware from "@/hooks/useScannerHardware";

function InInventory({
  product,
  productVariant,
  index,
}: {
  filter: "all" | "inventory" | "without";
  productVariant: any;
  product: product;
  index: number;
}) {
  const { inventory } = useInventory();
  const singleInventory = inventory?.find(
    (x) => x.productId == `${product.productId}${index}`
  );

  return (
    <>
      <div className="dark:bg-zinc-800 bg-zinc-200 w-11/12 mx-auto rounded-3xl p-5 flex justify-between items-center space-x-5">
        <div className="flex flex-col items-center space-y-5">
          <div className="w-10 aspect-square">
            <Img width="60" link src={productVariant?.img?.src} />
          </div>
          <div className="w-20 md:w-full">
            <P>
              {product.title} {productVariant.name}
            </P>

            <div className="dark:bg-green-900 rounded-xl flex justify-center">
              <P color="text-white">{product.private && "Privado"}</P>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center flex-col md:flex-row space-x-5 space-y-5 md:space-y-0">
          <div className="grid grid-cols-2 lg:grid-cols-7 md:grid-cols-3  gap-5">
            {singleInventory?.barcode == "empty" ? (
              <div>
                <Text type="BodyMd(Medium)">Barcode</Text>
                <Text className="text-white/50" type="BodySm">
                  {"Sin codigo"}
                </Text>
              </div>
            ) : (
              <div>
                <Text type="BodyMd(Medium)">Barcode</Text>
                <Text className="text-white/50" type="BodySm">
                  {singleInventory?.barcode}
                </Text>
              </div>
            )}
            <div>
              <Text type="BodyMd(Medium)">Precio compra</Text>
              <Text className="text-white/50" type="BodySm">
                ${formatPrice(singleInventory?.priceProvider)}
              </Text>
            </div>
            <div>
              <Text type="BodyMd(Medium)">PVP</Text>
              <Text className="text-white/50" type="BodySm">
                ${formatPrice(productVariant?.price)}
              </Text>
            </div>
            <div>
              <Text type="BodyMd(Medium)">Estimación Inventario</Text>
              <Text className="text-white/50" type="BodySm">
                $
                {formatPrice(
                  // @ts-ignore
                  formatPrice(productVariant?.price) *
                    // @ts-ignore
                    formatInteger(singleInventory?.stock)
                )}
              </Text>
            </div>
            <div>
              <Text type="BodyMd(Medium)">Estimación Ganancias</Text>
              <Text className="text-white/50" type="BodySm">
                $
                {formatPrice(
                  // @ts-ignore
                  formatPrice(
                    // @ts-ignore
                    productVariant?.price - singleInventory?.priceProvider
                  ) *
                    // @ts-ignore
                    formatInteger(singleInventory?.stock)
                )}
              </Text>
            </div>

            <div>
              <Text type="BodyMd(Medium)">Stock</Text>
              <Text className="text-white/50" type="BodySm">
                {singleInventory?.stock}
              </Text>
            </div>
            <div>
              <Text type="BodyMd(Medium)">Max</Text>
              <Text className="text-white/50" type="BodySm">
                {singleInventory?.max}
              </Text>
            </div>
            <div>
              <Text type="BodyMd(Medium)">Min</Text>
              <Text className="text-white/50" type="BodySm">
                {singleInventory?.min}
              </Text>
            </div>
          </div>
          <div className="flex flex-col space-y-5">
            <ModalDownTrigger
              title={`Actualizar Inventario ${product.title} ${productVariant.name}`}
              trigger={
                <Button
                  title="Actualizar inventario"
                  icon={<Icons icon="IconPlusMinus" />}
                >
                  Actualizar
                </Button>
              }
            >
              {(modal) => {
                return (
                  <UpdateInventory
                    modal={modal}
                    singleInventory={singleInventory}
                  ></UpdateInventory>
                );
              }}
            </ModalDownTrigger>
          </div>
        </div>
      </div>
    </>
  );
}

export default InInventory;
const UpdateInventory = ({
  modal,
  singleInventory,
}: {
  modal: modal;
  singleInventory: any;
}) => {
  const { barcode, resetBarcode } = useScannerHardware();
  const { register, reset, handleSubmit } = useForm();
  const { updateInventory } = useInventory();
  return (
    <>
      <>
        <Text type="BodyMd(Medium)">Barcode: {barcode}</Text>

        <form
          onSubmit={async (e) => {
            modal.close();
            handleSubmit(async (e) => {
              if (barcode == "") {
                await updateInventory(
                  //@ts-ignore
                  singleInventory?.inventoryId,
                  e
                );
                resetBarcode();
              }
              if (barcode != "") {
                await updateInventory(
                  //@ts-ignore
                  singleInventory?.inventoryId,
                  { ...e, barcode }
                );
                resetBarcode();
              }

              reset();
            })(e);
          }}
        >
          <Input
            value={singleInventory?.stock}
            register={register}
            name="stock"
            type="number"
            label="Stock"
          />
          <Input
            value={singleInventory?.min}
            register={register}
            name="min"
            type="number"
            label="Minimo"
          />
          <Input
            value={singleInventory?.max}
            register={register}
            name="max"
            type="number"
            label="Maximo"
          />
          <Input
            value={singleInventory?.priceProvider}
            register={register}
            step={"any"}
            name="priceProvider"
            type="number"
            label="Precio de compra"
          />
          <ModalFooter type="submit" modal={modal}>
            Actualizar
          </ModalFooter>
        </form>
      </>
    </>
  );
};
