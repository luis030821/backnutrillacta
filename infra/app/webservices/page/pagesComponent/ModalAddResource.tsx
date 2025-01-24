import React from "react";
import { useWSPA } from "../../hooks/useWebServicesPages";
import { Button, Container, H1, H2, useMessage } from "cllk";
import { useWSC } from "../../hooks/useWebServicesComponents";
import useCards from "@/infra/products/hooks/useCards";
function ModalAddResource({ modal }: any) {
  const { addResource } = useWSPA();

  const { cards } = useCards();
  const { components } = useWSC();
  const { messagePromise } = useMessage();
  return (
    <div className="space-y-3 flex flex-wrap">
      {cards?.map((product, index) => (
        <Container width="w-[300px]" key={index} bordered className="space-y-3">
          {/* @ts-ignore */}
          <H1 size={"1.5em"}>{product.title.es}</H1>
          <H2>Productos</H2>
          <Button
            center
            onClick={() => {
              const m = async () => {
                addResource({ id: product.cardId, type: "products" });
              };
              modal.close();
              messagePromise(m, {
                error: "Error al añadir el recurso a la página",
                pending: "Añadiendo recurso a la página...",
                success: "Recurso añadido correctamente a la página",
              });
            }}
          >
            Crear
          </Button>
        </Container>
      ))}
      {components?.map((component, index) => (
        <Container key={index} bordered className="space-y-3">
          <H1 size={"1.5em"}>{component.title.es}</H1>
          <H2>Componentes</H2>
          <Button
            center
            onClick={() => {
              const m = async () => {
                addResource({ id: component.componentId, type: "components" });
              };
              messagePromise(m, {
                error: "Error al añadir el recurso a la página",
                pending: "Añadiendo recurso a la página...",
                success: "Recurso añadido correctamente a la página",
              });
              modal.close();
            }}
          >
            Crear
          </Button>
        </Container>
      ))}
    </div>
  );
}
export default ModalAddResource;
