import client from "@/client";
import { customAlphabet } from "nanoid";

export const estimated = (email: string, obj: any, items: any[]) => {
  const nanoid = customAlphabet("1234567890");
  return {
    isTest: client.enviroment == "DEVELOPMENT",
    referenceId: nanoid(10),
    notificationMail: email,
    items,
    waypoints: [
      {
        type: "PICK_UP",
        addressStreet: "Gonzalo Pizarrao",
        addressAdditional: "Local esquinero",
        city: "Quito",
        latitude: -0.209325,
        longitude: -78.401643,
        phone: "+593959563276",
        name: "Licoreria Spondylus",
        instructions:
          "Retirar en el local esquinero licoreria spondylus, en las rejas metalicas, preguntar por luis o mateo para el retiro",
      },
      {
        type: "DROP_OFF",
        instructions: "Entregar en mano",
        ...obj,
      },
    ],
  };
};
