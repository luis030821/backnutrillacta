import { useUserRealm } from "@llampukaq/realm";

function useUpdateRepo() {
  const { userRealm } = useUserRealm();
  async function updateFileAndCommit(repo: string) {
    return await userRealm?.functions.forks(repo);
  }

  return { updateFileAndCommit };
}

export default useUpdateRepo;
