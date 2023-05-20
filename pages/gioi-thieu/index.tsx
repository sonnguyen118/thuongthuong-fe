import React, { useState, useEffect } from "react";
import HeadSEO from "@components/layouts/header/HeadSEO";
import Layout from "@components/layouts/layout/LayoutClient";
import { BanerAbout, BlockInformation } from "@components/templates/abouts";
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
      <Layout>
        <BanerAbout />
        {dataAbout.map((data, index) => (
          <div key={data.id}>
            <BlockInformation
              image={data.image}
              title={data.title}
              description={data.description}
              position={data.position}
            />
          </div>
        ))}
      </Layout>
    </>
  );
};

export default Home;
