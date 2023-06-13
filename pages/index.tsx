import React, { useState, useEffect } from "react";
import HeadSEO from "@components/layouts/header/HeadSEO";
import Layout from "@components/layouts/layout/LayoutClient";
import { SlideBarsHome } from "@components/elements/Slider";
import {
  PrinciplesHome,
  PiecesPuzzleHome,
  CardTabs,
  ListProducts,
  BlockProducts,
  EventNews,
  ListPartner,
  ContactHome,
} from "@components/templates/home";
import { useSelector } from "react-redux";
import { store } from "@store";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";
import { webInformationClient } from "@service";
import { setLoading } from "@slices/loadingState";
import { notification } from "antd";
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
interface ListNewsProps {
  title: string;
  description: string;
  imageSrc: string;
}
interface HomeProps {
  dataPages: any;
  dataMenu: any;
  dataFooter: any;
  dataContact: any
}
const Home: React.FC<HomeProps> = (props: HomeProps) => {
  const {dataPages, dataMenu, dataFooter, dataContact} = props;
  console.log(dataPages, "dataPages");
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
      title: "Trang Chủ | Thương Thương",
      url: "https://www.critistudio.top",
      keywords: ["website", "home", "page"],
      description:
        "Thuong Thuong tổ chức đào tạo nghề cho đối tượng người khuyết tật và người yếu thế nhằm giảm gánh nặng cho gia đình và xã hội.",
      image: "https://www.critistudio.top/images/seo.jpg",
    },
  };

  return (
    <>
      <HeadSEO pageSEO={pageSEOData.pageSEO} />
      <Layout dataMenu={dataMenu} dataFooter={dataFooter}>
        <SlideBarsHome isShow={dataPages.showBlock1} dataSlider={dataPages.listSliderBlock1}/>
        {/* <PrinciplesHome /> */}
        <PiecesPuzzleHome isShow={dataPages.showBlock2} uderlineBlock2={dataPages.uderlineBlock2} iconBlock2={dataPages.iconBlock2} titleBlock2={dataPages.titleBlock2} listSliderBlock2={dataPages.listSliderBlock2} contentBlock2={dataPages.contentBlock2}/>
        {/* <CardTabs /> */}
        <ListProducts />
        <BlockProducts />
        {/*<EventNews*/}
        {/*  cardTitle={t.home.TITLE4_1}*/}
        {/*  cardDescription={t.home.DESCRIPTION4_1}*/}
        {/*  cardImageSrc={*/}
        {/*    "https://www.kymviet.com.vn/322732553_724487039001045_8942490573815366750_n.jpg"*/}
        {/*  }*/}
        {/*  listItems={listNewsData}*/}
        {/*/>*/}
        <ListPartner />
        <ContactHome data={dataContact}/>
      </Layout>
    </>
  );
};

export async function getServerSideProps(context: any) {
  try {
    const DatapageVI :any = await webInformationClient.handleGetWebInformation("6");
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

  } catch (e) {
    return { props: {} };
  }
}
export default Home;
