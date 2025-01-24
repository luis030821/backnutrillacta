import { useUserRealm } from "@llampukaq/realm";
import {
  Button,
  Icons,
  Input,
  ModalDown,
  ModalDownTrigger,
  ModalFooter,
  P,
  Text,
  useMessage,
  useModal,
} from "cllk";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function ModalCreateOrganization({
  success,
}: {
  success: (obj: { organization: string; domain: string }) => void;
}) {
  const [domainName, setDomainName] = useState<string>("");
  const [name, setName] = useState("");
  const domain = useModal();
  const { register, handleSubmit } = useForm();
  const { message } = useMessage();
  const handleDomain = () => {
    if (isNameIncludedInDNS(dnsValues, domainName)) {
      message({ type: "alert", description: "El dominio esta en uso" });
    } else {
      success({
        organization: name,
        domain: formatOrganization(domainName) as string,
      });
      domain.close();
    }
  };
  const { userRealm } = useUserRealm();
  const [dnsValues, setDns] = useState<typeof dnsType>();
  const dns = async () => {
    const res = (await userRealm?.functions.findDNS(
      "findDNS"
    )) as typeof dnsType;
    //@ts-ignore
    const r = res.result.filter((e) => e?.comment == "DNS for pages");
    //@ts-ignore
    setDns(r);
  };
  useEffect(() => {
    dns();
  }, []);
  return (
    <div>
      <div className="flex flex-col justify-center items-center space-y-5 bg-zinc-800 rounded-3xl w-11/12 mx-auto my-5 p-10">
        <Text type="BodyLg(Medium)">No tienes una organización </Text>
        <ModalDownTrigger
          title="Crear una organización"
          trigger={
            <Button icon={<Icons icon="IconPlus"></Icons>} center>
              Crear organización
            </Button>
          }
        >
          {(modal) => {
            return (
              <form
                onSubmit={(e) => {
                  handleSubmit((e) => {
                    setName(e.name);
                    domain.open();
                  })(e);
                  modal.close();
                }}
              >
                <Input
                  required
                  register={register}
                  name="name"
                  label="Nombre"
                />
                <ModalFooter icon={<Icons icon="IconPlus" />} modal={modal}>
                  Crear
                </ModalFooter>
              </form>
            );
          }}
        </ModalDownTrigger>
      </div>
      <ModalDown modal={domain} title="Domain">
        <Input
          required
          onChange={(e) => {
            setDomainName(e.target.value);
          }}
          name="name"
          label="Dominio"
        />
        <P>{`${formatOrganization(domainName)}.llampukaq.cloud`}</P>
        {isNameIncludedInDNS(dnsValues, `${domainName}.llampukaq.cloud`) && (
          <P color="text-red-500">El dominio ya esta en uso</P>
        )}
        <Button
          center
          onClick={() => {
            if (
              !isNameIncludedInDNS(dnsValues, `${domainName}.llampukaq.cloud`)
            ) {
              handleDomain();
            } else {
              message({
                type: "alert",
                description: "El dominio esta en uso, usa otro",
              });
            }
          }}
        >
          Crear
        </Button>
      </ModalDown>
    </div>
  );
}

export default ModalCreateOrganization;
const formatOrganization = (text?: string) => {
  const res = text?.replace(/ /g, "").toLowerCase();
  return res?.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const dnsType = [
  {
    id: "00465a70e7bdc1de3654fba262e4acc7",
    zone_id: "e093b78d0a759f7a90cbde8cd7d88795",
    zone_name: "llampukaq.cloud",
    name: "llampukaq.cloud",
    type: "A",
    content: "172.67.205.44",
  },
];

function isNameIncludedInDNS(dnsObject: any, nameToCheck: any) {
  //@ts-ignore
  return dnsObject?.some((item) => item.name === nameToCheck) || false;
}
