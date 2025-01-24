import { product } from "@/infra/products/hooks/useProducts";
import { Organization, invoice } from "@/types/types";
import { useCollection } from "@llampukaq/realm";
import { useOrganization } from "@llampukaq/realm-organizations";
import { createProviderFn, useMessage } from "cllk";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { nanoid } from "nanoid";
import { useAddressOrganization } from "@/backend/useAddressOrganization";
import client from "@/client";
function usePro() {
  const { messagePromise, message } = useMessage();
  dayjs.extend(localizedFormat);
  const { organization } = useOrganization<Organization>();
  const Productcollection = useCollection("organization", "products");
  const collection = useCollection("invoices", "invoices");
  const collectionBox = useCollection("invoices", "box");
  const [products, setProducts] = useState<product[]>();
  const { selectedAddress } = useAddressOrganization();
  const getProducts = async () => {
    const res = await Productcollection?.find({
      organizationId: "nutrillacta",
    });
    //@ts-ignore
    setProducts(res);
  };
  const [invoice, setInvoice] = useState<invoice[]>();
  const getInvoices = async () => {
    const res = await collection?.find({
      organizationId: selectedAddress?.addressId,
      formatedDate: dayjs().format("L"),
    });
    setInvoice(res);
  };
  const getBoxes = async () => {
    return await collectionBox?.find({
      organizationId: "nutrillacta",
    });
  };
  const createBoxClose = async (date: any) => {
    const res = (await collection?.find({
      organizationId: "nutrillacta",
      formatedDate: date.format("L"),
    })) as invoice[];

    if (res?.length == 0) {
    }
    if (res?.length != 0) {
      const f = await collectionBox?.findOne({
        organizationId: "nutrillacta",
        formatedDate: date.format("L"),
      });
      if (f == undefined) {
        messagePromise(
          async () => {
            const price = res.reduce((a, b) => a + Number(b.priceAll), 0);
            const d = {
              organizationId: "nutrillacta",
              boxId: nanoid(10),
              created: date.toDate(),
              formatedDate: date.format("L"),
              price: Number(parseFloat(`${price}`).toFixed(2)),
            };
            await collectionBox?.insertOne(d);
          },
          {
            error: "Error al crear corte",
            pending: "Creando corte de facturas",
            success: "Corte de facturas creado",
          }
        );
      }
      if (f != undefined) {
        message({ type: "alert", description: "El corte ya existe" });
      }
    }
  };
  const createInvoiceSimple = async (
    data: {
      price: number[];
      invoice: any[];
    } & any
  ) => {
    const d = {
      invoiceId: nanoid(10),
      created: new Date(),
      formatedDate: dayjs().format("L"),
      organizationId: selectedAddress.addressId,
      ...data,
    };
    const api = `${client.llampukaq}/v1/organization/${selectedAddress.addressId}/invoices`;

    messagePromise(
      async () => {
        await fetch(api, { method: "POST", body: JSON.stringify(d) });
        await getInvoices();
      },
      {
        error: "Error",
        pending: "Creando factura...",
        success: "Factura creada",
      }
    );
  };
  useEffect(() => {
    getInvoices();
    getProducts();
  }, []);
  return {
    createInvoiceSimple,
    products,
    invoices: invoice,
    createBoxClose,
    getBoxes,
  };
}

const [InvoiceProvider, useInvoice] = createProviderFn<typeof usePro>(usePro);
export { useInvoice, InvoiceProvider };
