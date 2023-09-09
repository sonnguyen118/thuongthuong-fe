import React, { useState, useEffect } from "react";
import HeadSEO from "@components/layouts/header/HeadSEO";
import Layout from "@components/layouts/layout/LayoutClient";
import Link from "next/link";
import { LeftCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { store } from "@store";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";
import { useRouter } from "next/router";
import { SAN_PHAM } from "src/constant/link-master";
import { categoryClient } from "@api";
import { productClient } from "@api";
import { Category } from "@components/model/Category";
import { webInformationClient } from "@service";

interface PageSEOData {
  name: string;
  pageSEO: {
    title: string;
    url: string;
    keywords: string;
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
export interface NavigationProps {
  id: number;
  title: string;
  link: string;
}

interface pagesProps {
  categories: any;
  products: any;
  dataMenu: any;
  dataFooter: any;
}
const ListProductsPage: React.FC<pagesProps> = (props: pagesProps) => {
  const { categories, dataMenu, dataFooter } = props;
  const router = useRouter();
  const { id, language } = router.query;

  const [t, setText] = useState(viText);
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  );

  useEffect(() => {
    loadLanguageText(lang, setText);
  }, [language, lang]);

  const pageSEOData: PageSEOData = {
    name: "Thương Thương",
    pageSEO: {
      title: "Sản Phẩm | Thương Thương",
      url: "https://www.critistudio.top/gioi-thieu",
      keywords: "website",
      description:
        "Thuong Thuong tổ chức đào tạo nghề cho đối tượng người khuyết tật và người yếu thế nhằm giảm gánh nặng cho gia đình và xã hội.",
      image: "https://www.critistudio.top/images/seo.jpg",
    },
  };
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/`;
  const image = "";

  const renderCategories = (arr: Category[]) => {
    const categoryElement: any[] = [];
    arr.forEach((e) => {
      categoryElement.push(
        <div className="list-products-left-item-ul" key={e.id}>
          <Link
            href={`${SAN_PHAM}${e.link}?language=${lang}`}
            className="list-products-left-item-ul-li"
          >
            {e.name}{" "}
          </Link>
        </div>
      );
      if (e.subCategories && e.subCategories.length > 0) {
        const paddingLeft = 0;
        handleSubCate(e.subCategories, categoryElement, paddingLeft);
      }
    });
    return categoryElement;
  };
  const handleSubCate = (
    arr: Category[],
    collector: any[],
    paddingLeft: number
  ) => {
    const cssPadding = paddingLeft + 30;
    arr.forEach((sub) => {
      if (sub.subCategories && sub.subCategories.length > 0) {
        collector.push(
          <div className="list-products-left-item-li" key={sub.id}>
            <Link
              href={`${SAN_PHAM}${sub.link}?language=${lang}`}
              className="list-products-left-item-li-sub"
            >
              {sub.name}{" "}
            </Link>
          </div>
        );
        handleSubCate(sub.subCategories, collector, cssPadding);
      } else
        collector.push(
          <div className="list-products-left-item-li" key={sub.id}>
            <Link
              href={`${SAN_PHAM}${sub.link}?language=${lang}`}
              className="list-products-left-item-sub"
            >
              {sub.name}{" "}
            </Link>
          </div>
        );
    });
  };
  return (
    <>
      <HeadSEO pageSEO={pageSEOData.pageSEO} url={url} image={image} />
      <Layout dataMenu={dataMenu} dataFooter={dataFooter}>
        <div className="list-category-mobile">
          <div className="list-products-left-title">
            <LeftCircleOutlined onClick={() => router.back()} style={{marginRight: 10, marginLeft: 15}}/>
            {t.list_products.TITLE}
          </div>
          <div className="list-products-left-wall"></div>
          {categories?.length > 0 ? (
            renderCategories(categories)
          ) : (
            <div>No categories found.</div>
          )}
        </div>
      </Layout>
    </>
  );
};
export async function getServerSideProps(context: any) {
  try {
    const lang = context.query.lang;
    const page = 1;
    const size = 20;
    if (lang === "en") {
      const categories = await categoryClient
        .getAllCategoryClient("EN", page, size)
        .then((res) => res.data.data);
      const MenuVI: any = await webInformationClient.handleGetWebInformation(
        "5"
      );
      const FooterVI: any = await webInformationClient.handleGetWebInformation(
        "3"
      );
      // Pass data to the page via props
      return {
        props: {
          categories: categories,
          dataMenu: JSON.parse(MenuVI.value) || {},
          dataFooter: JSON.parse(FooterVI.value) || {},
        },
      };
    } else {
      const categories = await categoryClient
        .getAllCategoryClient("VI", page, size)
        .then((res) => res.data.data);
      const products = await productClient
        .getAllProductClient("VI", page, size)
        .then((res) => res.data.data);
      const MenuVI: any = await webInformationClient.handleGetWebInformation(
        "4"
      );
      const FooterVI: any = await webInformationClient.handleGetWebInformation(
        "2"
      );
      // Pass data to the page via props
      return {
        props: {
          categories: categories,
          products: products,
          dataMenu: JSON.parse(MenuVI.value) || {},
          dataFooter: JSON.parse(FooterVI.value) || {},
        },
      };
    }
  } catch (error) {
    return {
      props: {},
    };
  }
}
export default ListProductsPage;
