import { Button, Icons, ModalTrigger, Option, P, Select, Text } from "cllk";
import CreateProducts from "../CreateProducts";
import { useProductSimple } from "../../Products";
import { useCategories } from "../../hooks/useCategories";
import { ProviderCreateProduct } from "../createProducts/Provider";
const ProductSection = () => {
  const { categories } = useCategories();
  const { setValue, products, setFilterCategoryId } = useProductSimple();
  return (
    <>
      {products?.length === 0 ? (
        <div className="dark:bg-zinc-800 rounded-xl p-10 w-11/12 mx-auto space-y-3">
          <Text className="text-center dark:text-white" type="BodyLg(Medium)">
            Productos
          </Text>
          <P position="text-center">Actualmente no tinenes productos</P>
          <div className="flex items-center justify-between w-10/12 mx-auto">
            <Select
              label="Filtrar por categoría"
              onChange={(e) => {
                e.target.value === "1"
                  ? setFilterCategoryId(undefined)
                  : setFilterCategoryId(e.target.value);
              }}
              defaultValue={"1"}
            >
              {[
                ...(categories ?? []),
                {
                  categoryId: "1",
                  title: "Defecto",
                },
              ]?.map((x, index) => (
                <Option key={index} value={x.categoryId}>
                  {x.title}
                </Option>
              ))}
            </Select>
            <ModalTrigger
              full
              trigger={<Button icon={<Icons icon="IconPlus" />}>Crear</Button>}
              title="Crear productos"
            >
              {(modal) => <CreateProducts modal={modal} />}
            </ModalTrigger>
          </div>
        </div>
      ) : (
        <div className="dark:bg-zinc-800 w-11/12 mx-auto rounded-xl p-10 space-y-3">
          <Text className="text-center dark:text-white" type="BodyLg(Medium)">
            Productos
          </Text>
          <div className="border-2 max-w-[300px] rounded-3xl py-1 pr-1 pl-4 flex justify-between mx-auto border-white/20">
            <input
              className="bg-transparent outline-none w-full dark:text-white"
              placeholder="Buscar"
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <div className="dark:bg-white/20 rounded-full w-min p-1">
              <Icons icon="IconSearch"></Icons>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-end space-y-3 sm:items-center sm:justify-between">
            <Select
              label="Filtrar por categoría"
              onChange={(e) => {
                e.target.value === "1"
                  ? setFilterCategoryId(undefined)
                  : setFilterCategoryId(e.target.value);
              }}
              defaultValue={"1"}
            >
              {[
                {
                  categoryId: "1",
                  title: "Defecto",
                },
                ...(categories ?? []),
              ]?.map((x, index) => (
                <Option key={index} value={x.categoryId}>
                  {x.title}
                </Option>
              ))}
            </Select>
            <div className="w-min">
              <ModalTrigger
                full
                trigger={
                  <Button icon={<Icons icon="IconPlus" />}>Crear</Button>
                }
                title="Crear productos"
              >
                {(modal) => (
                  <ProviderCreateProduct>
                    <CreateProducts modal={modal} />
                  </ProviderCreateProduct>
                )}
              </ModalTrigger>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ProductSection;
