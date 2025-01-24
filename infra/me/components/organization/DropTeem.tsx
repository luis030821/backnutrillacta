import { useDataApp } from "@/infra/app/AppPages/data";
import { Organization, User } from "@/types/types";
import { useCollection, useUser } from "@llampukaq/realm";
import { useOrganization } from "@llampukaq/realm-organizations";
import {
  Button,
  DataStyle,
  H1,
  Input,
  ModalFooter,
  ModalTrigger,
  P,
  modal,
  useMessage,
  useModal,
} from "cllk";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function DropTeem() {
  const { organization, deletePanelOrganization } =
    useOrganization<Organization>();
  const { user } = useUser<User>();
  return (
    <div className="space-y-3">
      {organization?.members.map((member, index) => (
        <PrintMember key={index} member={member} />
      ))}
      {organization?.members.find((x) => x.userId == user?.userId)?.role ==
        "admin" && (
        <ModalTrigger
          trigger={<Button center>Invitar miembro</Button>}
          title="Invitar miembro"
        >
          {(modal) => <ModalAddTeem modal={modal} />}
        </ModalTrigger>
      )}
    </div>
  );
}

export default DropTeem;

const PrintMember = ({
  member,
}: {
  member: { userId: string; role: "admin" | "user"; invitation?: boolean };
}) => {
  const [user, setUser] = useState<User>();

  const collection = useCollection("user", "users");
  const f = async () => {
    const res = await collection?.findOne(
      { userId: member.userId },
      { projection: { email: true, name: true, _id: false } }
    );

    setUser(res);
  };
  useEffect(() => {
    f();
  }, []);
  return (
    <div className="dark:bg-zinc-800 bg-zinc-200 rounded-xl p-5 space-y-3">
      <DataStyle title="Nombre">{user?.name ?? user?.email}</DataStyle>
      <DataStyle title="Role">
        {member.role == "admin" ? "Administrador" : "Usuario"}
      </DataStyle>

      {member.invitation && (
        <H1>
          Invitacion pendiente{" "}
          <span className="animate-pulse duration-75">.</span>
          <span className="animate-pulse duration-75">.</span>
          <span className="animate-pulse duration-75">.</span>
        </H1>
      )}
    </div>
  );
};
const ModalAddTeem = ({ modal }: { modal: modal }) => {
  const { message, messagePromise } = useMessage();
  const { register, handleSubmit } = useForm();
  const collection = useCollection("user", "users");
  const { addMemberOrganization } = useOrganization();
  const handle = async (e: any) => {
    const res = await collection?.findOne({ email: e.email });
    if (res != undefined) {
      messagePromise(
        async () => {
          await addMemberOrganization(res);
        },
        {
          error: "Error al agregar miembro",
          pending: "Agrengando...",
          success: "Persona agregada correctamente",
        }
      );
    } else {
      message({ type: "alert", description: "El usuario no exite" });
    }
  };
  return (
    <form
      onSubmit={(e) => {
        modal.close();
        handleSubmit(handle)(e);
      }}
    >
      <Input name="email" register={register} type="email" label="Email" />
      <ModalFooter modal={modal}>Invitar</ModalFooter>
    </form>
  );
};
