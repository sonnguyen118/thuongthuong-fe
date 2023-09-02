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
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";
import { webInformationClient, handleProductsClient } from "@service";
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
interface pagesProps {
  dataPages: any;
  dataMenu: any;
  dataFooter: any;
  dataContact: any;
  dataProductHighlight: any;
  dataListProducts: any;
}
const Home: React.FC<pagesProps> = (props: pagesProps) => {
  const {
    dataPages,
    dataMenu,
    dataFooter,
    dataContact,
    dataProductHighlight,
    dataListProducts,
  } = props;
  console.log(dataPages, "dataPages");
  const [t, setText] = useState(viText);
  useEffect(() => {
    const lang = localStorage.getItem("lang");
    if (lang) {
      loadLanguageText(lang, setText);
    } else {
      loadLanguageText("vi", setText);
    }
  }, []);

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/`;
  const image = "";

  return (
    <>
      <HeadSEO pageSEO={dataPages.SEO} url={url} image={image} />
      <Layout dataMenu={dataMenu} dataFooter={dataFooter}>
        <SlideBarsHome
          isShow={dataPages.showBlock1}
          dataSlider={dataPages.dataSlider}
          t={t}
        />
        <PrinciplesHome
          isShow={dataPages.showBlockS}
          dataBlock={dataPages.dataBlockS}
        />
        <PiecesPuzzleHome
          isShow={dataPages.showBlock2}
          uderlineBlock={dataPages.uderlineBlock2}
          iconBlock={dataPages.iconBlock2}
          titleBlock={dataPages.titleBlock2}
          listSliderBlock={dataPages.listSliderBlock2}
          contentBlock={dataPages.contentBlock2}
          t={t}
        />
        {/* <CardTabs /> */}
        <ListProducts
          isShow={dataPages.showBlock3}
          uderlineBlock={dataPages.uderlineBlock3}
          iconBlock={dataPages.iconBlock3}
          titleBlock={dataPages.titleBlock3}
          listSliderBlock={dataPages.listSliderBlock3}
          t={t}
        />
        {dataProductHighlight && (
          <BlockProducts
            dataProductHighlight={dataProductHighlight}
            dataListProducts={dataListProducts}
            t={t}
          />
        )}
        <ListPartner
          isShow={dataPages.showBlock5}
          uderlineBlock={dataPages.uderlineBlock5}
          iconBlock={dataPages.iconBlock5}
          titleBlock={dataPages.titleBlock5}
          listSliderBlock={dataPages.listSliderBlock5}
          t={t}
        />
        <ContactHome data={dataContact} t={t} />
      </Layout>
    </>
  );
};

export async function getServerSideProps(context: any) {
  try {
    const lang = context.query.lang;
    if (lang === "en") {
      const DatapageEN: any =
        await webInformationClient.handleGetWebInformation("7");
      const MenuEN: any = await webInformationClient.handleGetWebInformation(
        "5"
      );
      const FooterEN: any = await webInformationClient.handleGetWebInformation(
        "3"
      );
      const ContactEN: any = await webInformationClient.handleGetWebInformation(
        "13"
      );
      const ListProduct: any = await handleProductsClient.handleGetHighlight();
      try {
        const dataPages = JSON.parse(DatapageEN.value);
        if (dataPages.dataProduct && dataPages.dataProduct.length > 0) {
          const promises = dataPages.dataProduct.map(async (item: any) => {
            if (item.value) {
              const body = {
                categoryId: item.value,
                language: "VI",
                page: 1,
                size: 20,
                productName: "",
              };
              const apiData: any =
                await handleProductsClient.getProductsByCategoryID(body);
              return apiData.data;
            }
          });

          const resultArray = await Promise.all(promises);
          return {
            props: {
              dataPages: JSON.parse(DatapageEN.value) || {},
              dataMenu: JSON.parse(MenuEN.value) || {},
              dataFooter: JSON.parse(FooterEN.value) || {},
              dataContact: JSON.parse(ContactEN.value) || {},
              dataProductHighlight: ListProduct.data?.products,
              dataListProducts: resultArray,
            },
          };
        }
      } catch (e) {
        // Xử lý lỗi
      }
      if (ListProduct.meta?.status === 200) {
        return {
          props: {
            dataPages: JSON.parse(DatapageEN.value) || {},
            dataMenu: JSON.parse(MenuEN.value) || {},
            dataFooter: JSON.parse(FooterEN.value) || {},
            dataContact: JSON.parse(ContactEN.value) || {},
            dataProductHighlight: ListProduct.data?.products,
            dataListProducts: null,
          },
        };
      }
      return {
        props: {
          dataPages: JSON.parse(DatapageEN.value) || {},
          dataMenu: JSON.parse(MenuEN.value) || {},
          dataFooter: JSON.parse(FooterEN.value) || {},
          dataContact: JSON.parse(ContactEN.value) || {},
          dataProductHighlight: null,
          dataListProducts: null,
        },
      };
    } else {
      const DatapageVI: any =
        await webInformationClient.handleGetWebInformation("6");
      const MenuVI: any = await webInformationClient.handleGetWebInformation(
        "4"
      );
      const FooterVI: any = await webInformationClient.handleGetWebInformation(
        "2"
      );
      const ContactVI: any = await webInformationClient.handleGetWebInformation(
        "12"
      );
      const ListProduct: any = await handleProductsClient.handleGetHighlight();
      try {
        const dataPages = JSON.parse(DatapageVI.value);
        if (dataPages.dataProduct && dataPages.dataProduct.length > 0) {
          const promises = dataPages.dataProduct.map(async (item: any) => {
            if (item.value) {
              const body = {
                categoryId: item.value,
                language: "VI",
                page: 1,
                size: 20,
                productName: "",
              };
              console.log(body, "body");
              const apiData: any =
                await handleProductsClient.getProductsByCategoryID(body);
              return apiData.data;
            }
          });

          const resultArray = await Promise.all(promises);
          return {
            props: {
              dataPages: JSON.parse(DatapageVI.value) || {},
              dataMenu: JSON.parse(MenuVI.value) || {},
              dataFooter: JSON.parse(FooterVI.value) || {},
              dataContact: JSON.parse(ContactVI.value) || {},
              dataProductHighlight: ListProduct.data?.products,
              dataListProducts: resultArray,
            },
          };
        }
      } catch (e) {
        // Xử lý lỗi
        console.log("lol");
      }

      if (ListProduct.meta?.status === 200) {
        return {
          props: {
            dataPages: JSON.parse(DatapageVI.value) || {},
            dataMenu: JSON.parse(MenuVI.value) || {},
            dataFooter: JSON.parse(FooterVI.value) || {},
            dataContact: JSON.parse(ContactVI.value) || {},
            dataProductHighlight: ListProduct.data?.products,
            dataListProducts: null,
          },
        };
      }
      return {
        props: {
          dataPages: JSON.parse(DatapageVI.value) || {},
          dataMenu: JSON.parse(MenuVI.value) || {},
          dataFooter: JSON.parse(FooterVI.value) || {},
          dataContact: JSON.parse(ContactVI.value) || {},
          dataProductHighlight: null,
          dataListProducts: null,
        },
      };
    }
  } catch (e) {
    return { props: {} };
  }
}
export default Home;
