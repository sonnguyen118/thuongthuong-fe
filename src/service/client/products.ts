import { productClient } from "@api";

type metaProps = {
  message: string;
  status: number;
};

type ResponseData = {
  data: any;
  meta: metaProps;
};
type productCategoryIDProps = {
  categoryId: string,
  language: string,
  page: number,
  size: number,
  productName?: string
}

const handleGetHighlight = async (): Promise<ResponseData | Error> => {
  try {
    const response = await productClient.getHighlight();
    const { data, meta } = response.data;
    if (meta.status === 200) {
      const resData: ResponseData = { meta: meta, data: data };
      return resData;
    } else {
      throw new Error(`Unexpected status code: ${meta.status}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      return error;
    } else {
      return new Error("Unexpected error");
    }
  }
};
const getProductsByCategoryID= async (body: productCategoryIDProps): Promise<ResponseData | Error> => {
  try {
    const response = await productClient.getProductByCategoryId(body);
    const { data, meta } = response.data;
    if (meta.status === 200) {
      const resData: ResponseData = { meta: meta, data: data };
      return resData;
    } else {
      throw new Error(`Unexpected status code: ${meta.status}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      return error;
    } else {
      return new Error("Unexpected error");
    }
  }
};

const getDetailProductsID= async (  productId: number, language: string): Promise<ResponseData | Error> => {
  try {
    const response = await productClient.getDetailProductID(productId, language);
    const { data, meta } = response.data;
    if (meta.status === 200) {
      const resData: ResponseData = { meta: meta, data: data };
      return resData;
    } else {
      throw new Error(`Unexpected status code: ${meta.status}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      return error;
    } else {
      return new Error("Unexpected error");
    }
  }
};

export default { handleGetHighlight, getProductsByCategoryID, getDetailProductsID};
