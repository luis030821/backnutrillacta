import { useAddressOrganization } from "@/backend/useAddressOrganization";
import { Button, MapPrint, NavLink, Text } from "cllk";
import React from "react";

function AddressBusiness() {
  const { selectedAddress } = useAddressOrganization();

  return (
    <div>
      {selectedAddress == undefined && (
        <div className="w-10/12 mx-auto dark:bg-zinc-800 rounded-3xl p-10  my-5 space-y-10">
          <div>
            <div className="flex justify-between">
              <div>
                <Text type="BodyMd(Medium)">Direcciones de la empresa</Text>
                <Text type="BodySm">
                  Debes agregar direcciones para el correcto funcionamiento del
                  programa
                </Text>
              </div>
            </div>
            <div className="flex mt-5 justify-center space-x-5">
              <NavLink href="/organization#direcciones">
                <Button center>Agregar dirección</Button>
              </NavLink>
            </div>
          </div>
        </div>
      )}

      {selectedAddress != undefined && (
        <div className="w-10/12 mx-auto div dark:bg-zinc-800 rounded-3xl p-10  my-5 space-y-3">
          <Text type="BodyMd(Medium)">Datos de retiro</Text>
          {/* @ts-ignore */}
          {selectedAddress?.map != undefined && (
            <div className="w-10/12 mx-auto aspect-video rounded-3xl max-w-[600px]">
              <MapPrint
                position={{
                  //@ts-ignore
                  lat: selectedAddress?.map.lat,
                  //@ts-ignore
                  lng: selectedAddress?.map.lng,
                }}
              />
            </div>
          )}
          <div className="flex justify-between">
            <Text type="BodyMd(Medium)">Nombre</Text>
            {/* @ts-ignore */}
            <Text type="BodySm">{selectedAddress?.title}</Text>
          </div>
          <div className="flex justify-between">
            <Text type="BodyMd(Medium)">Dirección</Text>
            {/* @ts-ignore */}
            <Text type="BodySm">{selectedAddress?.addressStreet}</Text>
          </div>
          <div className="flex justify-between">
            <Text type="BodyMd(Medium)">información adicional</Text>
            {/* @ts-ignore */}
            <Text type="BodySm">{selectedAddress?.addressAdditional}</Text>
          </div>
          <div className="flex justify-between">
            <Text type="BodyMd(Medium)">Preguntar por </Text>
            {/* @ts-ignore */}
            <Text type="BodySm">{selectedAddress?.name}</Text>
          </div>
          <div className="flex justify-between">
            <Text type="BodyMd(Medium)">Celular</Text>
            {/* @ts-ignore */}
            <Text type="BodySm">{selectedAddress?.phone}</Text>
          </div>
          <div className="flex justify-between">
            <Text type="BodyMd(Medium)">Instrucciones retiro</Text>
            {/* @ts-ignore */}
            <Text type="BodySm">{selectedAddress?.instructions}</Text>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddressBusiness;
