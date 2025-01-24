import { useUserRealm } from "@llampukaq/realm";
import React from "react";

function useWebServicesDomain() {
  const { userRealm } = useUserRealm();
  const fn = userRealm?.functions.project;
  const add = async () => {
    await fn?.("add", { data: "" });
  };
  const find = async () => {
    await fn?.("find", { data: "" });
  };
  const findOne = async () => {
    await fn?.("findOne", { data: "" });
  };
  return <div>useWebServicesDomain</div>;
}

export default useWebServicesDomain;
