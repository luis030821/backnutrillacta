import { AddressOrg, Organization } from "@/types/types";
import { useOrganization } from "@llampukaq/realm-organizations";
import {
  Button,
  DataStyle,
  Input,
  Map,
  ModalDownTrigger,
  ModalFooter,
  Text,
  TextArea,
  Toogle,
  modal,
  useBoolean,
  useMessage,
} from "cllk";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useOrganizationAddress from "../hooks/useOrganizationAddress";
import { nanoid } from "nanoid";
import { useAddressOrganization } from "@/backend/useAddressOrganization";

const ModalAddOrgAddress = ({
  modal,
  data,
  create = true,
}: {
  modal: modal;
  data?: AddressOrg;
  create?: boolean;
}) => {
  const { handleSubmit, register } = useForm();
  const [map, setMap] = useState<any>(data?.map);
  const { organization } = useOrganization<Organization>();
  const { createAddress, updateAddress } = useAddressOrganization();
  const isMatriz = useBoolean(data?.isMatriz);
  const { message } = useMessage();
  return (
    <form
      onSubmit={(e) => {
        handleSubmit(async (r) => {
          if (map == undefined) {
            message({
              description: "Seleciona la ubicacion en el mapa",
              type: "alert",
            });
          } else {
            const e = {
              ...r,
              isMatriz: isMatriz.value,
              addressId: isMatriz.value
                ? "nutrillacta"
                : data?.addressId ?? nanoid(10),
              map,
              latitude: map.lat,
              longitude: map.lng,
            };
            if (create) {
              //@ts-ignore
              await createAddress(e);
            } else {
              //@ts-ignore
              updateAddress(data?.addressId, e);
            }

            modal.close();
          }
        })(e);
      }}
    >
      <div className="aspect-video w-10/12 mx-auto">
        <div className="mb-10">
          <div
            onClick={isMatriz.toggle}
            className="flex justify-center space-x-10  items-center"
          >
            <Text type="BodyMd(Medium)">Matriz</Text>
            <Toogle value={isMatriz.value} />
          </div>
          {isMatriz.value && (
            <div>
              <Text type="BodySm">
                Ten en cuanta que si ya tienes una matriz, sera reemplazada, ya
                que solo puedes tener una, para hacer esto
              </Text>
            </div>
          )}
        </div>
        <ModalDownTrigger
          full
          title="Agregar mapa"
          trigger={
            <Button type="button" center>
              Mapa
            </Button>
          }
        >
          {(modal) => {
            return (
              <>
                <div className="w-10/12 aspect-square mx-auto">
                  <Map
                    onClick={(res) => {
                      setMap(res);
                    }}
                  />
                </div>
                <ModalFooter onClick={modal.close} type="button" modal={modal}>
                  Guardar
                </ModalFooter>
              </>
            );
          }}
        </ModalDownTrigger>
        {map != undefined && (
          <div>
            <DataStyle title="Langitud">{map?.lat?.toFixed(5)}</DataStyle>
            <DataStyle title="Longitud">{map?.lng?.toFixed(5)}</DataStyle>
            <Button
              type="button"
              center
              onClick={() => {
                window.open(
                  `https://www.google.com/maps/@${map.lat},map.lng,17z?entry=ttu`
                );
              }}
            >
              Mirar en Mapa
            </Button>
          </div>
        )}

        <Input
          value={data?.title}
          required
          type="text"
          register={register}
          name="title"
          label="nombre"
        />
        <Input
          value={data?.addressStreet}
          required
          type="text"
          register={register}
          name="addressStreet"
          label="Dirección"
        />
        <Input
          value={data?.addressAdditional}
          required
          type="text"
          register={register}
          name="addressAdditional"
          label="información adicional"
        />
        <Input
          value={data?.name}
          required
          type="text"
          register={register}
          name="name"
          label="Preguntar por "
        />
        <Input
          minLength={9}
          maxLength={10}
          value={data?.phone}
          required
          type="tel"
          register={register}
          name="phone"
          label="Celular"
        />
        <Input
          value={data?.email}
          required
          type="email"
          register={register}
          name="email"
          label="Email(opcional)"
        />
        <TextArea
          value={data?.instructions}
          register={register}
          required
          name="instructions"
          label="Instrucciones para el retiro"
        />
      </div>
      <ModalFooter modal={modal}>Crear</ModalFooter>
    </form>
  );
};

export default ModalAddOrgAddress;
