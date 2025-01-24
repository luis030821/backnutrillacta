import { Button, H1, NavLink, P } from "cllk";
import React, { useEffect, useState } from "react";
import { useWS } from "../hooks/useWebServices";
import { useCollection } from "@llampukaq/realm";
import { useOrganization } from "@llampukaq/realm-organizations";
import { Organization } from "@/types/types";

function SocialDrop() {
  const { organization } = useOrganization<Organization>();
  const collection = useCollection("organization", "projects");
  const [data, setData] = useState<{
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
  }>();
  const find = async () => {
    const res = await collection?.findOne({
      organizationId: "nutrillacta",
    });
    setData(res);
  };
  useEffect(() => {
    find();
  }, []);
  const { webservices } = useWS();

  return (
    <>
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <H1>Ruta:</H1>
          <a target="_blank" href={`https://${data?.domain[0]}/social`}>
            <P>{`https://${data?.domain[0]}/social`}</P>
          </a>
        </div>

        <P>Modifica la apariencia de tu página de networking</P>
        <NavLink href="/app/webservices/social">
          <Button center>Modificar</Button>
        </NavLink>
      </div>
    </>
  );
}

export default SocialDrop;
