import {
  GET_PRODUCTS_ENDPOINT,
  GET_PRODUCTS_DETAIL_ENDPOINT
} from '@api/endpoint'
import axios from 'axios'

const getAllProducts = async (language: string, page: number, size: number) => {
  const res = await axios.post(GET_PRODUCTS_DETAIL_ENDPOINT, {
    language: language,
    page: page,
    size: size
  })
}

const getProductsByCategory = async (
  language: string,
  page: number,
  size: number,
  categoryLink: string,
  categoryId: number
) => {
  const res = await axios.post(GET_PRODUCTS_ENDPOINT, {
    language,
    page,
    size,
    categoryId,
    categoryLink
  })
}
