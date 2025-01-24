import { Modal, ModalFooter, ModalIcon, modal } from "cllk";
import React from "react";

function DeleteProducts({ modal, onClick }: { modal: modal; onClick: any }) {
  
  return (
    <Modal title="Eliminar Producto" modal={modal}>
      <ModalIcon icons="IconTrash" />
      <ModalFooter
        onClick={async () => {
          await onClick?.();
          modal.close();
        }}
        modal={modal}
      >
        Eliminar
      </ModalFooter>
    </Modal>
  );
}

export default DeleteProducts;
