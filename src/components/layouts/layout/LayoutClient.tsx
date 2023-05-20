import NavbarPC from "../navbar/navbarPC";
import Footer from "../footer/FooterPC";
import { ReactNode } from "react";
import { ButtonLanguage } from "@components/elements/button";
type LayoutProps = {
  children: ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <NavbarPC />
      <div>{children}</div>
      <ButtonLanguage />
      <Footer />
    </>
  );
};

export default Layout;
