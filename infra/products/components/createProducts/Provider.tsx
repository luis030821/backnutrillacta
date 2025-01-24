import { getArrayImages } from "@/services/services";
import { createProviderFn, modal, useMessage } from "cllk";
import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";

const useCP = () => {
  const { createProducts } = useProducts();
  const [categoryId, setCategoryId] = useState();
  const [attributes, setAttributes] = useState<any>({});
  const [variants, setVariants] = useState<any[]>([{}]);

  const handleVariantChange = (value: any, index: any, field: any) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };
  const addVariant = () => {
    setVariants([...variants, {}]);
  };
  const removeVariant = (index: any) => {
    //@ts-ignore
    setVariants((prevVariants) => {
      //@ts-ignore
      return prevVariants.filter((_, i) => i !== index);
    });
  };
  const handleInputChange = (event: any, key: any) => {
    const { value } = event.target;
    //@ts-ignore
    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [key]: value,
    }));
  };
  const { message } = useMessage();
  const [recomended, setRecomended] = useState<string[]>([]);
  const create = async (modal: modal) => {
    if (categoryId) {
      const va = getArrayImages(variants);
      await createProducts({
        ...attributes,
        variants: va,
        categoryId: categoryId ?? "Sin categoria",
        recomended,
      });
      modal.close();
    } else {
      message({ type: "alert", description: "Seleciona una categoria" });
    }
  };
  return {
    create,
    removeVariant,
    handleInputChange,
    handleVariantChange,
    setCategoryId,
    addVariant,
    variants,
    setRecomended,
    recomended,
    attributes,
    setAttributes,
  };
};
const [ProviderCreateProduct, useCreateProductProvider] =
  createProviderFn<typeof useCP>(useCP);
export { ProviderCreateProduct, useCreateProductProvider };
