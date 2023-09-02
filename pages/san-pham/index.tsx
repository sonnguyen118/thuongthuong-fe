import React, { useState, useEffect } from "react";
import HeadSEO from "@components/layouts/header/HeadSEO";
import Layout from "@components/layouts/layout/LayoutClient";
import { NavigationTopBar } from "@components/elements/navigation";
import { ListCategory, ListProducts } from "@components/templates/listproducts";
import { useSelector } from "react-redux";
import { store } from "@store";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";
import { useRouter } from "next/router";
import { SAN_PHAM } from "src/constant/link-master";
import { categoryClient } from "@api";
import { productClient } from "@api";
import { bread_crumb } from "src/constant/constant";
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
  const { categories, products, dataMenu, dataFooter } = props;
  const router = useRouter();
  const currentUrl = router.asPath;
  const { id, language } = router.query;

  const [t, setText] = useState(viText);
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  );
  const initDataNavigation: NavigationProps[] = [
    {
      id: 1,
      title: `${t.navigator.HOME}`,
      link: "/",
    },
    {
      id: 2,
      title: `${t.menu.MENU4}`,
      link: `${SAN_PHAM}?language=${lang}`,
    },
  ];
  const [dataNavigation, setDataNavigation] =
    useState<NavigationProps[]>(initDataNavigation);

  useEffect(() => {
    loadLanguageText(lang, setText);
    // getCategories()
    // getAllProducts()
    setBreadCrumb();
  }, [language, lang]);

  // const getCategories = async () => {
  //   setCategories(props.categories)
  // }
  // const getAllProducts = async () => {
  //   setProducts(props.products)
  // }
  const setBreadCrumb = async () => {
    const languageFromURL = language?.toString().toUpperCase();
    if (languageFromURL == "VI") {
      initDataNavigation[0].title = bread_crumb.home.VI;
      initDataNavigation[1].title = bread_crumb.product.VI;
    }
    if (languageFromURL == "EN") {
      initDataNavigation[0].title = bread_crumb.home.EN;
      initDataNavigation[1].title = bread_crumb.product.EN;
    }
    setDataNavigation(initDataNavigation);
  };
  const pageSEOData: PageSEOData = {
    name: "Thương Thương",
    pageSEO: {
      title: "Sản Phẩm | Thương Thương",
      url: "https://www.critistudio.top/gioi-thieu",
      keywords: ["website", "home", "page"],
      description:
        "Thuong Thuong tổ chức đào tạo nghề cho đối tượng người khuyết tật và người yếu thế nhằm giảm gánh nặng cho gia đình và xã hội.",
      image: "https://www.critistudio.top/images/seo.jpg",
    },
  };
  console.log(products, "products data");
  return (
    <>
      <HeadSEO pageSEO={pageSEOData.pageSEO} />
      <Layout dataMenu={dataMenu} dataFooter={dataFooter}>
        <div className="list-products">
          <div className="list-products-navigation">
            <NavigationTopBar data={dataNavigation} />
          </div>
          <div className="list-products-wrap">
            <ListCategory data={categories} />
            <ListProducts
              pagination={products.pagination}
              products={products.products}
              title={""}
            />
          </div>
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
      const products = await productClient
        .getAllProductClient("EN", page, size)
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
          products: products,
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
