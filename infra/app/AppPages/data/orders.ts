import { nanoid } from "nanoid";

export const ordersApp = {
  name: "Pedidos",
  appId: nanoid(11),
  description:
    "Este servicio te permite visualizar y tratar los pedidos de tu aplicaion web,es necesario tener el servicio Web Services funionando",
  img: "/llk/app/orders.svg",
  to: "/app/orders",
};
