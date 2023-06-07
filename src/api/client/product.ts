import {
  axiosInstanceAuthorization,
  axiosInstanceClient
} from '@api/AxiosInterceptor'

const getAllProductClient = (
  language: string,
  page: number,
  size: number
): Promise<any> => {
  return axiosInstanceClient.get(
    `${process.env.NEXT_PUBLIC_API_URL}/product/get-all?language=${language}&page=${page}&size=${size}`
  )
}

const getProductByCategoryLink = (
  categoryLink: string,
  language: string,
  page: number,
  size: number
): Promise<any> => {
  return axiosInstanceClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}/product`,
    { categoryLink, language, page, size }
  )
}
const getProductByCategoryId = (
  categoryId: string,
  language: string,
  page: number,
  size: number
): Promise<any> => {
  return axiosInstanceClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}/product`,
    { categoryId, language, page, size }
  )
}
const getDetailProduct = (
  productLink: string,
  language: string,
): Promise<any> => {
  return axiosInstanceClient.get(
    `${process.env.NEXT_PUBLIC_API_URL}/product/detail?productLink=${productLink}&language=${language}`,
  )
}

export default { getAllProductClient, getProductByCategoryLink, getProductByCategoryId, getDetailProduct }
