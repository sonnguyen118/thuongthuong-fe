import {
  axiosInstanceAuthorization,
  axiosInstanceClient
} from '@api/AxiosInterceptor'

const getAllCategoryClient = (
  language: string,
  page: number,
  size: number
): Promise<any> => {
  return axiosInstanceClient.get(
    `${process.env.NEXT_PUBLIC_API_URL}/category?language=${language}&page=${page}&size=${size}`
  )
}

export default { getAllCategoryClient }
