import { Organization, ReturnType } from "@/types/types";
import { useOrganization } from "@llampukaq/realm-organizations";
import { useCollection } from "@llampukaq/realm";
import { createContext, useContext, useEffect, useState } from "react";
import { useMessage } from "cllk";
interface ac {
  js: any;
  css: any;
  html: any;
  date: Date;
}
export interface Component {
  componentId: string;
  organizationId: string;
  title: { es: string; en: string };
  actually?: ac;
  history1?: ac;
  history2?: ac;
  history3?: ac;
  history4?: ac;
  history5?: ac;
}
function useWebServicesComponents() {
  const { organization } = useOrganization<Organization>();

  const { messagePromise } = useMessage();
  const collection = useCollection("webservices", "components");
  const [components, setData] = useState<Component[]>();
  const [component, setComponent] = useState<Component>();
  const find = async () => {
    const res = await collection?.find({
      organizationId: "nutrillacta",
    });
    setData(res);
  };
  const updateComponent = async (updatedPageData: any) => {
    messagePromise(
      async function () {
        const data = {
          ...updatedPageData,
          history1: component?.actually ?? false,
          history2: component?.history1 ?? false,
          history3: component?.history2 ?? false,
          history4: component?.history3 ?? false,
          history5: component?.history4 ?? false,
        };

        const res = await collection?.findOneAndUpdate(
          { componentId: component?.componentId },
          {
            $set: data,
          },
          { returnNewDocument: true }
        );

        setComponent(res);
        await find();
      },
      {
        error: "Ha ocurrido un error al actualizar los componentes.",
        pending: "Actualizando componentes...",
        success: "Componentes actualizados con éxito",
      }
    );
  };

  const createComponent = async (newPageData: any) => {
    messagePromise(
      async function () {
        const res = await collection?.insertOne(newPageData);
        if (res?.insertedId) {
          find(); // Actualizar la lista después de la inserción
        }
      },
      {
        error: "Ha ocurrido un error al crear el componente.",
        pending: "Creando componente...",
        success: "Componente creado con éxito",
      }
    );
  };
  const deleteComponent = async () => {
    messagePromise(
      async function () {
        await collection?.findOneAndDelete({
          componentId: component?.componentId,
        });
        find(); // Actualizar la lista después de la inserción
      },
      {
        error: "Ha ocurrido un error al eliminar el componente.",
        pending: "Eliminando componente...",
        success: "Componente eliminado con éxito",
      }
    );
  };
  useEffect(() => {
    find();
  }, []);
  const r = {
    components,
    createComponent,
    updateComponent,
    deleteComponent,
    component,
    setComponent,
  };
  return r;
}

export default useWebServicesComponents;
const Context = createContext({});
export const WebServicesComponentProvider = ({ children }: any) => {
  const value = useWebServicesComponents();
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
export const useWSC = () => {
  type rt = ReturnType<typeof useWebServicesComponents>;
  //@ts-ignore
  const value = useContext(Context) as rt;
  return value;
};
