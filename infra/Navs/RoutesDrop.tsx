import React, { useState } from "react";
import {
  H1,
  Container,
  Button,
  Icons,
  useModal,
  Input,
  useInput,
  useMessage,
  useTranslate,
  ICONS,
  ModalTrigger,
  ModalFooter,
} from "cllk";
import { useDrag } from "react-dnd";
import { routes } from "./Navs";
import SelectIcon from "@/components/SelectIcon";

function RoutesDrop({
  addRoute,
  routes,
  onDrop,
}: {
  addRoute: (Navs: routes) => void;
  routes: routes[];
  onDrop: any;
}) {
  const open = useModal();
  const { message } = useMessage();
  const [icon, setIcons] = useState<ICONS>();

  const name = useInput("", "");
  const to = useInput("", "");

  const { translate } = useTranslate();
  return (
    <Container gradient="bg-zinc-800 space-y-3">
      <H1>Rutas</H1>
      {routes.map((route, index) => (
        <DraggableRoute key={index} route={route} onDrop={onDrop} />
      ))}
      <ModalTrigger trigger={<Button center>Plus</Button>} title="Agregar ruta">
        {() => {
          return (
            <>
              <Input label="Nombre" {...name} />
              <Input label="Ruta" {...to} />

              <Button center onClick={open.toggle}>
                Icono de selección
              </Button>

              <SelectIcon
                modal={open}
                onSelect={(e) => {
                  message({ type: "success", description: "Icon seleted" });
                  setIcons(e);
                }}
              />
              <ModalFooter
                onClick={async () => {
                  addRoute({
                    //@ts-ignore
                    name: await translate(name.value),
                    //@ts-ignore
                    icon,
                    newWindow: true,
                    to: to.name,
                  });
                }}
              >
                Add
              </ModalFooter>
            </>
          );
        }}
      </ModalTrigger>
    </Container>
  );
}

// Componente DraggableRoute que hace que cada elemento de ruta sea arrastrable de forma independiente
function DraggableRoute({ route, onDrop }: { route: routes; onDrop: any }) {
  // Utiliza la función `useDrag` para hacer que este componente sea arrastrable
  const [{ isDragging }, drag] = useDrag({
    type: "ROUTE", // Define el tipo de elemento que este componente representa
    item: { ...route }, // Información única sobre el elemento que se está arrastrando
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag}>
      <div
        className="bg-zinc-900 flex justify-center space-x-3 items-center py-2 rounded-3xl"
        onClick={() => onDrop(route)}
      >
        <Icons icon={route.icon} />
        <H1>{route.name.es}</H1>
      </div>
    </div>
  );
}

export default RoutesDrop;
