import {
  Button,
  Input,
  Invoice,
  ModalDownTrigger,
  ModalFooter,
  modal,
  useInput,
  useMessage,
} from "cllk";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useInvoice } from "../hooks/useInvoice";
import SearchProduct from "@/components/developer/SearchProduct";
import { nanoid } from "nanoid";
import { useInventory } from "../../Inventory/hooks/useInventory";
import { formatNumber, formatPrice } from "@/services/Number";
const ModalFactura = ({ modal }: { modal: modal }) => {
  const [invoice, setInvoice] = useState<
    {
      count: number;
      description: string;
      priceUnit: number;
      id: string;
      type: "manual" | undefined;
    }[]
  >([]);

  const { handleSubmit, register, reset } = useForm();
  const { message, messagePromise } = useMessage();
  const { createInvoiceSimple, products } = useInvoice();
  const count = useInput("1", "");
  const { inventory } = useInventory();
  return (
    <>
      <div className="flex justify-around">
        <ModalDownTrigger
          trigger={<Button>Productos</Button>}
          title="Productos"
        >
          {(modalProductos) => (
            <>
              <Input {...count} type="number" label="Cantidad" />
              <SearchProduct
                inventory={inventory}
                onClick={(data) => {
                  const d = {
                    ...data,
                    count: count.value,
                  };
                  modalProductos.close();
                  //@ts-ignore
                  setInvoice((prev) => [...prev, d]);
                }}
                products={products}
              />
            </>
          )}
        </ModalDownTrigger>
        <ModalDownTrigger trigger={<Button>Manual</Button>} title="Manual">
          {(modalManual) => (
            <form
              onSubmit={(e) => {
                handleSubmit((data) => {
                  const d = {
                    description: data.description,
                    priceUnit: data.priceUnit,
                    count: data.count,
                    id: nanoid(2),
                    type: "manual",
                  };
                  reset();
                  modalManual.close();
                  //@ts-ignore
                  setInvoice((prev) => [...prev, d]);
                })(e);
              }}
            >
              <Input
                required
                defaultValue={1}
                type="number"
                register={register}
                name="count"
                label="Cantidad"
              />
              <Input
                required
                register={register}
                name="description"
                label="Descripcion"
              />
              <Input
                required
                register={register}
                name="priceUnit"
                step="any"
                type="numer"
                label="Precio"
              />
              <ModalFooter modal={modalManual}>Crear</ModalFooter>
            </form>
          )}
        </ModalDownTrigger>
      </div>
      <Invoice
        product={invoice}
        onClick={async (data) => {
          if (data.description == "" || data.price == 0) {
            message({
              type: "alert",
              description: "No tienes productos para factura",
            });
          } else {
            modal.close();
            messagePromise(
              async () => {
                await createInvoiceSimple({
                  ...data,
                  invoice: invoice.map((x) => {
                    if (x.type == undefined) {
                      return {
                        id: x.id,
                        priceUnit: formatPrice(x.priceUnit),
                        count: formatNumber(x.count, 0),
                      };
                    } else {
                      return {
                        estimation: 0,
                        id: x.id,
                        priceUnit: formatPrice(x.priceUnit),
                        count: formatNumber(x.count, 0),
                      };
                    }
                  }),
                });
              },
              {
                error: "Error",
                pending: "Creando factura...",
                success: "Factura creada",
              }
            );
          }
        }}
      />
    </>
  );
};

export default ModalFactura;
