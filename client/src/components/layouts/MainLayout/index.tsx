import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center">{children}</div>
      <Footer />
    </>
  );
};

export default MainLayout;
