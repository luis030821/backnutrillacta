import React from "react";
import { ModalFooter, H1, Input, useInput, useMessage, modal } from "cllk";
import { formatOrganization } from "./ModalCreatePage";
import { Page } from "@/infra/app/webservices/hooks/useWebServicesPages";

function ModalUpdatePage({
  data,
  modal,
  onClick,
}: {
  data: Page | undefined;
  modal: modal;
  onClick: (id: any, data: any) => void;
}) {
  function eliminarSlash(cadena: string | undefined) {
    return cadena?.replace(/\//g, "");
  }

  const input = useInput(eliminarSlash(data?.path), "pageName");
  const { messagePromise } = useMessage();
  const m = async () => {
    await onClick(data?.pageId, {
      path: `/${formatOrganization(input.value)}`,
    });
    modal.close();
  };
  return (
    <div className="space-y-5 p-5">
      <Input {...input} label="Nombre de ruta" />
      <H1>/{formatOrganization(input.value)}</H1>
      <ModalFooter
        modal={modal}
        onClick={() => {
          //@ts-ignore
          messagePromise(m, {
            error: "Error al actualizar",
            pending: "Actualizando ruta",
            success: "Ruta actualizada",
          });
        }}
      >
        Actualizar
      </ModalFooter>
    </div>
  );
}

export default ModalUpdatePage;
