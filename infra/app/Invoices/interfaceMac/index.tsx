import {
  Button,
  Icons,
  Img,
  modal,
  ModalDownTrigger,
  ModalFooter,
  QrLector,
  Text,
  useMessage,
} from "cllk";
import React, { useEffect, useState } from "react";
import { useCP } from "./context/CategoryProductProvider";
import { formatString } from "@/services/String";
import useScannerHardware from "@/hooks/useScannerHardware";
import { useInventory } from "../../Inventory/hooks/useInventory";
import useCart from "./hooks/useCart";
import PrintProduct from "./components/PrintProduct";
import SearchProduct from "@/components/developer/SearchProduct";
import PrintImages from "@/components/PrintImages";
import { methodPayment } from "@/types/types";
import { useInvoice } from "../hooks/useInvoice";
import { product } from "@/infra/products/hooks/useProducts";
import { nanoid } from "nanoid";
import dayjs from "dayjs";
import useOrganizationAddress from "@/infra/organization/hooks/useOrganizationAddress";
import { useAddressOrganization } from "@/backend/useAddressOrganization";
import client from "@/client";
const CardBrand = [
  { type: "visa", name: "Visa" },
  { type: "mastercard", name: "MasterCard" },
  { type: "amex", name: "American Express" },
  { type: "diners", name: "Diners Club" },
  { type: "discover", name: "Discover" },
  { type: "alia", name: "Alia" },
  { type: "unionpay", name: "UnionPay" },
  { type: "maestro", name: "Maestro" },
];
const BankBrand = [
  { type: "pichincha", name: "Bco. Pichincha" },
  { type: "guayaquil", name: "Bco. Guayaquil" },
  { type: "deuna", name: "DeUna" },
];
const methodsPayment: { type: "card" | "cash" | "transfer"; name: string }[] = [
  { type: "card", name: "Tarjeta" },
  { type: "cash", name: "Efectivo" },
  { type: "transfer", name: "Transferencia" },
];
const Change = [1, 5, 10, 20, 50, 100];
export interface Shop {
  productId: string;
  count: number;
}
function InvoiceInterfacePages() {
  const { cards, categories, products, defaultCategory, setDefaultCategory } =
    useCP();
  const { addCart, removeCartItem, shop, all, setShop } = useCart();
  const { barcode, resetBarcode } = useScannerHardware();
  const { inventory } = useInventory();
  useEffect(() => {
    if (barcode != "" && !barcode.includes("{")) {
      const res = inventory?.find((x) => x.barcode == barcode);
      if (res != undefined) {
        addCart(res?.productId);
        resetBarcode();
        return;
      }
    }
    if (barcode != "" && barcode.includes("{")) {
      try {
        const newShop = JSON.parse(eliminarPalabraShift(barcode));
        setShop(newShop);
        resetBarcode();
        return;
      } catch (error) {}
    }
  }, [barcode]);
  function eliminarPalabraShift(cadena: string) {
    return cadena.replace(/Shift/g, "");
  }
  return (
    <div className="flex min-h-screen">
      <div className="w-2/12 min-h-screen border-r-2 p-3">
        {cards?.map((card, index) => (
          <>
            <Text
              className="text-center dark:text-white text-black capitalize"
              type="BodyMd(Medium)"
            >
              {formatString(card.title)}
            </Text>
            <div className="space-y-5 my-5">
              {categories
                ?.filter((x) => x.cardId == card.cardId)
                .map((category, index) => (
                  <div
                    onClick={() => {
                      setDefaultCategory(category);
                    }}
                    key={index}
                    className="dark:bg-zinc-800 bg-zinc-200 p-2 flex justify-center rounded-2xl"
                  >
                    <Text type="BodyMd(Medium)">{category.title}</Text>
                  </div>
                ))}
            </div>
          </>
        ))}
      </div>
      <div className="w-7/12 min-h-screen border-r-2 p-3">
        <SearchProduct
          voidProduct
          products={products}
          onClick={({ id }) => {
            addCart(id);
          }}
        />
        <Text
          className="text-center dark:text-white text-black"
          type="BodyMd(Medium)"
        >
          Productos de {defaultCategory?.title}
        </Text>
        <div className="my-5 flex flex-wrap gap-3 mx-auto">
          {products
            ?.filter((x) => x.categoryId == defaultCategory?.categoryId)
            ?.map((product) => (
              <>
                {product.variants.map((variant, index) => (
                  <div
                    onClick={() => {
                      addCart(`${product.productId}${index}`);
                    }}
                    key={index}
                    className="dark:bg-zinc-800 bg-zinc-200 flex flex-col justify-center rounded-2xl w-40 mx-auto"
                  >
                    <div className="w-full aspect-square">
                      <PrintImages img={variant?.img}>
                        <Img width="300" link />
                      </PrintImages>
                    </div>
                    <div className="p-2 flex justify-between">
                      <Text type="BodyMd(Medium)">
                        {product.title} {variant.name}
                      </Text>
                      <Text type="BodyMd">
                        ${Number(variant.price).toFixed(2)}
                      </Text>
                    </div>
                  </div>
                ))}
              </>
            ))}
        </div>
      </div>
      <div className="w-3/12 min-h-screen border-r-2 p-3 space-y-3">
        <div className="flex flex-col lg:flex-row justify-around items-center space-y-3 lg:space-y-0">
          <ModalDownTrigger
            full
            title="Qr"
            trigger={
              <Button center icon={<Icons icon="IconQrcode" />}>
                Qr
              </Button>
            }
          >
            {(modal) => (
              <QrLector
                onError={() => {}}
                onSuccess={(data) => {
                  try {
                    const res = JSON.parse(data.data);
                    setShop(res);
                    modal.close();
                  } catch (error) {}
                }}
              />
            )}
          </ModalDownTrigger>
          <Text
            className="text-center dark:text-white text-black"
            type="BodyMd(Medium)"
          >
            Resumen ${all}
          </Text>
        </div>

        <ModalDownTrigger
          full
          trigger={<Button center>Facturar</Button>}
          title={`Facturar ${" "}$${all}`}
        >
          {(modal) => {
            return (
              <Invoice
                modal={modal}
                products={products}
                shop={shop}
                all={all}
              ></Invoice>
            );
          }}
        </ModalDownTrigger>

        <div className="space-y-5 my-5">
          {shop?.map((x, index) => (
            <PrintProduct
              plus={() => {
                addCart(`${x.productId}`);
              }}
              min={() => {
                removeCartItem(`${x.productId}`);
              }}
              key={index}
              count={x.count}
              index={parseFloat(x.productId.charAt(x.productId.length - 1))}
              product={products?.find(
                (e) =>
                  e.productId ==
                  x.productId.substring(0, x.productId.length - 1)
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default InvoiceInterfacePages;
const Invoice = ({
  all,
  shop,
  products,
  modal,
}: {
  all: any;
  shop: any[];
  products: product[] | undefined;
  modal: modal;
}) => {
  const [methodPayment, setMethodPayment] = useState<methodPayment>({
    payment: "card",
    //@ts-ignore
    brand: "",
  });
  const [value, setValue] = useState("0000");
  const { selectedAddress } = useAddressOrganization();
  const { messagePromise } = useMessage();
  const createInvoiceSimple = async (
    data: {
      price: number[];
      invoice: any[];
    } & any
  ) => {
    modal.close();
    const d = {
      invoiceId: nanoid(10),
      created: new Date(),
      formatedDate: dayjs().format("L"),
      organizationId: selectedAddress.addressId,
      ...data,
    };
    const api = `${client.llampukaq}/v1/organization/${selectedAddress.addressId}/invoices`;

    messagePromise(
      async () => {
        await fetch(api, { method: "POST", body: JSON.stringify(d) });
      },
      {
        error: "Error",
        pending: "Creando factura...",
        success: "Factura creada",
      }
    );
  };
  return (
    <>
      <div>
        {/* <div>
          <Text type="BodySm">Componente datos</Text>
        </div> */}

        <div>
          <Text type="BodySm">Componente metodos de pago</Text>
          <div className="flex space-x-5 my-5">
            {methodsPayment.map((x, index) => (
              <div
                onClick={() => {
                  setMethodPayment({ ...methodPayment, payment: x.type });
                }}
                className={`${
                  methodPayment.payment == x.type
                    ? "bg-green-800"
                    : "bg-zinc-800"
                } p-5 rounded-3xl`}
                key={index}
              >
                <Text type="BodyMd(Medium)">{x.name}</Text>
              </div>
            ))}
          </div>
          {methodPayment.payment == "card" && (
            <>
              <div className="flex space-x-5 my-5 overflow-x-auto">
                {CardBrand.map((x, index) => (
                  <div
                    onClick={() => {
                      //@ts-ignore
                      setMethodPayment({ ...methodPayment, brand: x.type });
                    }}
                    className={`${
                      methodPayment.brand == x.type
                        ? "bg-green-800"
                        : "bg-zinc-800"
                    }  p-5 rounded-3xl flex-shrink-0`}
                    key={index}
                  >
                    <Text type="BodyMd(Medium)">{x.name}</Text>
                  </div>
                ))}
              </div>
            </>
          )}
          {methodPayment.payment == "transfer" && (
            <>
              <div className="flex space-x-5 my-5 overflow-x-auto">
                {BankBrand.map((x, index) => (
                  <div
                    onClick={() => {
                      //@ts-ignore
                      setMethodPayment({ ...methodPayment, brand: x.type });
                    }}
                    className={`${
                      methodPayment.brand == x.type
                        ? "bg-green-800"
                        : "bg-zinc-800"
                    }  p-5 rounded-3xl flex-shrink-0`}
                    key={index}
                  >
                    <Text type="BodyMd(Medium)">{x.name}</Text>
                  </div>
                ))}
              </div>
            </>
          )}
          {methodPayment.payment == "cash" && (
            <>
              <div>
                <div className="flex justify-between">
                  <Text type="BodyMd(Medium)">Efectivo(Cambio)</Text>
                  <Text type="BodyMd(Medium)">
                    Vuelto ${(Number(all) - Number(value) / 100).toFixed(2)}
                  </Text>
                </div>

                <div className="flex space-x-5">
                  <ModalDownTrigger
                    title="Custom"
                    trigger={
                      <div
                        className={`${
                          value.length == 4 ? "bg-green-800" : "bg-zinc-800"
                        } rounded-xl p-5`}
                      >
                        <Text type="BodyMd(Medium)">$Valor</Text>
                      </div>
                    }
                  >
                    {() => {
                      return (
                        <>
                          <p className="text-center text-[70px]">
                            ${agregarPuntoDespuesDeDosLetras(value)}
                          </p>
                          <input
                            autoFocus
                            onChange={(e) => {
                              const value = e.target.value;
                              setValue(value.padStart(4, "0"));
                              if (e.target.value.length == 0) {
                                setValue(`0000`);
                                return;
                              }
                            }}
                            placeholder="Monto a cobrar"
                            type="tel"
                            className="border border-black/30 focus-within:border-blaze-orange-400 p-2 mx-auto rounded-xl"
                          />
                          <ModalFooter>Crear</ModalFooter>
                        </>
                      );
                    }}
                  </ModalDownTrigger>
                  <div
                    onClick={() => {
                      //@ts-ignore
                      setValue(Number(all) * 100);
                    }}
                    className={`${
                      //@ts-ignore
                      (Number(all) - Number(value) / 100).toFixed(2) == 0
                        ? "bg-green-800"
                        : "bg-zinc-800"
                    } rounded-xl p-5`}
                  >
                    <Text type="BodyMd(Medium)">Justo</Text>
                  </div>
                  {Change.map((x) => (
                    <div
                      onClick={() => {
                        setValue((x * 100).toString());
                      }}
                      className={`${
                        value == (x * 100).toString()
                          ? "bg-green-800"
                          : "bg-zinc-800"
                      }  rounded-xl p-5 `}
                    >
                      <Text type="BodyMd(Medium)">${x}</Text>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        <ModalFooter
          onClick={async () => {
            await createInvoiceSimple({
              methodPayment,
              priceAll: Number(all),
              //       client:
              // user?.email == undefined
              //   ? {
              //       cliente: user?.name ?? "Default",
              //       telefono: user?.phone ?? "Default",
              //       email: user?.email,
              //       direccion:
              //         address.find((x) => x.addressId == addressId)?.formatted ??
              //         "Tumbaco",
              //       addressId,
              //     }
              //   : "Final",
              invoice: [
                ...shop.map((x) => {
                  const count = x.count;
                  const index = parseFloat(
                    x.productId.charAt(x.productId.length - 1)
                  );
                  const id = x.productId.substring(0, x.productId.length - 1);
                  const product = products?.find(
                    (x: product) => x.productId == id
                  );
                  return {
                    id: x.productId,
                    count,
                    priceUnit: Number(product?.variants[index].price),
                  };
                }),
              ],
            });
          }}
        >
          Crear factura
        </ModalFooter>
      </div>
    </>
  );
};
function agregarPuntoDespuesDeDosLetras(numero: string) {
  // Convertir el número a string para manipularlo como texto
  let numeroStr = numero.toString();

  // Comprobar si la longitud del string es mayor o igual a 2
  if (numeroStr.length > 2) {
    // Insertar el punto antes de los últimos dos caracteres
    return numeroStr.slice(0, -2) + "." + numeroStr.slice(-2);
  } else {
    // Si la longitud del string es menor o igual a 2, devolver el string original con un punto al principio
    return "." + numeroStr;
  }
}
