import {
  Button,
  Drop,
  Icons,
  Img,
  Modal,
  ModalFooter,
  ModalIcon,
  ModalTrigger,
  P,
  Text,
  Tooltip,
  useModal,
} from "cllk";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { categories, useCategories } from "./hooks/useCategories";
import ModalUpdateCategory from "./categories/components/ModalUpdateCategory";
import ModalCreateCategory from "./categories/components/ModalCreateCategory";
import ModalMoveCategories from "./categories/components/ModalMoveCategories";
import PrintImages from "@/components/PrintImages";

function Categories() {
  dayjs.extend(localizedFormat);
  const { deleteCategory, categories, updateCategoryPosition } =
    useCategories();
  const [data, setData] = useState<categories>();
  const modalUpdate = useModal();
  const modalDelete = useModal();
  const [categoryMove, setCategoryMove] = useState<categories[] | undefined>();

  useEffect(() => {
    setCategoryMove(categories);
  }, [categories]);

  return (
    <div className="space-y-5 my-5">
      <div className="w-11/12 mx-auto items-center dark:bg-zinc-800 rounded-xl p-10 space-y-5">
        <div className="flex justify-between items-center">
          <div className="flex space-x-5 items-center pr-2">
            <Text type="BodyMd(Medium)">Categorias de Productos</Text>
            <Tooltip
              position="right"
              trigger={
                <div className="bg-zinc-700 rounded-full p-1">
                  <Icons icon="IconQuestionMark"></Icons>
                </div>
              }
            >
              <Text className="dark:text-white/50 max-w-xl" type="BodyMd">
                Crea tu categorias de productos, para gestionar los productos de
                manera interna y de manera mas sencilla
              </Text>
            </Tooltip>
          </div>
          <ModalTrigger
            trigger={
              <Button icon={<Icons icon="IconPlus"></Icons>}>Crear</Button>
            }
            title="Crear categoria"
          >
            {(modal) => {
              return <ModalCreateCategory modal={modal} />;
            }}
          </ModalTrigger>
        </div>
        <ModalMoveCategories
          categoryMove={categoryMove}
          setCategoryMove={setCategoryMove}
          updateCategoryPosition={updateCategoryPosition}
        />
      </div>

      {categories?.length == 0 ? (
        <Text
          type="BodyMd(Medium)"
          className="text-center dark:text-white text-black"
        >
          Sin categorias
        </Text>
      ) : (
        <div className="w-11/12 overflow-x-auto mx-auto">
          <div className="w-full space-y-3 relative">
            {categories?.map((x, index) => (
              <>
                <div key={index} className="flex space-x-5">
                  <div className="w-full dark:bg-zinc-800 bg-zinc-50 p-2 rounded-xl">
                    <div className="flex justify-between w-11/12 mx-auto">
                      <div>
                        <Text
                          className="text-center dark:text-white text-black"
                          type="BodyMd(Medium)"
                        >
                          Imagen
                        </Text>
                        <div className="flex">
                          <PrintImages img={x.img}>
                            <Img
                              link
                              width="80"
                              className="w-20 h-20 rounded-full"
                            />
                          </PrintImages>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <Text
                          className="text-center dark:text-white text-black"
                          type="BodyMd(Medium)"
                        >
                          Nombre
                        </Text>
                        <Text
                          className="dark:text-white/80"
                          type="BodySm(Medium)"
                        >
                          {x.title}
                          {x.private && (
                            <div className="dark:bg-green-900 rounded-xl flex justify-center">
                              <P color="text-white">Privado</P>
                            </div>
                          )}
                        </Text>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center space-y-3 dark:bg-zinc-800 rounded-xl p-5">
                    <Text type="BodyMd(Medium)">Acciones</Text>
                    <Drop.Container>
                      <Drop.Trigger>
                        <div className="bg-zinc-900 rounded-full p-1">
                          <Icons icon="IconDots" />
                        </div>
                      </Drop.Trigger>
                      <Drop.Menu>
                        <Drop.Section title="Acciones">
                          <Drop.Item
                            onClick={() => {
                              setData(x);
                              modalUpdate.open();
                            }}
                            icon={<Icons icon="IconUpload" />}
                          >
                            Actualizar
                          </Drop.Item>

                          <Drop.Item
                            onClick={() => {
                              setData(x);
                              modalDelete.open();
                            }}
                            className="hover:bg-red-500/50"
                            icon={<Icons icon="IconTrash" />}
                          >
                            Eliminar
                          </Drop.Item>
                        </Drop.Section>
                      </Drop.Menu>
                    </Drop.Container>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      )}
      {data != undefined && (
        <Modal title="Actualizar Categoria" modal={modalUpdate}>
          <ModalUpdateCategory category={data} modal={modalUpdate} />
        </Modal>
      )}

      <Modal title="Eliminar Categoria" modal={modalDelete}>
        <ModalIcon icons="IconTrash" />
        <ModalFooter
          onClick={async () => {
            await deleteCategory(data?.categoryId);
            modalDelete.close();
          }}
          modal={modalDelete}
        >
          Eliminar
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Categories;
