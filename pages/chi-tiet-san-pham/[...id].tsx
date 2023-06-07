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
import { productClient } from '@api'
import { bread_crumb } from 'src/constant/constant'

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

export async function getServerSideProps ({
  params,
  query
}: {
  params: any
  query: any
}) {
  const { id } = params
  let { language } = query
  language = language == undefined ? 'VI' : language
  const product = await productClient
    .getDetailProduct(id, language)
    .then(res => res.data.data)
  // Pass data to the page via props
  return {
    props: { product, id }
  }
}

const ListNews: React.FC<any> = props => {
  const router = useRouter()
  const { id, language } = router.query
  const [t, setText] = useState(viText)
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  )
  const initDataNavigation: NavigationProps[] = [
    {
      id: 1,
      title: `${t.navigator.HOME}`,
      link: '/'
    },
    {
      id: 2,
      title: `${t.menu.MENU4}`,
      link: `${SAN_PHAM}?language=${lang}`
    }
  ]
  const [dataNavigation, setDataNavigation] =
    useState<NavigationProps[]>(initDataNavigation)
  const [productDetail, setProductDetail] = useState()

  useEffect(() => {
    loadLanguageText(lang, setText)
    getProductDetail()
    setBreadCrumb()
  }, [lang, language, id])

  const setBreadCrumb = async () => {
    const languageFromURL = language?.toString().toUpperCase()
    if (languageFromURL == 'VI') {
      initDataNavigation[0].title = bread_crumb.home.VI
      initDataNavigation[1].title = bread_crumb.product.VI
    }
    if (languageFromURL == 'EN') {
      initDataNavigation[0].title = bread_crumb.home.EN
      initDataNavigation[1].title = bread_crumb.product.EN
    }
    const detailProduct = props.product
    const danhMuc1 = {
      id: 3,
      title: `${detailProduct.danhMuc1.name}`,
      link: `${SAN_PHAM}${detailProduct.danhMuc1.link}?language=${lang}`
    }
    initDataNavigation.push(danhMuc1)
    if (detailProduct.danhMuc2) {
      const danhMuc2 = {
        id: 4,
        title: `${detailProduct.danhMuc2.name}`,
        link: `${SAN_PHAM}${detailProduct.danhMuc2.link}?language=${lang}`
      }
      initDataNavigation.push(danhMuc2)
    }
    const product = {
      id: 5,
      title: `${detailProduct.name}`,
      link: `${detailProduct.link}?language=${lang}`
    }
    initDataNavigation.push(product)
    console.log(initDataNavigation)
    setDataNavigation(initDataNavigation)
  }
  const getProductDetail = async () => {
    setProductDetail(props.product)
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
