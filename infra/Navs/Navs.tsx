import { Container, ICONS, useTranslate } from "cllk";
import React, { useState } from "react";
import TypeNavs from "./TypeNavs";
import NavsDrop from "./NavsDrop";
import RoutesDrop from "./RoutesDrop";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
export interface nav {
  name: { en: string; es: string };
  navs: routes[];
}
export interface routes {
  name: {
    es: string;
    en: string;
  };
  to: string;
  newWindow: boolean;
  icon: ICONS;
}
function Navs() {
  const [nav, setNav] = useState<nav[]>([
    {
      name: { en: "More", es: "Mas" },
      navs: [
        {
          icon: "Icon24Hours",
          to: "",
          name: { es: "Ejemplo", en: "Example" },
          newWindow: true,
        },
      ],
    },
  ]);
  const [routes, setRoutes] = useState<routes[]>([
    {
      name: { es: "Ejemplo", en: "Example" },
      to: "",
      icon: "Icon123",
      newWindow: false,
    },
  ]);
  const { translate } = useTranslate();
  const addNavGroup = async (name: string) => {
    setNav([
      //@ts-ignore
      ...nav,
      {
        //@ts-ignore
        name: await translate(name),
        navs: [],
      },
    ]);
  };

  const addRoute = (Navs: routes) => {
    setRoutes([...routes, Navs]);
  };
  const handleDrop = (item: routes) => {
    setNav((prevNav) => {
      // Crea una copia profunda del estado actual de nav para no mutar el estado directamente
      const newNav = JSON.parse(JSON.stringify(prevNav));
      // Encuentra el grupo de navegación en el que deseas agregar la ruta
      //@ts-ignore
      const targetNavGroup = newNav[item.navGroupId];
      // Agrega la ruta al grupo de navegación
      targetNavGroup.navs.push(item);
      return newNav;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container className="space-y-3">
        <TypeNavs />
        <div className="flex space-x-5">
          <NavsDrop onDrop={handleDrop} navs={nav} addNavGroup={addNavGroup} />

          <RoutesDrop
            //@ts-ignore
            onDrag={(item) => console.log("Arrastrando:", item)}
            routes={routes}
            addRoute={addRoute}
          />
        </div>
      </Container>
    </DndProvider>
  );
}

export default Navs;
