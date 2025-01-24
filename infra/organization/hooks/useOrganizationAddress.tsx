import client from "@/client";
import { Organization } from "@/types/types";
import { useCollection } from "@llampukaq/realm";
import { useOrganization } from "@llampukaq/realm-organizations";
import { useMessage } from "cllk";

export const createAddress = async (data: any) => {
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
function useOrganizationAddress() {
  const collection = useCollection("organization", "organizations");
  const { organization } = useOrganization<Organization>();
  const { messagePromise } = useMessage();
  const addAddressOrganzation = async (data: any) => {
    messagePromise(
      async () => {
        const res = await createAddress(data);
        await collection?.findOneAndUpdate(
          {
            organizationId: "nutrillacta",
          },
          {
            $push: { address: res },
          }
        );
      },
      {
        error: "Error al agregar dirección",
        pending: "Agregando dirección...",
        success: "Dirección agregada",
      }
    );
  };
  const updateAddressOrganzation = async (
    id: string | undefined,
    data: any
  ) => {
    messagePromise(
      async () => {
        await collection?.findOneAndUpdate(
          {
            organizationId: "nutrillacta",
            "address.addressId": id,
          },
          {
            $set: { "address.$": data },
          }
        );
      },
      {
        error: "Error al actualizar dirección",
        pending: "Actualizando dirección...",
        success: "Dirección actualizada",
      }
    );
  };
  const removeAddressOrganzation = async (id: string) => {
    messagePromise(
      async () => {
        await collection?.findOneAndUpdate(
          {
            organizationId: "nutrillacta",
          },
          {
            $pull: { address: { addressId: id } },
          }
        );
      },
      {
        error: "Error al eliminar dirección",
        pending: "Eliminando dirección...",
        success: "Dirección Eliminada",
      }
    );
  };
  return {
    addAddressOrganzation,
    removeAddressOrganzation,
    updateAddressOrganzation,
  };
}

export default useOrganizationAddress;
