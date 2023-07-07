import {axiosInstanceAuthorization, axiosInstanceAuthorizationUpload} from "@api/AxiosInterceptor";


interface contentProps {
    name: string,
    language: string,
    content: string,
    description: string
}

interface bodyProducts {
    link: string,
    imgLink: string,
    categoryId: number,
    content: contentProps[]
}
interface bodyProductsGetAll {
  language: string;
  page: number;
  size: number
};
interface bodyStatusProps {
  id: number;
  isActive: boolean;
};
interface bodyUpdateProps {
    id: number,
    link: string,
    imageUrl: string,
    categoryLevel1Id: number;
    categoryLevel2Id: number;
    content: Array<any>;
};

const createProducts = (body: bodyProducts): Promise<any> => {
  return axiosInstanceAuthorization.post(process.env.NEXT_PUBLIC_API_URL + "/product/admin/create", body);
};

const uploadImagesProduct = (formData: any): Promise<any> => {
  return axiosInstanceAuthorizationUpload.post(process.env.NEXT_PUBLIC_API_URL + "/product/admin/upload", formData);
};

const getAllProducts = (body: bodyProductsGetAll): Promise<any> => {
  return axiosInstanceAuthorization.post(process.env.NEXT_PUBLIC_API_URL + "/product/admin/get-products", body);
};
const getDataOne = (id: number): Promise<any> => {
  return axiosInstanceAuthorization.get(process.env.NEXT_PUBLIC_API_URL + `/product/admin/get-detail?productId=${id}`);
};
const updateStatus = (body: bodyStatusProps): Promise<any> => {
  return axiosInstanceAuthorization.post(process.env.NEXT_PUBLIC_API_URL + `/product/admin/update-status`, body);
};
const updateProducts = (body: bodyUpdateProps): Promise<any> => {
  return axiosInstanceAuthorization.post(process.env.NEXT_PUBLIC_API_URL + `/product/admin/update`, body);
};

export default { createProducts, updateProducts, uploadImagesProduct, getAllProducts, getDataOne, updateStatus };
