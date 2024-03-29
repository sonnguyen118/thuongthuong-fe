import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { store } from "@store";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";
import HeadSEO from "@components/layouts/header/HeadSEO";
import Layout from "@components/layouts/layout/LayoutClient";
import { NavigationTopBar } from "@components/elements/navigation";
import { CkeditorDisable } from "@components/molecules/ckeditor";
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

interface NavigationProps {
  id: number;
  title: string;
  link: string;
}

interface pagesProps {
  dataPages: any;
  dataMenu: any;
  dataFooter: any;
}
const RecruitmentPage: React.FC<pagesProps> = (props: pagesProps) => {
  const { dataPages, dataMenu, dataFooter } = props;
  const [t, setText] = useState(viText);
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  );
  const pageSEOData: PageSEOData = {
    name: "Thương Thương",
    pageSEO: {
      title: "Tuyển Dụng | Thương Thương",
      url: "https://www.critistudio.top/gioi-thieu",
      keywords: "website",
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
      title: `${t.navigator.MENU3}`,
      link: "/",
    },
  ];
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/`;
  const image = "";
  return (
    <>
      <HeadSEO pageSEO={pageSEOData.pageSEO} url={url} image={image} />
      <Layout dataMenu={dataMenu} dataFooter={dataFooter}>
        <div className="list-products">
          <div
            className="list-products-navigation"
            style={{ marginBottom: 30 }}
          >
            <NavigationTopBar data={dataNavigation} />
          </div>
          <div>{dataPages && <CkeditorDisable data={dataPages} />}</div>
        </div>
      </Layout>
    </>
  );
};

export async function getServerSideProps(context: any) {
  try {
    const lang = context.query.lang;
    if (lang === "en") {
      const DatapageEN: any =
        await webInformationClient.handleGetWebInformation("11");
      const MenuEN: any = await webInformationClient.handleGetWebInformation(
        "5"
      );
      const FooterEN: any = await webInformationClient.handleGetWebInformation(
        "3"
      );
      return {
        props: {
          dataPages: JSON.parse(DatapageEN.value) || {},
          dataMenu: JSON.parse(MenuEN.value) || {},
          dataFooter: JSON.parse(FooterEN.value) || {},
        },
      };
    } else {
      const DatapageVI: any =
        await webInformationClient.handleGetWebInformation("10");
      const MenuVI: any = await webInformationClient.handleGetWebInformation(
        "4"
      );
      const FooterVI: any = await webInformationClient.handleGetWebInformation(
        "2"
      );
      return {
        props: {
          dataPages: JSON.parse(DatapageVI.value) || {},
          dataMenu: JSON.parse(MenuVI.value) || {},
          dataFooter: JSON.parse(FooterVI.value) || {},
        },
      };
    }
  } catch (e) {
    return { props: {} };
  }
}

export default RecruitmentPage;
