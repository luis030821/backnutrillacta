import usePedidosYa from "@/backend/backend/usePedidosYa";
import { estimateShipingOrderReturn } from "@/interface";
import { AddressOrg, Organization } from "@/types/types";
import { useOrganization } from "@llampukaq/realm-organizations";
import { Button, useInput, useMessage } from "cllk";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import localizedFormat from "dayjs/plugin/localizedFormat";
import useOrders from "@/backend/useOrders";

import { formatNumber, formatPrice } from "@/services/Number";
import { Stepper } from "cllk";
import AddItemsOrders from "./components/ModalCreateOrder/AddItemsOrders";
import AddressBusiness from "./components/ModalCreateOrder/AddressBusiness";
import DropOffOrder from "./components/ModalCreateOrder/DropOffOrder";
import InfoOrder from "./components/ModalCreateOrder/InfoOrder";
import EstimationOrders from "./components/ModalCreateOrder/EstimationOrders";
import { createAddress } from "@/infra/organization/hooks/useOrganizationAddress";
import { nanoid } from "nanoid";
import { useAddressOrganization } from "@/backend/useAddressOrganization";

function ModalCreateOrder() {
  const { address: Address } = useAddressOrganization();
  const [address, setAddress] = useState<AddressOrg | undefined>();
  useEffect(() => {
    setAddress(Address?.[0]);
  }, []);
  //@ts-ignore
  const [addressDelivey, setAddressDelivery] = useState<AddressOrg>({});
  const handleChange = (event: any, name: string) => {
    const { value } = event.target;
    //@ts-ignore
    setAddressDelivery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const { confirmedEstimateOrder } = usePedidosYa();
  const [pedidosYa, setPedidosYa] = useState<estimateShipingOrderReturn>();
  dayjs.extend(localizedFormat);
  const [confirmaction, setConfirmation] = useState<number>();
  const count = useInput("1", "");
  const [items, setItems] = useState<
    {
      type: "FRAGILE" | "STANDARD" | "COLD";
      value: number;
      description: string;
      sku?: string | undefined;
      quantity: number;
      volume: number;
      weight: number;
    }[]
  >([]);
  const { createOrder } = useOrders();
  const { message } = useMessage();
  const { estimateShipingOrder } = usePedidosYa();
  return (
    <>
      <div className="w-11/12 mx-auto min-h-full rounded-3xl p-10 my-5 space-y-10">
        <Stepper
          onContinue={async (step) => {
            if (step == 2 && items.length == 0) {
              message({ description: "Agrega productos ", type: "alert" });
            }
            if (step == 4) {
              const res = await createAddress(addressDelivey);
              const d = {
                referenceId: nanoid(11),
                //@ts-ignore
                items,
                waypoints: [
                  {
                    type: "PICK_UP",
                    //@ts-ignore
                    addressStreet: address?.addressStreet,
                    //@ts-ignore
                    city: address?.city,
                    //@ts-ignore
                    phone: address?.phone,
                    addressAdditional: address?.addressAdditional,
                    instructions: address?.instructions,
                    latitude: address?.map.lat,
                    longitude: address?.map.lng,
                    name: address?.name,
                  },
                  {
                    type: "DROP_OFF",
                    addressStreet: addressDelivey.addressStreet,
                    city: res.city,
                    phone: addressDelivey.phone,
                    addressAdditional: addressDelivey.addressAdditional,
                    instructions: addressDelivey.instructions,
                    latitude: addressDelivey.map.lat,
                    longitude: addressDelivey.map.lng,
                    name: addressDelivey.name,
                  },
                ],
              };
              //@ts-ignore
              const es = await estimateShipingOrder(d);
              setPedidosYa(es);
              setAddressDelivery(res);
            }
          }}
          onSubmit={async () => {
            if (items.length == 0) {
              message({ description: "Agrega productos ", type: "alert" });
              return;
            }
            const order = pedidosYa?.deliveryOffers?.[confirmaction ?? 0];
            const res = await confirmedEstimateOrder(
              pedidosYa?.estimateId,
              order?.deliveryOfferId ?? ""
            );

            //@ts-ignore
            await createOrder(
              //@ts-ignore
              items?.map((r) => {
                return { productId: r.sku, count: r.quantity };
              }) ?? [{ count: "", productId: "" }],
              //@ts-ignore
              items.reduce((a, b) => a + b.quantity * b.value, 0) +
                //@ts-ignore
                order?.pricing.total ?? 0,
              {
                //@ts-ignore
                fee60: formatPrice(order?.pricing?.total * 0.6),
                //@ts-ignore
                fee40: formatPrice(order?.pricing?.total * 0.4),
                //@ts-ignore
                distance: formatNumber(order?.route?.distance),
                //@ts-ignore
                confirmationCode: res.confirmationCode,
                shareLocationUrl: res.shareLocationUrl,
                referenceId: res.referenceId,
              },
              "50"
            );
          }}
          allowClickControl={false}
          backBtn={<Button>Atras</Button>}
          continueBtn={<Button>Siguiente</Button>}
          submitBtn={<Button>Crear Envio</Button>}
        >
          <AddItemsOrders count={count} items={items} setItems={setItems} />
          <AddressBusiness />
          <DropOffOrder
            address={address}
            addressDelivey={addressDelivey}
            handleChange={handleChange}
            setAddressDelivery={setAddressDelivery}
            setPedidosYa={setPedidosYa}
          />
          <InfoOrder address={address} addressDelivey={addressDelivey} />
          <EstimationOrders
            setConfirmation={setConfirmation}
            confirmaction={confirmaction}
            pedidosYa={pedidosYa}
          />
        </Stepper>
      </div>
    </>
  );
}

export default ModalCreateOrder;
