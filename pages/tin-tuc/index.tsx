import React, { useState, useEffect } from 'react'
import HeadSEO from '@components/layouts/header/HeadSEO'
import Layout from '@components/layouts/layout/LayoutClient'
import { CardPageNews } from '@components/elements/card'
import { Pagination, Input } from 'antd'
import { NavigationTopBar } from '@components/elements/navigation'
import { useSelector } from 'react-redux'
import { store } from '@store'
import viText from '@languages/vie.json'
import loadLanguageText from '@languages'
import { TIN_TUC } from 'src/constant/link-master'
import { PaginationDto } from '@components/model/PaginationDto'
import { PAGE_SIZE } from 'src/constant/constant'
import { GetServerSideProps } from 'next'
import * as cookie from 'cookie'
import { articleClient } from '@api'
import { useRouter } from 'next/router'
const { Search } = Input
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

export const getServerSideProps: GetServerSideProps = async context => {
  try {
    const page = 1
    const size = 20
    const cookieValue = cookie.parse(context.req.headers.cookie as string)
    const language = cookieValue['language']
    const data = await articleClient
      .getArticleClient(language, page, size)
      .then(res => res.data.data)
    const articles = data.articles
    let pagination = data.pagination
    return { props: { articles, pagination } }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
const ListNews: React.FC<any> = props => {
  const router = useRouter()
  const { id, language } = router.query
  const [t, setText] = useState(viText)
  const [articles, setArticles] = useState<listNewsData[]>([])
  const [pagination, setPagination] = useState<PaginationDto>(
    new PaginationDto()
  )

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [articleSearchName, setArticleSearchName] = useState<any>(null)

  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  )
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
  useEffect(() => {
    loadLanguageText(lang, setText)
    getAllArticles(props)
  }, [lang, language])

  const getAllArticles = async (props: any) => {
    const articles = props.articles
    const paging = props.pagination
    setPageSize(paging.page)
    setPageSize(paging.size)
    setTotal(paging.totalRecords)
    const listNewsData: listNewsData[] = articles?.map((article: any) => ({
      id: article.id,
      title: article.name,
      image: article.imageUrl
        ? `${process.env.NEXT_PUBLIC_FULL_URL}/${article.imageUrl}`
        : '', // Thêm logic để lấy đường dẫn hình ảnh từ article nếu có
      descriptions: article.descriptions ? article.descriptions : '',
      time: article.createdAt ? article.createdAt : '', // Thêm logic để lấy thông tin thời gian từ article nếu có
      link: `${TIN_TUC}${article.link}`
    }))
    setArticles(listNewsData)
    setPagination(paging)
  }
  const pagingList = async (
    lang: string,
    page: number,
    pageSize: number,
    searchName: string
  ) => {
    const data = await articleClient
      .getArticleClient(lang, page, pageSize, searchName)
      .then(res => res.data.data)
    await getAllArticles(data)
  }
  const onChangePagination = async (_page: number, _pageSize: number) => {
    if (_pageSize != pageSize) {
      _page = 1
      await pagingList(lang, _page, _pageSize, articleSearchName)
    }
    if (_page != page) {
      await pagingList(lang, _page, _pageSize, articleSearchName)
    }
    setPage(_page)
    setPageSize(_pageSize)
  }
  const searchArticles = async (value: any) => {
    setArticleSearchName(value)
    pagingList(lang, 1, pagination.size, value)
  }

  return (
    <>
      <HeadSEO pageSEO={pageSEOData.pageSEO} />
      <Layout>
        <div className='list-products'>
          <div className='list-products-navigation'>
            <NavigationTopBar data={dataNavigation} />
          </div>
          <div style={{ marginTop: '20px' }}>
            <Search
              placeholder={lang.toUpperCase() == 'VI' ? `Tìm kiếm` : `Search`}
              onSearch={value => searchArticles(value)}
              style={{ width: 200 }}
            />
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
          showTotal={total =>
            lang.toUpperCase() == 'VI'
              ? `Tổng ${total} tin tức`
              : `Total news ${total}`
          }
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
