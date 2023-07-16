import { axiosInstanceAuthorization } from "@api/AxiosInterceptor";

interface ProductDto {
  productId: number;
  quantity: number;
}

interface OrderData {
  name: string;
  phone: string;
  email: string;
  address: string;
  products: ProductDto[];
}
const getOrder = (body: any): Promise<any> => {
  
  return axiosInstanceAuthorization.post(
    process.env.NEXT_PUBLIC_API_URL + "/order",
    body
  );
};

export default {getOrder};

