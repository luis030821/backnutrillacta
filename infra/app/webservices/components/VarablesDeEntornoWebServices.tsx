import {
  Button,
  Checkbox,
  H1,
  Icons,
  Input,
  Option,
  P,
  Select,
  Text,
  modal,
} from "cllk";
import React, { useState } from "react";
import { useWS } from "../hooks/useWebServices";
import { ENVS } from "@/types/app/webservices";

import { useProperties } from "@/infra/products/hooks/useProperties";

function VarablesDeEntornoWebServices() {
  return <InputVars />;
}

export default VarablesDeEntornoWebServices;
export const InputVars = () => {
  const { updateSettings, webservices } = useWS();
  const [objects, setObjects] = useState<ENVS[]>(
    //@ts-ignore
    webservices?.envs ?? [{ attribute: "", value: "" }]
  );

  const [env_vars, setEnvVars] = useState<{
    [key: string]: { value: string };
  }>();

  const handleChange = (
    index: number,
    key: "attribute" | "value",
    value: string
  ) => {
    const newObjects = [...objects];
    newObjects[index][key] = value;
    setObjects(newObjects);
  };

  const handleAddObject = () => {
    setObjects([...objects, { attribute: "", value: "" }]);
  };

  const handleDelete = (index: number) => {
    const newObjects = [...objects];
    newObjects.splice(index, 1);
    setObjects(newObjects);
  };

  const handleSave = async () => {
    await updateSettings({ envs: objects });
    const newEnvVars: { [key: string]: { value: string } } = {};
    objects.forEach((index) => {
      newEnvVars[index.attribute] = { value: index.value };
    });
    setEnvVars(newEnvVars);
  };

  return (
    <div className="space-y-5">
      <div className="space-y-5">
        {objects.map((object, index) => (
          <div
            key={index}
            className="flex space-x-3 items-center justify-between"
          >
            <Input
              label="Nombre"
              type="text"
              value={object.attribute}
              onChange={(e) => handleChange(index, "attribute", e.target.value)}
            />
            <Input
              label="Valor"
              type="text"
              value={object.value}
              onChange={(e) => handleChange(index, "value", e.target.value)}
            />
            <div
              className="flex justify-center items-center"
              onClick={() => handleDelete(index)}
            >
              <Icons icon="IconTrash" size={30} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center sm:justify-between w-full">
        <Button icon={<Icons icon="IconPlus" />} onClick={handleAddObject}>
          Agregar
        </Button>
        <Button icon={<Icons icon="IconDisc" />} onClick={handleSave}>
          Guardar
        </Button>
      </div>
    </div>
  );
};
export const InputAddProperties = ({ modal }: { modal: modal }) => {
  const {
    handleAddObject,
    handleChange,
    handleDelete,
    handleSave,
    objects,
    typeInput,
    handleAddObjectVariant,
  } = useProperties();

  return (
    <div className="space-y-5">
      <div className="space-y-5">
        {objects?.map((object, index) => (
          <div
            key={index}
            className="flex space-x-3 items-center justify-between dark:bg-zinc-800 rounded-xl p-5"
          >
            <P>
              {object.use == undefined
                ? "Normal"
                : object.use == "normal"
                ? "Normal"
                : "Variante"}
            </P>

            <Input
              label="Nombre"
              type="text"
              value={object.attribute}
              onChange={(e) => handleChange(index, "attribute", e.target.value)}
            />
            <Input
              label="Defecto"
              type="text"
              value={object.default}
              onChange={(e) => handleChange(index, "default", e.target.value)}
            />
            <div className="space-y-2">
              <Text type="BodyMd(Medium)">Tipo</Text>
              <Select
                defaultValue={object.type}
                onChange={(e) => {
                  handleChange(index, "type", e.target.value);
                }}
              >
                {typeInput.map((x, index) => (
                  <Option key={index} value={x}>
                    {x}
                  </Option>
                ))}
              </Select>
            </div>

            <div className="flex flex-col items-center justify-center">
              <H1>Requerir</H1>
              <Input
                checked={object.required}
                label=""
                type="checkbox"
                onChange={(e) => {
                  handleChange(index, "required", e.target.checked);
                }}
              />
            </div>
            <div
              className="flex justify-center items-center"
              onClick={() => handleDelete(index)}
            >
              <Icons icon="IconTrash" size={30} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center sm:justify-around">
        <Button
          icon={<Icons icon="IconPlus" />}
          onClick={handleAddObjectVariant}
        >
          Agregar Variante
        </Button>
        <Button icon={<Icons icon="IconPlus" />} onClick={handleAddObject}>
          Agregar
        </Button>
        <Button
          icon={<Icons icon="IconDisc" />}
          onClick={async () => {
            await handleSave();
            modal.close();
          }}
        >
          Guardar
        </Button>
      </div>
    </div>
  );
};
