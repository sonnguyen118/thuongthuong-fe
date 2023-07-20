import React, { useState, useEffect } from "react";
import { Row } from "antd";
import { FormContactHome } from "@components/elements/form";
import { TitleBlock } from "@components/elements/block";
import HeadSEO from "@components/layouts/header/HeadSEO";
import Layout from "@components/layouts/layout/LayoutClient";
import { NavigationTopBar } from "@components/elements/navigation";
import { CkeditorDisable } from "@components/molecules/ckeditor";
import { useSelector } from "react-redux";
import { store } from "@store";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";
import { webInformationClient } from "@service";
interface PageSEOData {
  name: string;
  pageSEO: {
    title: string;
    url: string;
    keywords: string[];
    description: string;
    image: string;
  };
}

interface NavigationProps {
  id: number;
  title: string;
  link: string;
};

interface pagesProps {
  dataMenu: any;
  dataFooter: any;
  dataContact: any
}
const Contact: React.FC<pagesProps> = (props: pagesProps) => {
  const {dataMenu, dataFooter, dataContact} = props;
  const [t, setText] = useState(viText);
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  );
  useEffect(() => {
    loadLanguageText(lang, setText);
  }, [lang]);
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  const pageSEOData: PageSEOData = {
    name: "Thương Thương",
    pageSEO: {
      title: "Liên Hệ | Thương Thương",
      url: "https://www.critistudio.top/gioi-thieu",
      keywords: ["website", "home", "page"],
      description:
        "Thuong Thuong tổ chức đào tạo nghề cho đối tượng người khuyết tật và người yếu thế nhằm giảm gánh nặng cho gia đình và xã hội.",
      image: "https://www.critistudio.top/images/seo.jpg",
    },
  };
  const dataNavigation: NavigationProps[] = [
    {
      id: 1,
      title: `${t.navigator.HOME}`,
      link: "/",
    },
    {
      id: 2,
      title: `${t.navigator.MENU4}`,
      link: "/",
    },
  ];
  return (
    <>
      <HeadSEO pageSEO={pageSEOData.pageSEO} />
      <Layout dataMenu={dataMenu} dataFooter={dataFooter}>
        <div className="list-products">
          <div className="list-products-navigation">
            <NavigationTopBar data={dataNavigation} />
          </div>
          <div>
          <div className="home__contact">
      <TitleBlock
        title={dataContact.titleBlock}
        urlImage={dataContact.iconBlock[0]}
        underlined={dataContact.underlineBlock}
      />
      <div
        className="home__contact-map"
        dangerouslySetInnerHTML={{ __html: dataContact.map }}
      />
      <Row className="home__contact-wrap">
        <div className="home__contact-wrap-left">
          <p className="home__contact-wrap-left-title">
            {dataContact.phone}
            <br></br>
            {dataContact.hotline}
            <br></br>
            {dataContact.email}
            <br></br>
            {dataContact.adress1}
            <br></br>
            {dataContact.adress2}
          </p>
          <p className="home__contact-wrap-left-text">
            {dataContact.content?.content1}
            <br></br>
            {dataContact.content?.content2}
            <br></br>
            {dataContact.content?.content3}
          </p>
        </div>
        <div className="home__contact-wrap-right">
          <FormContactHome />
        </div>
      </Row>
    </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export async function getServerSideProps(context: any) {
  try {
    const lang = context.query.lang
    if(lang === 'en') {
    const MenuEN : any = await  webInformationClient.handleGetWebInformation("5");
    const FooterEN:any = await webInformationClient.handleGetWebInformation("3");
    const ContactEN :any = await webInformationClient.handleGetWebInformation("13");
    return {
      props: {
        dataMenu:  JSON.parse(MenuEN.value) || {},
        dataFooter: JSON.parse(FooterEN.value) || {},
        dataContact: JSON.parse(ContactEN.value) || {},
      },
    };
  } else {
    const MenuVI : any = await  webInformationClient.handleGetWebInformation("4");
    const FooterVI:any = await webInformationClient.handleGetWebInformation("2");
    const ContactVI :any = await webInformationClient.handleGetWebInformation("12");
    return {
      props: {
        dataMenu:  JSON.parse(MenuVI.value) || {},
        dataFooter: JSON.parse(FooterVI.value) || {},
        dataContact: JSON.parse(ContactVI.value) || {},
      },
    };
  }

  } catch (e) {
    return { props: {} };
  }
}
export default Contact;
