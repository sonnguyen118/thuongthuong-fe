import NavbarPC from "../navbar/navbarPC";
import Footer from "../footer/FooterPC";
import { ReactNode } from "react";
import { ButtonLanguage } from "@components/elements/button";

interface LayoutProps {
  dataMenu: any;
  dataFooter: any;
  children: ReactNode;
}
const Layout = ( props: LayoutProps) => {
  const { dataMenu, dataFooter, children } = props;
  return (
    <>
      <NavbarPC data={dataMenu}/>
      <div>{children}</div>
      <ButtonLanguage />
      <Footer data={dataFooter}/>
    </>
  );
};

export default Layout;
