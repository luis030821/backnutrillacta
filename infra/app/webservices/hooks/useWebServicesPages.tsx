import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { formatOrganization } from "../page/router/components/ModalCreatePage";
import { createProviderFn, useMessage, useTranslate } from "cllk";
import { useOrganization } from "@llampukaq/realm-organizations";
import { useCollection } from "@llampukaq/realm";
import { Organization } from "@/types/types";
export interface Page {
  pageId: any;
  created: Date;
  path: string;
  title: {
    en: string;
    es: string;
  };
  organizationId: string;
  day: {
    name: string;
    value: boolean;
  }[];
  hour: {
    open: string;
    close: string;
  };
  resources?: any[];
}
function useWebServicesPages() {
  const routerReserve1 = ["llampukaq", "me", "tree"];

  const { message, messagePromise } = useMessage();
  const { translate } = useTranslate();
  const { organization } = useOrganization<Organization>();
  const collection = useCollection("webservices", "pages");
  const [pages, setPages] = useState<Page[]>();
  const [page, setPage] = useState<Page>();
  useEffect(() => {
    find();
  }, []);
  const find = async () => {
    const res = await collection?.find({
      organizationId: "nutrillacta",
    });
    setPages(res);
  };
  const reserveRoutes = () => {
    return [
      ...routerReserve1,
      //@ts-ignore
      ...pages?.map((x) => {
        return x.path.slice(1);
      }),
    ];
  };
  const crear = async (name: any) => {
    messagePromise(
      async function () {
        const input = name;
        const data = {
          pageId: nanoid(11),
          created: new Date(),
          path: `/${formatOrganization(input)}`,
          title: await translate(input),
          organizationId: "nutrillacta",
        };
        const routerReserve = reserveRoutes();
        if (routerReserve.includes(input)) {
          message({
            type: "alert",
            description: "Ruta usuada o reservada",
          });
          throw new Error();
        } else {
          const res = await collection?.insertOne(data);
          if (res?.insertedId) {
            find(); // Actualizar la lista después de la inserción
          }
        }
      },
      {
        error: "Ha ocurrido un error al crear la página",
        pending: "Creando página...",
        success: "Página creada con éxito",
      }
    );
  };
  const actualizarInput = async (input: string) => {
    messagePromise(
      async function () {
        const routerReserve = [
          ...routerReserve1,
          //@ts-ignore
          ...pages?.map((x) => {
            return x.path.slice(1);
          }),
        ];
        if (routerReserve.includes(input)) {
          message({
            type: "alert",
            description: "Ruta usuada o reservada",
          });
          throw new Error();
        } else {
          const data = {
            title: await translate(input),
            path: `/${formatOrganization(input)}`,
          };
          await collection?.findOneAndUpdate(
            { pageId: page?.pageId },
            { $set: data }
          );
          find();
        }
      },
      {
        error: "Ha ocurrido un error al actualizar la página",
        pending: "Actualizando página...",
        success: "Página actualizada con éxito",
      }
    );
  };
  const actualizar = async (updatedPageData: any) => {
    messagePromise(
      async function () {
        await collection?.findOneAndUpdate(
          { pageId: page?.pageId },
          { $set: updatedPageData }
        );
        find();
      },
      {
        error: "Ha ocurrido un error al actualizar la página",
        pending: "Actualizando página...",
        success: "Página actualizada con éxito",
      }
    );
  };
  const deletePage = async () => {
    messagePromise(
      async function () {
        await collection?.findOneAndDelete({ pageId: page?.pageId });
        find();
      },
      {
        error: "Ha ocurrido un error al eliminar la página",
        pending: "Eliminando página...",
        success: "Página eliminada con éxito",
      }
    );
  };
  const addResource = async (data: {
    type: "products" | "components";
    id: string;
  }) => {
    messagePromise(
      async function () {
        const res = await collection?.findOneAndUpdate(
          { pageId: page?.pageId },
          {
            $push: { resources: data },
          }
        );
        find();
      },
      {
        error: "Ha ocurrido un error al añadir recursos",
        pending: "Añadiendo recursos...",
        success: "Recursos añadidos con éxito",
      }
    );
  };
  const createHome = async () => {
    await collection?.insertOne({
      pageId: nanoid(11),
      created: new Date(),
      path: "/",
      title: { en: "Home", es: "Home" },
      organizationId: "nutrillacta",
    });
    await find();
  };
  const deleteResource = async (id: string) => {
    messagePromise(
      async function () {
        await collection?.findOneAndUpdate(
          { pageId: page?.pageId },
          {
            $pull: { resources: { id } },
          }
        );
        find();
      },
      {
        error: "Ha ocurrido un error al eliminar recursos",
        pending: "Eliminando recursos...",
        success: "Recursos eliminados con éxito",
      }
    );
  };
  return {
    createHome,
    pages,
    createPage: crear,
    updatePage: actualizar,
    deletePage,
    page,
    setPage,
    addResource,
    deleteResource,
    actualizarInput,
  };
}

export default useWebServicesPages;
const [WerServicesPagesProvider, useWSPA] =
  createProviderFn<typeof useWebServicesPages>(useWebServicesPages);
export { WerServicesPagesProvider, useWSPA };
