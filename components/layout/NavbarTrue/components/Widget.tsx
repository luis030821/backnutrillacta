import { useAddressOrganization } from "@/backend/useAddressOrganization";
import client from "@/client";
import { Organization, User } from "@/types/types";
import { useUser } from "@llampukaq/realm";
import { useLogoutGoogle } from "@llampukaq/realm-google-provider";
import { useOrganization } from "@llampukaq/realm-organizations";
import {
  Avatar,
  Button,
  H1,
  Icons,
  NavbarSecondary,
  NavLink,
  Option,
  P,
  Select,
  Text,
  useMessage,
} from "cllk";
import React from "react";
function Widget() {
  const { logout } = useLogoutGoogle();
  const { organization, getOrganization } = useOrganization<Organization>();
  const { user } = useUser<User>();

  const { clearCache } = useClearCache();
  const { messagePromise } = useMessage();
  const { address, setSelectedAddress } = useAddressOrganization();
  return (
    <>
      <NavbarSecondary.WidgetDiv
        href="/me"
        span={3}
        className="flex justify-center"
      >
        <div className="flex justify-center items-center space-x-5">
          <Avatar
            src={`${client.llampukaq}/v1/images?url=https://robohash.org/${user?.userId}&w=50&h50`}
          />
          <div>
            <Text type="BodyMd(Medium)">{user?.name ?? "Usuario"}</Text>
            <Text type="BodySm">Información Personal</Text>
          </div>
        </div>
      </NavbarSecondary.WidgetDiv>
      <NavbarSecondary.WidgetDiv
        href="/organization"
        span={3}
        className="flex justify-center"
      >
        <div className="flex justify-center items-center space-x-5">
          <Avatar icon={<Icons icon="IconBusinessplan" />} />
          <div>
            <Text type="BodyMd(Medium)">Organización</Text>
            <Text type="BodySm">Información Organización</Text>
          </div>
        </div>
      </NavbarSecondary.WidgetDiv>
      {user?.organizations != undefined && (
        <>
          {user?.organizations.length != 1 && (
            <NavbarSecondary.WidgetDiv
              span={3}
              className="flex justify-between items-center px-5"
            >
              <Select
                label="Org"
                defaultValue={"nutrillacta"}
                onChange={(e) => {
                  messagePromise(
                    async () => {
                      await getOrganization(e.target.value);
                    },
                    {
                      error: "Error al cambiar de empresa",
                      pending: "Cargando recursos de la empresa",
                      success: "Recursos cargados correctamente",
                    }
                  );
                }}
              >
                {user.organizations
                  ?.filter(
                    (x) => x.invitation == false || x.invitation == undefined
                  )
                  ?.map((x, index) => (
                    <Option key={index} value={x.organizationId}>
                      {x.name}
                    </Option>
                  ))}
              </Select>
            </NavbarSecondary.WidgetDiv>
          )}
        </>
      )}
      {organization != undefined && (
        <NavbarSecondary.WidgetDiv
          span={3}
          className="flex justify-center items-center"
        >
          <div className="flex justify-center items-center">
            {address.length == 0 ? (
              <div className="flex flex-col justify-center items-center">
                <Text type="BodySm(Medium)">
                  Actualmente no tienes sucursales
                </Text>
                <NavLink href="/organization#direcciones">
                  <Button>Crear</Button>
                </NavLink>
              </div>
            ) : (
              <Select
                label="Selecciona la sucursal"
                defaultValue={JSON.stringify(address)}
                onChange={(e) => {
                  setSelectedAddress(JSON.parse(e.target.value));
                }}
              >
                {address.map((address, index) => (
                  <Option key={index} value={JSON.stringify(address)}>
                    {address.name}
                    {address.isMatriz ? "Matriz" : "Sucursal"}
                  </Option>
                ))}
              </Select>
            )}
          </div>
        </NavbarSecondary.WidgetDiv>
      )}

      <NavbarSecondary.WidgetDiv
        span={1}
        className="flex items-center justify-center "
      >
        <Icons icon="IconBellBolt" size={40} />
      </NavbarSecondary.WidgetDiv>
      <NavbarSecondary.WidgetDiv
        span={2}
        className="flex justify-center items-center"
      >
        <Text type="BodyLg(Medium)">Sin notificaciones</Text>
      </NavbarSecondary.WidgetDiv>
      <NavbarSecondary.WidgetDiv
        span={3}
        className="flex justify-center items-center"
      >
        <Button
          icon={<Icons icon="IconUserDown" />}
          onClick={() => {
            localStorage.clear();
            sessionStorage.clear();
            clearCache?.();
            logout?.();
          }}
        >
          Cerrar la sesión
        </Button>
      </NavbarSecondary.WidgetDiv>
    </>
  );
}

export default Widget;
