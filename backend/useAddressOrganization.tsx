import client from "@/client";
import { AddressOrg, Organization } from "@/types/types";
import { useCollection } from "@llampukaq/realm";
import { useOrganization } from "@llampukaq/realm-organizations";
import { useLocalStorage } from "@uidotdev/usehooks";
import { createProviderFn, useMessage } from "cllk";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

function useAddOrg() {
  const [address, setAddress] = useState<AddressOrg[]>([]);

  const collection = useCollection("organization", "address");
  const { organization } = useOrganization<Organization>();
  const { messagePromise } = useMessage();
  const [selectedAddress, setSelectedAddress] = useLocalStorage<
    AddressOrg | undefined
  >("addressOrg");
  useEffect(() => {
    if ("nutrillacta") {
      findAddress();
    }
  }, [organization]);

  const findAddress = async () => {
    const res = await collection?.find({
      organizationId: "nutrillacta",
    });
    if (selectedAddress == undefined) {
      setSelectedAddress(res?.find((x) => x.isMatriz));
    }
    setAddress(res ?? []);
  };

  const manageMatrizStatus = async () => {
    await collection?.findOneAndUpdate(
      {
        organizationId: "nutrillacta",
        isMatriz: true,
      },
      { $set: { isMatriz: false, addressId: nanoid(10) } }
    );
  };

  const createAddress = async (data: AddressOrg) => {
    messagePromise(
      async () => {
        if (data?.isMatriz) {
          await manageMatrizStatus();
        }
        const dataGeo = await createAddressGeo(data);
        const res = await collection?.insertOne({
          ...dataGeo,
          organizationId: "nutrillacta",
        });
        await findAddress();
        return res;
      },
      {
        error: "Error al agregar dirección",
        pending: "Agregando dirección...",
        success: "Dirección agregada",
      }
    );
  };

  const updateAddress = async (id: string, data: AddressOrg) => {
    messagePromise(
      async () => {
        if (data?.isMatriz) {
          await manageMatrizStatus();
        }
        const dataGeo = await createAddressGeo(data);
        await collection?.findOneAndUpdate(
          {
            addressId: id,
          },
          {
            $set: dataGeo,
          }
        );
        await findAddress();
      },
      {
        error: "Error al actualizar dirección",
        pending: "Actualizando dirección...",
        success: "Dirección actualizada",
      }
    );
  };
  const deleteAddress = async (id: string) => {
    messagePromise(
      async () => {
        await collection?.findOneAndDelete({ addressId: id });
        await findAddress();
      },
      {
        error: "Error al eliminar dirección",
        pending: "Eliminando dirección...",
        success: "Dirección eliminada",
      }
    );
  };
  return {
    findAddress,
    createAddress,
    updateAddress,
    deleteAddress,
    address,
    selectedAddress: selectedAddress ?? {
      addressId: "nutrillacta",
    },
    setSelectedAddress,
  };
}
const [AddressOrgProvider, useAddressOrganization] =
  createProviderFn<typeof useAddOrg>(useAddOrg);
export { useAddressOrganization, AddressOrgProvider };

export const createAddressGeo = async (data: any) => {
  const geocoding = `${client.llampukaq}/v1/geo/reverse?lat=${data.map.lat}&lng=${data.map.lng}`;
  //@ts-ignore
  const res: typeof fr = await (await fetch(geocoding)).json();
  const {
    datasource,
    lon,
    lat,
    distance,
    name,
    timezone,
    bbox,
    result_type,
    ...g
  } = res.results[0];
  return { ...data, ...g };
};
