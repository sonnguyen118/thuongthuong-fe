import React, { useState, useEffect } from 'react'
import HeadSEO from '@components/layouts/header/HeadSEO'
import Layout from '@components/layouts/layout/LayoutClient'
import { CardPageNews } from '@components/elements/card'
import { Pagination } from 'antd'
import { NavigationTopBar } from '@components/elements/navigation'
import { useSelector } from 'react-redux'
import { store } from '@store'
import viText from '@languages/vie.json'
import loadLanguageText from '@languages'
import axios from 'axios'
import { SEARCH_ARTICLES_ENDPOINT } from '@api/endpoint'
import { TIN_TUC } from 'src/constant/link-master'
import { PaginationDto } from '@components/model/PaginationDto'
import { PAGE_SIZE } from 'src/constant/constant'

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

interface listNewsData {
  id: number
  title: string
  image: string
  descriptions: string
  time: string
  link: string
}
interface NavigationProps {
  id: number
  title: string
  link: string
}
const ListNews: React.FC = () => {
  const [t, setText] = useState(viText)
  const [articles, setArticles] = useState<listNewsData[]>([])
  const [pagination, setPagination] = useState<PaginationDto>(
    new PaginationDto()
  )
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)

  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  )
  useEffect(() => {
    console.log('text1')
    loadLanguageText(lang, setText)
    getAllArticles()
  }, [lang])
  useEffect(() => {
    loadLanguageText(lang, setText)
    getAllArticles()
  }, [])
  useEffect(() => {
    loadLanguageText(lang, setText)
    getAllArticles()
  }, [page, pageSize])
  const pageSEOData: PageSEOData = {
    name: 'Thương Thương',
    pageSEO: {
      title: 'Tin Tức | Thương Thương',
      url: 'https://www.critistudio.top/gioi-thieu',
      keywords: ['website', 'home', 'page'],
      description:
        'Thuong Thuong tổ chức đào tạo nghề cho đối tượng người khuyết tật và người yếu thế nhằm giảm gánh nặng cho gia đình và xã hội.',
      image: 'https://www.critistudio.top/images/seo.jpg'
    }
  }
  const getAllArticles = async () => {
    const res = await axios.post(SEARCH_ARTICLES_ENDPOINT, {
      language: lang,
      page: page,
      size: pageSize
    })
    const articles = res?.data?.data?.articles
    const paging = res?.data?.data?.pagination
    setPageSize(paging.page)
    setPageSize(paging.size)
    setTotal(paging.totalRecords)

    const listNewsData: listNewsData[] = articles?.map((article: any) => ({
      id: article.id,
      title: article.name,
      image: article.imageUrl ? article.imageUrl : '', // Thêm logic để lấy đường dẫn hình ảnh từ article nếu có
      descriptions: article.descriptions ? article.descriptions : '',
      time: article.createdAt ? article.createdAt : '', // Thêm logic để lấy thông tin thời gian từ article nếu có
      link: `${TIN_TUC}${article.link}`
    }))
    setArticles(listNewsData)
    setPagination(paging)
  }
  const onChangePagination = async (_current: number, _pageSize: number) => {
    if (_pageSize != pageSize) {
      _current = 1
    }
    setPage(_current)
    setPageSize(_pageSize)
  }
  const dataNavigation: NavigationProps[] = [
    {
      id: 1,
      title: `${t.navigator.HOME}`,
      link: '/'
    },
    {
      id: 2,
      title: `${t.navigator.MENU1}`,
      link: '/'
    }
  ]
  const dataNews: listNewsData[] = [
    {
      id: 1,
      title: `${t.list_news.TITLE}`,
      image: '/images/seo.jpg',
      descriptions: `${t.list_news.DESCRIPTION}`,
      link: '/tin-tuc/tin-tuc-test',
      time: `${t.list_news.TIME}`
    }
  ]

  return (
    <>
      <HeadSEO pageSEO={pageSEOData.pageSEO} />
      <Layout>
        <div className='list-products'>
          <div className='list-products-navigation'>
            <NavigationTopBar data={dataNavigation} />
          </div>
        </div>
        <div className='list-news'>
          {articles.map((data, index) => (
            <div className='list-news-item' key={data.id}>
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
          total={total}
          showTotal={total => `Tổng ${total} bài viết`}
          current={page}
          pageSize={pageSize}
          pageSizeOptions={PAGE_SIZE}
          showPrevNextJumpers
          showSizeChanger
          onChange={onChangePagination}
          onShowSizeChange={onChangePagination}
          className='list-news-pagination'
        />
      </Layout>
    </>
  )
}

export default ListNews
