import { useEmail } from "@llampukaq/realm-email-provider";
import { useMessage } from "cllk";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function confirm() {
  const { query } = useRouter();
  const token = query.token as string;
  const tokenId = query.tokenId as string;

  return <>{token != undefined && <T token={token} tokenId={tokenId} />}</>;
}

export default confirm;
const T = (props: { token: string; tokenId: string }) => {
  const { messagePromise } = useMessage();
  const { confirmEmail } = useEmail();
  const { push } = useRouter();
  useEffect(() => {
    const f = async () => {
      await confirmEmail(props);
      push("/signin");
    };
    messagePromise(f, {
      error: "Error al confirmar",
      pending: "Creando usuario",
      success: "Usuario creado",
    });
  }, []);
  return <></>;
};
