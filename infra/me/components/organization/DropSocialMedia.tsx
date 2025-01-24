import { Button, H1, Icons } from "cllk";
import React from "react";
const r = (e: string) => {
  return `IconBrand${e}`;
};
const social = ["Telegram", "Facebook", "Whatsapp", "Messenger", "Html5"];
function DropSocialMedia({ i }: any) {
  return (
    <>
      <H1>sd</H1>
      {social.map((x, index) => (
        //  @ts-ignore
        <Button key={index} icon={<Icons icon={r(x)} />}>
          {x}
        </Button>
      ))}
    </>
  );
}

export default DropSocialMedia;
