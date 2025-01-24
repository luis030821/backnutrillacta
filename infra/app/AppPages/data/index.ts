import { nanoid } from "nanoid";

import { ICONS } from "cllk";

export const useDataApp = () => {
  const data: { data: appData[] } = {
    data: [
      {
        name: "Web Services",
        nameEn: "Web Services",
        nameEs: "Servicios Web",
        appId: nanoid(11),
        icon: "IconWebhook",
        description:
          "Este servicio te permite tener una página web gestionando varios aspectos de la misma",
        descriptionEs:
          "Este servicio te permite tener una página web gestionando varios aspectos de la misma",
        descriptionEn:
          "This service allows you to have a web page managing various aspects of it",
        free: true,
        to: "/app/webservices",
      },
      {
        name: "Social Media",
        nameEn: "Social Media",
        nameEs: "Redes Sociales",
        appId: nanoid(11),
        icon: "IconSocial",
        description:
          "Este servicio se complementa con servicios web y te permite tener una página para visualizar tus redes sociales.",
        descriptionEs:
          "Este servicio se complementa con servicios web y te permite tener una página para visualizar tus redes sociales.",
        descriptionEn:
          "This service is complemented with web services and allows you to have a page to view your social networks",
        free: true,
        to: "/app/social",
      },
      {
        name: "Productos",
        nameEn: "Productos",
        nameEs: "Productos",
        appId: nanoid(11),
        icon: "IconShoppingCartX",
        description:
          "Este servicio se complementa con servicios web y te permite tener una página para visualizar tus redes sociales.",
        descriptionEs:
          "Este servicio se complementa con servicios web y te permite tener una página para visualizar tus redes sociales.",
        descriptionEn:
          "This service is complemented with web services and allows you to have a page to view your social networks",
        free: true,
        to: "/app/products",
      },
      {
        name: "Facturas",
        nameEn: "Facturas",
        nameEs: "Facturas",
        appId: nanoid(11),
        icon: "IconFileInvoice",
        description:
          "Este servicio se complementa con servicios web y te permite tener una página para visualizar tus redes sociales.",
        descriptionEs:
          "Este servicio se complementa con servicios web y te permite tener una página para visualizar tus redes sociales.",
        descriptionEn:
          "This service is complemented with web services and allows you to have a page to view your social networks",
        free: true,
        to: "/app/invoices",
      },
      {
        name: "Inventario",
        nameEn: "Inventario",
        nameEs: "Redes Sociales",
        appId: nanoid(11),
        icon: "IconTable",
        description:
          "Este servicio se complementa con servicios web y te permite tener una página para visualizar tus redes sociales.",
        descriptionEs:
          "Este servicio se complementa con servicios web y te permite tener una página para visualizar tus redes sociales.",
        descriptionEn:
          "This service is complemented with web services and allows you to have a page to view your social networks",
        free: true,
        to: "/app/inventory",
      },
      {
        name: "Ordenes & Delivey",
        nameEn: "Ordenes & Delivey",
        nameEs: "Redes Sociales",
        appId: nanoid(11),
        icon: "IconMotorbike",
        description:
          "Este servicio se complementa con servicios web y te permite tener una página para visualizar tus redes sociales.",
        descriptionEs:
          "Este servicio se complementa con servicios web y te permite tener una página para visualizar tus redes sociales.",
        descriptionEn:
          "This service is complemented with web services and allows you to have a page to view your social networks",
        free: true,
        to: "/app/orders",
      },
      {
        name: "Payphone Pos",
        nameEn: "Ordenes & Delivey",
        nameEs: "Redes Sociales",
        appId: nanoid(11),
        icon: "IconClockDollar",
        description:
          "Servicio que te ofrece un pos virtual para todo lo que necesites",
        descriptionEs:
          "Este servicio se complementa con servicios web y te permite tener una página para visualizar tus redes sociales.",
        descriptionEn:
          "This service is complemented with web services and allows you to have a page to view your social networks",
        free: true,
        to: "/app/pos",
      },
    ],
  }; 
  return data;
};
export type appData = {
  nameEn: string;
  nameEs: string;
  appId: string;
  descriptionEn: string;
  descriptionEs: string;
  free?: boolean;
  to: string;
  icon: ICONS;
  onClick?: Function;
  name?: string;
  description: string;
};
export const dataApp = [] as Array<appData>;
