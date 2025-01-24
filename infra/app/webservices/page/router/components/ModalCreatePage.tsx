import { Organization } from "@/types/types";
import { useOrganization } from "@llampukaq/realm-organizations";
import {
  ModalFooter,
  H1,
  Input,
  useInput,
  useMessage,
  useTranslate,
  modal,
} from "cllk";
import { nanoid } from "nanoid";
import React from "react";

function ModalCreatePage({ modal, onClick }: { modal: modal; onClick: any }) {
  const input = useInput("", "pageName");
  const { organization } = useOrganization<Organization>();
  const { messagePromise } = useMessage();
  const { translate } = useTranslate();
  const m = async () => {
    await onClick({
      pageId: nanoid(11),
      created: new Date(),
      path: `/${formatOrganization(input.value)}`,
      title: await translate(input.value),
      organizationId: "nutrillacta",
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
            error: "Error al crear ruta",
            pending: "Creando ruta",
            success: "Ruta creada",
          });
        }}
      >
        Crear
      </ModalFooter>
    </div>
  );
}

export default ModalCreatePage;
export const formatOrganization = (text?: string) => {
  const res = text?.replace(/ /g, "").toLowerCase();
  return res?.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
