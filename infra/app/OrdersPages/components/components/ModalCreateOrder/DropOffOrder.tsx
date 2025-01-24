import {
  Button,
  Input,
  Map,
  MapPrint,
  ModalFooter,
  ModalTrigger,
  Text,
} from "cllk";
import { nanoid } from "nanoid";
import React from "react";

function DropOffOrder({
  handleChange,

  addressDelivey,
}: {
  handleChange: any;
  address: any;
  addressDelivey: any;
  setPedidosYa: any;
  setAddressDelivery: any;
}) {
  return (
    <div>
      <div className="w-10/12 mx-auto div dark:bg-zinc-800 rounded-3xl p-10 space-y-5">
        <div>
          <Text type="BodyMd(Medium)">Informacion de entrega</Text>
          <Text type="BodySm">
            Esta informacion es necesaria para la entrega de manera correcta
          </Text>
        </div>
        <div className="flex justify-center items-center">
          <ModalTrigger
            full
            title="Orden"
            trigger={<Button>Agrega entrega </Button>}
          >
            {(modal) => (
              <>
                <div className="aspect-video w-10/12 mx-auto">
                  <Map
                    onClick={(e) => {
                      handleChange({ target: { value: e } }, "map");
                      handleChange({ target: { value: e.lat } }, "latitude");
                      handleChange({ target: { value: e.lng } }, "longitude");
                    }}
                  />
                </div>
                <div className="flex flex-wrap gap-5 justify-center">
                  <Input
                    onChange={(e) => {
                      handleChange(e, "addressStreet");
                    }}
                    label="Dirección"
                  />
                  <Input
                    onChange={(e) => {
                      handleChange(e, "addressAdditional");
                    }}
                    label="información adicional"
                  />

                  <Input
                    onChange={(e) => {
                      handleChange(e, "name");
                    }}
                    label="Preguntar por "
                  />
                  <Input
                    minLength={9}
                    maxLength={10}
                    type="tel"
                    onChange={(e) => {
                      handleChange(e, "phone");
                    }}
                    label="Celular"
                  />

                  <Input
                    required={false}
                    type="email"
                    onChange={(e) => {
                      handleChange(e, "notificationMail");
                    }}
                    label="Email(opcional)"
                  />
                  <Input
                    onChange={(e) => {
                      handleChange(e, "instructions");
                    }}
                    label="Instrucciones entrega"
                  />
                </div>

                <ModalFooter onClick={modal.close}>Crear</ModalFooter>
              </>
            )}
          </ModalTrigger>
        </div>
      </div>
      <div className="w-10/12 mx-auto div dark:bg-zinc-800 rounded-3xl p-10  my-5 space-y-3">
        <Text type="BodyMd(Medium)">Datos de entrega</Text>
        {addressDelivey?.map != undefined && (
          <div className="w-10/12 mx-auto aspect-video rounded-3xl max-w-[600px]">
            <MapPrint position={addressDelivey?.map} />
          </div>
        )}

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
          <Text type="BodySm">{addressDelivey?.addressStreet}</Text>
        </div>
        <div className="flex justify-between">
          <Text type="BodyMd(Medium)">Instrucciones retiro</Text>
          <Text type="BodySm">{addressDelivey?.instructions}</Text>
        </div>
      </div>
    </div>
  );
}

export default DropOffOrder;
