import { UserGeneric } from "@llampukaq/realm";
import { OrganizationGeneric } from "@llampukaq/realm-organizations";
import { ICONS } from "cllk";

export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
export type User = UserGeneric & {
  type: "free";
  howManyBusiness: number;
  phone?: number;
  organizations?: {
    name: string;
    organizationId: string;
    invitation: boolean;
  }[];
};
export type AddressOrg = {
  isMatriz: boolean;
  title: string;
  addressAdditional: string;
  instructions: string;
  email: string;
  address: string;
  who: string;
  addressId: string;
  addressStreet: string;
  name: string;
  phone: string;
  map: any;
  reference: string;
  country: string;
  country_code: string;
  state: string;
  county: string;
  city: string;
  postcode: string;
  suburb: string;
  street: string;
  state_code: string;
  formatted: string;
  address_line1: string;
  address_line2: string;
  plus_code: string;

  rank: {
    importance: number;
    popularity: number;
  };
  place_id: string;
};

export type Organization = OrganizationGeneric<{
  description: { en: string; es: string };
  panels: {
    name: { en: string; es: string };
    appId: string;
    to: string;
    show: boolean;
    icons: ICONS;
  }[];
  address: AddressOrg[];
  logo?: {
    id: string;
    name: string;
    size: number;
    src: string;
  };
}>;
export interface methodPayment {
  payment: "card" | "transfer" | "cash";
  brand?:
    | "visa"
    | "mastercard"
    | "amex"
    | "diners"
    | "discover"
    | "alia"
    | "unionpay"
    | "maestro"
    | "pichincha"
    | "deuna"
    | "guayaquil";
}
export type invoice = {
  methodPayment: methodPayment;
  created: Date;
  dateFormated: string;
  priceAll: number;
  organizationId: string;
  invoiceId: string;
  invoice: {
    estimation?: string | number;
    id: string;
    priceUnit: number;
    count: number;
  }[];
  estimation?: number | string;
};

export type User2 = UserGeneric<{ address: Address[] }>;
export type Address = {
  addressId: string;
  name: string;
  phone: string;
  map: any;
  reference: string;
  country: string;
  country_code: string;
  state: string;
  county: string;
  city: string;
  postcode: string;
  suburb: string;
  street: string;
  state_code: string;
  formatted: string;
  address_line1: string;
  address_line2: string;
  plus_code: string;
  rank: {
    importance: number;
    popularity: number;
  };
  place_id: string;
};

export type order = {
  shop: { productId: string; count: number }[];
  show: boolean;
  status: "0" | "50" | "100";
  to: {
    userId: string;
    addressId: any;
  };
  orderId: string;
  payment: "transfer" | "cash" | "paypal";
  estimateId: string;
  discard?: boolean;
  distance: number;
  deliveryOfferId: string;
  deliveryPrice?: number;
  shareLocationUrl?: string;
  shippingId?: string;
  onlineSupportUrl?: string;
  price?: number;
};

export interface estimateShipingOrderReturn {
  estimateId: string;
  referenceId: string;
  isTest: boolean;
  items: {
    type: "FRAGILE" | "STANDARD" | "COLD";
    value: number;
    description: string;
    sku: string;
    quantity: number;
    volume: number;
    weight: number;
  }[];
  waypoints: {
    type: "PICK_UP" | "DROP_OFF";
    addressStreet: string;
    addressAdditional: string;
    city: string;
    latitude?: number;
    longitude?: number;
    phone: string;
    name: string;
    instructions: string;
  }[];
  routes: {
    distance: number;
  };
  deliveryOffers: {
    deliveryOfferId: string;
    deliveryMode: string;
    confirmationTimeLimit: string;
    pricing: {
      subTotal: number;
      taxes: number;
      total: number;
      currency: string;
    };
  }[];
  notificationMail: string;
}

export interface estimateShipingOrderBody {
  referenceId: string;
  deliveryTime?: Date;
  isTest?: boolean;
  items: {
    type: "FRAGILE" | "STANDARD" | "COLD";
    value: number;
    description: string;
    sku?: string;
    quantity: number;
    volume: number;
    weight: number;
  }[];
  waypoints: {
    type: "PICK_UP" | "DROP_OFF";
    addressStreet: string;
    addressAdditional?: string;
    city: string;
    latitude?: number;
    longitude?: number;
    phone: string;
    name?: string;
    instructions?: string;
    collectMoney?: number;
  }[];

  notificationMail?: string;
  requirements?: {
    includeDeliveryFee?: boolean;
  };
}
