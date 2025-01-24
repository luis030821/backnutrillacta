import React, { useState } from "react";
import {
  H1,
  P,
  Container,
  Button,
  Icons,
  Input,
  useInput,
  ModalTrigger,
  ModalFooter,
} from "cllk";
import { useDrop } from "react-dnd";
import { nav } from "./Navs";

function NavsDrop({
  navs,
  addNavGroup,
  onDrop,
}: {
  navs: nav[];
  addNavGroup: any;
  onDrop: any;
}) {
  const [overNavId, setOverNavId] = useState<number | undefined>();
  const name = useInput("", "");
  const [{ isOver }, drop] = useDrop({
    accept: "ROUTE",
    drop: (item: any) => onDrop({ ...item, navGroupId: overNavId }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <Container gradient="bg-zinc-800 space-y-3">
      <H1>Navegacion</H1>
      <div ref={drop} className="space-y-3">
        {navs.map((nav, index) => (
          <div
            key={index}
            onDragOver={() => {
              setOverNavId(index);
            }}
            onMouseLeave={() => setOverNavId(undefined)}
            className="bg-zinc-900 rounded-3xl p-5 space-y-3"
          >
            <P>{nav?.name?.es}</P>

            {nav?.navs?.map((singleNav: any, index: number) => (
              <NavDropItem key={index} singleNav={singleNav} />
            ))}
          </div>
        ))}
      </div>
      <ModalTrigger
        trigger={<Button center> Add group</Button>}
        title="Agregar ruta"
      >
        <Input label="Nombre" {...name} />
        <ModalFooter
          onClick={async () => {
            await addNavGroup(name.value);
          }}
        >
          Sii
        </ModalFooter>
      </ModalTrigger>
    </Container>
  );
}

// Componente NavDropItem para representar un elemento dentro de un grupo de navegación
function NavDropItem({ singleNav }: { singleNav: any }) {
  return (
    <div className="bg-zinc-800 flex justify-center items-center space-x-3 py-2 rounded-3xl">
      <Icons icon={singleNav.icon} />
      <H1>{singleNav.name.es}</H1>
    </div>
  );
}

export default NavsDrop;
