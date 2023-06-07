import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { store } from '@store'
import viText from '@languages/vie.json'
import loadLanguageText from '@languages'
import { CardProduct } from '@components/elements/card'
import { Product } from '@components/model/Product'
import { PaginationDto } from '@components/model/PaginationDto'
import { Input, Pagination } from 'antd'
import { GET_PRODUCTS_ENDPOINT } from '@api/endpoint'
import axios from 'axios'
import { PAGE_SIZE } from 'src/constant/constant'
import { SearchOutlined } from '@ant-design/icons'
import { productClient } from '@api'

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

  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  )

  useEffect(() => {
    loadLanguageText(lang, setText)
    setProducts(props.data?.products)
    setPagination(props.data?.pagination)
    setCategoryName(props.data?.category?.name)
    setCategoryId(props.data?.category?.id)
  }, [lang, props])

  const getProducts = async () => {
    const res = await productClient.getProductByCategoryId(
      categoryId,
      lang,
      pagination?.page,
      pagination?.size
    )
    setProducts(res.data.data.products)
  }

  const onChangePagination = async (current: number, pageSize: number) => {
    pagination.page = current
    pagination.size = pageSize
    setPagination(pagination)
    getProducts()
  }
  const handleInputClick = (e: any) => {
    e.stopPropagation()
  }
  return (
    <div className='list-products-right'>
      <div className='list-products-right-title'>
        {categoryName ? categoryName : 'TOÀN BỘ SẢN PHẨM'}
      </div>
      <div className='list-products-right-wrap'>
        {products?.length > 0 ? (
          <>
            {products.map((data, index) => (
              <div className='list-products-right-wrap-item' key={index}>
                <CardProduct props={data} />
              </div>
            ))}
            <Pagination
              style={{ display: 'inline' }}
              total={pagination?.totalRecords ? pagination?.totalRecords : 10}
              showTotal={total => `Tổng ${total} sản phẩm`}
              defaultCurrent={1}
              current={pagination?.page ? pagination?.page : 1}
              pageSize={pagination?.size ? pagination?.size : 10}
              pageSizeOptions={PAGE_SIZE}
              showPrevNextJumpers
              showSizeChanger
              onChange={onChangePagination}
              onShowSizeChange={onChangePagination}
              className='list-news-pagination'
            />
          </>
        ) : (
          <div>No products found.</div>
        )}
      </div>
    </div>
  )
}
export default ListProducts
