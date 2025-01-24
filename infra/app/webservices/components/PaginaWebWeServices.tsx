import { Button, NavLink, P } from "cllk";
import React from "react";
function PaginaWebWeServices({ i }: { i: number }) {
  return (
    <>
      <div className="space-y-5">
        <div className="space-y-3">
          <P>Modifica tu pagina web de manera sencilla</P>
          <NavLink href="/app/webservices/page">
            <Button center>Modificar Página</Button>
          </NavLink>
        </div>
        <div className="space-y-3">
          <P>Crea tu layout, incluyendo la navegacion y footer</P>
          <NavLink href="/app/webservices/layout">
            <Button center>Modificar Layout</Button>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default PaginaWebWeServices;
