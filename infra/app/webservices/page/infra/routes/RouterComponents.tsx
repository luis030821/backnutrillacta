import {
  Button,
  Container,
  Drop,
  H1,
  Icons,
  Input,
  Modal,
  ModalFooter,
  ModalIcon,
  ModalTrigger,
  P,
  useInput,
  useMessage,
  useModal,
} from "cllk";
import { Page, useWSPA } from "../../../hooks/useWebServicesPages";
import { ModalHourPage } from "./components";

import { formatOrganization } from "./components/ModalCreatePage";
import { useEffect, useState } from "react";

function RouterComponents({ handleRouteClick }: { handleRouteClick: any }) {
  const routerReserve = ["llampukaq", "me", "social", "cart", "signin"];

  const {
    createHome,
    pages,
    setPage,
    createPage,
    deletePage,
    actualizarInput,
  } = useWSPA();
  const modalHourPage = useModal();
  const handleHourPage = (page: Page) => {
    setPage(page);
    modalHourPage.open();
  };
  const modalDelete = useModal();
  const modalUpdate = useModal();
  const input = useInput("name", "name");
  const { message } = useMessage();
  const [f, setF] = useState("");
  const inputUpdate = useInput("example", "example");
  async function s() {
    pages?.find((x) => x.path == "/") == undefined && (await createHome());
  }
  useEffect(() => {
    s();
  }, []);
  return (
    <div className="space-y-5">
      {pages
        ?.filter((x) => x.path == "/")
        .map((route) => (
          <Container
            bordered
            p="p-5"
            key={route.path}
            onClick={() => handleRouteClick(route)}
            className="flex flex-col space-y-3"
          >
            <H1>{route.title.es}</H1>
            <P>{route.path}</P>
          </Container>
        ))}
      {pages
        ?.filter((x) => x.path != "/")
        .map((route) => (
          <Container
            bordered
            p="p-5"
            key={route.path}
            onClick={() => handleRouteClick(route)}
            className="flex justify-between "
          >
            <div className="space-y-3">
              <H1>{route.title.es}</H1>
              <P>{route.path}</P>
            </div>

            <>
              <Drop.Container>
                <Drop.Trigger>
                  <Button icon={<Icons icon="IconSettings" />}></Button>
                </Drop.Trigger>
                <Drop.Menu>
                  <Drop.Item
                    onClick={() => {
                      handleHourPage(route);
                    }}
                    icon={<Icons icon="Icon24Hours" />}
                  >
                    Horario
                  </Drop.Item>
                  <Drop.Item
                    onClick={async () => {
                      setF(route.title.es);
                      setPage(route);
                      modalUpdate.open();
                    }}
                    icon={<Icons icon="IconStatusChange" />}
                  >
                    Actualizar
                  </Drop.Item>

                  <Drop.Item
                    onClick={async () => {
                      setPage(route);
                      modalDelete.open();
                    }}
                    icon={<Icons icon="IconTrash" />}
                    withDivider
                  >
                    Eliminar
                  </Drop.Item>
                </Drop.Menu>
              </Drop.Container>
            </>
          </Container>
        ))}
      <div className="flex justify-center flex-col items-center space-y-5">
        <ModalTrigger
          trigger={<Button icon={<Icons icon="IconPlus" />}>Añadir</Button>}
          title="Crear página"
        >
          {(modal) => {
            return (
              <>
                <Input onChange={input.onChange} label="Nombre" />
                <div className="flex">
                  <P>Ruta: </P>
                  <P> /{formatOrganization(input.value)}</P>
                </div>
                <div>
                  <P color="text-red-500">
                    {/* @ts-ignore */}
                    {routerReserve.includes(formatOrganization(input.value)) &&
                      "No puedes usar esta ruta"}
                  </P>
                </div>

                <ModalFooter
                  type="button"
                  onClick={async () => {
                    if (
                      //@ts-ignore
                      routerReserve.includes(formatOrganization(input.value))
                    ) {
                      message({
                        type: "alert",
                        description: "No puedes usar esta ruta",
                      });
                    } else {
                      await createPage(input.value);
                      modal.close();
                    }
                  }}
                  modal={modal}
                >
                  Crear
                </ModalFooter>
              </>
            );
          }}
        </ModalTrigger>
      </div>
      <Modal title="Eliminar página" modal={modalDelete}>
        <ModalIcon icons="IconTrash" />
        <ModalFooter
          onClick={async () => {
            await deletePage();
            modalDelete.close();
          }}
          modal={modalDelete}
        >
          Eliminar
        </ModalFooter>
      </Modal>
      <Modal title="Actualizar página" modal={modalUpdate}>
        <Input onChange={inputUpdate.onChange} value={f} label="Nombre" />
        <div className="flex">
          <P>Ruta: </P>
          <P> /{formatOrganization(inputUpdate.value)}</P>
        </div>
        <ModalFooter
          onClick={async () => {
            await actualizarInput(inputUpdate.value);
          }}
          modal={modalUpdate}
        >
          Actualizar
        </ModalFooter>
      </Modal>
      <Modal title="Configurar horario" modal={modalHourPage}>
        <ModalHourPage modal={modalHourPage} />
      </Modal>
    </div>
  );
}

export default RouterComponents;
