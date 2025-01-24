import React, { createContext, useState, useContext, ReactNode } from "react";
import { Organization } from "@/types/types";
import { useUserRealm } from "@llampukaq/realm";
import { useOrganization } from "@llampukaq/realm-organizations";

const PageContext = createContext({});

export const usePageContext = () => {
  const context = useContext(PageContext) as {
    page: {
      organizationId: string;
      version: string;
      projectId: string;
      show: boolean;
      builds: number;
      webPage: string;
      webPageId: string;
      isRepo: boolean;
      isPage: boolean;
      domain: string[];
    };
    load: () => Promise<void>;
    deployment: (data: any) => Promise<void>;
  };
  if (!context) {
    throw new Error("usePageContext must be used within a PageProvider");
  }
  return context;
};

function PageProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState();
  const { userRealm } = useUserRealm();
  const { organization } = useOrganization<Organization>();
  const collection = userRealm
    ?.mongoClient("mongodb-atlas")
    .db("organization")
    .collection("projects");
  const load = async () => {
    try {
      const result = await collection?.findOne({
        organizationId: "nutrillacta",
      });
      setPage(result); // Assuming result is the value you want to set for the page
    } catch (error) {
      console.error("Error loading page:", error);
    }
  };
  const deployment = async (data: any) => {
    await userRealm?.functions.deployment("create", {
      name: organization?.project_name,
    });
    const res = await collection?.findOneAndUpdate(
      {
        organizationId: "nutrillacta",
      },
      data,
      { returnNewDocument: true }
    );
    setPage(res);
  };
  const contextValue = {
    deployment,
    page,
    load,
  };

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
}

export default PageProvider;
