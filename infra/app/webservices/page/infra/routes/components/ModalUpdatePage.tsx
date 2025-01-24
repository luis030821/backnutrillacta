import React from "react";

import { ModalFooter, H1, Input, useInput, useMessage, modal } from "cllk";
import { formatOrganization } from "./ModalCreatePage";
import { useWSPA } from "@/infra/app/webservices/hooks/useWebServicesPages";

function ModalUpdatePage({ modal }: { modal: modal }) {
  function eliminarSlash(cadena: string | undefined) {
    return cadena?.replace(/\//g, "");
  }
  const { page, updatePage } = useWSPA();
  const input = useInput(eliminarSlash(page?.path), "pageName");
  const { messagePromise } = useMessage();
  const m = async () => {
    await updatePage({
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
