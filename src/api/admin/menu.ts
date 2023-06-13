import { axiosInstanceAuthorization } from '@api/AxiosInterceptor'
import { GetArticleDto } from 'pages/admin/bai-viet'
import { CreateArticleDto } from 'pages/admin/bai-viet/them-bai-viet'

type NameState = {
  [key: string]: string | undefined
}

type bodyCategory = {
  name: NameState
  link: string
  parent: string | number
}

type bodyGetAllCategoryprops = {
  language: string
}



const adminGetAllMenu = (): Promise<any> => {
  return axiosInstanceAuthorization.get(
    process.env.NEXT_PUBLIC_API_URL + '/menu/admin-get-all'
  )
}


export default { adminGetAllMenu }
