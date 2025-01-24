import { modal } from "cllk";

import { product, useProducts } from "../hooks/useProducts";

import ProductManagement from "./productManagement/ProductManagement";

function UpdateProducts({
  product: p,
  modal,
}: {
  product: product | undefined;
  modal: modal;
}) {
  const { updateProduct } = useProducts();
  return (
    <ProductManagement
      title="Actualizar"
      onClick={async (data) => {
        modal.close();
        await updateProduct(p?.productId, { ...data, updated: new Date() });
      }}
      data={p}
    />
  );
}

export default UpdateProducts;
