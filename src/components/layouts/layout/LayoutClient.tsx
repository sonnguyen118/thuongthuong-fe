import NavbarPC from "../navbar/navbarPC";
import Footer from "../footer/FooterPC";
import { ReactNode } from "react";
import { ButtonLanguage } from "@components/elements/button";
import { BackTop, Button } from 'antd';
import { UpOutlined } from '@ant-design/icons';
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

        <BackTop>
          <Button type="primary" shape="circle" size="large" className="custom-scroll-top">
            <UpOutlined />
          </Button>
        </BackTop>

    </>
  );
};

export default Layout;
