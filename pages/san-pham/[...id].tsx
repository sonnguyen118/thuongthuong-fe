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
import { SAN_PHAM } from 'src/constant/link-master'
import { categoryClient, productClient } from '@api'
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

export async function getServerSideProps ({
  params,
  query
}: {
  params: any
  query: any
}) {
  const { id } = params
  let { language } = query

  const page = 1
  const size = 20
  const categories = await categoryClient
    .getAllCategoryClient(language, page, size)
    .then(res => res.data.data)
  const products = await getProductsByCategory(
    id.join('/'),
    language,
    page,
    size
  )
  // Pass data to the page via props
  return {
    props: { categories, products, id, language: language || 'VI' }
  }
}

const getProductsByCategory = async (
  categoryLink: string,
  language: string,
  page: number,
  size: number
) => {
  return await productClient
    .getProductByCategoryLink(categoryLink, language, page, size)
    .then(res => res.data.data)
}
const ListNews: React.FC<any> = props => {
  const router = useRouter()
  const { id, language } = router.query
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
      title: `${t.menu.MENU4}`,
      link: `${SAN_PHAM}?language=${lang}`
    }
  ]
  const [dataNavigation, setDataNavigation] =
    useState<NavigationProps[]>(initDataNavigation)
  useEffect(() => {
    loadLanguageText(lang, setText)
    getCategories()
    getProducts()
    setBreadCrumb()
  }, [id, lang])
  const setBreadCrumb = async () => {
    const languageFromURL = language?.toString().toUpperCase()
    console.log(languageFromURL)
    if (languageFromURL == 'VI') {
      initDataNavigation[0].title = bread_crumb.home.VI
      initDataNavigation[1].title = bread_crumb.product.VI
    }
    if (languageFromURL == 'EN') {
      initDataNavigation[0].title = bread_crumb.home.EN
      initDataNavigation[1].title = bread_crumb.product.EN
    }
    setDataNavigation(initDataNavigation)
  }
  const getCategories = async () => {
    setCategories(props.categories)
  }
  const getProducts = async () => {
    const data = props.products
    setProducts(data)
    handleBreadCrumb(data)
  }
  const handleBreadCrumb = (data: any) => {
    const category = data?.category
    const parent = category?.parentCategory
    if (parent) {
      const breadCrumbParent = {
        id: 3,
        title: `${parent?.name}`,
        link: `/san-pham${parent?.link}?language=${lang}`
      }
      initDataNavigation.push(breadCrumbParent)
    }
    const breadCrumbObj = {
      id: 4,
      title: `${category?.name}`,
      link: `${category?.link}?language=${lang}`
    }
    console.log(initDataNavigation)
    initDataNavigation.push(breadCrumbObj)
    setDataNavigation(initDataNavigation)
  }

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
