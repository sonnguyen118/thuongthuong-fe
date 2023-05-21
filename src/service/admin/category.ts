import { createCategory } from "@api";

type language = {
    VI : string;
    EN : string;
    FR : string;
    PO : string;
}
type bodyCategory = {
    name: language;
    link: string;
    parent: string | number
};

type metaProps = {
  message: string;
  status: number;
};

type ResponseData = {
  data: any;
  meta: metaProps;
};

const handleCreateCategory = async (body: bodyCategory, token: string): Promise<ResponseData | Error> => {
  try {
    const response = await createCategory.createCategory(body, token);
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

export default { handleCreateCategory };
