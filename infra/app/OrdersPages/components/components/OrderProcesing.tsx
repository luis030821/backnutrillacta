import usePedidosYa from "@/backend/backend/usePedidosYa";
import { useInventory } from "@/infra/app/Inventory/hooks/useInventory";
import { product } from "@/infra/products/hooks/useProducts";
import { order } from "@/interface";
import { User, useCollection } from "@llampukaq/realm";
import {
  Button,
  Checkbox,
  H1,
  Icons,
  Img,
  modal,
  Modal,
  ModalFooter,
  ModalTrigger,
  P,
  Text,
  useMessage,
  useModal,
} from "cllk";
import React, { useState } from "react";

function OrdersProcesing({ data }: { data: order }) {
  return <Orders user={undefined} data={data}></Orders>;
}
export const getGreeting = () => {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 6 && hour < 12) {
    return "Buenos días";
  } else if (hour >= 12 && hour < 18) {
    return "Buenas tardes";
  } else {
    return "Buenas noches";
  }
};

export default OrdersProcesing;

function Orders({ data, user }: { data: order; user: User | undefined }) {
  const existUser = data.to.userId != "default";
  const modalProduct = useModal();
  //   const toAdrres = () => {
  //     const toAddress = { map: position };
  //     if (toAddress) {
  //       const lat = toAddress.map.lat;
  //       const lng = toAddress.map.lng;
  //       const userLat = user?.address.find(
  //         (x) => x.addressId == data?.to.addressId
  //       )?.map.lat; // Suponiendo que obtienes la ubicación del usuario de algún lugar
  //       const userLng = user?.address.find(
  //         (x) => x.addressId == data?.to.addressId
  //       )?.map.lng; // Suponiendo que obtienes la ubicación del usuario de algún lugar
  //       const mapsUrl = `https://www.google.com/maps/dir/${userLat},${userLng}/${lat},${lng}`;
  //       window.open(mapsUrl, "_blank");
  //     }
  //   };

  const collection = useCollection("order", "orders");
  const { confirmedEstimateOrder } = usePedidosYa();
  const { messagePromise } = useMessage();
  const { products } = useInventory();
  const discardOrder = async (modal: modal) => {
    modal.close();
    messagePromise(
      async () => {
        await collection?.findOneAndUpdate(
          {
            orderId: data.orderId,
          },
          {
            $set: {
              discard: true,
            },
          }
        );
      },
      {
        error: "Descartando orden",
        pending: "Descartando orden...",
        success: "Descartado con orden",
      }
    );
  };
  return (
    <div className=" text-white w-11/12 mx-auto">
      <div className="bg-zinc-800 p-5 rounded-xl flex flex-col  items-center space-x-5 space-y-4 relative">
        <div className="flex flex-col sm:flex-row gap-y-7 sm:gap-y-0 justify-evenly w-full min-h-[100px] space-x-5">
          <div className="border cursor-pointer h-max absolute top-3 left-3">
            <ModalTrigger
              trigger={<Icons icon="IconTrash"></Icons>}
              title="Descartar pedido"
            >
              {(modal) => (
                <>
                  <H1>Estas seguro de descartar este pedido</H1>
                  <ModalFooter
                    onClick={() => {
                      discardOrder(modal);
                    }}
                    modal={modal}
                  >
                    Descartar
                  </ModalFooter>
                </>
              )}
            </ModalTrigger>
          </div>
          {existUser && (
            <>
              <div
                id="NOMBRE INFO"
                className="items-center flex gap-3 justify-center"
              >
                <div className="">
                  {/* @ts-ignore */}
                  <h1 className="text-[1.3rem] max-w-[150px]">{user?.name}</h1>
                  <a
                    target="_blank"
                    href={`https://api.whatsapp.com/send?phone=593${user?.address
                      .find((x) => x.addressId == data?.to.addressId)
                      ?.phone.substring(
                        1
                      )}&text=${getGreeting()}, licoreria Spondylus ha recibido su pedido. Para continuar con su compra, por favor envie el comprobante de pago.`}
                  >
                    {`${
                      user?.address.find(
                        (x) => x.addressId == data?.to.addressId
                      )?.phone
                    }`}
                  </a>
                </div>
              </div>
            </>
          )}
          {!existUser && <></>}

          <div className="flex flex-col justify-between space-y-2 w-[180px]">
            <div className="w-full flex flex-col bg-zinc-900 p-2 rounded-xl">
              <div className="flex space-x-2">
                <Text type="BodySm(Medium)">Id:</Text>
                <Text type="BodySm">{data.orderId}</Text>
              </div>
              <div>
                {data.confirmationCode != undefined && (
                  <div className="flex flex-col">
                    <h1>ConfirmacionCode</h1>
                    <p>{data?.confirmationCode}</p>
                  </div>
                )}
              </div>
              <div>
                {data.shareLocationUrl != undefined && (
                  <div className="flex flex-col">
                    <h1>ConfirmacionCode</h1>
                    <p
                      onClick={() => {
                        window.open(data.shareLocationUrl, "_blank");
                      }}
                    >
                      {data.shareLocationUrl}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full bg-zinc-900 p-2 rounded-xl" id="DIRERCION">
              {data.to.addressId == "PICKUP" ? (
                <Text type="BodySm(Medium)">PICKUP</Text>
              ) : (
                <>
                  <Text type="BodySm(Medium)">Dirección</Text>
                  <p className="sm:max-w-[180px] sm:min-w-[180px]">
                    {
                      //@ts-ignoreI
                      user?.address.find(
                        //@ts-ignore
                        (x) => x.addressId == data?.to.addressId
                      )?.reference
                    }{" "}
                  </p>
                </>
              )}
            </div>
            <div className="w-full flex flex-col bg-zinc-900 p-2 rounded-xl">
              <div className="flex space-x-2">
                <Text type="BodySm(Medium)">Metodo de pago:</Text>
                <Text type="BodySm">{data.payment}</Text>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 p-3 rounded-xl w-[300px]" id="PEDIDO">
            <Text type="BodyLg(Medium)">
              Pedido <span className="text-white/50">({data.shop.length})</span>
              <span>
                $
                {typeof data?.price == "string"
                  ? parseFloat(data?.price).toFixed(2)
                  : data?.price?.toFixed(2)}
              </span>
            </Text>
            <div className="flex gap-2 flex-col">
              <ul className="text-[1rem]">
                {data.shop.map((producto, index) => {
                  if (index > 5)
                    return (
                      <div
                        onClick={modalProduct.open}
                        className="underline text-blue-500"
                      >
                        ...Ver todo
                      </div>
                    );
                  var product = products?.find(
                    (e) =>
                      e.productId ==
                      producto.productId.substring(
                        0,
                        producto.productId.length - 1
                      )
                  );
                  var index = parseInt(
                    producto.productId.charAt(producto.productId.length - 1)
                  );
                  return (
                    <li>
                      - <span className="text-white/50">x{producto.count}</span>{" "}
                      {product?.title}{" "}
                      {product?.variants && (
                        <span className="text-white/50">
                          {product?.variants[index].name}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="" id="POR HACER">
            <Text type="BodyMd(Medium)">Hacer:</Text>
            <Text type="BodySm" className="sm:max-w-[140px]">
              {Number(data.status) >= 0
                ? " Verificar pago a traves de Whastapp"
                : ""}
              {Number(data.status) >= 50
                ? "Empacar productos y esperar al repartidor"
                : ""}
              {Number(data.status) >= 100 ? " bg-orange-600" : ""}
            </Text>
          </div>
          <div className="flex flex-col" id="AVANZAR ESTADO">
            <Text type="BodyMd(Medium)">Cambiar estado:</Text>
            <div className="w-full h-full flex-col justify-evenly flex items-center relative ">
              <ModalTrigger
                title="Confirmar"
                trigger={
                  <Icons
                    className="stroke-white cursor-pointer"
                    size={40}
                    icon="IconArrowRight"
                  ></Icons>
                }
              >
                {(modal) => (
                  <div className="max-w-[300px] mx-auto ">
                    <Button
                      onClick={async () => {
                        messagePromise(
                          async () => {
                            modal.close();
                            if (data.status == "0") {
                              const res = await confirmedEstimateOrder(
                                data.estimateId,
                                data.deliveryOfferId
                              );
                              await collection?.findOneAndUpdate(
                                {
                                  orderId: data.orderId,
                                },
                                {
                                  $set: {
                                    status: "50",
                                    shippingId: res.shippingId,
                                    shareLocationUrl: res.shareLocationUrl,
                                    confirmationCode: res.confirmationCode,
                                  },
                                }
                              );
                            }
                            if (data.status == "50") {
                              await collection?.findOneAndUpdate(
                                {
                                  orderId: data.orderId,
                                },
                                {
                                  $set: {
                                    status: "100",
                                  },
                                }
                              );
                            }
                          },
                          {
                            error: "Error al actualizar estado",
                            pending: "Actualizando estado del pedido",
                            success: "Exito al actualizar pedido",
                          }
                        );
                      }}
                      center
                    >
                      Confirmar
                    </Button>
                  </div>
                )}
              </ModalTrigger>
              <div className="flex justify-evenly gap-2  w-full">
                <div
                  className={`w-full h-[5px] block ${
                    Number(data.status) >= 0 ? " bg-orange-600" : "bg-white/30"
                  }`}
                ></div>
                <div
                  className={`w-full h-[5px] block ${
                    Number(data.status) >= 50 ? " bg-orange-600" : "bg-white/30"
                  }`}
                ></div>
                <div
                  className={`w-full h-[5px] block ${
                    Number(data.status) >= 100
                      ? " bg-orange-600"
                      : "bg-white/30"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal title="Productos" modal={modalProduct}>
        {data?.shop.map((x, index) => (
          <CartPrintProduct
            key={index}
            count={x.count}
            index={parseInt(x.productId.charAt(x.productId.length - 1))}
            product={products?.find(
              (e) =>
                e.productId == x.productId.substring(0, x.productId.length - 1)
            )}
          />
        ))}
      </Modal>
    </div>
  );
}

const CartPrintProduct = ({
  count,
  product,
  index,
}: {
  product: product | undefined;
  count: any;
  index: number;
}) => {
  const variant = product?.variants[index];
  const [state, setState] = useState(false);
  return (
    <div
      onClick={() => {
        setState(!state);
      }}
      className=" flex bg-gray-800 p-2 rounded-xl items-center w-full"
    >
      <div className="aspect-square rounded-xl">
        <Img link width="200" src={variant?.img?.src} className="rounded-xl" />
      </div>
      <div className="px-2 flex justify-between items-center w-full">
        <div>
          <H1 className="text-center">{product?.title}</H1>
          <P className="text-center">Cantidad:{count}</P>
        </div>
        <div>
          <Checkbox isSelected={state} />
        </div>
      </div>
    </div>
  );
};
