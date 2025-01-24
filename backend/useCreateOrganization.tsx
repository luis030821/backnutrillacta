import client from "@/client";
import { Organization } from "@/types/types";
import { useUserRealm } from "@llampukaq/realm";
import { useOrganization } from "@llampukaq/realm-organizations";
import { nanoid } from "nanoid";

function useCreateOrganization() {
  const { createOrganization: cO } = useOrganization<Organization>();
  const { userRealm } = useUserRealm();
  const createOrganization = async (name: string, domain: string) => {
    const res = await cO(name);
    // if (client.enviroment == "PRODUCTION") {
    if (res != undefined) {
      await userRealm?.functions.createProject({
        name: domain,
        id: res.organizationId,
        domain,
        version: client.version,
        projectId: nanoid(11),
        builds: 2,
        show: true,
      });
    } else {
      throw new Error("no se pudo crear la empresa");
    }
    // }
  };
  return { createOrganization };
}
export default useCreateOrganization;
