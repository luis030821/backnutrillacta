import React from "react";
import { product } from "../../hooks/useProducts";
import { useProperties } from "../../hooks/useProperties";
import { useCategories } from "../../hooks/useCategories";
import { Drop, H1, Icons, Img, P, Text } from "cllk";
import { useProductSimple } from "../../Products";
import PrintImages from "@/components/PrintImages";

const ProductItem = ({
  product,
  modalUpdate,
  modalDelete,
}: {
  product: product;
  modalUpdate: any;
  modalDelete: any;
}) => {
  const { setData } = useProductSimple();
  const { objects } = useProperties();
  const { categories } = useCategories();

  return (
    <div className="flex space-x-5">
      <div className="flex justify-between bg-white border-b dark:bg-gray-800 dark:border-gray-700 rounded-3xl space-x-0 w-full relative p-5 overflow-x-auto ">
        <div>
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
                    setData(product);
                    modalUpdate.open();
                  }}
                  icon={<Icons icon="IconUpload" />}
                >
                  Actualizar
                </Drop.Item>

                <Drop.Item
                  onClick={() => {
                    setData(product);
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
        <div className="flex flex-col w-full flex-shrink-1">
          {product.variants.map((variant, vIndex) => (
            <div key={vIndex} className="flex w-full justify-between space-x-5">
              <div className="flex flex-col md:flex-row md:items-center px-6 py-4 space-x-5">
                <div className="flex flex-col justify-between items-center space-y-2 h-full">
                  <Text type="BodyMd(Medium)">Imagen</Text>
                  <PrintImages img={variant?.img}>
                    <Img
                      className="aspect-square w-10"
                      link
                      width="60"
                      alt={`Variant Image ${vIndex}`}
                    />
                  </PrintImages>
                </div>
                <div className="flex flex-col justify-center h-full mx-3">
                  <Text type="BodyMd(Medium)">Nombre</Text>
                  {product.title} {variant.name}
                  {product.private && (
                    <div className="dark:bg-green-900 rounded-xl flex justify-center">
                      <Text className="text-white/50" type="BodySm">
                        Privado
                      </Text>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex h-full flex-col justify-center">
                <Text type="BodyMd(Medium)">Precio</Text>${variant.price}
              </div>
              <>
                {objects?.map((obj, oIndex) => (
                  <>
                    {/* @ts-ignore */}
                    {product?.[obj.attribute] != undefined && (
                      <div
                        key={oIndex}
                        className="flex h-full flex-col justify-center max-w-[230px] py-3"
                      >
                        <Text type="BodyMd(Medium)">{obj.attribute}</Text>
                        <Text className="text-white/50" type="BodySm">
                          {/* @ts-ignore */}
                          {product?.[obj.attribute] as any}
                        </Text>
                      </div>
                    )}
                  </>
                ))}
              </>
            </div>
          ))}
        </div>
        <div className="flex space-x-10 items-center flex-shrink-0">
          <div className="flex flex-col flex-shrink-0 justify-center items-center">
            <Text type="BodyMd(Medium)">Categoria</Text>
            <Text className="text-white/50" type="BodySm">
              {categories?.find(
                (category) => category.categoryId === product.categoryId
              )?.title ?? "Sin Categoria"}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductList = ({ modalUpdate, modalDelete }: any) => {
  const {
    filterCategoryId,
    value,
    filteredProducts,
    products: ps,
  } = useProductSimple();
  const products =
    value == ""
      ? filterCategoryId == undefined
        ? ps
        : ps?.filter((e) => e.categoryId == filterCategoryId)
      : filteredProducts;

  return (
    <div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 space-y-3 overflow-x-auto">
      {products?.map((product, index) => (
        <ProductItem
          key={index}
          product={product}
          modalUpdate={modalUpdate}
          modalDelete={modalDelete}
        />
      ))}
    </div>
  );
};

export default ProductList;
