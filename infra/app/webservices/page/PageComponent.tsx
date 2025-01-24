import React, { ReactNode, createContext, useEffect, useState } from "react";
import { RouterComponents } from "./infra/routes";
import useWebServices from "../hooks/useWebServices";
import CompontsResources from "./components/Page/components/CompontsResources";
import PagesComponent from "./pagesComponent/PagesComponent";
import { useWSPA } from "../hooks/useWebServicesPages";
import { useWSC } from "../hooks/useWebServicesComponents";
import { H1, ICONS, Icons, useTailwdincss } from "cllk";
import {
  ResourceComponents,
  ResourceProducts,
} from "./infra/resource/ResourceComponents";

export const Context = createContext({});
function PageComponent() {
  const { setComponent } = useWSC();
  const { setPage } = useWSPA();
  const [body, setBody] = useState<{ type: "page" | "resource"; data: any }>();
  const handleRouteClick = (data: any) => {
    setBody({ type: "page", data: "" });
    setPage(data);
  };
  const { addAsset } = useWebServices();
  const handleResourceClick = (type: string, data: any) => {
    setBody({ type: "resource", data: { data, type } });

    if (type == "component") {
      setComponent(data);
    }
  };
  const value = {
    addAsset,
  };
  const { border } = useTailwdincss();

  const data: {
    icon: ICONS;
    name: any;
    component: ReactNode;
  }[] = [
    {
      icon: "IconRoute",
      name: "Rutas",
      component: <RouterComponents handleRouteClick={handleRouteClick} />,
    },
    {
      icon: "IconComponents",
      name: "Componentes",
      component: (
        <ResourceComponents handleResourceClick={handleResourceClick} />
      ),
    },
    {
      icon: "IconShoppingBag",
      name: "Productos",
      component: <ResourceProducts />,
    },
  ];
  const [selected, setSelected] = useState<ICONS | null>(null);

  return (
    <Context.Provider value={value}>
      <div className="w-full flex min-h-screen">
        <div className={`border-r-2 space-y-5 ${border}`}>
          {data.map((item, key) => (
            <div
              onClick={() => {
                setSelected(item.icon);
              }}
              key={key}
              className={`${
                selected === item.icon
                  ? "bg-zinc-100 dark:bg-zinc-800"
                  : "hover:dark:bg-zinc-800"
              } duration-300 hover:bg-zinc-100 flex flex-col justify-center space-y-3 rounded-xl p-2`}
            >
              <div className="flex justify-center">
                <Icons icon={item.icon} size={40} />
              </div>

              <H1 size=".85em">{item.name}</H1>
            </div>
          ))}
        </div>
        <div className={`w-[300px] space-y-3 border-r-2 ${border}`}>
          <H1>{data.find((x) => x.icon === selected)?.name}</H1>
          {data.find((x) => x.icon === selected)?.component}
        </div>
        <div className="w-full">
          <div className="my-5 w-11/12 mx-auto">
            {body?.type === "page" ? (
              <PagesComponent />
            ) : (
              <>{body?.data?.type === "component" && <CompontsResources />}</>
            )}
          </div>
        </div>
      </div>
    </Context.Provider>
  );
}

export default PageComponent;
