import React from "react";
import Header from "../Header";
import Footer from "../Footer";

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
