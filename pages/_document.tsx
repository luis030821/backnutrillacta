import client from "@/client";
import { HEAD } from "cllk";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <HEAD title={client.name} />
        <meta
          name="google-site-verification"
          content="6hwbUKXQITWvtGO9-Hvy06p15mvFJAzdQWZHZeedA98"
        />
        <meta
          name="facebook-domain-verification"
          content="3etumkk3yu3zdav4vqpoojph5g5srr"
        />
        <meta
          name="keywords"
          content="HTML, CSS, JavaScript, Web Builder, Llampukaq, Technology, CMS, Gestor, Empresas, Business, Organization"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />

        <meta property="og:url" content="https://app.llampukaq.com/" />
        <meta
          name="description"
          content="Descubre el poder de la gestión empresarial con Llampukaq Technoly, la solución integral para potenciar tu empresa. Maximiza la eficiencia, optimiza procesos, y toma decisiones informadas con nuestra plataforma líder en el mercado. Gestiona recursos, finanzas y proyectos de manera efectiva, impulsando el crecimiento y la rentabilidad de tu negocio. Confía en Llampukaq Technoly para llevar tu empresa hacia el éxito."
        />

        <link rel="apple-touch-icon" href="/icons/logo512.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/logo152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/logo180.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/icons/logo167.png"
        />

        <meta name="apple-mobile-web-app-capable" content="yes" />

        <link
          href="/apple/apple_splash_2048.png"
          sizes="2048x2732"
          rel="apple-touch-startup-image"
        />
        <link
          href="/apple/apple_splash_1668.png"
          sizes="1668x2224"
          rel="apple-touch-startup-image"
        />
        <link
          href="/apple/apple_splash_1536.png"
          sizes="1536x2048"
          rel="apple-touch-startup-image"
        />
        <link
          href="/apple/apple_splash_1125.png"
          sizes="1125x2436"
          rel="apple-touch-startup-image"
        />
        <link
          href="/apple/apple_splash_1242.png"
          sizes="1242x2208"
          rel="apple-touch-startup-image"
        />
        <link
          href="/apple/apple_splash_750.png"
          sizes="750x1334"
          rel="apple-touch-startup-image"
        />
        <link
          href="/apple/apple_splash_640.png"
          sizes="640x1136"
          rel="apple-touch-startup-image"
        />
      </Head>
      <body className="overflow-x-hidden ">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
