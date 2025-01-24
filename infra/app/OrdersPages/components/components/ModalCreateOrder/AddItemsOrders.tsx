import SearchProduct from "@/components/developer/SearchProduct";
import { useInventory } from "@/infra/app/Inventory/hooks/useInventory";
import { Button, Input, ModalDownTrigger, Text } from "cllk";
import React from "react";
import { useOrderCreate } from "../../CreateOrderProvider";

function AddItemsOrders({
  items,
  count,
  setItems,
}: {
  items: any[];
  count: any;
  setItems: any;
}) {
  const { products } = useOrderCreate();
  return (
    <div className="flex flex-col flex-wrap gap-5 p-5 bg-zinc-800 rounded-3xl">
      <div>
        <Text className="text-center text-white" type="BodyLg(Medium)">
          Items
        </Text>
        <Text type="BodySm">
          Incluya todos los productos que serán enviados a domicilio.
        </Text>
      </div>

      {items?.map((x, index) => (
        <div key={index} className="dark:bg-zinc-900 rounded-xl p-5 w-40">
          <div>
            <Text type="BodySm">X {x.quantity}</Text>
            <Text type="BodySm">{x.description}</Text>
          </div>
        </div>
      ))}
      <div>
        <ModalDownTrigger
          trigger={<Button center>Agregar items</Button>}
          title="Productos"
        >
          {(modal) => (
            <>
              <Input {...count} type="number" label="Cantidad" />
              <SearchProduct
                returnAll
                onClick={(data) => {
                  modal.close();
                  const d = {
                    ...data,
                    quantity: count.value,
                  };
                  setItems((prev: any) => [...prev, d]);
                }}
                products={products}
              />
            </>
          )}
        </ModalDownTrigger>
      </div>
    </div>
  );
}

export default AddItemsOrders;
