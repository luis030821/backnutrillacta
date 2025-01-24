import {
  Avatar,
  Button,
  DataStyle,
  H1,
  Icons,
  ModalDownTrigger,
  NavLink,
  P,
  Settings,
  SettingsContainer,
  SettingsItem,
  Text,
  useModal,
} from "cllk";
import { useOrganization } from "@llampukaq/realm-organizations";
import { Organization, User } from "@/types/types";
import { UpdateOrganizationSocial } from "@/infra/app/webservices/social/SocialPages";
import DropDisk from "./organization/DropDisk";
import DropAddress from "./organization/DropAddress";
import { formatString } from "@/services/String";
import { useDataApp } from "@/infra/app/AppPages/data";
import DropTeem from "./organization/DropTeem";
import { VarablesDeEntornoWebServices } from "@/infra/app/webservices";
function SettingsOrganization() {
  const { data } = useDataApp();
  const { organization } = useOrganization<Organization>();
  const modalBusiness = useModal();
  return (
    <div className="space-y-5 my-5">
      <H1 className="capitalize">Configuraciones {organization?.name}</H1>
      <Settings
        description={`Configuraciones de la organización. ${"nutrillacta"}`}
        name={organization?.name as string}
        img={
          <>
            {organization?.logo != undefined ? (
              <Avatar src={organization?.logo.src} />
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <Avatar size={40} icon={<Icons icon="IconUserOff" />} />
              </div>
            )}
          </>
        }
      >
        <SettingsContainer title="Informacion">
          <SettingsItem
            title="Informacion"
            icon="IconBusinessplan"
            description="Información de la empresa."
          >
            <div className="space-y-5">
              <div className="flex justify-center">
                {organization?.logo != undefined ? (
                  <Avatar src={organization?.logo.src} />
                ) : (
                  <Avatar icon={<Icons icon="IconUserOff" />} />
                )}
              </div>
              <DataStyle title="Nombre">{organization?.name}</DataStyle>
              {organization?.description != undefined && (
                <DataStyle title="Descripción">
                  {organization?.description.es}
                </DataStyle>
              )}
              <ModalDownTrigger
                trigger={
                  <Button
                    icon={<Icons icon="IconPencilPlus" />}
                    onClick={modalBusiness.open}
                    center
                  >
                    Actualizar
                  </Button>
                }
                title={`Actualizar ${organization?.name}`}
              >
                {(modal) => <UpdateOrganizationSocial modal={modal} />}
              </ModalDownTrigger>
            </div>
          </SettingsItem>
          <SettingsItem
            title="Direcciones"
            icon="IconMap"
            description="Mira las direcciones de la empresa"
          >
            <DropAddress />
          </SettingsItem>
          <SettingsItem
            title="Espacio en disco"
            icon="IconDisc"
            description="Imagenes y documentos"
          >
            <DropDisk />
          </SettingsItem>
          <SettingsItem
            title="Variables de entorno"
            icon="IconDisc"
            description="Guarda tus variables de entorno"
          >
            <VarablesDeEntornoWebServices />
          </SettingsItem>
        </SettingsContainer>
        <SettingsContainer title="Aplicaciones">
          {organization?.panels?.map((panel) => (
            <>
              <SettingsItem
                //@ts-ignore
                title={formatString(panel?.name)}
                description={formatString(panel?.name)}
                icon={panel.icons}
              >
                <div className="space-y-3">
                  <Text
                    className="text-center dark:text-white text-black"
                    type="BodyLg(Medium)"
                  >
                    {data.find((x) => x.to == panel.to)?.name}
                  </Text>
                  <Text
                    className="dark:text-white/60 text-black/60"
                    type="BodyMd"
                  >
                    {data.find((x) => x.to == panel.to)?.description}
                  </Text>
                  <NavLink href={panel.to}>
                    <div className="space-y-1 flex flex-col justify-center items-center">
                      <Button>Mirar app</Button>
                    </div>
                  </NavLink>
                </div>
              </SettingsItem>
            </>
          ))}

          <SettingsItem
            title="Api"
            icon="IconApiApp"
            description="Gestiona tus Credenciales para la api"
          >
            <>
              <NavLink href="/app/social">
                <div className="space-y-1 flex flex-col justify-center items-center">
                  <P>Mirar mis redes sociales</P>
                  <Button>Mirar mis redes </Button>
                </div>
              </NavLink>
            </>
          </SettingsItem>
        </SettingsContainer>
        <SettingsContainer title="Equipo">
          <SettingsItem
            title="Equipo"
            icon="IconUsersGroup"
            description="Mira los integrantes de la organización."
          >
            <DropTeem />
          </SettingsItem>
        </SettingsContainer>
      </Settings>
    </div>
  );
}

export default SettingsOrganization;
