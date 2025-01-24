import { Organization } from "@/types/types";
import { useCollection } from "@llampukaq/realm";
import { useOrganization } from "@llampukaq/realm-organizations";
import { createProviderFn, useMessage } from "cllk";
import { nanoid } from "nanoid";
import { useState } from "react";
import { Card } from "./useCards";
export interface categories {
  title: string;
  categoryId: string;
  organizationId: string;
  created: Date;
  cardId: string;
  position?: number;
  private?: boolean;
  img: { src: string };
}
function useCa() {
  const { messagePromise } = useMessage();
  const [cardId, setCardId] = useState<string>();
  const [card, setCard] = useState<Card>({
    _id: "67919e3685cf83998760a46a",
    title: "Productos",
    cardId: "8RMnKQNRyL",
    //@ts-ignore
    created: "2025-01-23T01:41:10.132Z",
    organizationId: "nutrillacta",
    name: "Productos",
    private: false,
  });

  const [categories, setCategory] = useState<categories[]>();
  const collection = useCollection("organization", "categories");
  const getCategories = async (id: string | undefined) => {
    const res = await collection?.find({ cardId: id });
    setCategory(
      res
        ?.map((ca, index) => {
          if (ca.position !== undefined) {
            return { ...ca };
          } else {
            return { ...ca, position: index };
          }
        })
        //@ts-ignore
        .sort((a, b) => a?.position - b?.position) ?? []
    );
  };
  const createdCategory = async (e: any) => {
    messagePromise(
      async () => {
        const data = {
          ...e,
          categoryId: nanoid(10),
          organizationId: "nutrillacta",
          created: new Date(),
          cardId,
          private: card?.private ?? false,
        };
        await collection?.insertOne(data);
        await getCategories(cardId);
      },
      {
        error: "Error al crear la categoría.",
        pending: "Creando categoría...",
        success: "Categoría creada con éxito.",
      }
    );
  };
  const updateCategory = async (id: any, data: any) => {
    messagePromise(
      async () => {
        await collection?.findOneAndUpdate({ categoryId: id }, { $set: data });
        await getCategories(cardId);
      },
      {
        error: "Error al actualizar la categoría",
        pending: "Actualizando la categoría, por favor espera...",
        success: "Categoría actualizada con éxito",
      }
    );
  };
  const updateCategoryPosition = (data: categories[] | undefined) => {
    messagePromise(
      async () => {
        Promise.all(
          //@ts-ignore
          data?.map(async ({ categoryId }, position) => {
            const find = categories?.find((x) => categoryId == x.categoryId);
            if (find?.position != position) {
              await collection?.findOneAndUpdate(
                { categoryId },
                { $set: { position } }
              );
            }
          })
        );
        await getCategories(cardId);
      },
      {
        error: "Error al actualizar la categoría",
        pending: "Actualizando la categoría, por favor espera...",
        success: "Categoría actualizada con éxito",
      }
    );
  };
  const deleteCategory = async (id: any) => {
    messagePromise(
      async () => {
        await collection?.findOneAndDelete({ categoryId: id });
        await getCategories(cardId);
      },
      {
        error: "Error al eliminar la categoría",
        pending: "Eliminando la categoría, por favor espera...",
        success: "Categoría eliminada con éxito",
      }
    );
  };
  return {
    getCategories,
    createdCategory,
    categories,
    setCardId,
    cardId,
    updateCategory,
    deleteCategory,
    card,
    setCard,
    updateCategoryPosition,
  };
}
const [CategoriesProvider, useCategories] =
  createProviderFn<typeof useCa>(useCa);
export { useCategories, CategoriesProvider };
