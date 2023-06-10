import { axiosInstanceAuthorization } from '@api/AxiosInterceptor'
import { GetArticleDto } from 'pages/admin/bai-viet'
import { CreateArticleDto } from 'pages/admin/bai-viet/them-bai-viet'

const adminGetArticle = (params: GetArticleDto): Promise<any> => {
  return axiosInstanceAuthorization.post(
    process.env.NEXT_PUBLIC_API_URL + '/article/admin/get-by-menu',
    params
  )
}

export default { adminGetArticle }
