import { Container, Icons, NavLink, P, Text } from "cllk";
import { useIsLogin } from "@llampukaq/realm";
import { useOrganization } from "@llampukaq/realm-organizations";
import { Organization } from "@/types/types";
import { useDataApp } from "./AppPages/data";
import CreateOrganization from "../me/components/CreateOrganization";
function AppPages() {
  const { data } = useDataApp();
  const { isLogin } = useIsLogin();
  const { organization } = useOrganization<Organization>();
  return (
    <div>
      {isLogin && <>{organization == undefined && <CreateOrganization />}</>}
      <div className="flex justify-center items-center my-5">
        <Text type="H3">Tienda de aplicaciones</Text>
      </div>
      <div className="flex flex-wrap justify-center gap-5 w-10/12 md:w-full mx-auto">
        {data.map((app, key: number) => (
          <NavLink
            className={
              "w-full max-w-[400px] h-full mx-auto active:scale-95 hover:scale-105 duration-300 border dark:border-white/20 dark:hover:border-white/50 border-zinc-900/20 hover:border-zinc-900/50 rounded-xl"
            }
            key={key}
            href={`/app/install?id=${key}`}
          >
            <Container width="w-full" className="h-full mx-auto ">
              <div className="flex justify-center items-center space-x-3">
                <Icons size={60} icon={app.icon as any} />
                <div className="w-full max-w-[200px]">
                  <Text type="BodyLg(Medium)">{app.name}</Text>
                  <div className="flex justify-between">
                    <Text className="text-white/50" type="BodySm">
                      By Llampukaq
                    </Text>
                    {app.free && (
                      <Text type="BodySm(Medium)" className="text-green-500">
                        Free
                      </Text>
                    )}
                  </div>
                </div>
              </div>
            </Container>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default AppPages;
