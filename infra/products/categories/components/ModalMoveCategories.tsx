import {
  Button,
  H1,
  Icons,
  ModalFooter,
  ModalTrigger,
  P,
  Text,
  Tooltip,
} from "cllk";
import React from "react";
import { arrayMove, List } from "react-movable";
import { categories } from "../../hooks/useCategories";

function ModalMoveCategories({
  categoryMove,
  setCategoryMove,
  updateCategoryPosition,
}: {
  categoryMove: categories[] | undefined;
  setCategoryMove: any;
  updateCategoryPosition: any;
}) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="flex justify-between items-center space-x-5 pr-2">
          <Text type="BodyMd(Medium)">Mueve las categorias</Text>
          <Tooltip
            position="right"
            trigger={
              <div className="bg-zinc-700 rounded-full p-1">
                <Icons icon="IconQuestionMark"></Icons>
              </div>
            }
          >
            <Text className="dark:text-white/50 max-w-xl" type="BodyMd">
              Esto te permite motrar categorias de manera en la que tu quieras,
              mueve y mira el resultado Nota: Esto tambien modifica la api de
              desarrolladores, porque lo que el Areglo que te retorna ya esta
              organizado
            </Text>
          </Tooltip>
        </div>
      </div>
      <ModalTrigger
        full
        trigger={
          <Button icon={<Icons icon="IconHandMove"></Icons>}>Mover</Button>
        }
        title="Mover Categorias"
      >
        {(modal) => {
          return (
            <>
              <List
                values={categoryMove ?? []}
                onChange={async ({ oldIndex, newIndex, targetRect }) => {
                  const res = arrayMove(categoryMove ?? [], oldIndex, newIndex);

                  setCategoryMove(res);
                }}
                renderList={({ children, props }) => (
                  <div ref={props.ref} className="w-full space-y-3 relative">
                    {children}
                  </div>
                )}
                renderItem={({ value: x, props, index }) => (
                  <div className="flex space-x-5">
                    <div
                      {...props}
                      className="w-full dark:bg-zinc-800 bg-zinc-50 p-5 rounded-xl max-w-[400px] mx-auto"
                    >
                      <div className="flex justify-between w-11/12 mx-auto">
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

                        <div className="flex justify-center items-center">
                          <div className=" font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className=" flex justify-center flex-co items-center flex-col p-1 rounded-xl">
                              <Icons icon="IconHandMove" />
                              <H1>{index}</H1>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              />
              <ModalFooter
                modal={modal}
                onClick={async () => {
                  await updateCategoryPosition(categoryMove);
                  modal.close();
                }}
              >
                Actualizar
              </ModalFooter>
            </>
          );
        }}
      </ModalTrigger>
    </div>
  );
}

export default ModalMoveCategories;
