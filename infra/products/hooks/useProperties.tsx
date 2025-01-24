import { Organization } from "@/types/types";
import { useCollection } from "@llampukaq/realm";
import { useOrganization } from "@llampukaq/realm-organizations";
import { createProviderFn, useMessage, useModal } from "cllk";
import React, { useEffect, useState } from "react";
export interface Propierties {
  attribute: string;
  default: any;
  type: string;
  required: boolean;
  use: "normal" | "variant";
}
function usePropertie() {
  const collection = useCollection("product", "properties");
  const { messagePromise } = useMessage();
  const { organization } = useOrganization<Organization>();
  const modal = useModal();
  const [objects, setObjects] = useState<Propierties[]>();
  const handleChange = (
    index: number,
    key: "attribute" | "type" | "required" | "default",
    value: string | boolean
  ) => {
    const newObjects = objects?.map((obj, i) =>
      i === index ? { ...obj, [key]: value } : obj
    );
    //@ts-ignore
    setObjects([...newObjects]);
  };

  const find = async () => {
    const res = await collection?.findOne({
      organizationId: "nutrillacta",
    });

    if (res != undefined) {
      modal.open();
      setObjects(res.properties);
    } else {
      modal.close();
      setObjects([
        {
          attribute: "example",
          default: "default",
          required: false,
          type: "email",
          use: "normal",
        },
      ]);
    }
  };
  useEffect(() => {
    find();
  }, []);
  const handleAddObject = () => {
    setObjects([
      //@ts-ignore
      ...objects,
      { attribute: "", default: "", required: false, type: "", use: "normal" },
    ]);
  };
  const handleAddObjectVariant = () => {
    setObjects([
      //@ts-ignore
      ...objects,
      { attribute: "", default: "", required: false, type: "", use: "variant" },
    ]);
  };

  const handleDelete = (index: number) => {
    const newObjects = objects?.filter((_, i) => i !== index);
    setObjects(newObjects);
  };

  const handleSave = async () => {
    messagePromise(
      async () => {
        if (!modal.value) {
          await collection?.insertOne({
            organizationId: "nutrillacta",
            properties: objects,
          });
        }
        if (modal.value) {
          await collection?.findOneAndUpdate(
            { productId: true, organizationId: "nutrillacta" },
            {
              $set: { properties: objects },
            }
          );
        }
      },
      {
        error: "Hubo un error al ejecutar el programa.",
        pending: "El programa está en espera de ejecución.",
        success: "El programa se ejecutó correctamentmodal.",
      }
    );
  };

  const typeInput = [
    "color",
    "date",
    "email",
    "file",
    "image",
    "month",
    "number",
    "radio",
    "range",
    "search",
    "tel",
    "text",
    "time",
    "url",
  ];
  return {
    typeInput,
    handleSave,
    handleAddObject,
    handleChange,
    handleDelete,
    objects,
    handleAddObjectVariant,
  };
}

const [PropertiesProvider, useProperties] =
  createProviderFn<typeof usePropertie>(usePropertie);
export { PropertiesProvider, useProperties };
