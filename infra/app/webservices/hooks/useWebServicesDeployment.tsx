import { Organization } from "@/types/types";
import { useUserRealm } from "@llampukaq/realm";
import { useOrganization } from "@llampukaq/realm-organizations";
import React from "react";

function useWebServicesDeployment() {
  const { userRealm } = useUserRealm();
  const { organization } = useOrganization<Organization>();
  const fn = userRealm?.functions.project;
  const create = async () => {
    const res = await fn?.(
      "create",
      { data: "" },
      { name: organization?.project_name }
    );
  };
  return <div>useWebServicesDeployment</div>;
}

export default useWebServicesDeployment;
