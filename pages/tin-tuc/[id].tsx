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
import axios from 'axios'
import { GET_ARTICLE_DETAIL_ENDPOINT } from '@api/endpoint'
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
}

const ListNews: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const [t, setText] = useState(viText)
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  )
  const [articleDetail, setArticleDetail] = useState<ArticleDetail>(
    new ArticleDetail()
  )

  useEffect(() => {
    loadLanguageText(lang, setText)
    if (id) {
      getArticleDetail()
    }
    console.log('danh sach tin tuc')
  }, [id, lang])

  const getArticleDetail = async () => {
    const res = await axios.post(GET_ARTICLE_DETAIL_ENDPOINT, {
      link: `/${id}`,
      language: lang,
    })
    const data = res?.data?.data

    const detail: ArticleDetail = {
      title: data?.name,
      image: data?.image,
      content: data?.content,
      description: data?.description,
      createdAt: data?.createdAt
    }
    setArticleDetail(detail)
  }
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
  const dataNavigation: NavigationProps[] = [
    {
      id: 1,
      title: `${t.navigator.HOME}`,
      link: '/'
    },
    {
      id: 2,
      title: `${t.navigator.MENU7}`,
      link: '/tin-tuc/danh-sach?trang=1'
    },
    {
      id: 3,
      title: `${t.navigator.MENU8}`,
      link: `/tin-tuc/${id}`
    }
  ]

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
