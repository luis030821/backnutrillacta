import { Button, H1, ModalTrigger } from "cllk";
import React from "react";

function TypeNavs() {
  return (
    <div>
      <H1>Navegación</H1>
      <div className="flex items-center justify-between">
        <H1>Tipo de navegación :{"si"}</H1>
        <ModalTrigger
          trigger={<Button>Cambiar navegación</Button>}
          title={"Cambiar navegación"}
        >
          {(modal) => {
            return <></>;
          }}
        </ModalTrigger>
      </div>
    </div>
  );
}

export default TypeNavs;
