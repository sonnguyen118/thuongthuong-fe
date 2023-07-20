import { axiosInstanceAuthorization } from '@api/AxiosInterceptor'
import { GetArticleDto, UpdateStatusDto } from 'pages/admin/bai-viet'
import { UpdateArticleDto } from 'pages/admin/bai-viet/cap-nhat-bai-viet'
import { CreateArticleDto } from 'pages/admin/bai-viet/them-bai-viet'

const adminGetArticle = (params: GetArticleDto): Promise<any> => {
  return axiosInstanceAuthorization.post(
    process.env.NEXT_PUBLIC_API_URL + '/article/admin/get-by-menu',
    params
  )
}
const adminGetArticleDetail = (
  id?: number | string,
  link?: string
): Promise<any> => {
  const end_point =
    process.env.NEXT_PUBLIC_API_URL + `/article/admin/get-detail?id=${id}`
  return axiosInstanceAuthorization.get(end_point)
}
const createArticle = (body: CreateArticleDto): Promise<any> => {
  return axiosInstanceAuthorization.post(
    process.env.NEXT_PUBLIC_API_URL + '/article/create',
    body
  )
}
const updateStatusArticle = (dto: UpdateStatusDto): Promise<any> => {
  return axiosInstanceAuthorization.post(
    process.env.NEXT_PUBLIC_API_URL + '/article/update-status',
    dto
  )
}
const updateArticle = (dto: UpdateArticleDto): Promise<any> => {
  return axiosInstanceAuthorization.post(
    process.env.NEXT_PUBLIC_API_URL + '/article/update',
    dto
  )
}

export default {
  adminGetArticle,
  createArticle,
  updateStatusArticle,
  updateArticle,
  adminGetArticleDetail
}
