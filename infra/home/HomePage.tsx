import { useIsLogin, useUser } from "@llampukaq/realm";

import ProductsAndCategory from "@/infra/products/ProductsAndCategory";
import { CarDProvider } from "@/infra/products/hooks/useCards";
import { CategoriesProvider } from "@/infra/products/hooks/useCategories";
import { ProductsProvider } from "@/infra/products/hooks/useProducts";
import { PropertiesProvider } from "@/infra/products/hooks/useProperties";
import { RealmAccess } from "@llampukaq/realm";
import React, { useEffect } from "react";
import { Signin, useMessage } from "cllk";
import {
  RealmGoogleButton,
  useLogoutGoogle,
} from "@llampukaq/realm-google-provider";
import { useEmailLogin } from "@llampukaq/realm-email-provider";
import client from "@/client";
import { useNutrillactaApi } from "@/hooks/useNutrillacta";
import { User } from "@/interface";
function HomePage() {
  const { isLogin } = useIsLogin();
  const { logout } = useLogoutGoogle();
  const { messagePromise } = useMessage();
  const { loginEmail } = useEmailLogin();
  const handleLogin = async (e: any) => {
    messagePromise(
      async () => {
        await loginEmail(e.email, e.password);
      },
      {
        error: "Error de inicio",
        pending: "Iniciando sesion",
        success: (function () {
          return "Bienvenido";
        })(),
      }
    );
  };
  const { getUser } = useNutrillactaApi();
  const { user } = useUser<User>();
  useEffect(() => {
    const res = async () => {
      if (isLogin) {
        try {
          await getUser(user?.email);
        } catch (error) {
          logout?.();
        }
      }
    };
    res();
  }, [isLogin]);
  return (
    <>
      {!isLogin ? (
        <div
          style={{
            backgroundImage:
              "url(//wsrv.nl/?url=https://app.llampukaq.com/backgrounds/1.png&output=webp&q=50)",
          }}
          className="h-screen w-screen flex justify-center items-center"
        >
          <Signin
            social
            google={
              <RealmGoogleButton
                googleOpt={{
                  shape: "circle",
                  useOneTap: true,
                  size: "large",
                  type: "icon",
                  theme: "filled_blue",
                  cancel_on_tap_outside: true,
                }}
                onSuccess={(fn) => {
                  messagePromise(fn, {
                    error: "Error de inicio",
                    pending: "Iniciando sesion",
                    success: (function () {
                      return "Bienvenido";
                    })(),
                  });
                }}
                appId={client.google}
              />
            }
            onClick={async (e) => {
              await handleLogin(e);
            }}
          />
        </div>
      ) : (
        <RealmAccess>
          <PropertiesProvider>
            <CarDProvider>
              <CategoriesProvider>
                <ProductsProvider>
                  <ProductsAndCategory />
                </ProductsProvider>
              </CategoriesProvider>
            </CarDProvider>
          </PropertiesProvider>
        </RealmAccess>
      )}
    </>
  );
}
export default HomePage;
