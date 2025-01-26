import { RealmProvider } from "@llampukaq/realm";
import { Error401, Provider } from "cllk";
import "@/styles/main.css";
import type { AppProps } from "next/app";
import "cropperjs/dist/cropper.css";
import client from "@/client";
import "swiper/css";

export default function App({ Component, pageProps, router }: AppProps) {
  const appId = client.realm;
  const config = {
    TRANSLATE: client.translate,
    IMG: client.key,
  };
  return (
    <>
      <Provider color="bg-blue-800" config={config}>
        <RealmProvider
          Error401={<Error401 />}
          appId={appId}
          customDataUser={{ howManyBusiness: 1, type: "free" }}
        >
          <Component {...pageProps} />
        </RealmProvider>
      </Provider>
    </>
  );
}
