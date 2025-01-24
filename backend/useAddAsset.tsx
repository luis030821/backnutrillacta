import { Organization } from "@/types/types";
import { useCollection } from "@llampukaq/realm";
import { useOrganization } from "@llampukaq/realm-organizations";

function useAddAsset() {
  const { organization } = useOrganization<Organization>();
  const collection = useCollection("organization", "assets");
  const addAsset = async (res: any) => {
    await collection?.insertOne({
      organizationId: "nutrillacta",
      asset: res,
    });
  };
  const getAssets = async () => {
    const res = (await collection?.find({
      organizationId: "nutrillacta",
    })) as { asset: { size: number } }[];

    return res.reduce((a, c) => a + c.asset.size, 0);
  };

  return { addAsset, getAssets };
}

export default useAddAsset;
