import React, { useState, useEffect } from "react";
import HeadSEO from "@components/layouts/header/HeadSEO";
import Layout from "@components/layouts/layout/LayoutClient";
import { BanerAbout, BlockInformation } from "@components/templates/abouts";
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

interface positionProps {
  image: number;
  block: number;
}
interface dataProps {
  id: string;
  image: Array<string>;
  title: string;
  description: string;
  position: positionProps;
}
interface pagesProps {
  dataPages: any;
  dataMenu: any;
  dataFooter: any;
  dataContact: any
}
const AboutPage: React.FC<pagesProps> = (props: pagesProps) => {
  const {dataPages, dataMenu, dataFooter, dataContact} = props;
  const [t, setText] = useState(viText);
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  );
  useEffect(() => {
    loadLanguageText(lang, setText);
  }, [lang]);
  const pageSEOData: PageSEOData = {
    name: "Thương Thương",
    pageSEO: {
      title: "Giới Thiệu | Thương Thương",
      url: "https://www.critistudio.top/gioi-thieu",
      keywords: ["website", "home", "page"],
      description:
        "Thuong Thuong tổ chức đào tạo nghề cho đối tượng người khuyết tật và người yếu thế nhằm giảm gánh nặng cho gia đình và xã hội.",
      image: "https://www.critistudio.top/images/seo.jpg",
    },
  };
  const dataAbout: dataProps[] = [
    {
      id: "1",
      image: ["/images/slide/slide1.jpg"],
      title: `${t.about_pages.TITLE1}`,
      description: `${t.about_pages.DESCRIPTION1}`,
      position: {
        image: 1,
        block: 2,
      },
    },
    {
      id: "2",
      image: [
        "/images/slide/slide1.jpg",
        "/images/slide/slide2.jpg",
        "/images/slide/slide3.jpg",
      ],
      title: `${t.about_pages.TITLE2}`,
      description: `${t.about_pages.DESCRIPTION2}`,
      position: {
        image: 2,
        block: 1,
      },
    },
  ];
  return (
    <>
      <HeadSEO pageSEO={pageSEOData.pageSEO} />
      <Layout dataMenu={dataMenu} dataFooter={dataFooter}>
        <BanerAbout imageUrl={dataPages.imageBaner[0]}/>
         {/*quá trình render dữ liệu cho 5 block*/}
        {/*Block 1*/}
        <div key={1}>
          <BlockInformation
            isShow={dataPages.show1}
            image={dataPages.image1}
            title={dataPages.title1}
            description={dataPages.description1}
            position={dataPages.isReversed1}
          />
        </div>
        {/*Block 2*/}
        <div key={3}>
          <BlockInformation
            isShow={dataPages.show2}
            image={dataPages.image2}
            title={dataPages.title2}
            description={dataPages.description2}
            position={dataPages.isReversed2}
          />
        </div>
        {/*Block 3*/}
        <div key={3}>
          <BlockInformation
            isShow={dataPages.show3}
            image={dataPages.image3}
            title={dataPages.title3}
            description={dataPages.description3}
            position={dataPages.isReversed3}
          />
        </div>
        {/*Block 4*/}
        <div key={4}>
          <BlockInformation
            isShow={dataPages.show4}
            image={dataPages.image4}
            title={dataPages.title4}
            description={dataPages.description4}
            position={dataPages.isReversed4}
          />
        </div>
        {/*Block 5*/}
        <div key={5}>
          <BlockInformation
            isShow={dataPages.show5}
            image={dataPages.image5}
            title={dataPages.title5}
            description={dataPages.description5}
            position={dataPages.isReversed5}
          />
        </div>

      </Layout>
    </>
  );
};
export async function getServerSideProps(context: any) {
  try {
    const lang = context.query.lang
    if(lang === 'en') {
      const DatapageEN :any = await webInformationClient.handleGetWebInformation("9");
      const MenuEN : any = await  webInformationClient.handleGetWebInformation("5");
      const FooterEN:any = await webInformationClient.handleGetWebInformation("3");
      const ContactEN :any = await webInformationClient.handleGetWebInformation("13");
  
      return {
        props: {
          dataPages: JSON.parse(DatapageEN.value) || {},
          dataMenu:  JSON.parse(MenuEN.value) || {},
          dataFooter: JSON.parse(FooterEN.value) || {},
          dataContact: JSON.parse(ContactEN.value) || {},
        },
      };
  } else {
    const DatapageVI :any = await webInformationClient.handleGetWebInformation("8");
    const MenuVI : any = await  webInformationClient.handleGetWebInformation("4");
    const FooterVI:any = await webInformationClient.handleGetWebInformation("2");
    const ContactVI :any = await webInformationClient.handleGetWebInformation("12");

    return {
      props: {
        dataPages: JSON.parse(DatapageVI.value) || {},
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

export default AboutPage;
