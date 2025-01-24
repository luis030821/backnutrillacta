import { estimateShipingOrderReturn } from "@/interface";
import { Text } from "cllk";
import dayjs from "dayjs";
import React from "react";
import localizedFormat from "dayjs/plugin/localizedFormat";
function EstimationOrders({
  pedidosYa,
  confirmaction,
  setConfirmation,
}: {
  pedidosYa: estimateShipingOrderReturn | undefined;
  confirmaction: any;
  setConfirmation: any;
}) {
  dayjs.extend(localizedFormat);
  return (
    <div>
      <Text className="text-center dark:text-white" type="BodyLg(Medium)">
        Las ofertas disponibles de envios
      </Text>
      {pedidosYa != undefined && (
        <div className="w-11/12 mx-auto div dark:bg-zinc-800 rounded-3xl p-10  my-5 space-y-3 ">
          {pedidosYa?.deliveryOffers.map((deliveryOffer, index) => (
            <div
              onClick={() => {
                //@ts-ignore
                setConfirmation(index);
              }}
              className={`${
                index == confirmaction ? "bg-green-500/50" : " bg-zinc-900"
              } p-5 rounded-3xl`}
            >
              <div className="flex justify-between">
                <Text type="BodyMd(Medium)">Precio:</Text>
                <Text type="BodyMd">{deliveryOffer.pricing.total}</Text>
              </div>
              <div className="flex justify-between">
                <Text type="BodyMd(Medium)">Tipo:</Text>
                <Text type="BodyMd">{deliveryOffer.deliveryMode}</Text>
              </div>
              <div className="flex justify-between">
                <Text type="BodyMd(Medium)">Tiempo:</Text>
                <Text type="BodyMd">
                  {dayjs(deliveryOffer.confirmationTimeLimit).format("LLL")}
                </Text>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EstimationOrders;
