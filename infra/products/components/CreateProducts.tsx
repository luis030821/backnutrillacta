import { modal } from "cllk";
import ProductManagement from "./productManagement/ProductManagement";
import { useProducts } from "../hooks/useProducts";
function CreateProducts({ modal }: { modal: modal }) {
  const { createProducts } = useProducts();
  return (
    <ProductManagement
      onClick={async (data) => {
        await createProducts({ ...data, created: new Date() });
        modal.close();
      }}
    />
  );
}
export default CreateProducts;
