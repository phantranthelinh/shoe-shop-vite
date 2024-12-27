import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center bg-lightWhite min-h-[calc(100vh-300px)]">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
