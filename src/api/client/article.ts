import { axiosInstanceClient } from '@api/AxiosInterceptor'

const getArticleClient = (
  language: string,
  page: number,
  size: number,
  name?: string,
  categoryId?: string,
  categoryLink?: string
): Promise<any> => {
  const params = {
    language,
    page,
    size,
    name,
    categoryId,
    categoryLink
  }
  return axiosInstanceClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}/article/get-by-menu`,
    params
  )
}

const getArticleDetail = (language: string, link: string): Promise<any> => {
  const params = {
    language,
    link: `${link}`
  }
  return axiosInstanceClient.get(`${process.env.NEXT_PUBLIC_API_URL}/article`, {
    params
  })
}

export default { getArticleClient, getArticleDetail }
