import NavbarPC from "./navbar/navbarPC";
import Footer from "./footer/FooterPC";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <NavbarPC />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
