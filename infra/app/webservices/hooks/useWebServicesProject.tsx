import { Organization } from "@/types/types";
import { useUserRealm } from "@llampukaq/realm";

interface r {
  result: {
    id: string;
    subdomain: string;
  };
  success: boolean;
}

function useWebServicesProject() {
  const { userRealm } = useUserRealm();
  const fn = userRealm?.functions.project;
  const createProject = async (organization: Organization) => {
    try {
      const res = (await fn?.("create", {
        name: organization?.project_name.toLocaleLowerCase(),
        id: "nutrillacta",
      })) as r;
      const r = {
        webPage: res.result.subdomain,
        webPageId: res.result.id,
        isRepo: true,
        isWebPage: true,
      };
      return r;
    } catch (error) {
      return {
        isWebPage: false,
        isRepo: false,
        webPage: "",
        webPageId: "",
      };
    }
  };
  const updateProject = async () => {
    await fn?.("update", { data: "" });
  };
  const deleteProject = async () => {
    await fn?.("delete", { data: "" });
  };
  return { createProject };
}

export default useWebServicesProject;
