import React from "react";
import { useProductManager } from "./ProductManagementProvider";
import { useCategories } from "../../hooks/useCategories";
import { useProperties } from "../../hooks/useProperties";
import {
  Button,
  FilesImg,
  Img,
  Input,
  ModalFooter,
  ModalTrigger,
  Option,
  Select,
  Text,
  useMessage,
  useModal,
  useUploadImages,
} from "cllk";
import RecomendedProductsCreate from "../createProducts/RecomendedProductsCreate";
import { getArrayImages } from "@/services/services";
import ComboProducts from "../createProducts/ComboProducts";
import SizeProducts from "../createProducts/SizeProducts";

const Single = ({
  onClick,
  title,
}: {
  onClick?: (data: any) => void;
  title?: string;
}) => {
  const {
    addVariant,
    handleInputChange,
    handleVariantChange,
    variants,
    setCategoryId,
    attributes,
    recomended,
    categoryId,
    combo,
  } = useProductManager();
  const { categories } = useCategories();
  const { objects } = useProperties();
  const { uploadImages } = useUploadImages();
  const { message } = useMessage();

  return (
    <>
      {variants
        ?.filter((_, i) => i == 0)
        .map((variant, index) => (
          <div className="space-y-10">
            <Text type="BodyMd(Medium)">Imagen</Text>
            {variant.img != undefined ? (
              <>
                <div className="flex items-center">
                  {Array.isArray(variant.img) ? (
                    <>
                      {/* @ts-ignore */}
                      {variant.img.map((img) => (
                        <>
                          {variant.img != undefined && (
                            <div className="max-w-[300px] mx-auto">
                              {/*@ts-ignore */}
                              <Img width="400" link src={img?.src}></Img>
                            </div>
                          )}
                        </>
                      ))}
                    </>
                  ) : (
                    <>
                      {variant.img != undefined && (
                        <div className="max-w-[300px] mx-auto">
                          {/*@ts-ignore */}
                          <Img width="400" link src={variant?.img?.src}></Img>
                        </div>
                      )}
                    </>
                  )}

                  <FilesImg
                    multiple
                    onClick={async (e) => {
                      //@ts-ignore
                      const res = await uploadImages(e.target.files);
                      handleVariantChange(res, index, "img");
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center">
                  <FilesImg
                    multiple
                    onClick={async (e) => {
                      //@ts-ignore
                      const res = await uploadImages(e.target.files);
                      handleVariantChange(res, index, "img");
                    }}
                  />
                </div>
              </>
            )}

            <div className="mx-auto py-10 space-x-5 bg-zinc-800 rounded-3xl p-5">
              <div>
                <Text type="BodyMd(Medium)">Variantes</Text>
                <Text type="BodyMd">
                  Agregue variantes dentro de un mismo producto para reducir la
                  cantidad de productos que deben ser escritos. Puede reutilizar
                  el nombre, la descripción y las imágenes si así lo desea.
                </Text>
                <Button
                  className="my-5"
                  type="button"
                  center
                  onClick={addVariant}
                >
                  Añadir variante
                </Button>
              </div>
            </div>

            <div className="mx-auto py-10 space-x-5 bg-zinc-800 rounded-3xl p-5 flex justify-between items-center">
              <div>
                <Text type="BodyMd(Medium)">Categorias</Text>
                <Text type="BodyMd">
                  Fundamental para organizar los productos
                </Text>
              </div>
              <div className=" flex items-center justify-center space-x-5">
                <Select
                  key={categoryId}
                  defaultValue={categoryId}
                  label="Categoria"
                  onChange={(e) => {
                    if (e.target.value == "1") {
                      setCategoryId(undefined);
                    } else setCategoryId(e.target.value);
                  }}
                >
                  {categories?.map((x, index) => (
                    <Option key={index} value={x.categoryId}>
                      {x.title}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="bg-zinc-800 rounded-3xl w-full p-5">
              <Text type="BodyMd(Medium)">Datos principales(Obligario)</Text>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
                <Input
                  value={attributes?.title}
                  onChange={(e) => {
                    handleInputChange(e, "title");
                  }}
                  label="Nombre"
                />
                <Input
                  label="Nombre secundario"
                  value={variant.name}
                  onChange={(e) =>
                    handleVariantChange(e.target.value, index, "name")
                  }
                />
                <Input
                  value={attributes?.description}
                  onChange={(e) => {
                    handleInputChange(e, "description");
                  }}
                  label="Descripción"
                />

                <Input
                  type="number"
                  name="price"
                  label="Precio"
                  step="0.01"
                  value={variant.price}
                  onChange={(e) =>
                    handleVariantChange(e.target.value, index, "price")
                  }
                />
              </div>
            </div>
            <ModalFooter
              onClick={() => {
                if (categoryId == undefined) {
                  message({
                    type: "alert",
                    description: "Seleciona una categoria",
                  });
                  return;
                }
                const va = getArrayImages(variants);
                const data = {
                  ...attributes,
                  variants: va,
                  categoryId: categoryId ?? "Sin categoria",
                  recomended,
                  combo,
                };
                onClick?.(data);
              }}
              type="button"
              //     modal={modal}
            >
              {title ?? "Crear"}
            </ModalFooter>
          </div>
        ))}
    </>
  );
};

export default Single;
