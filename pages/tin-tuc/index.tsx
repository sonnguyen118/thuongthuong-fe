import React, { useState, useEffect } from "react";
import HeadSEO from "@components/layouts/header/HeadSEO";
import Layout from "@components/layouts/layout/LayoutClient";
import { CardPageNews } from "@components/elements/card";
import { Pagination, Input } from "antd";
import { NavigationTopBar } from "@components/elements/navigation";
import { useSelector } from "react-redux";
import { store } from "@store";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";
import { TIN_TUC } from "src/constant/link-master";
import { PaginationDto } from "@components/model/PaginationDto";
import { PAGE_SIZE } from "src/constant/constant";
import * as cookie from "cookie";
import { articleClient } from "@api";
import { useRouter } from "next/router";
import { webInformationClient } from "@service";
import { DateTime } from "@utils/Functions";

const { Search } = Input;

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
  name: string;
  title: string;
  imageUrl: string;
  description: string;
  link: string;
  createdAt: string;
}
interface NavigationProps {
  id: number;
  title: string;
  link: string;
}

interface pagesProps {
  dataMenu: any;
  dataFooter: any;
  articles: listNewsData[];
  pagination: PaginationDto;
}
const ListNews: React.FC<pagesProps> = (props: pagesProps) => {
  const { dataMenu, dataFooter, articles, pagination } = props;
  const router = useRouter();
  const { id, language } = router.query;
  const [t, setText] = useState(viText);
  const [leng, setLeng] = useState<any>("VI");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [articleSearchName, setArticleSearchName] = useState<any>(null);

  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  );
  const pageSEOData: PageSEOData = {
    name: "Thương Thương",
    pageSEO: {
      title: "Tin Tức | Thương Thương",
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
      title: `${t.navigator.MENU1}`,
      link: "/",
    },
  ];
  useEffect(() => {
    const lang = localStorage.getItem("lang");
    setLeng(lang);
    if (lang) {
      loadLanguageText(lang, setText);
    } else {
      loadLanguageText("vi", setText);
    }
    getAllArticles(props);
  }, []);
  // useEffect(() => {
  //   loadLanguageText(lang, setText);
  //   getAllArticles(props);
  // }, [lang, language]);

  const getAllArticles = async (props: any) => {
    const articles = props.articles;
    const paging = props.pagination;
    setPageSize(paging.page);
    setPageSize(paging.size);
    setTotal(paging.totalRecords);
    const listNewsData: listNewsData[] = articles?.map((article: any) => ({
      id: article.id,
      title: article.name,
      image: article.imageUrl
        ? `${process.env.NEXT_PUBLIC_FULL_URL}/${article.imageUrl}`
        : "", // Thêm logic để lấy đường dẫn hình ảnh từ article nếu có
      descriptions: article.descriptions ? article.descriptions : "",
      time: article.createdAt ? article.createdAt : "", // Thêm logic để lấy thông tin thời gian từ article nếu có
      link: `${TIN_TUC}${article.link}`,
    }));
    // setArticles(listNewsData)
    // setPagination(paging)
  };
  const pagingList = async (
    lang: string,
    page: number,
    pageSize: number,
    searchName: string
  ) => {
    const data = await articleClient
      .getArticleClient(lang, page, pageSize, searchName)
      .then((res) => res.data.data);
    await getAllArticles(data);
  };
  const onChangePagination = async (_page: number, _pageSize: number) => {
    if (_pageSize != pageSize) {
      _page = 1;
      await pagingList(lang, _page, _pageSize, articleSearchName);
    }
    if (_page != page) {
      await pagingList(lang, _page, _pageSize, articleSearchName);
    }
    setPage(_page);
    setPageSize(_pageSize);
  };
  const searchArticles = async (value: any) => {
    setArticleSearchName(value);
    pagingList(lang, 1, pagination.size, value);
  };
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/`;
  const image = "";
  return (
    <>
      <HeadSEO pageSEO={pageSEOData.pageSEO} url={url} image={image} />
      <Layout dataMenu={dataMenu} dataFooter={dataFooter}>
        <div className="list-products">
          <div className="list-products-navigation">
            <NavigationTopBar data={dataNavigation} />
          </div>
        </div>
        <div className="list-news">
          {articles.map((data, index) => (
            <div className="list-news-item" key={data.id}>
              <CardPageNews
                title={data.name}
                description={data.description}
                imageSrc={process.env.NEXT_PUBLIC_API_URL + "/" + data.imageUrl}
                link={data.link}
                time={DateTime.formatDateTime(data.createdAt, leng)}
              />
            </div>
          ))}
        </div>
        <Pagination
          total={total}
          current={page}
          pageSize={pageSize}
          // pageSizeOptions={PAGE_SIZE}
          showPrevNextJumpers
          // showSizeChanger
          onChange={onChangePagination}
          onShowSizeChange={onChangePagination}
          className="list-news-pagination"
        />
      </Layout>
    </>
  );
};

export async function getServerSideProps(context: any) {
  try {
    const page = 1;
    const size = 20;
    const lang = context.query.lang;
    if (lang === "en") {
      const data = await articleClient
        .getArticleClient("EN", page, size)
        .then((res) => res.data.data);
      const articles = data.articles;
      let pagination = data.pagination;
      const MenuEN: any = await webInformationClient.handleGetWebInformation(
        "5"
      );
      const FooterEN: any = await webInformationClient.handleGetWebInformation(
        "3"
      );
      return {
        props: {
          dataMenu: JSON.parse(MenuEN.value) || {},
          dataFooter: JSON.parse(FooterEN.value) || {},
          articles: articles,
          pagination: pagination,
        },
      };
    } else {
      const data = await articleClient
        .getArticleClient("VI", page, size)
        .then((res) => res.data.data);
      const articles = data.articles;
      let pagination = data.pagination;
      const MenuVI: any = await webInformationClient.handleGetWebInformation(
        "4"
      );
      const FooterVI: any = await webInformationClient.handleGetWebInformation(
        "2"
      );
      return {
        props: {
          dataMenu: JSON.parse(MenuVI.value) || {},
          dataFooter: JSON.parse(FooterVI.value) || {},
          articles: articles,
          pagination: pagination,
        },
      };
    }
  } catch (e) {
    return { props: {} };
  }
}
export default ListNews;
