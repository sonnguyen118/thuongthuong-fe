import React, { useState, useEffect } from 'react'
import HeadSEO from '@components/layouts/header/HeadSEO'
import Layout from '@components/layouts/layout/LayoutClient'
import { NavigationTopBar } from '@components/elements/navigation'
import { CkeditorDisable } from '@components/molecules/ckeditor'
import { ShareAltOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Dropdown } from 'antd'
import { useSelector } from 'react-redux'
import { store } from '@store'
import viText from '@languages/vie.json'
import loadLanguageText from '@languages'
import { useRouter } from 'next/router'
import * as cookie from 'cookie'
import { articleClient } from '@api'
import { webInformationClient } from "@service";
import { DateTime } from "@utils/Functions";

import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  ViberShareButton,
  ViberIcon,
  WhatsappShareButton,
  WhatsappIcon
} from "react-share";


interface PageSEOData {
  name: string
  pageSEO: {
    title: string
    url: string
    keywords: string[]
    description: string
    image: string
  }
}

interface NavigationProps {
  id: number
  title: string
  link: string
}

class ArticleDetail {
  title: string = ''
  image: string = ''
  createdAt: string = ''
  content: string = ''
  description: string = ''
  breadCrumb: any[] = []
}
interface pagesProps {
  dataMenu: any;
  dataFooter: any;
  article: any;
}
const DetailNews: React.FC<pagesProps> = (props: pagesProps) => {
  const { dataMenu, dataFooter, article } = props;
  const router = useRouter();
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  console.log(article , "article");
  const { id, language } = router.query;
  const [t, setText] = useState(viText)
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  )
  const [articleDetail, setArticleDetail] = useState<ArticleDetail>(
    new ArticleDetail()
  )
  const pageSEOData: PageSEOData = {
    name: 'Thương Thương',
    pageSEO: {
      title: 'Tin Tức Nổi Bật | Thương Thương',
      url: 'https://www.critistudio.top/gioi-thieu',
      keywords: ['website', 'home', 'page'],
      description:
        'Thuong Thuong tổ chức đào tạo nghề cho đối tượng người khuyết tật và người yếu thế nhằm giảm gánh nặng cho gia đình và xã hội.',
      image: 'https://www.critistudio.top/images/seo.jpg'
    }
  }

  let initDataNavigation: NavigationProps[] = [
    {
      id: 1,
      title: `${t.navigator.HOME}`,
      link: '/'
    },
    {
      id: 2,
      title: `${t.navigator.MENU7}`,
      link: '/tin-tuc'
    }
  ]
  const [dataNavigation, setDataNavigation] =
    useState<NavigationProps[]>(initDataNavigation)

  useEffect(() => {
    loadLanguageText(lang, setText)
    getArticleDetail()
  }, [id, lang, language])

  const getArticleDetail = async () => {
    const data = props.article
    const detail: ArticleDetail = {
      title: data?.name,
      image: data?.image,
      content: data?.content,
      description: data?.description,
      createdAt: data?.createdAt,
      breadCrumb: data?.breadCrumb
    }
    setArticleDetail(detail)
    setBreadCrumb(detail)
  }
  const setBreadCrumb = async (detail: ArticleDetail) => {
    // if (detail?.breadCrumb) {
    //   const breadCrumb = detail?.breadCrumb.map(obj => {
    //     return { id: obj.id, link: `/tin-tuc${obj.link}`, title: obj.menu }
    //   })
    //   initDataNavigation = [...dataNavigation, ...breadCrumb]
    // }
    const artBreadCrumb = {
      id: 10,
      link: '',
      title: detail.title
    }
    initDataNavigation.push(artBreadCrumb)
    setDataNavigation(initDataNavigation)
  }
  const [isShare, setIsShare] = useState<boolean>(false);
  const handleOnShare =() => {
    setIsShare(!isShare);
    const icon = document.querySelector('.icon');
    if (icon instanceof HTMLElement) {
      icon.classList.toggle('dis');
      if (icon.classList.contains('dis')) {
        icon.style.animation = 'fade-out 0.6s linear';
      } else {
        icon.style.animation = 'fade-in 0.6s linear';
      }
    }

  }
  return (
    <>
      <HeadSEO pageSEO={pageSEOData.pageSEO} />
      <Layout dataMenu={dataMenu} dataFooter={dataFooter}>
        <div className='news'>
          <div className='news-navigation'>
            <NavigationTopBar data={dataNavigation} />
            <div className='news-navigation-time'>
              {DateTime.formatDateTime(articleDetail.createdAt)}
            </div>
          </div>
          <div className='news-wrap'>
            <h1 className='news-wrap-title'>{articleDetail.title}</h1>
            <div className='news-wrap-information'>
              <span className='news-wrap-information-text'>
                {t.news.MENU}:
                <span className='news-wrap-information-text-hightline'>
                  {t.news.SUB1}
                </span>{' '}
                |{' '}
                <span className='news-wrap-information-text-hightline'>
                  {t.news.SUB2}
                </span>
              </span>
              <div className="news-wrap-information-share">
              <div className={isShare ? "icon news-wrap-information-share-icon": "icon news-wrap-information-share-icon-dis dis"}>
              <FacebookShareButton url={currentUrl} className="news-wrap-information-share-icon-item">
                <FacebookIcon size={32} round={true} />
              </FacebookShareButton>
              <LinkedinShareButton url={currentUrl} className="news-wrap-information-share-icon-item">
                <LinkedinIcon size={32} round={true} />
              </LinkedinShareButton>

              <TelegramShareButton url={currentUrl} className="news-wrap-information-share-icon-item">
                <TelegramIcon size={32} round={true} />
              </TelegramShareButton>

              <TwitterShareButton url={currentUrl} className="news-wrap-information-share-icon-item">
                <TwitterIcon size={32} round={true} />
              </TwitterShareButton>
              <ViberShareButton url={currentUrl} className="news-wrap-information-share-icon-item">
                <ViberIcon size={32} round={true} />
              </ViberShareButton>
              <WhatsappShareButton url={currentUrl} className="news-wrap-information-share-icon-item">
                <WhatsappIcon size={32} round={true} />
              </WhatsappShareButton>
              </div>
              <Button type='primary' className='news-wrap-information-btn' onClick={handleOnShare}>
                {isShare ? <CloseOutlined />: <PlusOutlined />} {t.button.BUTTON7}
              </Button>
              </div>
            </div>
            <h3 className='news-wrap-description'>
              {articleDetail.description}
            </h3>
            <CkeditorDisable data={articleDetail.content} />
          </div>
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context: any) {
  try {
    const lang = context.query.lang
    const { id } = context.query
    if(lang === 'en') {
    const article = await articleClient
      .getArticleDetail("EN", id as string)
      .then(res => res.data.data);

    const MenuEN : any = await  webInformationClient.handleGetWebInformation("5");
    const FooterEN:any = await webInformationClient.handleGetWebInformation("3");
    return {
      props: {
        dataMenu:  JSON.parse(MenuEN.value) || {},
        dataFooter: JSON.parse(FooterEN.value) || {},
        article: article
      },
    };
  } else {
    const article = await articleClient
      .getArticleDetail("VI", id as string)
      .then(res => res.data.data);

    const MenuVI : any = await  webInformationClient.handleGetWebInformation("4");
    const FooterVI:any = await webInformationClient.handleGetWebInformation("2");
    return {
      props: {
        dataMenu:  JSON.parse(MenuVI.value) || {},
        dataFooter: JSON.parse(FooterVI.value) || {},
        article: article
      },
    };
  }

  } catch (e) {
    return { props: {} };
  }
}

export default DetailNews
