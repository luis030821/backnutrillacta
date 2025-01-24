import { User } from "@/types/types";
import { useUser } from "@llampukaq/realm";
import {
  Button,
  DataStyle,
  Icons,
  Input,
  ModalDownTrigger,
  ModalFooter,
} from "cllk";
import React from "react";
import { useForm } from "react-hook-form";

function SettingInfoAccount() {
  const { user, updateUser } = useUser<User>();
  const { handleSubmit, register } = useForm();
  return (
    <div className="space-y-5 ">
      <DataStyle title="Nombre">{user.name}</DataStyle>
      <DataStyle title={"Email"}>{user.email}</DataStyle>
      <DataStyle title={"Celular"}>{user?.phone}</DataStyle>
      <ModalDownTrigger
        trigger={
          <Button center icon={<Icons icon="IconUserCircle" />}>
            Actualizar Datos
          </Button>
        }
        title="Actualizar Datos"
      >
        {(modal) => (
          <form
            onSubmit={(e) => {
              handleSubmit(async (data) => {
                modal.close();
                await updateUser(data);
              })(e);
            }}
          >
            <Input
              type="text"
              name="Nombre"
              register={register}
              label="Nombre"
            />
            <Input
              minLength={9}
              maxLength={10}
              type="tel"
              name="phone"
              register={register}
              label="Celular"
            />
            <ModalFooter modal={modal}>Actualizar</ModalFooter>
          </form>
        )}
      </ModalDownTrigger>
    </div>
  );
}

export default SettingInfoAccount;
