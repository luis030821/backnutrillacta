import client from "@/client";
import {
  confirmatioReturn,
  estimateShipingOrderBody,
  estimateShipingOrderReturn,
} from "@/interface";

function usePedidosYa() {
  const api = `${client.llampukaq}`;
  const estimateShipingOrder = async (
    body: estimateShipingOrderBody
  ): Promise<estimateShipingOrderReturn> => {
    return await (
      await fetch(`${api}/v1/shippings/estimates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...body,
          isTest: client.enviroment != "PRODUCTION",
        }),
      })
    ).json();
  };
  const confirmedEstimateOrder = async (
    estimateId: string | undefined,
    deliveryOfferId: string
  ): Promise<typeof confirmatioReturn> => {
    return await (
      await fetch(`${api}/v1/shippings/estimates/${estimateId}/confirm`, {
        method: "POST",
        body: JSON.stringify({ deliveryOfferId }),
      })
    ).json();
  };
  const cancelShippingOrder = async (
    shippingId: string,
    reasonText: string
  ) => {
    return await (
      await fetch(`${api}/v1/shippings/${shippingId}/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reasonText }),
      })
    ).json();
  };
  const getShippingOrderDetails = async (shippingId: string) => {
    return await (await fetch(`${api}/v1/shippings/${shippingId}`)).json();
  };
  const getShippingOrderTracking = async (shippingId: string) => {
    return await (
      await fetch(`${api}/v1/shippings/${shippingId}/tracking`)
    ).json();
  };
  const ret = {
    estimateShipingOrder,
    confirmedEstimateOrder,
    cancelShippingOrder,
    getShippingOrderDetails,
    getShippingOrderTracking,
  };
  return ret;
}

export default usePedidosYa;
