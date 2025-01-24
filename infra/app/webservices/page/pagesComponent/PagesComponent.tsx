import {
  Button,
  ModalFooter,
  Container,
  H1,
  Icons,
  Modal,
  P,
  useModal,
  ModalTrigger,
} from "cllk";
import React, { useState } from "react";
import { useWSPA } from "../../hooks/useWebServicesPages";
import ModalAddResource from "./ModalAddResource";
import { ButtonSettings } from "../components/Page/Components";
import { useWSC } from "../../hooks/useWebServicesComponents";
import useCards from "@/infra/products/hooks/useCards";
import { formatString } from "@/services/String";

function PagesComponent() {
  const { page, deleteResource } = useWSPA();
  const { cards } = useCards();
  const { components } = useWSC();
  const [s, i] = useState();
  const modalDelete = useModal();
  const handleDelete = (si: any) => {
    i(si);
    modalDelete.open();
  };
  return (
    <>
      <div className="space-y-5">
        <div className="flex justify-evenly items-center">
          <div className="space-y-3">
            <H1 size={"1.5em"}>
              Pagina
              {page?.title.es}
            </H1>
            <H1 size={"1.2em"}>Ruta: {page?.path}</H1>
          </div>
          <ModalTrigger
            trigger={<Button icon={<Icons icon="IconPlus" />}>Crear</Button>}
            full
            title="Crear"
          >
            {(modal) => {
              return <ModalAddResource modal={modal} />;
            }}
          </ModalTrigger>
        </div>

        <div>
          {page?.resources == undefined ? (
            <Container bordered>
              <H1 size={"1.5em"}>No hay recursos</H1>
            </Container>
          ) : (
            <div>
              {page.resources.length == 0 ? (
                <Container bordered>
                  <H1 size={"1.5em"}>No hay recursos</H1>
                </Container>
              ) : (
                <div className="space-y-4">
                  {page?.resources.map((resource, index) => (
                    <Container
                      bordered
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div className="flex flex-col">
                        {resource.type == "products" ? (
                          <H1 size={"1.5em"}>
                            {formatString(
                              cards?.find((x) => x.cardId == resource.id)?.title
                            )}
                          </H1>
                        ) : (
                          <H1 size={"1.5em"}>
                            {
                              components?.find(
                                (x) => x.componentId == resource.id
                              )?.title.es
                            }
                          </H1>
                        )}

                        <P>{resource.type}</P>
                      </div>
                      <div>
                        <ButtonSettings
                          deleteFn={() => {
                            handleDelete(resource.id);
                          }}
                        />
                      </div>
                    </Container>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Modal modal={modalDelete} title={"Eliminar"}>
        <div className="flex justify-center">
          <Icons icon="IconTrash" size={250} />
        </div>
        <ModalFooter
          onClick={() => {
            //@ts-ignore
            deleteResource(s);
            modalDelete.close();
          }}
          modal={modalDelete}
        >
          Eliminar
        </ModalFooter>
      </Modal>
    </>
  );
}

export default PagesComponent;
