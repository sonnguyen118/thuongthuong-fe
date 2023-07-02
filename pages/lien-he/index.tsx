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
  const mapEmbedHtml =
    '<iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d62912.942322940886!2d105.63524152148848!3d9.761078981849815!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1681048611378!5m2!1svi!2s" width="800" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
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
            <div>
              <TitleBlock
                title={t.home.HEADER6}
                urlImage={"/images/home/iconnho05.png"}
                underlined={false}
              />
              <div
                className="home__contact-map"
                dangerouslySetInnerHTML={{ __html: mapEmbedHtml }}
              />
              <Row className="home__contact-wrap">
                <div className="home__contact-wrap-left">
                  <p className="home__contact-wrap-left-title">
                    {t.home.TITLE6_1}
                    <br></br>
                    {t.home.TITLE6_2}
                    <br></br>
                    {t.home.TITLE6_3}
                    <br></br>
                    {t.home.TITLE6_4}
                    <br></br>
                    {t.home.TITLE6_5}
                    <br></br>
                    {t.home.TITLE6_6}
                  </p>
                  <p className="home__contact-wrap-left-text">
                    {t.home.DESCRIPTION6_1}
                    <br></br>
                    {t.home.DESCRIPTION6_2}
                    <br></br>
                    {t.home.DESCRIPTION6_3}
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

  } catch (e) {
    return { props: {} };
  }
}
export default Contact;
