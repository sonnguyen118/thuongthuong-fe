import {
  axiosInstanceAuthorization,
  axiosInstanceClient
} from '@api/AxiosInterceptor'


type productCategoryIDProps = {
  categoryId: string;
  language: string;
  page: number;
  size: number;
  productName?: string;
}
const getAllProductClient = (
  language: string,
  page: number,
  size: number
): Promise<any> => {
  return axiosInstanceClient.get(
    `${process.env.NEXT_PUBLIC_API_URL}/product/get-all?language=${language}&page=${page}&size=${size}`
  )
}

const searchProductClient = (
  language: string,
  page: number,
  size: number,
  categoryId: string,
  name: string
): Promise<any> => {
  const params = { language, page, size, categoryId, name }
  return axiosInstanceClient.get(
    `${process.env.NEXT_PUBLIC_API_URL}/product/get-all`,
    { params }
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
const getProductByCategoryId = (body : productCategoryIDProps): Promise<any> => {
  return axiosInstanceClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}/product`, body
  )
}
const getDetailProduct = (
  productLink: string,
  language: string
): Promise<any> => {
  return axiosInstanceClient.get(
    `${process.env.NEXT_PUBLIC_API_URL}/product/detail?productLink=${productLink}&language=${language}`
  )
};
const getDetailProductID = (
  productId: number,
  language: string
): Promise<any> => {
  return axiosInstanceClient.get(
    `${process.env.NEXT_PUBLIC_API_URL}/product/detail?productId=${productId}&language=${language}`
  )
};
const getHighlight = (): Promise<any> =>{
  return axiosInstanceClient.get(process.env.NEXT_PUBLIC_API_URL + `/product/get-all?language=VI&isHighlight=true`);
}

export default {
  getAllProductClient,
  getProductByCategoryLink,
  getProductByCategoryId,
  getDetailProduct,
  searchProductClient,
  getHighlight,
  getDetailProductID
}
