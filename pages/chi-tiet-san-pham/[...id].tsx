import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { store } from '@store'
import viText from '@languages/vie.json'
import loadLanguageText from '@languages'
import HeadSEO from '@components/layouts/header/HeadSEO'
import Layout from '@components/layouts/layout/LayoutClient'
import { NavigationTopBar } from '@components/elements/navigation'
import { ProductsContent, ProductsDetails, ProductsSeems } from '@components/templates/products'
import { useRouter } from 'next/router'
import { SAN_PHAM } from 'src/constant/link-master'
import { productClient } from '@api'
import { webInformationClient, handleProductsClient } from "@service";
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

interface pagesProps {
  product: any
  dataMenu: any
  dataFooter: any
  dataProductHighlight: any
}

const ListNews: React.FC<pagesProps> = (props: pagesProps) => {
  const { product, dataMenu, dataFooter, dataProductHighlight} = props;
  console.log(product, "product");
  const router = useRouter()
  const { id, language } = router.query
  const [t, setText] = useState(viText);
  const [listProductSame, setListProductSame] = useState([]);
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
    setBreadCrumb()
  }, [lang, language, id])

  // Lấy ra danh sách 20 sản phẩm cùng loại ( cùng danh mục cấp 2)
  useEffect(()=> {
    if(product && product.danhMuc1) {
      const fetchData = async () => {
          const body = {
            categoryId: product.danhMuc1.id,
            language: "VI",
            page: 1,
            size: 20,
          };
          try {
            const response: any = await handleProductsClient.getProductsByCategoryID(body);
            const { meta, data } = response;
            if(meta.status === 200) {
              setListProductSame(data.products);
            } else {
              console.log("lỗi server");
            }
          } catch (err) {
            console.log(err);
          }
      };
      fetchData();
    }
  },[product]);
  console.log(listProductSame, "listProductSame");

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
      <Layout dataMenu={dataMenu} dataFooter={dataFooter}>
        <div className='list-products'>
          <div className='list-products-navigation'>
            <NavigationTopBar data={dataNavigation} />
          </div>
          <div className='list-products-wrap'>
            <ProductsDetails data={product} />
          </div>
          <ProductsSeems title={t.products.HEADER1} data={listProductSame}/>
          <ProductsContent data={product.content}/>
          <ProductsSeems title={t.products.HEADER3} data={dataProductHighlight}/>
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps ({
  params,
  query
}: {
  params: any
  query: any
}) {
  try {
    const lang = query.lang;
    const { id } = params;
    if(lang === 'en') {
    const product = await productClient
      .getDetailProduct(id, "EN")
      .then(res => res.data.data)
    const MenuVI : any = await  webInformationClient.handleGetWebInformation("5");
    const FooterVI:any = await webInformationClient.handleGetWebInformation("3");
    const ProductHighlight: any = await handleProductsClient.handleGetHighlight();
    // Pass data to the page via props
    return {
      props: {
        product: product,
        dataMenu:  JSON.parse(MenuVI.value) || {},
        dataFooter: JSON.parse(FooterVI.value) || {},
        dataProductHighlight: ProductHighlight.data?.products,
      },
    }
  } else {
    const product = await productClient
    .getDetailProduct(id, "VI")
    .then(res => res.data.data)
  const MenuVI : any = await  webInformationClient.handleGetWebInformation("4");
  const FooterVI:any = await webInformationClient.handleGetWebInformation("2");
  const ProductHighlight: any = await handleProductsClient.handleGetHighlight();
  // Pass data to the page via props
  return {
    props: {
      product: product,
      dataMenu:  JSON.parse(MenuVI.value) || {},
      dataFooter: JSON.parse(FooterVI.value) || {},
      dataProductHighlight: ProductHighlight.data?.products,
    },
  }
  }
  } catch (error) {
    return {
      props: {}
    }
  }
}

export default ListNews
