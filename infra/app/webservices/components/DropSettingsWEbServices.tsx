import { Button, DataStyle, H1, P, useMessage } from "cllk";
import React from "react";
import UpdateTemplate from "./UpdateTemplate";
import { useWS } from "../hooks/useWebServices";
import { useUserRealm } from "@llampukaq/realm";
import { useOrganization } from "@llampukaq/realm-organizations";
import { Organization } from "@/types/types";
import { nanoid } from "nanoid";
function DropSettingsWEbServices() {
  const { webservices: WS, deployment } = useWS();
  const { messagePromise, message } = useMessage();

  const isEqual = () => {
    //@ts-ignore
    if (WS?.builds === 0) {
      return true;
    } else {
      return false;
    }
  };

  const set = async (data: any) => {
    deployment(data);
  };
  const setVersion = (version: any) => {
    const is = isEqual();
    if (!is) {
      set({
        $set: {
          version,
          //@ts-ignore
          builds: WS?.builds - 1,
        },
      });
    } else {
      message({
        type: "alert",
        description: " No puedes desplegar",
      });
    }
  };
  const d = async () => {
    messagePromise(
      async () => {
        const is = isEqual();
        if (!is) {
          set({
            $set: {
              show: false,
              //@ts-ignore
              builds: WS?.builds - 1,
            },
          });
        } else {
          message({
            type: "alert",
            description: "No puedes desplegar",
          });
        }
      },
      {
        error: "Error",
        pending: "Despleglando...",
        success: "Despleglada",
      }
    );
  };
  const { userRealm } = useUserRealm();
  const { organization } = useOrganization<Organization>();
  return (
    <>
      <div className="space-y-5 my-3">
        {/* <Button
          onClick={async () => {
            try {
              await userRealm?.functions.createProject({
                name: organization?.project_name.toLocaleLowerCase(),
                id: "nutrillacta",
                domain: "luis1",
                version: "1.0.0",
                projectId: nanoid(11),
                builds: 2,
                show: true,
              });
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Crear
        </Button> */}
        <Button onClick={d} center>
          Despliege
        </Button>
        <DataStyle title="Contrucciones">{WS?.builds}</DataStyle>
        <DataStyle title="Versión">{WS?.version}</DataStyle>
      </div>
      <UpdateTemplate setVersion={setVersion} oldVersion={WS?.version} />
    </>
  );
}

export default DropSettingsWEbServices;
