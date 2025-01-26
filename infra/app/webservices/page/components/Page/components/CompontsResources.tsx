import { useWSC } from "@/infra/app/webservices/hooks/useWebServicesComponents";
import { Button, Container, H1, Modal, useMessage, useModal } from "cllk";
import React, { useEffect } from "react";
import htmr from "htmr";
import { Builder } from "@llampukaq/builder";
function CompontsResources() {
  const modal = useModal();
  const { component, updateComponent } = useWSC();
  const { messagePromise } = useMessage();
  useEffect(() => {
    eval(component?.actually?.js);
  }, [component]);
  return (
    <>
      <div className="space-y-4">
        <H1 size={"1.5em"}>{component?.title.es}</H1>
        <Button onClick={modal.open} center>
          Crear
        </Button>
        <Container bordered width="w-11/12">
          {htmr(
            `<style>${component?.actually?.css}</style> ${component?.actually?.html}`
          )}
        </Container>
      </div>

      <Modal full modal={modal} title="Crear">
        <Builder
          addAsset={() => {}}
          fn={async ({ css, html, js }) => {
            const m = async () => {
              await updateComponent({
                actually: { css, html, js, date: new Date() },
              });
              modal.close();
            };

            // @ts-ignore
            messagePromise(m, {
              error: "Componente no guardado",
              pending: "Guardando componente...",
              success: "Componente guardado exitosamente",
            });
          }}
        />
      </Modal>
    </>
  );
}

export default CompontsResources;
