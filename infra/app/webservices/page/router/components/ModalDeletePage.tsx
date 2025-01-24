import React from "react";

import { ModalFooter, Icons, useMessage, modal } from "cllk";
import { Page } from "@/infra/app/webservices/hooks/useWebServicesPages";

function ModalDeletePage({
  data,
  modal,
  onClick,
}: {
  data: Page | undefined;
  modal: modal;
  onClick: any;
}) {
  const { messagePromise } = useMessage();
  const m = async () => {
    await onClick(data?.pageId);
  };
  return (
    <div>
      <div className="flex justify-center">
        <Icons icon="IconTrash" size={250} />
      </div>

      <ModalFooter
        onClick={() => {
          messagePromise(m, {
            error: "Error al eliminar",
            pending: "Eliminado pagina",
            success: "Pagina eliminada",
          });
          modal.close();
        }}
        modal={modal}
      >
        Eliminar
      </ModalFooter>
    </div>
  );
}

export default ModalDeletePage;
