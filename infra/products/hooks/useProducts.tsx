import { Organization } from "@/types/types";
import { useCollection } from "@llampukaq/realm";
import { useOrganization } from "@llampukaq/realm-organizations";
import { createProviderFn, useMessage } from "cllk";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Card } from "./useCards";
export interface product {
  title: string;
  description: string;
  productId: string;
  categoryId: string;
  organizationId: string;
  created: Date;
  cardId: string;
  private?: boolean;
  recomended?: string[];
  variants: {
    name: string;
    price: string;
    img: { src: string } | { src: string }[];
  }[];
}
export interface Variant {
  name: string;
  price: string;
  img: { src: string } | { src: string }[];
  volume: undefined;
  weight: undefined;
}
function usePro() {
  const { messagePromise } = useMessage();
  const collection = useCollection("organization", "products");
  const [products, setProducts] = useState<product[]>();
  const [cardId, setCardId] = useState<string>();
  const [card, setCard] = useState<Card>();

  const createProducts = async (data: any) => {
    messagePromise(
      async () => {
        const dat = {
          productId: nanoid(10),
          organizationId: "nutrillacta",
          created: new Date(),
          cardId,
          private: card?.private ?? false,
          ...data,
        };
        await collection?.insertOne(dat);
        await getProducts();
      },
      {
        error: "Error al crear el producto",
        pending: "Creando producto...",
        success: "Producto creado con éxito",
      }
    );
  };
  const getProducts = async () => {
    const res = await collection?.find({ cardId: cardId });
    //@ts-ignore
    setProducts(res);
  };
  const deleteProduct = async (id: string | undefined) => {
    messagePromise(
      async () => {
        await collection?.findOneAndDelete({ productId: id });
        await getProducts();
      },
      {
        error: "Error al eliminar productos",
        pending: "Eliminando productos...",
        success: " Productos eliminados con éxito",
      }
    );
  };
  const updateProduct = async (id: any, data: any) => {
    const updateFields: any = { ...data, created: new Date() };

    messagePromise(
      async () => {
        await collection?.findOneAndUpdate(
          { productId: id },
          { $set: updateFields }
        );
        await getProducts();
      },
      {
        error: "Error al actualizar producto.",
        pending: "Actualizando producto...",
        success: "Productos actualizados con éxito.",
      }
    );
  };

  useEffect(() => {
    cardId != undefined && getProducts();
  }, [cardId, "nutrillacta"]);
  return {
    setCardId,
    products,
    createProducts,
    deleteProduct,
    updateProduct,
    setCard,
  };
}

const [ProductsProvider, useProducts] = createProviderFn<typeof usePro>(usePro);
export { useProducts, ProductsProvider };
