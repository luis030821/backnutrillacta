import { createProviderFn } from "cllk";
import { useState } from "react";
import { product } from "../../hooks/useProducts";
const useCP = () => {
  const [data, setData] = useState<product>();
  const [categoryId, setCategoryId] = useState<string>();
  const [attributes, setAttributes] = useState<any>({});
  const [recomended, setRecomended] = useState<string[]>([]);
  const [combo, setCombo] = useState<string[]>([]);
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

  return {
    singleProduct: data,
    setSingleProduct: setData,
    removeVariant,
    handleInputChange,
    handleVariantChange,
    setCategoryId,
    addVariant,
    variants,
    setVariants,
    setRecomended,
    recomended,
    attributes,
    setAttributes,
    categoryId,
    combo,
    setCombo,
  };
};
const [ProductManagementProvider, useProductManager] =
  createProviderFn<typeof useCP>(useCP);
export { ProductManagementProvider, useProductManager };
