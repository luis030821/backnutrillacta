import { useEffect } from "react";
import { product } from "../../hooks/useProducts";
import {
  ProductManagementProvider,
  useProductManager,
} from "./ProductManagementProvider";
import Single from "./Single";
import Variants from "./Variants";

function ProductManagement({
  onClick,
  data,
  title,
}: {
  onClick?: (data: any) => void;
  data?: product;
  title?: string;
}) {
  return (
    <ProductManagementProvider>
      <ProductManager title={title} onClick={onClick} data={data} />
    </ProductManagementProvider>
  );
}
function ProductManager({
  onClick,
  data,
  title,
}: {
  onClick?: (data: any) => void;
  data?: product;
  title?: string;
}) {
  const {
    variants,
    setRecomended,
    setAttributes,
    setVariants,
    setCategoryId,
    setCombo,
    setSingleProduct,
  } = useProductManager();
  useEffect(() => {
    if (data != undefined) {
      setSingleProduct(data);
      //@ts-ignore
      setCombo(data.combo);
      setCategoryId(data.categoryId);
      setAttributes(data);
      //@ts-ignore
      setRecomended(data.recomended ?? []);
      setVariants(data.variants);
    }
  }, [data]);
  return (
    <>
      {variants.length == 1 ? (
        <Single onClick={onClick} title={title} />
      ) : (
        <Variants onClick={onClick} title={title} />
      )}
    </>
  );
}

export default ProductManagement;
