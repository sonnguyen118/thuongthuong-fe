import React, { useState, useEffect } from 'react'
import HeadSEO from '@components/layouts/header/HeadSEO'
import Layout from '@components/layouts/layout/LayoutClient'
import { NavigationTopBar } from '@components/elements/navigation'
import { ProductsContent } from '@components/templates/products'
import { CkeditorDisable } from '@components/molecules/ckeditor'
import { ShareAltOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useSelector } from 'react-redux'
import { store } from '@store'
import viText from '@languages/vie.json'
import loadLanguageText from '@languages'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import * as cookie from 'cookie'
import { articleClient } from '@api'
import { useCookies } from 'react-cookie'

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
export const getServerSideProps: GetServerSideProps = async context => {
  const cookieValue = cookie.parse(context.req.headers.cookie as string)
  let language = cookieValue['language']
  const { id } = context.query
  const article = await articleClient
    .getArticleDetail(language, id as string)
    .then(res => res.data.data)
  return { props: { article } }
}

const ListNews: React.FC<any> = props => {
  const router = useRouter()
  const { id, language } = router.query
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

  return (
    <>
      <HeadSEO pageSEO={pageSEOData.pageSEO} />
      <Layout>
        <div className='news'>
          <div className='news-navigation'>
            <NavigationTopBar data={dataNavigation} />
            <div className='news-navigation-time'>
              {articleDetail.createdAt}
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
              <Button type='primary' className='news-wrap-information-btn'>
                <ShareAltOutlined /> {t.button.BUTTON7}
              </Button>
            </div>
            <CkeditorDisable data={articleDetail.content} />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default ListNews
