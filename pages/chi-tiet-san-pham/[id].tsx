import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { store } from "@store";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";
import HeadSEO from "@components/layouts/header/HeadSEO";
import Layout from "@components/layouts/layout/LayoutClient";
import { NavigationTopBar } from "@components/elements/navigation";
import {
  ProductsDetails,
  ProductsSeems,
  ProductsContent,
} from "@components/templates/products";

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
      title: "Tranh cuốn giấy | Thương Thương",
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
      title: `${t.navigator.MENU9}`,
      link: "/",
    },
    {
      id: 3,
      title: `${t.navigator.MENU10}`,
      link: "/",
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
          <div className="list-products-wrap">
            <ProductsDetails />
          </div>
          <ProductsSeems title={t.products.HEADER1} />
          <ProductsContent />
          <ProductsSeems title={t.products.HEADER3} />
        </div>
      </Layout>
    </>
  );
};

export default ListNews;
