import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { store } from '@store'
import viText from '@languages/vie.json'
import loadLanguageText from '@languages'
import { CardProduct } from '@components/elements/card'
import { Product } from '@components/model/Product'
import { PaginationDto } from '@components/model/PaginationDto'
import { Input, Pagination } from 'antd'
import { PAGE_SIZE } from 'src/constant/constant'
import { productClient } from '@api'
const { Search } = Input

interface sliderData {
  id: number
  imageUrl: string
  title: string
  link: string
  price: number
}

interface ListProductsProps {
  products: any
}

const ListProducts = (props: any) => {
  const [t, setText] = useState(viText)
  const [products, setProducts] = useState<Product[]>([])
  const [categoryName, setCategoryName] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [searchVisible, setSearchVisible] = useState(false)
  const [pagination, setPagination] = useState<PaginationDto>(
    new PaginationDto()
  )
  const [productName, setProductName] = useState<any>(null)

  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  )

  useEffect(() => {
    loadLanguageText(lang, setText)
    setProducts(props.data?.products)
    setPagination(props.data?.pagination)
    setCategoryName(props.data?.category?.name)
    setCategoryId(props.data?.category?.id)
    setSearchPlaceHolderNote()
  }, [lang, props])

  const getProducts = async (
    categoryId: string,
    lang: string,
    page: any,
    size: any,
    productName: string
  ) => {
    const res = await productClient.getProductByCategoryId(
      categoryId,
      lang,
      page,
      size,
      productName
    )
    setProducts(res.data.data.products)
  }
  const setSearchPlaceHolderNote = () => {
    let mesage = ''
    if (categoryId) {
      if (lang.toUpperCase() == 'VI') {
        mesage = `Tìm kiếm trong '${categoryName}'`
      } else {
        mesage = `Search in '${categoryName}'`
      }
    } else {
      if (lang.toUpperCase() == 'VI') {
        mesage = `Tìm kiếm toàn bộ sản phẩm`
      } else {
        mesage = `Search all products`
      }
    }
    return mesage
  }

  const onChangePagination = async (current: number, pageSize: number) => {
    pagination.page = current
    pagination.size = pageSize
    setPagination(pagination)
    getProducts(categoryId, lang, current, pageSize, productName)
  }
  const handleInputClick = (e: any) => {
    e.stopPropagation()
  }
  const searchProduct = async (value: any) => {
    setProductName(value)
    getProducts(categoryId, lang, 1, pagination.size, value)
  }
  return (
    <div className='list-products-right'>
      <div className='list-products-right-title'>
        {categoryName ? categoryName : `${t.list_products.TITLE1}`}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Search
          placeholder={setSearchPlaceHolderNote()}
          onSearch={value => searchProduct(value)}
          style={{ width: 200 }}
        />
        <span style={{ margin: '20px', fontSize: '14px' }}>
          {setSearchPlaceHolderNote()}
        </span>
      </div>
      <div>
        {products?.length > 0 ? (
          <>
            <div className='list-products-right-wrap'>
              {products.map((data, index) => (
                <div className='list-products-right-wrap-item' key={index}>
                  <CardProduct props={data} />
                </div>
              ))}
            </div>
            <Pagination
              style={{ flex: 'alignItems' }}
              total={pagination?.totalRecords ? pagination?.totalRecords : 10}
              showTotal={total =>
                lang.toUpperCase() == 'VI'
                  ? `Tổng ${total} sản phẩm`
                  : `Total ${total} products`
              }
              defaultCurrent={1}
              current={pagination?.page ? pagination?.page : 1}
              pageSize={pagination?.size ? pagination?.size : 10}
              pageSizeOptions={PAGE_SIZE}
              showSizeChanger
              onChange={onChangePagination}
              onShowSizeChange={onChangePagination}
              className='list-news-pagination'
            />
          </>
        ) : (
          <div style={{ flex: 'alignItems' }}>No products found.</div>
        )}
      </div>
    </div>
  )
}
export default ListProducts
