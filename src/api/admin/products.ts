import {axiosInstanceAuthorization, axiosInstanceClient} from "@api/AxiosInterceptor";


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
}

const createProducts = (body: bodyProducts): Promise<any> => {
  return axiosInstanceAuthorization.post(process.env.NEXT_PUBLIC_API_URL + "/product/admin/create", body);
};

const uploadImagesProduct = (formData: any): Promise<any> => {
  return axiosInstanceAuthorization.post(process.env.NEXT_PUBLIC_API_URL + "/product/upload", formData);
};

const getAllProducts = (body: bodyProductsGetAll): Promise<any> => {
  return axiosInstanceAuthorization.post(process.env.NEXT_PUBLIC_API_URL + "/product/admin/get-products", body);
};


export default { createProducts, uploadImagesProduct, getAllProducts };
