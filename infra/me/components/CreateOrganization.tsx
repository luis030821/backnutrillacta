import useCreateOrganization from "@/backend/useCreateOrganization";
import ModalCreateOrganization from "@/components/ModalCreateOrganization";
import { useMessage } from "cllk";
import React from "react";

function CreateOrganization() {
  const { createOrganization } = useCreateOrganization();
  const { messagePromise } = useMessage();
  return (
    <ModalCreateOrganization
      success={({ domain, organization }) => {
        messagePromise(
          async () => {
            await createOrganization(organization, domain);
          },
          {
            error: "Error al crear la organización.",
            pending: "Creando la organización...",
            success: "La organización se creó exitosamente.",
          }
        );
      }}
    />
  );
}

export default CreateOrganization;
