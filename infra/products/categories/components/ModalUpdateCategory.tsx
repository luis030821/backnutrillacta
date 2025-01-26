import {
  Button,
  FilesImg,
  Img,
  Input,
  modal,
  ModalDownTrigger,
  ModalFooter,
  useModal,
  useUploadImages,
} from "cllk";
import React, { useEffect, useState } from "react";
import { categories, useCategories } from "../../hooks/useCategories";
import useAddAsset from "@/backend/useAddAsset";
import { useCollection } from "@llampukaq/realm";

const ModalUpdateCategory = ({
  modal,
  category,
}: {
  modal: modal;
  category: categories | undefined;
}) => {
  const [input, setInput] = useState<string | undefined>("");
  useEffect(() => {
    setInput(category?.title);
  }, [category]);
  const [img, setImg] = useState<any>();
  const { updateCategory } = useCategories();
  const { uploadImages } = useUploadImages();
  const private1 = useModal(category?.private);
  const collectionProducts = useCollection("organization", "products");
  return (
    <>
      <div className="w-20 aspect-square mx-auto">
        <Img src={img?.src ?? category?.img?.src}></Img>
      </div>
      <ModalDownTrigger
        title="Actualizar imagen"
        trigger={
          <Button type="button" center>
            Actualizar imagen
          </Button>
        }
      >
        {(modalImg) => (
          <FilesImg
            onClick={async (e) => {
              //@ts-ignore
              const res = await uploadImages(e.target.files);

              setImg(res);
              modalImg.close();
            }}
          />
        )}
      </ModalDownTrigger>
      <Input
        //@ts-ignore
        value={input}
        label="Nombre"
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <ModalFooter
        onClick={async () => {
          modal.close();
          if (category?.private != private1.value) {
            await collectionProducts?.updateMany(
              { categoryId: category?.categoryId },
              {
                $set: {
                  private: private1.value,
                },
              }
            );
          }
          if (input == category?.title) {
            if (img != undefined) {
              await updateCategory(category?.categoryId, {
                updated: new Date(),
                img,
                private: private1.value,
              });
            } else {
              await updateCategory(category?.categoryId, {
                updated: new Date(),
                private: private1.value,
              });
            }
          } else {
            if (img != undefined) {
              await updateCategory(category?.categoryId, {
                updated: new Date(),
                title: input,
                img,
                private: private1.value,
              });
            } else {
              await updateCategory(category?.categoryId, {
                updated: new Date(),
                title: input,
                private: private1.value,
              });
            }
          }
        }}
        modal={modal}
      >
        Actualizar
      </ModalFooter>
    </>
  );
};

export default ModalUpdateCategory;
