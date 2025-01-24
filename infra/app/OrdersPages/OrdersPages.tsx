import { Button, ModalTrigger, Text } from "cllk";
import ModalCreateOrder from "./components/ModalCreateOrder";
import useOrders from "@/backend/useOrders";
import OrdersProcesing from "./components/components/OrderProcesing";
function OrdersPages() {
  const { orders } = useOrders();
  return (
    <div className="space-y-10">
      <div className="w-10/12 mx-auto div dark:bg-zinc-800 rounded-3xl p-10  my-5 space-y-5">
        <Text type="BodyMd(Medium)">Mira todos tus envios</Text>
        <ModalTrigger
          full
          trigger={
            <div className="flex justify-end">
              <Button>Crea envio</Button>
            </div>
          }
          title="Crea envio"
        >
          <ModalCreateOrder />
        </ModalTrigger>
        <div className="flex space-x-5 justify-end">
          <div className="bg-zinc-900 w-min py-2 px-5 rounded-3xl">
            <Text type="BodyMd(Medium)">Todos</Text>
          </div>
          <div className="bg-zinc-900 w-min py-2 px-5 rounded-3xl">
            <Text type="BodyMd(Medium)">Procesando</Text>
          </div>
          <div className="bg-zinc-900 w-min py-2 px-5 rounded-3xl">
            <Text type="BodyMd(Medium)">Enviados</Text>
          </div>
          <div className="bg-zinc-900 w-min py-2 px-5 rounded-3xl">
            <Text type="BodyMd(Medium)">Finalizados</Text>
          </div>
        </div>
      </div>
      {orders?.map((order, index) => (
        <OrdersProcesing data={order} key={index} />
      ))}
    </div>
  );
}

export default OrdersPages;
