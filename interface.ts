import { UserGeneric } from "@llampukaq/realm";

export type User = UserGeneric<{ address: Address[] }>;
export type Address = {
  who: string;
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
    userId: "default" | string;
    addressId: "PICKUP" | string;
  };
  orderId: string;
  payment: "transfer" | "cash" | "paypal";
  estimateId: string;
  referenceId: string;
  discard?: boolean;
  distance: number;
  deliveryOfferId: string;
  deliveryPrice?: number;
  shareLocationUrl?: string;
  confirmationCode?: string;
  shippingId?: string;
  onlineSupportUrl?: string;
  price?: number;
  organizationId: string;
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

export const confirmatioReturn = {
  estimateId: "23562302281727155893283",
  shippingId: "15562302281527156893283",
  confirmationCode: "9869921368",
  isTest: true,
  referenceId: "Order 12344",
  status: "CONFIRMED",
  proofOfDelivery: false,
  shareLocationUrl: "https://example.pedidosya.com.uy/tracking/MTUE1NTY=",
  notificationMail: "notification@email.com",
  onlineSupportUrl:
    "[DEPRECATED] - This field is DEPRECATED. Now to access at online support is necessary enter at web courier business https://envios.pedidosya.com, log in with your credentials, and navigate to the 'Mis envíos' section",
  items: [
    {
      categoryId: 11986575,
      categoryName: "Envío",
      value: 500,
      description: "Teclado",
      sku: "ABC123",
      volume: 1,
      weight: 1,
      quantity: 2,
      type: "STANDARD",
    },
    {
      categoryId: 11986575,
      categoryName: "Envío",
      value: 100,
      description: "Teclado",
      volume: 1,
      weight: 1,
      quantity: 2,
      type: "STANDARD",
    },
  ],
  waypoints: [
    {
      type: "PICK_UP",
      addressStreet: "Marco Bruto 1210",
      city: "Montevideo",
      latitude: -34.9057308,
      longitude: -56.1381682,
      phone: "+5981135344343",
      name: "Jorge Gutierrez",
      instructions: "prueta verde ",
    },
    {
      type: "DROP_OFF",
      addressStreet: "Andes 1111",
      city: "Montevideo",
      latitude: -34.9108124,
      longitude: -56.1979015,
      phone: "+541144154415",
      name: "Martin Novo",
    },
  ],
  route: {
    deliveryMode: "CROSS_DOCKING",
    estimatedPickUpTime: "2023-04-04T13:00:00Z",
    deliveryTimeFrom: "2023-04-04T23:00:00Z",
    deliveryTimeTo: "2023-04-05T02:00:00Z",
    distance: 6030,
    pricing: {
      subTotal: 180,
      taxes: 0,
      total: 180,
      currency: "UYU",
    },
  },
  createdAt: "2023-02-28T15:27:15Z",
};
