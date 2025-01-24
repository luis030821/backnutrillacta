import useMessage from "@/context/message/useMessage";
import React from "react";

interface PaymentSource {
  card: {
    last_digits: string;
    brand: string;
    type: string;
  };
}

interface Amount {
  currency_code: string;
  value: string;
}

interface SellerReceivableBreakdown {
  gross_amount: Amount;
  paypal_fee: Amount;
  net_amount: Amount;
}

interface SellerProtection {
  status: string;
}

interface Links {
  href: string;
  rel: string;
  method: string;
}

interface ProcessorResponse {
  avs_code: string;
  cvv_code: string;
  response_code: string;
}

interface Capture {
  id: string;
  status: string;
  amount: Amount;
  final_capture: boolean;
  disbursement_mode: string;
  seller_protection: SellerProtection;
  seller_receivable_breakdown: SellerReceivableBreakdown;
  links: Links[];
  create_time: string;
  update_time: string;
  processor_response: ProcessorResponse;
}

interface PurchaseUnit {
  reference_id: string;
  payments: {
    captures: Capture[];
  };
}

interface Links2 {
  href: string;
  rel: string;
  method: string;
}

export interface OrderPaypal {
  id: string;
  status: string;
  payment_source: PaymentSource;
  purchase_units: PurchaseUnit[];
  links: Links2[];
}

function usePaypalErrors() {
  const { message } = useMessage();
  function getErrorMessage(order: OrderPaypal, callback: any): string {
    const status = order.purchase_units[0].payments.captures[0].status;
    const responseCode =
      order.purchase_units[0].payments.captures[0].processor_response
        .response_code;

    switch (status) {
      case "COMPLETED":
      case "PENDING":
        message({ type: "success", description: "Pago exitoso" });
        callback?.();
        return "Pago exitoso";
      default:
        switch (responseCode) {
          case "0500":
            message({
              type: "error",
              description: "Tarjeta rechazada",
            });
            throw new Error("DO_NOT_HONOR");

          case "9500":
            message({
              type: "error",
              description:
                "Tarjeta fraudulenta. Intenta usar otra tarjeta. No vuelvas a intentar la misma tarjeta.",
            });
            throw new Error("SUSPECTED_FRAUD");

          case "5400":
            message({
              type: "error",
              description: "Tarjeta vencida",
            });
            throw new Error("EXPIRED_CARD");

          case "5180":
            message({
              type: "error",
              description:
                "Fallo en la verificación Luhn. Intenta usar otra tarjeta. No vuelvas a intentar la misma tarjeta.",
            });
            throw new Error("INVALID_OR_RESTRICTED_CARD");

          case "5120":
            message({
              type: "error",
              description: "Fondos insuficientes",
            });
            throw new Error("INSUFFICIENT_FUNDS");

          case "9520":
            message({
              type: "error",
              description:
                "Tarjeta perdida o robada. Intenta usar otra tarjeta. No vuelvas a intentar la misma tarjeta.",
            });
            throw new Error("LOST_OR_STOLEN");

          case "1330":
            message({
              type: "error",
              description: "Tarjeta no válida",
            });
            throw new Error("INVALID_ACCOUNT");

          case "5100":
            message({
              type: "error",
              description: "Tarjeta declinada",
            });
            throw new Error("GENERIC_DECLINE");

          case "00N7":
          case "5110":
            message({
              type: "error",
              description: "Fallo en la verificación CVC",
            });
            throw new Error(
              "CVV2_FAILURE_POSSIBLE_RETRY_WITH_CVV o CVV2_FAILURE"
            );

          default:
            message({ type: "error", description: "Error desconocido" });
            throw new Error("Error desconocido");
        }
    }
  }

  return { getErrorMessage };
}
export default usePaypalErrors;
