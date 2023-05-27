import { Products } from "@api";


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
type metaProps = {
  message: string;
  status: number;
};

type ResponseData = {
  data: any;
  meta: metaProps;
};

const handleCreateProducts = async (body: bodyProducts, token: string): Promise<ResponseData | Error> => {
  try {
    const response = await Products.createProducts(body, token);
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

const handleGetAllProducts = async (body: bodyProductsGetAll, token: string): Promise<ResponseData | Error> => {
  try {
    const response = await Products.getAllProducts(body, token);
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



export default { handleCreateProducts, handleGetAllProducts};