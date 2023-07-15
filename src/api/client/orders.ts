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

const placeOrder = (body: OrderData): Promise<any> => {
  console.log("body: ", body);

  return axiosInstanceAuthorization.post(
    process.env.NEXT_PUBLIC_API_URL + "/order/create",
    body
  );
};

export default placeOrder;
