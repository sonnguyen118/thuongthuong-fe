import React, { useState, useEffect } from "react";
import HeadSEO from "@components/layouts/header/HeadSEO";
import Layout from "@components/layouts/layout/LayoutClient";
import { CardPageNews } from "@components/elements/card";
import { Pagination } from "antd";
import { NavigationTopBar } from "@components/elements/navigation";
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

interface listNewsData {
  id: number;
  title: string;
  image: string;
  descriptions: string;
  time: string;
  link: string;
}
interface NavigationProps {
  id: number;
  title: string;
  link: string;
}
const ListNews: React.FC = () => {
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
      title: "Tin Tức | Thương Thương",
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
      title: `${t.navigator.MENU1}`,
      link: "/",
    },
  ];
  const dataNews: listNewsData[] = [
    {
      id: 1,
      title: `${t.list_news.TITLE}`,
      image: "/images/seo.jpg",
      descriptions: `${t.list_news.DESCRIPTION}`,
      link: "/tin-tuc/tin-tuc-test",
      time: `${t.list_news.TIME}`,
    },
    {
      id: 2,
      title: `${t.list_news.TITLE}`,
      image: "/images/seo.jpg",
      descriptions: `${t.list_news.DESCRIPTION}`,
      link: "/tin-tuc/tin-tuc-test",
      time: `${t.list_news.TIME}`,
    },
    {
      id: 3,
      title: `${t.list_news.TITLE}`,
      image: "/images/seo.jpg",
      descriptions: `${t.list_news.DESCRIPTION}`,
      link: "/tin-tuc/tin-tuc-test",
      time: `${t.list_news.TIME}`,
    },
    {
      id: 4,
      title: `${t.list_news.TITLE}`,
      image: "/images/seo.jpg",
      descriptions: `${t.list_news.DESCRIPTION}`,
      link: "/tin-tuc/tin-tuc-test",
      time: `${t.list_news.TIME}`,
    },
    {
      id: 5,
      title: `${t.list_news.TITLE}`,
      image: "/images/seo.jpg",
      descriptions: `${t.list_news.DESCRIPTION}`,
      link: "/tin-tuc/tin-tuc-test",
      time: `${t.list_news.TIME}`,
    },
    {
      id: 6,
      title: `${t.list_news.TITLE}`,
      image: "/images/seo.jpg",
      descriptions: `${t.list_news.DESCRIPTION}`,
      link: "/tin-tuc/tin-tuc-test",
      time: `${t.list_news.TIME}`,
    },
    {
      id: 7,
      title: `${t.list_news.TITLE}`,
      image: "/images/seo.jpg",
      descriptions: `${t.list_news.DESCRIPTION}`,
      link: "/tin-tuc/tin-tuc-test",
      time: `${t.list_news.TIME}`,
    },
    {
      id: 8,
      title: `${t.list_news.TITLE}`,
      image: "/images/seo.jpg",
      descriptions: `${t.list_news.DESCRIPTION}`,
      link: "/tin-tuc/tin-tuc-test",
      time: `${t.list_news.TIME}`,
    },
  ];

  return (
    <>
      <HeadSEO pageSEO={pageSEOData.pageSEO} />
      <Layout>
        <div className="list-products">
          <div className="list-products-navigation">
            <NavigationTopBar data={dataNavigation} />
          </div>
        </div>
        <div className="list-news">
          {dataNews.map((data, index) => (
            <div className="list-news-item" key={data.id}>
              <CardPageNews
                title={data.title}
                description={data.descriptions}
                imageSrc={data.image}
                link={data.link}
                time={data.time}
              />
            </div>
          ))}
        </div>
        <Pagination
          defaultCurrent={1}
          total={50}
          className="list-news-pagination"
        />
      </Layout>
    </>
  );
};

export default ListNews;
