import { Products } from "@api";


interface contentProps {
  name: string,
  language: string,
  content: string,
  description: string
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

const handleCreateProducts = async (body: any): Promise<ResponseData | Error> => {
  try {
    const response = await Products.createProducts(body);
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

const handleUploadImageProducts = async ( file:any ): Promise<any | Error> => {
  const formData = new FormData();
  formData.append('upload', file);
  try {
    const response = await Products.uploadImagesProduct(formData);
    if(response) {
      return response;
    }
  } catch (error) {
    if (error instanceof Error) {
      return error;
    } else {
      return new Error("Unexpected error");
    }
  }
};

const handleGetAllProducts = async (body: bodyProductsGetAll): Promise<ResponseData | Error> => {
  try {
    const response = await Products.getAllProducts(body);
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

const handleGetOne = async (id: number): Promise<ResponseData | Error> => {
  try {
    const response = await Products.getDataOne(id);
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


export default { handleCreateProducts, handleUploadImageProducts, handleGetAllProducts, handleGetOne};
