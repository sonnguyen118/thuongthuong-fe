import NavbarPC from "../navbar/navbarPC";
import NavbarMobile from "../navbar/navbarMobile";
import Footer from "../footer/FooterPC";
import { ReactNode } from "react";
import { ButtonLanguage } from "@components/elements/button";
import { BackTop, Button } from "antd";
import { UpOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
interface LayoutProps {
  dataMenu: any;
  dataFooter: any;
  children: ReactNode;
}
const Layout = (props: LayoutProps) => {
  const { dataMenu, dataFooter, children } = props;
  return (
    <>
      <NavbarPC data={dataMenu} />
      <NavbarMobile data={dataMenu} />
      <div>{children}</div>
      <ButtonLanguage />
      <Footer data={dataFooter} />
      <div className="icon-zalo">
        <a href={"https://zalo.me/g/qzhgkf395"}>
          <Image
            src={"/icon/zalo-icon-circle-1.png"}
            alt="thuongthuong"
            width={55}
            height={55}
            className="icon-zalo-img"
          />
        </a>
      </div>
      <BackTop>
        <Button
          type="primary"
          shape="circle"
          size="large"
          className="custom-scroll-top"
        >
          <UpOutlined />
        </Button>
      </BackTop>
    </>
  );
};

export default Layout;
