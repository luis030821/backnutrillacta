import {
  Button,
  DataStyle,
  H1,
  Icons,
  Img,
  InputData,
  ModalFooter,
  ModalTrigger,
  P,
  Settings,
  SettingsContainer,
  SettingsItem,
  SettingsTheme,
  Text,
} from "cllk";
import { useCollection, useUser } from "@llampukaq/realm";
import { User } from "@/types/types";

import SettingInfoAccount from "./components/SettingInfoAccount";
function MePage() {
  const { user } = useUser<User>();

  return (
    <div className="max-w-[1000px] mx-auto space-y-5">
      <H1 className="my-5">Configuracion de Usuario</H1>
      <Settings
        name={(user?.name as string) ?? "Usuario"}
        description="Bienvenido a todos los servicios de Llampukaq Technology"
        img={
          <Img
            link
            width="60"
            className="rounded-full w-full h-full object-cover"
            src={`https://robohash.org/${user?.userId}`}
          />
        }
      >
        <SettingsContainer title="Informacion Personal">
          <SettingsItem
            icon="IconUser"
            title="Informacion Personal"
            description="Nombre, apellido e información general"
          >
            <SettingInfoAccount />
          </SettingsItem>
          <SettingsItem
            icon="IconPalette"
            title="Tema"
            description="Idioma y modo de colores"
          >
            <SettingsTheme />
          </SettingsItem>
          <SettingsItem
            icon="IconUsersGroup"
            title="Invitaciones"
            description="Invitaciones a empresas"
          >
            <Invitation />
          </SettingsItem>
          <SettingsItem
            icon="IconEyeCheck"
            title="Miembro"
            description="Mira a las empresas que a las que perteneces"
          >
            <div className="space-y-3">
              <Text className=" text-white/70" type="BodyMd(Medium)">
                A todas estas empresas eres miembro, lo que te permite mirar y
                editar los recursos de esta empresa
              </Text>
              {user.organizations?.map((organization, index) => (
                <div
                  key={index}
                  className="w-full dark:bg-zinc-800 rounded-xl p-5"
                >
                  <Text className="capitalize text-white" type="BodyMd(Medium)">
                    {organization.name}
                  </Text>
                </div>
              ))}
            </div>
          </SettingsItem>
        </SettingsContainer>
      </Settings>
    </div>
  );
}
export default MePage;
const Invitation = () => {
  const { user } = useUser<User>();
  const collection = useCollection("organization", "organizations");
  const userCollection = useCollection("user", "users");
  const findInvitation = user?.organizations?.filter(
    (x) => x.invitation == true
  );
  return (
    <>
      {findInvitation?.length == 0 ? (
        <>
          <Text type="BodyMd(Medium)">
            No tienes invitaciones a otras organización
          </Text>
        </>
      ) : (
        <>
          {findInvitation?.map((invitation) => (
            <div className="dark:bg-zinc-800 p-3 rounded-xl space-y-2 bg-zinc-200">
              <H1>{invitation.name}</H1>
              <P>
                La empresa{" "}
                <span className="text-blue-500 capitalize">
                  {invitation?.name.toUpperCase()}
                </span>{" "}
                te ha invitado a unirte a su equipo
              </P>
              <P>Quieres unirte?</P>
              <div className="flex justify-around">
                <ModalTrigger
                  title="Cancelar la invitacion"
                  trigger={
                    <Button icon={<Icons icon="IconLockCancel" />}>
                      Cancelar
                    </Button>
                  }
                >
                  {(modal) => (
                    <>
                      <ModalFooter
                        onClick={async () => {
                          await collection?.findOneAndUpdate(
                            { organizationId: invitation?.organizationId },
                            {
                              $pull: {
                                members: { userId: user?.userId },
                              },
                            }
                          );
                          await userCollection?.findOneAndUpdate(
                            { userId: user?.userId },
                            {
                              $pull: {
                                organizations: {
                                  organizationId: invitation?.organizationId,
                                },
                              },
                            }
                          );
                        }}
                        modal={modal}
                      >
                        No aceptar
                      </ModalFooter>
                    </>
                  )}
                </ModalTrigger>
                <ModalTrigger
                  title="Aceptar la invitacion"
                  trigger={
                    <Button icon={<Icons icon="IconCheck" />}>Aceptar</Button>
                  }
                >
                  {(modal) => (
                    <ModalFooter
                      onClick={async () => {
                        await collection?.findOneAndUpdate(
                          {
                            organizationId: invitation?.organizationId,
                            "members.userId": user?.userId,
                          },
                          {
                            $set: {
                              "members.$.invitation": false,
                            },
                          }
                        );
                        await userCollection?.findOneAndUpdate(
                          {
                            userId: user?.userId,
                            "organizations.organizationId":
                              invitation.organizationId,
                          },
                          {
                            $set: {
                              "organizations.$.invitation": false,
                            },
                          }
                        );
                      }}
                      modal={modal}
                    >
                      Aceptar
                    </ModalFooter>
                  )}
                </ModalTrigger>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};
