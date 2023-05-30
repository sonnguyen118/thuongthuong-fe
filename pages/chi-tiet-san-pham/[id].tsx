import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { store } from '@store'
import viText from '@languages/vie.json'
import loadLanguageText from '@languages'
import HeadSEO from '@components/layouts/header/HeadSEO'
import Layout from '@components/layouts/layout/LayoutClient'
import { NavigationTopBar } from '@components/elements/navigation'
import {
  ProductsDetails,
  ProductsSeems,
  ProductsContent
} from '@components/templates/products'
import { useRouter } from 'next/router'
import axios from 'axios'
import { GET_PRODUCTS_DETAIL_ENDPOINT } from '@api/endpoint'
import { SAN_PHAM } from 'src/constant/link-master'

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

const ListNews: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const [t, setText] = useState(viText)
  const initDataNavigation: NavigationProps[] = [
    {
      id: 1,
      title: `${t.navigator.HOME}`,
      link: '/'
    },
    {
      id: 2,
      title: `Sản phẩm`,
      link: `${SAN_PHAM}`
    },
    {
      id: 3,
      title: ``,
      link: '/'
    }
  ]
  const [dataNavigation, setDataNavigation] =
    useState<NavigationProps[]>(initDataNavigation)

  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  )
  const [productDetail, setProductDetail] = useState()

  useEffect(() => {
    loadLanguageText(lang, setText)
    if (id) {
      getProductDetail()
    }
  }, [lang, id])

  const getProductDetail = async () => {
    const res = await axios.post(GET_PRODUCTS_DETAIL_ENDPOINT, {
      language: lang,
      productLink: `/${id}`
    })
    setProductDetail(res.data.data)
    initDataNavigation[2].title = res.data.data.category.name
    initDataNavigation[2].link = res.data.data.category.link
    setDataNavigation(initDataNavigation)
  }

  const pageSEOData: PageSEOData = {
    name: 'Thương Thương',
    pageSEO: {
      title: 'Tranh cuốn giấy | Thương Thương',
      url: 'https://www.critistudio.top/gioi-thieu',
      keywords: ['website', 'home', 'page'],
      description:
        'Thuong Thuong tổ chức đào tạo nghề cho đối tượng người khuyết tật và người yếu thế nhằm giảm gánh nặng cho gia đình và xã hội.',
      image: 'https://www.critistudio.top/images/seo.jpg'
    }
  }

  return (
    <>
      <HeadSEO pageSEO={pageSEOData.pageSEO} />
      <Layout>
        <div className='list-products'>
          <div className='list-products-navigation'>
            <NavigationTopBar data={dataNavigation} />
          </div>
          <div className='list-products-wrap'>
            <ProductsDetails data={productDetail} />
          </div>
          <ProductsSeems title={t.products.HEADER1} />
          {/* <ProductsContent /> */}
          <ProductsSeems title={t.products.HEADER3} />
        </div>
      </Layout>
    </>
  )
}

export default ListNews
