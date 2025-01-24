import { useAddressOrganization } from "@/backend/useAddressOrganization";
import { Card } from "@/infra/products/hooks/useCards";
import { categories } from "@/infra/products/hooks/useCategories";
import { product } from "@/infra/products/hooks/useProducts";
import { Organization } from "@/types/types";
import { useCollection } from "@llampukaq/realm";
import { useOrganization } from "@llampukaq/realm-organizations";
import { createProviderFn, useMessage } from "cllk";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import localizedFormat from "dayjs/plugin/localizedFormat";
import client from "@/client";
function useCYP() {
  dayjs.extend(localizedFormat);
  const { organization } = useOrganization<Organization>();
  const collectionCards = useCollection("organization", "cards");
  const collectionCategory = useCollection("organization", "categories");
  const collectionProduct = useCollection("organization", "products");
  const [categories, setCategories] = useState<categories[]>();
  const [products, setProducts] = useState<product[]>();
  const [cards, setCards] = useState<Card[]>();
  const [defaultCategory, setDefaultCategory] = useState<categories>();
  const findProduct = async () => {
    const res = await collectionProduct?.find(
      { organizationId: "nutrillacta" },
      { projection: { private: false } }
    );
    setProducts(res);
  };
  const findCategory = async () => {
    const res = await collectionCategory?.find(
      { organizationId: "nutrillacta" },
      { projection: { private: false } }
    );
    setDefaultCategory(res?.[0]);
    setCategories(res);
  };
  const findCards = async () => {
    const res = await collectionCards?.find(
      { organizationId: "nutrillacta" },
      { projection: { private: false } }
    );
    setCards(res);
  };
  useEffect(() => {
    findCards();
    findCategory();
    findProduct();
  }, []);
  const { selectedAddress } = useAddressOrganization();
  const { messagePromise } = useMessage();
  const invoices = useCollection("invoices", "invoices");
  const createInvoice = async (shop: any, all: any, methodPayment: any) => {
    const d = {
      invoiceId: nanoid(10),
      created: new Date(),
      formatedDate: dayjs().format("L"),
      saleNote: nanoid(3),
      priceAll: Number(all),
      client: "Final",
      methodPayment,
      organizationId: selectedAddress.addressId,
      invoice: shop.map((x: any) => {
        const count = x.count;
        const index = parseFloat(x.productId.charAt(x.productId.length - 1));
        const id = x.productId.substring(0, x.productId.length - 1);
        const product = products?.find((x: product) => x.productId == id);
        return {
          id: x.productId,
          count,
          priceUnit: Number(product?.variants?.[index].price),
        };
      }),
    };

    messagePromise(
      async () => {
        await fetch(
          `${client.llampukaq}/v1/organization/${selectedAddress.addressId}/invoices`,
          { method: "POST", body: JSON.stringify(d) }
        );
      },
      {
        error: "Error",
        pending: "Creando factura...",
        success: "Factura creada",
      }
    );
  };
  return {
    cards,
    categories,
    products,
    defaultCategory,
    setDefaultCategory,
    createInvoice,
  };
}

const [CategoryProductProvider, useCP] =
  createProviderFn<typeof useCYP>(useCYP);
export { CategoryProductProvider, useCP };
