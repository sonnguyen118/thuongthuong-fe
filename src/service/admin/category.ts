import { createCategory } from "@api";


type NameState = {
  [key: string]: string | undefined;
};
type bodyCategory = {
    name: NameState;
    link: string;
    parent: string | number
};
type bodyCategoryGetAdmin = {
  language: string;
};

type metaProps = {
  message: string;
  status: number;
};

type ResponseData = {
  data: any;
  meta: metaProps;
};


const handleCreateCategory = async (body: bodyCategory): Promise<ResponseData | Error> => {
  try {
    const response =  await createCategory.createCategory(body);
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

const handleGetAllCategory = async (body: bodyCategoryGetAdmin) => {
  try {
    const response = await createCategory.getAllCategory(body);
    const { data, meta } = response.data;
    console.log(response, "response")
    if (meta.status === 200) {
      return data;
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

export default { handleGetAllCategory, handleCreateCategory };
