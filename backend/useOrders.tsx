import { User, order } from "@/interface";
import { Organization } from "@/types/types";
import { useCollection, useSync, useUser } from "@llampukaq/realm";
import { useOrganization } from "@llampukaq/realm-organizations";
import { useMessage } from "cllk";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
function useOrders() {
  const { user } = useUser<User>();
  const { organization } = useOrganization<Organization>();
  const { messagePromise } = useMessage();
  const collection = useCollection("order", "orders");
  const [orderSync, setOrderSync] = useState<order[]>([]);
  const findProcesing = async () => {
    const res = (await collection?.find({
      organizationId: "nutrillacta",
    })) as order[];
    setOrderSync(res);
  };
  useEffect(() => {
    findProcesing();
  }, [organization]);
  const handleNotificationClick = () => {
    const audio = new Audio(
      "https://phoneky.co.uk/content/mp3tones/tone/2020/alert/preview/2fe8b5df5094433.mp3"
    );
    audio.play();

    new Notification("Nuevo mensaje", {
      body: "Has recibido un nuevo mensaje",
      icon: "icono.png",
    });
  };
  useSync(collection, ["insert", "update"], (operationType, document) => {
    if (operationType === "update") {
      const re = document as order;
      setOrderSync((prevOrderSync) => {
        const orderSyncArray = prevOrderSync.map((x) =>
          x.orderId === re.orderId ? re : x
        );
        return orderSyncArray;
      });
      return;
    }
    if (operationType === "insert") {
      const re = document as order;
      setOrderSync((prevOrderSync) => {
        handleNotificationClick();
        const exist = prevOrderSync.find((x) => x.orderId == re.orderId);
        if (exist == undefined) {
          return [...prevOrderSync, re];
        } else {
          return [...prevOrderSync];
        }
      });
      return;
    }
  });

  const createOrder = async (
    shop: { productId: string; count: number }[],
    price: number | string,
    opt?: object | undefined,
    status: string = "0"
  ) => {
    const data = {
      shop,
      show: true,
      organizationId: "nutrillacta",
      status,
      type: "manual",
      to: { userId: user.userId, addressId: "" },
      orderId: nanoid(11),
      price,
      ...opt,
    };
    messagePromise(
      async () => {
        await collection?.insertOne(data);
      },
      {
        error: "Error al crear orden, intenta de nuevo",
        pending: "Creando orden",
        success: "Orden creada",
      }
    );
  };
  const findOrder = async () => {
    return await collection?.findOne({
      "to.userId": user.userId,
      $or: [{ status: "0" }, { status: "50" }],
    });
  };
  const findOrdersFinally = async () => {
    return await collection?.find({
      "to.userId": user.userId,
      status: "100",
    });
  };

  const deleteOrder = async (orderId: any) => {
    await collection?.findOneAndUpdate({ orderId }, { $set: { show: false } });
  };
  return {
    createOrder,
    deleteOrder,
    findOrder,
    findOrdersFinally,
    orders: orderSync,
  };
}

export default useOrders;
