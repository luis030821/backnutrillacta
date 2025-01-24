import { HomePage } from "@/infra";
import { withPWA } from "cllk/dist/cllk/next/withPWA";
export default HomePage;
export const getStaticProps = async () => {
  withPWA(
    "Nutrillacta",
    "https://nutrillacta.com/assets/favicon/android-icon-192x192.png"
  );
  return { props: {} };
};
