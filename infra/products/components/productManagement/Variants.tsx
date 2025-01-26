import React from "react";
import { useProductManager } from "./ProductManagementProvider";
import { useProperties } from "../../hooks/useProperties";
import { useProductSimple } from "../../Products";
import { useCategories } from "../../hooks/useCategories";
import {
  Button,
  FilesImg,
  Icons,
  Img,
  Input,
  ModalFooter,
  Option,
  Select,
  Text,
  useMessage,
  useUploadImages,
} from "cllk";
import RecomendedProductsCreate from "../createProducts/RecomendedProductsCreate";
import { getArrayImages } from "@/services/services";
import ComboProducts from "../createProducts/ComboProducts";

function Variants({
  onClick,
  title,
}: {
  onClick?: (data: any) => void;
  title?: string;
}) {
  const { objects } = useProperties();
  const { filterCategoryId } = useProductSimple();
  const { categories } = useCategories();
  const {message} = useMessage();
  const {
    handleInputChange,
    handleVariantChange,
    removeVariant,
    addVariant,
    setCategoryId,
    variants,
    attributes,
    categoryId,
    recomended,
    combo,
  } = useProductManager();
  return (
    <div className="space-y-10">
      {filterCategoryId == undefined && (
        <div className="mx-auto py-10 space-x-5 bg-zinc-800 rounded-3xl p-5">
          <div>
            <div>
              <Text type="BodyMd(Medium)">Categorias</Text>
              <Text type="BodyMd">
                Fundamental para organizar los productos
              </Text>
            </div>
          </div>
          <div className=" flex items-center justify-center space-x-5">
            <Text type="BodyMd(Medium)">Categoria</Text>
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
      )}
      <div className="bg-zinc-800 rounded-3xl w-full p-5">
        <Text type="BodyMd(Medium)">Datos principales</Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
          <Input
            value={attributes.title}
            onChange={(e) => {
              handleInputChange(e, "title");
            }}
            label="Nombre"
          />

          <Input
            value={attributes.description}
            onChange={(e) => {
              handleInputChange(e, "description");
            }}
            label="Description"
          />
        </div>
      </div>
      <div className="bg-zinc-800 rounded-3xl w-full p-5">
        <Text type="BodyMd(Medium)">Extras agregados por propiedades</Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
          {objects
            ?.filter((x) => x.use == "normal" || x.use == undefined)
            ?.map((x) => (
              <Input
                onChange={(e) => {
                  handleInputChange(e, x.attribute);
                }}
                label={x.attribute}
                required={x.required}
                type={x.type}
              />
            ))}
        </div>
      </div>
      <div className="my-10">
        <div className="flex justify-between items-center">
          <Text className="text-white" type="BodyLg(Medium)">
            Variantes
          </Text>
          <Button
            icon={<Icons icon="IconPlus" />}
            type="button"
            center
            onClick={addVariant}
          >
            Añadir
          </Button>
        </div>

        <div className="p-3 flex flex-wrap gap-5">
          <Variantes
            handleVariantChange={handleVariantChange}
            removeVariant={removeVariant}
            variants={variants}
          />
        </div>
      </div>
      <RecomendedProductsCreate />
      <ComboProducts />
      <ModalFooter
        onClick={() => {
          if (categoryId != undefined) {
            const va = getArrayImages(variants);
            const data = {
              ...attributes,
              variants: va,
              categoryId: categoryId ?? "Sin categoria",
              recomended,
              combo,
            };
            onClick?.(data);
          } else {
            message({
              type: "alert",
              description: "Seleciona una categoria",
            });
          }
        }}
        type="button"
        // modal={modal}
      >
        {title ?? "Crear"}
      </ModalFooter>
    </div>
  );
}

export default Variants;

const Variantes = ({
  variants,
  handleVariantChange,
  removeVariant,
}: {
  variants: any[];
  handleVariantChange: any;
  removeVariant: any;
}) => {
  const { uploadImages } = useUploadImages();
  const { objects } = useProperties();
  return (
    <>
      {variants?.map((variant, index) => (
        <div
          key={index}
          className="dark:bg-zinc-800/50 px-10 rounded-3xl w-full space-y-5 p-5 max-w-[800px] mx-auto"
        >
          <div className="flex justify-between items-center">
            <Text type="BodyMd(Medium)">Variante {index + 1}</Text>
            <Button type="button" center onClick={() => removeVariant(index)}>
              Eliminar
            </Button>
          </div>

          {variant.img != undefined ? (
            <div className="max-w-[100px] mx-auto">
              <Img width="400" link src={variant.img.src}></Img>
            </div>
          ) : (
            <FilesImg
              onClick={async (e) => {
                //@ts-ignore
                const res = await uploadImages(e.target.files);
                handleVariantChange(res, index, "img");
              }}
            />
          )}
          <div className="bg-zinc-800 rounded-3xl w-full p-5">
            <Text type="BodyMd(Medium)">Datos principales</Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
              <Input
                required
                label="Nombre"
                value={variant.name}
                onChange={(e) =>
                  handleVariantChange(e.target.value, index, "name")
                }
              />
              <Input
                required
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
          <div className="bg-zinc-800 rounded-3xl w-full p-5">
            <Text type="BodyMd(Medium)">Tamaño</Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
              <Input
                value={variant.weight}
                onChange={(e) => {
                  handleVariantChange(e.target.value, index, "weight");
                }}
                label="Peso(Kg)"
              />
              <Input
                value={variant.large}
                onChange={(e) => {
                  handleVariantChange(e.target.value, index, "large");
                }}
                label="Largo(Cm)"
              />
              <Input
                value={variant.width}
                onChange={(e) => {
                  handleVariantChange(e.target.value, index, "width");
                }}
                label="Ancho(Cm)"
              />
              <Input
                value={variant.depth}
                onChange={(e) => {
                  handleVariantChange(e.target.value, index, "depth");
                }}
                label="Profundida(Cm)"
              />
            </div>
          </div>
          <div className="bg-zinc-800 rounded-3xl w-full p-5">
            <Text type="BodyMd(Medium)">Extras agregados por propiedades</Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
              {objects
                ?.filter((x) => x.use == "variant")
                .map((object) => (
                  <Input
                    onChange={(e) => {
                      handleVariantChange(
                        e.target.value,
                        index,
                        object.attribute
                      );
                    }}
                    label={object.attribute}
                    required={object.required}
                    type={object.type}
                  />
                ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
