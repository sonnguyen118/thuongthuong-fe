import { axiosInstanceAuthorization } from '@api/AxiosInterceptor'

export interface GetContact {
  id: number | undefined
  name: number | undefined
  status: number | undefined
}
export interface UpdateContact {
  ids: number[] | undefined
}

const getContact = (dto: GetContact | null): Promise<any> => {
  return axiosInstanceAuthorization.post(
    process.env.NEXT_PUBLIC_API_URL + '/contact/find',
    dto
  )
}
const updateContact = (dto: UpdateContact | null): Promise<any> => {
  return axiosInstanceAuthorization.post(
    process.env.NEXT_PUBLIC_API_URL + '/contact/update',
    dto
  )
}

export default { getContact, updateContact }
