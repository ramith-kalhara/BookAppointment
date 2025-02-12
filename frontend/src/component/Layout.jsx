import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import BackToTop from "./BackToTop";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>     
      <Footer />
      <BackToTop/>
    </>
  );
};

export default Layout;
