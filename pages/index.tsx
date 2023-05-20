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
const Home: React.FC = () => {
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

  const listNewsData = [
    {
      title: `${t.home.TITLE4_2}`,
      description: `${t.home.DESCRIPTION4_2}`,
      imageSrc:
        "https://www.kymviet.com.vn/321661546_479424504374569_6975127491740140335_n.jpg",
    },
    {
      title: `${t.home.TITLE4_3}`,
      description: `${t.home.DESCRIPTION4_3}`,
      imageSrc:
        "https://www.kymviet.com.vn/321661546_479424504374569_6975127491740140335_n.jpg",
    },
  ];
  return (
    <>
      <HeadSEO pageSEO={pageSEOData.pageSEO} />
      <Layout>
        <SlideBarsHome />
        {/* <PrinciplesHome /> */}
        <PiecesPuzzleHome />
        {/* <CardTabs /> */}
        <ListProducts />
        <BlockProducts />
        <EventNews
          cardTitle={t.home.TITLE4_1}
          cardDescription={t.home.DESCRIPTION4_1}
          cardImageSrc={
            "https://www.kymviet.com.vn/322732553_724487039001045_8942490573815366750_n.jpg"
          }
          listItems={listNewsData}
        />
        <ListPartner />
        <ContactHome />
      </Layout>
    </>
  );
};

export default Home;
