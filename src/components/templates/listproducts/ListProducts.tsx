import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { store } from '@store'
import viText from '@languages/vie.json'
import loadLanguageText from '@languages'
import { CardProduct } from '@components/elements/card'
import { Product } from '@components/model/Product'
import { PaginationDto } from '@components/model/PaginationDto'
import { Pagination } from 'antd'
import { GET_PRODUCTS_ENDPOINT } from '@api/endpoint'
import axios from 'axios'
import { PAGE_SIZE } from 'src/constant/constant'

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
  // const { products } = props
  const [t, setText] = useState(viText)
  const [products, setProducts] = useState<Product[]>([])
  const [categoryName, setCategoryName] = useState('')
  const [categoryId, setCategoryId] = useState('')

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
    const res = await axios.post(GET_PRODUCTS_ENDPOINT, {
      language: lang,
      page: pagination?.page,
      size: pagination?.size,
      categoryId: categoryId
    })
    setProducts(res.data.data.products)
  }

  const onChangePagination = async (current: number, pageSize: number) => {
    pagination.page = current
    pagination.size = pageSize
    setPagination(pagination)
    getProducts()
  }
  return (
    <div className='list-products-right'>
      <div className='list-products-right-title'>
        {categoryName ? categoryName : 'TOÀN BỘ SẢN PHẨM'}
      </div>
      <div className='list-products-right-wrap'>
        {products?.length > 0 ? (
          products.map((data, index) => (
            <div className='list-products-right-wrap-item' key={index}>
              <CardProduct props={data} />
            </div>
          ))
        ) : (
          <div>No products found.</div>
        )}
      </div>
      <Pagination
        total={pagination?.totalRecords ? pagination?.totalRecords : 10}
        showTotal={total => `Total ${total} items`}
        defaultCurrent={1}
        pageSize={pagination?.size ? pagination?.size : 10}
        pageSizeOptions={PAGE_SIZE}
        showPrevNextJumpers
        showSizeChanger
        onChange={onChangePagination}
        onShowSizeChange={onChangePagination}
      />
    </div>
  )
}
export default ListProducts
