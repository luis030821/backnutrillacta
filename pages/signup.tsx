import client from "@/client";
import { useIsLogin } from "@llampukaq/realm";
import { useEmail } from "@llampukaq/realm-email-provider";
import {
  RealmFacebookButton,
  RealmGoogleButton,
} from "@llampukaq/realm-google-provider";
import { Icons, Redirect, Signup } from "cllk";
import React from "react";

function signup() {
  const { register: registerSignup } = useEmail();
  const { isLogin } = useIsLogin();
  return (
    <>
      {isLogin ? (
        <Redirect href="/me" />
      ) : (
        <div
          style={{
            backgroundImage:
              "url(//wsrv.nl/?url=https://app.llampukaq.com/backgrounds/1.png&output=webp&q=50)",
          }}
          className="h-screen w-screen flex justify-center items-center"
        >
          <Signup
            onClick={(e) => {
              registerSignup(e);
            }}
            social
            facebook={
              <RealmFacebookButton appId="2169993853332310">
                <Icons size={30} icon="IconBrandFacebookFilled" />
              </RealmFacebookButton>
            }
            google={<RealmGoogleButton appId={client.google} />}
          />
        </div>
      )}
    </>
  );
}

export default signup;
