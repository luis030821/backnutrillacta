import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NavbarTrue from "./NavbarTrue/NavbarTrue";
import { useIsLogin } from "@llampukaq/realm";
import PageProvider from "@/context/store/PageProvider";

function Layout({ children }: { children: ReactNode }) {
  const { isLogin } = useIsLogin();
  return (
    <>
      {isLogin ? (
        <>
          <PageProvider>
            <NavbarTrue />
            <div className="min-h-screen ">{children}</div>
          </PageProvider>
        </>
      ) : (
        <>
          <Navbar />
          <div className="min-h-screen ">{children}</div>
        </>
      )}

      <Footer />
    </>
  );
}

export default Layout;
