import React, { useState, useEffect } from 'react'
import HeadSEO from '@components/layouts/header/HeadSEO'
import Layout from '@components/layouts/layout/LayoutClient'
import { NavigationTopBar } from '@components/elements/navigation'
import { ListCategory, ListProducts } from '@components/templates/listproducts'
import { useSelector } from 'react-redux'
import { store } from '@store'
import viText from '@languages/vie.json'
import loadLanguageText from '@languages'
import { useRouter } from 'next/router'
import axios from 'axios'
import { GET_CATEGORIES_ENDPOINT, GET_PRODUCTS_ENDPOINT } from '@api/endpoint'
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

interface Product {
  id: number
  name: string
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
  const router = useRouter()
  const { id } = router.query
  const [categories, setCategories] = useState(null)
  const [products, setProducts] = useState(null)
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
      title: `Sản phẩm`,
      link: `${SAN_PHAM}`
    },
    {
      id: 3,
      title: `${t.navigator.MENU2}`,
      link: `${SAN_PHAM}`
    }
  ]
  const [dataNavigation, setDataNavigation] =
    useState<NavigationProps[]>(initDataNavigation)

  useEffect(() => {
    if (!categories) {
      getCategories()
    }
    getProducts()
  }, [id])
  const getCategories = async () => {
    const res = await axios.get(`${GET_CATEGORIES_ENDPOINT}?language=${lang}`)
    setCategories(res.data.data)
  }
  const getProducts = async () => {
    const res = await axios.post(GET_PRODUCTS_ENDPOINT, {
      categoryLink: id,
      language: lang,
      page: 1,
      size: 2
    })
    const data = res.data.data
    setProducts(data)
    initDataNavigation[2].link = data?.category?.link ? data?.category.link : ''
    initDataNavigation[2].title = data?.category?.name
      ? data?.category.name
      : ''
    setDataNavigation(initDataNavigation)
  }

  useEffect(() => {
    loadLanguageText(lang, setText)
  }, [lang])
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

  return (
    <>
      <HeadSEO pageSEO={pageSEOData.pageSEO} />
      <Layout>
        <div className='list-products'>
          <div className='list-products-navigation'>
            <NavigationTopBar data={dataNavigation} />
          </div>
          <div className='list-products-wrap'>
            <ListCategory data={categories} />
            <ListProducts data={products} />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default ListNews
