import { ModalFooter, H1, Input, useInput, useMessage, modal } from "cllk";
import React, { useState } from "react";
import { Page } from "@/infra/app/webservices/hooks/useWebServicesPages";

function ModalHourPage({
  data,
  modal,
  onClick,
}: {
  data: Page | undefined;
  modal: modal;
  onClick: any;
}) {
  const { messagePromise } = useMessage();
  const hourOpen = useInput("", "open");
  const hourClose = useInput("", "close");
  const [day, setDay] = useState(
    data?.day ?? [
      {
        name: "Do",
        value: false,
      },
      {
        name: "Lu",
        value: false,
      },
      {
        name: "Ma",
        value: false,
      },
      {
        name: "Mi",
        value: false,
      },
      {
        name: "Ju",
        value: false,
      },
      {
        name: "Vi",
        value: false,
      },
      {
        name: "Sa",
        value: false,
      },
    ]
  );
  const m = async () => {
    await onClick(data?.pageId, {
      day,
      hour: { open: hourOpen.value, close: hourClose.value },
    });
  };
  return (
    <div className="p-8 space-y-10">
      <div className="flex flex-wrap gap-3">
        {day?.map((x, key) => (
          <div className={`${x.value && "bg-orange-600"} rounded-xl`}>
            <H1
              className="m-1"
              key={key}
              onClick={() => {
                day[key].value = !x.value;
                setDay([...day]);
              }}
            >
              {x.name}
            </H1>
          </div>
        ))}
      </div>
      <Input {...hourOpen} label="Hora de atencion" type="time" />
      <Input {...hourClose} label="Hora de cierre" type="time" />
      <ModalFooter
        modal={modal}
        onClick={() => {
          messagePromise(m, {
            error: "Error",
            pending: "Configurando horario",
            success: "Horario Actualizado",
          });
          modal.close();
        }}
      >
        Actualizar
      </ModalFooter>
    </div>
  );
}

export default ModalHourPage;
