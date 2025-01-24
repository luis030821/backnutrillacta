import { useCollection } from "@llampukaq/realm";
import { useMessage } from "cllk";

function useRemoveInventory() {
  const collection = useCollection("organization", "inventory");
  const { messagePromise } = useMessage();
  const updateInventoryItems = async (id: string, count: number) => {
    messagePromise(
      async () => {
        const find = await collection?.findOneAndUpdate(
          { inventoryId: id },
          { stock: true }
        );
        await collection?.findOneAndUpdate(
          {
            inventoryId: id,
          },
          { $set: { stock: parseInt(`${find?.stock}`) - count } }
        );
      },
      {
        error: "Error al actualizar inventario",
        pending: "Actualizando inventario ...",
        success: "Inventario actualizado",
      }
    );
  };
  return { updateInventoryItems };
}

export default useRemoveInventory;
