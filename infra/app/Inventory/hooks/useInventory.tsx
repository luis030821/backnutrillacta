import { product } from "@/infra/products/hooks/useProducts";
import { Organization } from "@/types/types";
import { useCollection, useSync } from "@llampukaq/realm";
import { useOrganization } from "@llampukaq/realm-organizations";
import { createProviderFn, useMessage } from "cllk";

import { useEffect, useState } from "react";
import { Inventory } from "../InventoryPages";
import { useAddressOrganization } from "@/backend/useAddressOrganization";
import { Shop } from "../../Invoices/interfaceMac";

function useI() {
  const { messagePromise } = useMessage();
  const collectionProducts = useCollection("organization", "products");
  const { organization } = useOrganization<Organization>();
  const [products, setProducts] = useState<product[]>();
  const { selectedAddress } = useAddressOrganization();

  const findProducts = async () => {
    const res = await collectionProducts?.find({
      organizationId: "nutrillacta",
    });
    setProducts(res);
  };

  const [inventory, setInventory] = useState<Inventory[]>();
  const collection = useCollection("organization", "inventory");
  const find = async () => {
    const inventory = await collection?.find({
      organizationId: selectedAddress?.addressId,
    });
    setInventory(inventory);
  };
  useEffect(() => {
    findProducts();
    find();
  }, [organization, selectedAddress]);

  useSync<Inventory>(
    collection,
    ["insert", "update"],
    (operaration, document) => {
      if (operaration == "insert") {
        if (document.organizationId == "nutrillacta") {
          setInventory((prevInventory) => {
            const exit =
              prevInventory?.find(
                (x) => x.inventoryId == document.inventoryId
              ) != undefined;
            if (exit) {
              return [...(prevInventory ?? [])];
            } else {
              return [...(prevInventory ?? []), document];
            }
          });
        }
        return;
      }
      if (operaration == "update") {
        if (document.organizationId == "nutrillacta") {
          setInventory((prevInventory) => {
            return prevInventory?.map((x) => {
              return x.inventoryId == document.inventoryId ? document : x;
            });
          });
        }
        return;
      }
    }
  );
  const createInventory = async (data: any) => {
    messagePromise(
      async () => {
        await collection?.insertOne({
          ...data,
          organizationId: selectedAddress?.addressId,
        });
      },
      {
        error: "Error al crear inventario",
        pending: "Creando inventario",
        success: "Inventario creado",
      }
    );
  };
  const updateInventory = async (id: string, data: any) => {
    messagePromise(
      async () => {
        await collection?.findOneAndUpdate(
          {
            inventoryId: id,
          },
          { $set: data }
        );
      },
      {
        error: "Error al actualizar inventario",
        pending: "Actualizando inventario ...",
        success: "Inventario actualizado",
      }
    );
  };
  const updateManyInventoryScanner = (shop: Shop[]) => {
    messagePromise(
      async () => {
        shop.forEach(async (x) => {
          const findInventory = inventory?.find(
            (e) => e.productId == x.productId
          );
          await collection?.findOneAndUpdate(
            {
              productId: x.productId,
            },
            { $set: { stock: Number(x.count) + Number(findInventory?.stock) } }
          );
        });
      },
      {
        error: "Error al actualizar inventario",
        pending: "Actualizando inventario ...",
        success: "Inventario actualizado",
      }
    );
  };
  return {
    updateManyInventoryScanner,
    inventory,
    createInventory,
    updateInventory,
    products,
  };
}
const [InventoryProvider, useInventory] = createProviderFn<typeof useI>(useI);
export { InventoryProvider, useInventory };
