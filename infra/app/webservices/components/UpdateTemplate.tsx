import client from "@/client";
import useUpdateRepo from "@/hooks/useUpdateRepo";
import { Organization } from "@/types/types";
import { useOrganization } from "@llampukaq/realm-organizations";
import {
  Button,
  Container,
  H1,
  Icons,
  Modal,
  ModalFooter,
  ModalIcon,
  Text,
  useMessage,
  useModal,
} from "cllk";
import React from "react";

function UpdateTemplate({
  oldVersion,
  setVersion,
}: {
  oldVersion: any;
  setVersion?: any;
}) {
  const newVersion = client.version;
  const { messagePromise } = useMessage();

  const { updateFileAndCommit } = useUpdateRepo();
  const modal = useModal();
  const { organization } = useOrganization<Organization>();
  return (
    <Container bordered className=" max-w-[300px] mb-5">
      {/* @ts-ignore */}
      {oldVersion == newVersion ? (
        <div className="flex flex-col justify-center items-center">
          <Text type="BodyLg(Medium)">Actualizada</Text>
          <div className="flex justify-center">
            <Icons size={40} icon="IconCheck"></Icons>
          </div>
        </div>
      ) : (
        <>
          <H1 size={"1.5em"} span>
            Actualizar
          </H1>
          <div className="flex justify-around items-center">
            <div>
              <H1>template</H1>
              <H1>{oldVersion}</H1>
            </div>
            <div>
              <Icons icon="IconArrowRight" size={60} />
            </div>
            <div>
              <H1>template</H1>
              <H1>{newVersion}</H1>
            </div>
          </div>
          <Button
            onClick={() => {
              modal.open();
            }}
            center
            className="mt-5"
          >
            Actualizar
          </Button>
          <Modal modal={modal} title="Actualizar">
            <ModalIcon icons="IconCheck" />
            <ModalFooter
              onClick={() => {
                messagePromise(
                  async () => {
                    setVersion(newVersion);
                    //@ts-ignore
                    await updateFileAndCommit(organization?.project_name);
                  },
                  {
                    error: "Error al actualizar la plantilla",
                    pending: "Actualizando plantilla...",
                    success: "Plantilla actualizada con éxito",
                  }
                );
                modal.close();
              }}
              modal={modal}
            >
              Actualizar
            </ModalFooter>
          </Modal>
        </>
      )}
    </Container>
  );
}

export default UpdateTemplate;
