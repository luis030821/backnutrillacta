import React, { useState } from "react";

import { Container, H1, Modal, P, useModal } from "cllk";

import {
  ModalCreatePage,
  ModalDeletePage,
  ModalHourPage,
  ModalUpdatePage,
} from "./components";
import useWebServicesPages, { Page } from "../../hooks/useWebServicesPages";
import {
  ButtonSettingsPage,
  ContainerPanelLeft,
} from "../components/Page/Components";

function RouterComponents({ handleRouteClick }: { handleRouteClick: any }) {
  const { pages, createPage, updatePage, deletePage } = useWebServicesPages();
  const [dataPage, setDataPage] = useState<Page | undefined>(undefined);
  const modaCreatePage = useModal();
  const modalDeletePage = useModal();
  const modalUpdatePage = useModal();
  const modalHourPage = useModal();

  const handleDeletePage = (page: Page) => {
    setDataPage(page);
    modalDeletePage.open();
  };

  const handleUpdatePage = (page: Page) => {
    setDataPage(page);
    modalUpdatePage.open();
  };

  const handleHourPage = (page: Page) => {
    setDataPage(page);
    modalHourPage.open();
  };

  return (
    <>
      <ContainerPanelLeft onClick={modaCreatePage.open} title="Rutas">
        {pages?.map((route) => (
          <Container
            key={route.path}
            onClick={() => handleRouteClick(route.path)}
            className="flex justify-between dark:bg-zinc-700 bg-zinc-200 items-center"
          >
            <div>
              <H1>{route.title.es}</H1>
              <P>{route.path}</P>
            </div>
            {route.path !== "/" && (
              <ButtonSettingsPage
                deleteFn={() => handleDeletePage(route)}
                hourFn={() => handleHourPage(route)}
                updateFn={() => handleUpdatePage(route)}
              />
            )}
          </Container>
        ))}
      </ContainerPanelLeft>
      <Modal title="Crear página" modal={modaCreatePage}>
        <ModalCreatePage onClick={createPage} modal={modaCreatePage} />
      </Modal>
      <Modal title="Actualizar página" modal={modalUpdatePage}>
        <ModalUpdatePage
          onClick={updatePage}
          data={dataPage}
          modal={modalUpdatePage}
        />
      </Modal>
      <Modal title="Configurar horario" modal={modalHourPage}>
        <ModalHourPage
          onClick={updatePage}
          data={dataPage}
          modal={modalHourPage}
        />
      </Modal>
      <Modal title="Eliminar página" modal={modalDeletePage}>
        <ModalDeletePage
          onClick={deletePage}
          modal={modalDeletePage}
          data={dataPage}
        />
      </Modal>
    </>
  );
}

export default RouterComponents;
