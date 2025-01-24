import { product } from "@/infra/products/hooks/useProducts";
import { Organization } from "@/types/types";
import { useCollection } from "@llampukaq/realm";
import { useOrganization } from "@llampukaq/realm-organizations";
import { createProviderFn } from "cllk";
import { useEffect, useState } from "react";

const useS = () => {
  const { organization } = useOrganization<Organization>();
  const Productcollection = useCollection("organization", "products");

  const [products, setProducts] = useState<product[]>();

  const getProducts = async () => {
    const res = await Productcollection?.find({
      organizationId: "nutrillacta",
    });
    //@ts-ignore
    setProducts(res);
  };
  useEffect(() => {
    getProducts();
  }, [organization]);
  return { products };
};
const [ProviderOrderCreate, useOrderCreate] =
  createProviderFn<typeof useS>(useS);
export { ProviderOrderCreate, useOrderCreate };
