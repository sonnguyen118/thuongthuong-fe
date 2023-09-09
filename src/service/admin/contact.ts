import { ContactAdmin } from "@api";

interface bodyProductsGetAll {
  language: string;
  page: number;
  size: number;
}

type metaProps = {
  message: string;
  status: number;
};

type ResponseData = {
  data: any;
  meta: metaProps;
};

const handleGetList = async (body: any): Promise<ResponseData | Error> => {
  try {
    const response = await ContactAdmin.getList(body);
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

const handleGetDetail = async (id: any): Promise<ResponseData | Error> => {
  try {
    const response = await ContactAdmin.getDetailContact(id);
    const data = response.data;
    if (data) {
      const resData: ResponseData = data;
      return resData;
    } else {
      throw new Error(`Unexpected status code: ${data}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      return error;
    } else {
      return new Error("Unexpected error");
    }
  }
};

const handleUpdateStatus = async (body: any): Promise<ResponseData | Error> => {
  try {
    const response = await ContactAdmin.updateContact(body);
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

export default { handleGetList, handleGetDetail, handleUpdateStatus };
