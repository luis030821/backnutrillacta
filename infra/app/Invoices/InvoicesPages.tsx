import {
  Button,
  DataStyle,
  H1,
  Icons,
  ModalDownTrigger,
  ModalFooter,
  P,
  Text,
  modal,
  useBoolean,
  useModal,
} from "cllk";
import React, { useEffect, useState } from "react";
import { useInvoice } from "./hooks/useInvoice";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useCollection } from "@llampukaq/realm";
import { invoice } from "@/types/types";
import { formatPrice } from "@/services/Number";
import { product } from "@/infra/products/hooks/useProducts";
import { useInventory } from "../Inventory/hooks/useInventory";
import { useAddressOrganization } from "@/backend/useAddressOrganization";
function InvoicesPages() {
  const { invoices } = useInvoice();
  const { products } = useInventory();
  dayjs.extend(localizedFormat);
  const modalBox = useModal();
  const modalView = useModal();
  const priceEstimation = invoices
    ?.map((x) => {
      return x.invoice.reduce(
        (a, b) => a + parseFloat((b?.estimation as string) ?? 0),
        0
      );
    })
    .reduce((a, b) => a + b, 0)
    .toFixed(2);
  const PrintIcon = ({ pay }: { pay: "cash" | "transfer" | "card" }) => {
    return (
      <>
        {pay == "card" && <Icons icon="IconCreditCard"></Icons>}
        {pay == "cash" && <Icons icon="IconCash"></Icons>}
        {pay == "transfer" && <Icons icon="IconTransferIn"></Icons>}
      </>
    );
  };
  return (
    <div className="my-3">
      <>
        <Text className="text-center text-white" type="BodyLg(Medium)">
          {dayjs().format("LL")}
        </Text>
      </>
      <div className="flex justify-around">
        <ModalDownTrigger
          trigger={<Button>Cierre de caja</Button>}
          title="Cierre de caja"
        >
          {(modal) => <ModalCorte modal={modal} />}
        </ModalDownTrigger>
        <ModalDownTrigger
          trigger={<Button>Estadisticas de cierre de caja</Button>}
          title="Cierre de caja"
        >
          <ModalView modal={modalView} />
        </ModalDownTrigger>
      </div>
      <div className="my-5 space-y-5">
        <div className="bg-zinc-800 rounded-xl p-5 w-11/12 mx-auto space-y-10">
          <div>
            <div className="flex justify-center items-center space-x-3">
              <Text type="BodyMd(Medium)">Total Vendido: </Text>
              <Text className="text-white/70" type="BodyMd">
                $
                {Number(
                  invoices?.reduce((a, b) => a + Number(b.priceAll), 0)
                )?.toFixed(2)}
              </Text>
            </div>
            <div className="flex justify-center items-center space-x-3">
              <Text type="BodyMd(Medium)">Estimación de ganancias</Text>
              <Text className="text-white/70" type="BodyMd">
                ${priceEstimation}
              </Text>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-5">
        {invoices?.map((invoice, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-between w-11/12 max-w-[400px] mx-auto dark:bg-zinc-800 p-5 rounded-xl space-y-3 flex-shrink-0"
          >
            <div className="w-full">
              <DataStyle title="Id">{invoice.invoiceId}</DataStyle>
              <DataStyle title="Creado">
                {dayjs(invoice.created).format("LLL")}
              </DataStyle>
            </div>

            <div className="flex justify-around w-full">
              <div className="bg-zinc-900 rounded-3xl px-3 py-1 flex justify-center items-center space-x-1">
                <PrintIcon pay={invoice?.methodPayment.payment}></PrintIcon>
                <Text type="BodySm(Medium)">
                  {invoice?.methodPayment.payment == "card" && "Tarjeta"}
                  {invoice?.methodPayment.payment == "cash" && "Efectivo"}
                  {invoice?.methodPayment.payment == "transfer" &&
                    "Transferencia"}
                </Text>
              </div>
              <div className="bg-zinc-900 rounded-3xl px-3 py-1 flex justify-center items-center space-x-1">
                <Icons icon="IconBellDollar" />
                <Text type="BodySm(Medium)">Ganancias estimadas</Text>
                <Text type="BodySm(Medium)">
                  $
                  {invoice.invoice
                    .reduce(
                      (a, b) => a + parseFloat((b?.estimation as string) ?? 0),
                      0
                    )
                    .toFixed(2)}
                </Text>
              </div>
            </div>
            <div className="bg-zinc-900 rounded-3xl px-3 py-1 flex justify-center items-center space-x-1">
              <PrintIcon pay={invoice?.methodPayment.payment}></PrintIcon>
              <Text type="BodySm(Medium)">
                Total: ${Number(invoice?.priceAll)?.toFixed(2)}
              </Text>
            </div>
            {invoice?.invoice?.map((x, index) => (
              <div key={index} className="w-full">
                <div className="w-full flex justify-between items-center">
                  <Text type="BodyMd(Medium)">
                    {x.count} {getDescription(products, x.id)}
                  </Text>
                  <Text className="text-white/70" type="BodyMd">
                    ${formatPrice(x.priceUnit * x.count)}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default InvoicesPages;

const ModalCorte = ({ modal }: { modal: modal }) => {
  dayjs.extend(localizedFormat);
  const isNow = useBoolean();
  const { createBoxClose } = useInvoice();
  const { selectedAddress } = useAddressOrganization();
  const collection = useCollection("invoices", "invoices");
  const [data, setData] = useState<invoice[]>();
  const date = isNow.value ? dayjs() : dayjs().subtract(1, "day");
  const f = async () => {
    const res = (await collection?.find({
      organizationId: selectedAddress.addressId,
      formatedDate: date.format("L"),
    })) as invoice[];

    if (res.length != 0) {
      setData(res);
    } else {
      setData(undefined);
    }
  };
  useEffect(() => {
    f();
  }, [date]);

  return (
    <>
      <div className="flex justify-around">
        <div
          className={`${
            isNow.value ? "bg-zinc-900" : "bg-green-800"
          } px-5 py-2 rounded-xl`}
          onClick={isNow.setFalse}
        >
          <Text type="BodyMd">Ayer</Text>
        </div>
        <div
          className={`${
            isNow.value ? "bg-green-800" : "bg-zinc-800"
          } px-5 py-2 rounded-xl`}
          onClick={isNow.setTrue}
        >
          <Text type="BodyMd">Ahora</Text>
        </div>
      </div>
      <Text type="BodyLg(Medium)">{date.format("LL")}</Text>
      <P position="text-center">
        Total:${data?.reduce((a, b) => a + Number(b.priceAll), 0)?.toFixed(2)}
      </P>
      {data?.map((invoice) => (
        <div className="dark:bg-zinc-800 py-2 px-10 rounded-lg">
          <DataStyle title="Descripción">Venta de productos</DataStyle>
          <DataStyle title="Precio">
            ${Number(invoice?.priceAll).toFixed(2)}
          </DataStyle>
        </div>
      ))}
      <ModalFooter
        modal={modal}
        onClick={async () => {
          modal.close();
          await createBoxClose(date);
        }}
      >
        Crear
      </ModalFooter>
    </>
  );
};
const getDescription = (products: product[] | undefined, id: any) => {
  const index = parseFloat(id.charAt(id.length - 1));
  const productDe = products?.find(
    (e) => e.productId == id.substring(0, id.length - 1)
  );
  return `${productDe?.title} ${productDe?.variants?.[index].name}`;
};
const ModalView = ({ modal }: { modal: modal }) => {
  const { getBoxes } = useInvoice();
  dayjs.extend(localizedFormat);
  const [boxes, setBoxes] = useState<
    {
      organizationId: string;
      boxId: string;
      created: Date;
      formatedDate: string;
      price: number;
    }[]
  >();
  const f = async () => {
    const res = (await getBoxes()) as {
      organizationId: string;
      boxId: string;
      created: Date;
      formatedDate: string;
      price: number;
    }[];
    setBoxes(res);
  };
  useEffect(() => {
    f();
  }, []);

  return (
    <>
      <div className="space-y-3">
        {boxes?.map((box, index) => (
          <div
            key={index}
            className="dark:bg-zinc-800 bg-zinc-200 p-3 rounded-xl"
          >
            <div className="flex justify-between">
              <H1>Fecha</H1>
              <P>{dayjs(box.created).format("LL")}</P>
            </div>
            <div className="flex justify-between">
              <H1>Precio</H1>
              <P>
                $
                {typeof box?.price == "string"
                  ? parseFloat(box.price).toFixed(2)
                  : box?.price?.toFixed(2)}
              </P>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
