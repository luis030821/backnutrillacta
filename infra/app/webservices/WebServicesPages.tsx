import { Avatar, Icons, Settings, SettingsContainer, SettingsItem } from "cllk";
import React from "react";
import {
  DropSettingsWEbServices,
  DominiosWebServices,
  PaginaWebWeServices,
  VarablesDeEntornoWebServices,
} from "./index";
import { useDataApp } from "../AppPages/data";

function WebServicesPages() {
  const { data: da } = useDataApp();

  const data = [
    {
      icon: "IconSettingsAutomation",
      title: "Configuraciones",
      children: <DropSettingsWEbServices />,
      description: "Actualiza y despliega tu sitio web",
    },
    {
      icon: "IconVariablePlus",
      title: "Variables de entorno",
      children: <VarablesDeEntornoWebServices />,
      description: "Añade variables a tu página como PayPal o credenciales",
    },
    {
      icon: "IconBrandHtml5",
      title: "Dominios",
      children: <DominiosWebServices i={2} />,
      description: "Mira los dominios de la organización",
    },
    {
      icon: "IconWebhook",
      title: "Página Web",
      children: <PaginaWebWeServices i={3} />,
      description: "Mira el sitio web, configúralo y cámbialo",
    },
  ];

  return (
    <div className="py-5">
      <Settings
        description={da.find((x) => x.to == "/app/webservices")?.descriptionEs}
        img={
          <>
            <div className="w-full h-full flex justify-center items-center">
              <Avatar
                size={40}
                icon={
                  <Icons
                    icon={
                      da.find((x) => x.to == "/app/webservices")?.icon as any
                    }
                  />
                }
              />
            </div>
          </>
        }
        name={"Servicios Web"}
      >
        <SettingsContainer title="Configuraciones">
          {data.map((x, index) => (
            <SettingsItem
              description={x.description}
              title={x.title}
              icon={x.icon as any}
              key={index}
            >
              {x.children}
            </SettingsItem>
          ))}
        </SettingsContainer>
      </Settings>
    </div>
  );
}

export default WebServicesPages;
