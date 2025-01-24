import client from "@/client";
import { useIsLogin } from "@llampukaq/realm";
import { useEmailLogin } from "@llampukaq/realm-email-provider";
import {
  RealmFacebookButton,
  RealmGoogleButton,
} from "@llampukaq/realm-google-provider";
import { Icons, Redirect, Signin, useMessage } from "cllk";
import { useRouter } from "next/router";

const Login = () => {
  const { loginEmail } = useEmailLogin();
  const { messagePromise } = useMessage();
  const router = useRouter();
  const handleLogin = async (e: any) => {
    messagePromise(
      async () => {
        await loginEmail(e.email, e.password);
      },
      {
        error: "Error de inicio",
        pending: "Iniciando sesion",
        success: (function () {
          router.push("/me");
          return "Bienvenido";
        })(),
      }
    );
  };

  const { isLogin } = useIsLogin();
  return (
    <>
      {isLogin ? (
        <Redirect href="/me" />
      ) : (
        <>
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
                        router.push("/me");
                        return "Bienvenido";
                      })(),
                    });
                  }}
                  appId={client.google}
                />
              }
              facebook={
                <RealmFacebookButton
                  onSuccess={(fn) => {
                    messagePromise(fn, {
                      error: "Error de inicio",
                      pending: "Iniciando sesion",
                      success: (function () {
                        router.push("/me");
                        return "Bienvenido";
                      })(),
                    });
                  }}
                  appId="2169993853332310"
                >
                  <Icons size={30} icon="IconBrandFacebookFilled" />
                </RealmFacebookButton>
              }
              onClick={async (e) => {
                await handleLogin(e);
              }}
            />
          </div>
        </>
      )}
    </>
  );
};
export default Login;
