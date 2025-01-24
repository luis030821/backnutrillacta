import { Organization } from "@/types/types";
import { useOrganization } from "@llampukaq/realm-organizations";
import React from "react";
import CreateOrganization from "../me/components/CreateOrganization";
import SettingsOrganization from "../me/components/SettingsOrganization";

function OrganizationPages() {
  const { organization } = useOrganization<Organization>();

  return (
    <div>
      {organization?.name == undefined ? (
        <CreateOrganization />
      ) : (
        <SettingsOrganization />
      )}
    </div>
  );
}

export default OrganizationPages;
