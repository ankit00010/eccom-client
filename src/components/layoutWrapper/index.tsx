"use client";

import React, { useContext } from "react";
import { UserContext, UserContextProps } from "@/context/admin_context";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Modal from "../ui/model";

const LayoutShell = ({ children }: { children: React.ReactNode }) => {
  const { loginPopUp, handleLoginPopUpChange } = useContext(
    UserContext
  ) as UserContextProps;


  return (
    <>
      <Navbar />
      <main className="layout-content">{children}</main>
      <Modal
        isOpen={loginPopUp}
        onClose={() => handleLoginPopUpChange(false)}
      />

      <Footer />
    </>
  );
};

export default LayoutShell;
