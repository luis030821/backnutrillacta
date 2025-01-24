import { Layout } from "@/components";
import { RealmProvider } from "@llampukaq/realm";

import { RealmOrganizationsProvider } from "@llampukaq/realm-organizations";
import { Error401, Provider } from "cllk";
import "@/styles/main.css";
import type { AppProps } from "next/app";
import "cropperjs/dist/cropper.css";
import client from "@/client";
import "swiper/css";
import { AddressOrgProvider } from "@/backend/useAddressOrganization";
import { WebServicesProvider } from "@/infra/app/webservices/hooks/useWebServices";

export default function App({ Component, pageProps, router }: AppProps) {
  const appId = client.realm;
  const config = {
    TRANSLATE: client.translate,
    IMG: client.key,
  };
  return (
    <Provider color="bg-blue-800" config={config}>
      <RealmProvider
        Error401={<Error401 />}
        appId={appId}
        customDataUser={{ howManyBusiness: 1, type: "free" }}
      >
        <RealmOrganizationsProvider>
          <AddressOrgProvider>
            <WebServicesProvider>
              <Component {...pageProps} />
            </WebServicesProvider>
          </AddressOrgProvider>
        </RealmOrganizationsProvider>
      </RealmProvider>
    </Provider>
  );
}
