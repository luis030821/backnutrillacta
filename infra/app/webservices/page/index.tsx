import PageComponent, { Context } from "./PageComponent";
import { useContext } from "react";

export { PageComponent };

export const useAddAsset = () => {
  const { addAsset } = useContext(Context) as {
    addAsset: any;
  };
  return { addAsset };
};
export const useWebServicesContext = () => {
  return useContext(Context) as {
    addCategory: (pageId: string, data: any) => Promise<void>;
    deleteCategory: (pageId: string, categoryId: any) => Promise<void>;
    updateCategory: (categoryId: string, updatedData: any) => Promise<void>;
    dataProduct: any;
  };
};
export const useWebServicesCard = () => {
  return useContext(Context) as {
    addCard: (categoryId: string, data: any) => Promise<void>;
    deleteCard: (categoryId: string, productId: string) => Promise<void>;
    updateCard: (categoryId: string, updatedData: any) => Promise<void>;
  };
};
