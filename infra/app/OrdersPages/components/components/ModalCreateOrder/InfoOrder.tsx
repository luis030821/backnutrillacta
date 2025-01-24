import organization from "@/pages/organization";
import { Button, Text } from "cllk";
import React from "react";

function InfoOrder({
  address,
  addressDelivey,
}: {
  address: any;
  addressDelivey: any;
}) {
  return (
    <div>
      {/* <div className="w-10/12 mx-auto bg-zinc-800 p-5 rounded-3xl flex justify-between items-center">
        <Text type="BodyMd(Medium)">Mirar en mapas</Text>
        <Button
          onClick={() => {
            document.open(
              `https://www.google.com/maps/dir/${address?.map.lat},${address?.map.lng}/${addressDelivey?.map.lat},${addressDelivey?.map.lng}`
            );
          }}
        >
          Abrir
        </Button>
      </div> */}
      {address != undefined && (
        <div className="w-10/12 mx-auto div dark:bg-zinc-800 rounded-3xl p-10  my-5 space-y-3">
          <Text type="BodyMd(Medium)">Datos de retiro</Text>

          <div className="flex justify-between">
            <Text type="BodyMd(Medium)">Nombre</Text>
            <Text type="BodySm">{address?.title}</Text>
          </div>
          <div className="flex justify-between">
            <Text type="BodyMd(Medium)">Dirección</Text>
            <Text type="BodySm">{address?.addressStreet}</Text>
          </div>
          <div className="flex justify-between">
            <Text type="BodyMd(Medium)">información adicional</Text>
            <Text type="BodySm">{address?.addressAdditional}</Text>
          </div>
          <div className="flex justify-between">
            <Text type="BodyMd(Medium)">Preguntar por </Text>
            <Text type="BodySm">{address?.name}</Text>
          </div>
          <div className="flex justify-between">
            <Text type="BodyMd(Medium)">Celular</Text>
            <Text type="BodySm">{address?.phone}</Text>
          </div>
          <div className="flex justify-between">
            <Text type="BodyMd(Medium)">Instrucciones retiro</Text>
            <Text type="BodySm">{address?.instructions}</Text>
          </div>
        </div>
      )}
      <div className="w-10/12 mx-auto div dark:bg-zinc-800 rounded-3xl p-10  my-5 space-y-3">
        <Text type="BodyMd(Medium)">Datos de entrega</Text>

        <div className="flex justify-between">
          <Text type="BodyMd(Medium)">Dirección</Text>
          <Text type="BodySm">{addressDelivey?.addressStreet}</Text>
        </div>
        <div className="flex justify-between">
          <Text type="BodyMd(Medium)">información adicional</Text>
          <Text type="BodySm">{addressDelivey?.addressAdditional}</Text>
        </div>
        <div className="flex justify-between">
          <Text type="BodyMd(Medium)">Preguntar por </Text>
          <Text type="BodySm">{addressDelivey?.name}</Text>
        </div>
        <div className="flex justify-between">
          <Text type="BodyMd(Medium)">Celular</Text>
          <Text type="BodySm">{addressDelivey?.phone}</Text>
        </div>
        <div className="flex justify-between">
          <Text type="BodyMd(Medium)">Instrucciones retiro</Text>
          <Text type="BodySm">{addressDelivey?.instructions}</Text>
        </div>
      </div>
    </div>
  );
}

export default InfoOrder;
