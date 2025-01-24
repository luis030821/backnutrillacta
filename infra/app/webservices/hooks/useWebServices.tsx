import { createProviderFn, useIsLoading, useMessage } from "cllk";

import { useOrganization } from "@llampukaq/realm-organizations";
import { useCollection, useUserRealm } from "@llampukaq/realm";
import { Organization } from "@/types/types";

import { usePageContext } from "@/context/store/PageProvider";
import { useEffect, useState } from "react";
function useWebServices() {
  const { deployment } = usePageContext();
  const [page, setPage] = useState<{
    envs: { attribute: string; value: string }[];
    domain: string[];
    builds: number;
    version: string;
  }>();
  const { userRealm } = useUserRealm();
  const collectionProject = userRealm
    ?.mongoClient("mongodb-atlas")
    .db("organization")
    .collection("projects");
  const load = async () => {
    try {
      const result = await collectionProject?.findOne({
        organizationId: "nutrillacta",
      });
      setPage(result); // Assuming result is the value you want to set for the page
    } catch (error) {
      console.error("Error loading page:", error);
    }
  };
  useEffect(() => {
    load();
  }, []);
  const isLoading = useIsLoading();
  const { organization } = useOrganization<Organization>();
  const collection = useCollection("organization", "projects");
  const { messagePromise } = useMessage();
  const updateSettings = async (data: any) => {
    messagePromise(
      async function () {
        await collection?.findOneAndUpdate(
          {
            organizationId: "nutrillacta",
          },
          { $set: data }
        );
        await load();
      },
      {
        error: "Error al actualizar la configuración web.",
        pending: "Actualizando configuraciones web...",
        success: "La configuración web se ha actualizado con éxito.",
      }
    );
  };

  const addAsset = async (data: any) => {
    await collection?.findOneAndUpdate(
      {
        organizationId: "nutrillacta",
      },
      { $push: { assets: data } }
    );
  };

  return {
    webservices: page,
    addAsset,
    isLoading,
    updateSettings,
    deployment,
    //@ts-ignore
    envs: page?.envs,
  };
}

export default useWebServices;
const [WebServicesProvider, useWS] =
  createProviderFn<typeof useWebServices>(useWebServices);
export { WebServicesProvider, useWS };
