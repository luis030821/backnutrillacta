import React, { useEffect } from "react";
import Widget from "./components/Widget";
import { dataNavbarDevelopment } from "../data/dataNavbar";
import { useUser, useUserRealm } from "@llampukaq/realm";
import { useOrganization } from "@llampukaq/realm-organizations";
import { Organization, User } from "@/types/types";
import { NavbarSecondary, Text, useMessage } from "cllk";
import { usePageContext } from "@/context/store/PageProvider";
import { formatString } from "@/services/String";
import { useAddressOrganization } from "@/backend/useAddressOrganization";
function NavbarTrue() {
  const { load } = usePageContext();
  const { userRealm } = useUserRealm();
  const { user } = useUser<User>();
  const { messagePromise } = useMessage();
  const { organization, getOrganization } = useOrganization<Organization>();

  const r = async () => {
    if (organization != undefined) {
      await getOrganization("nutrillacta");
    }
    if (organization == undefined) {
      if (user?.organizations != undefined) {
        await load();
        await getOrganization(user?.organizations[0]?.organizationId);
      }
    }
  };

  useEffect(() => {
    r();
  }, [userRealm]);
  const { selectedAddress, address } = useAddressOrganization();
  return (
    <NavbarSecondary.Container
      component={
        <div className="flex items-center justify-center p-1 space-x-5">
          <Text type="BodySm(Medium)">
            {organization != undefined ? `${organization?.name}` : ""}
          </Text>
          {address.length != 0 && (
            <>
              <Text type="BodySm(Medium)">
                {organization != undefined
                  ? //@ts-ignore
                    `${selectedAddress?.title ?? ""} ${
                      //@ts-ignore
                      selectedAddress?.isMatriz ?? true ? "Matriz" : "Sucursal"
                    }`
                  : ""}
              </Text>
            </>
          )}
        </div>
      }
      WidgetUI={<Widget />}
      src={`https://robohash.org/${user?.userId}`}
    >
      <NavbarSecondary.MenuItem title="Aplicaciones">
        <NavbarSecondary.SubItem href="/app" icon="IconApps">
          Aplicaciones
        </NavbarSecondary.SubItem>
        {organization?.panels?.map((panel, index) => (
          <NavbarSecondary.SubItem
            key={index}
            href={panel.to}
            icon={panel.icons ?? "IconApps"}
          >
            {formatString(panel.name)}
          </NavbarSecondary.SubItem>
        ))}
      </NavbarSecondary.MenuItem>
      <NavbarSecondary.MenuItem title="Desarrolladores">
        {dataNavbarDevelopment.map((development, index) => (
          <NavbarSecondary.SubItem
            //@ts-ignore
            icon={development.icon}
            key={index}
            href={development.link}
            subTitle={development.subTitle.es}
          >
            {development.title.es}
          </NavbarSecondary.SubItem>
        ))}
      </NavbarSecondary.MenuItem>
    </NavbarSecondary.Container>
  );
}

export default NavbarTrue;
