import {
  axiosInstanceAuthorization,
  axiosInstanceClient
} from '@api/AxiosInterceptor'
import { Diacritic } from '@utils/Functions'
import { AxiosRequestConfig } from 'axios'

const API_URL = 'http://localhost:3001'
const UPLOAD_ENDPOINT = 'product/admin/upload'
const ckeditorUploadImages = (file: any): Promise<any> => {
  const body = new FormData()
  const fileName = (Date.now() +
    '-' +
    Diacritic.convertValueWithDashes(file.name)) as string
  console.log('1')
  body.append('upload', file)
  const options: AxiosRequestConfig = {
    headers: { 'Content-Type': 'multipart/form-data' }
  }
  return axiosInstanceClient.post(
    process.env.NEXT_PUBLIC_API_URL + '/product/admin/upload ',
    body,
    options
  )
}

export default { ckeditorUploadImages }

//hàng thải không dùng đến
