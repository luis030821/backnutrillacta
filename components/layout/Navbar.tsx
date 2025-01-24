import { Button, H1, ICONS, Icons, NavLink } from "cllk";

import { dataNavbarDevelopment } from "./data/dataNavbar";
import { NavbarPrimary } from "cllk";

function Navbar() {
  const mobile: {
    title: string;
    icon: ICONS;
    path: string;
    onClick?: boolean;
  }[] = [
    {
      title: "Principal",
      icon: "IconHome",
      path: "/",
    },
    {
      title: "Login",
      icon: "IconLogin",
      path: "/signin",
    },
    {
      title: "Apps",
      icon: "IconApps",
      path: "/app",
    },
    {
      title: "Menu",
      icon: "IconLogin",
      path: "/",
      onClick: true,
    },
  ];
  return (
    <NavbarPrimary.Container
      mobile={mobile}
      title={<H1 size={"1.2rem"}>Llampukaq</H1>}
      button={
        <NavLink href="/signin">
          <Button center icon={<Icons icon="IconLogin" />}>
            Iniciar
          </Button>
        </NavLink>
      }
    >
      <NavbarPrimary.MenuItem title="Productos">
        <NavbarPrimary.SubItem
          icon="IconApps"
          href="/app"
          title="Aplicación"
          subTitle="Conoce nuestras Apps"
        />
      </NavbarPrimary.MenuItem>
      <NavbarPrimary.MenuItem title="Herramientas">
        {dataNavbarDevelopment.map((development, index) => (
          <NavbarPrimary.SubItem
            //@ts-ignore
            icon={development.icon}
            key={index}
            href={development.link}
            title={development.title.es}
            subTitle={development.subTitle.es}
          />
        ))}
      </NavbarPrimary.MenuItem>
      <NavbarPrimary.MenuItem title="Acerca de nosotros">
        <NavbarPrimary.SubItem
          icon="IconUsersGroup"
          href="/team"
          subTitle="Conócenos mejor"
          title="El Equipo"
        />

        <NavbarPrimary.SubItem
          icon="IconBusinessplan"
          href="/company"
          subTitle="Desde 2021"
          title="La Compañía"
        />

        <NavbarPrimary.SubItem
          icon="IconRocket"
          href="/mission"
          subTitle="Mejorar pequeños negocios"
          title="Nuestra Misión"
        />

        <NavbarPrimary.SubItem
          icon="IconQuestionMark"
          href="/faq"
          subTitle="Ver las preguntas frecuentes"
          title="Preguntas Frecuentes"
        />
        <NavbarPrimary.SubItem
          icon="IconShield"
          href="/privacy"
          subTitle="Política de Privacidad"
          title="Política de Privacidad"
        />
      </NavbarPrimary.MenuItem>
    </NavbarPrimary.Container>
  );
}

export default Navbar;
