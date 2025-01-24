import React, { useState } from "react";
import { product, useProducts } from "./hooks/useProducts";
import { Modal, createProviderFn, useModal } from "cllk";
import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";
import DeleteProducts from "./components/DeleteProducts";
import ProductSection from "./components/productspages/ProductSection";
import ProductList from "./components/productspages/ProductList";
import UpdateProducts from "./components/UpdateProducts";
const useS = () => {
  const { products } = useProducts();
  const [data, setData] = useState<product>();
  const [filterCategoryId, setFilterCategoryId] = useState(undefined);
  const [value, setValue] = useState("");
  const filteredProducts = products?.filter((product) => {
    const formattedTitle = product?.title
      ?.toLowerCase()
      ?.replace(/\s+|(.)\1+/g, "$1");
    //@ts-ignore
    return formattedTitle?.includes(
      value?.toLowerCase().replace(/\s+|(.)\1+/g, "$1")
    );
  });

  return {
    data,
    setData,
    setValue,
    filterCategoryId,
    filteredProducts,
    products,
    setFilterCategoryId,
    value,
  };
};
const [ProductProviderSimple, useProductSimple] =
  createProviderFn<typeof useS>(useS);
export { ProductProviderSimple, useProductSimple };
function Products() {
  const { deleteProduct } = useProducts();
  dayjs.extend(localizedFormat);
  const modalUpdate = useModal();
  const modalDelete = useModal();
  const { data, products } = useProductSimple();
  return (
    <>
      <div className="space-y-5 my-5">
        {products != undefined && (
          <>
            <ProductSection />
            <div className="w-11/12 mx-auto">
              <ProductList
                modalUpdate={modalUpdate}
                modalDelete={modalDelete}
              />
            </div>
          </>
        )}
        <DeleteProducts
          modal={modalDelete}
          onClick={async () => {
            await deleteProduct(data?.productId);
          }}
        />
        <Modal full title="Actualizar producto" modal={modalUpdate}>
          <UpdateProducts product={data} modal={modalUpdate} />
        </Modal>
      </div>
    </>
  );
}

export default Products;
