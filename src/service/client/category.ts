import { categoryClient } from "@api";


type metaProps = {
  message: string;
  status: number;
};

type ResponseData = {
  data: any;
  meta: metaProps;
};


const handleGetAllCategory = async (language: string): Promise<ResponseData | Error> => {
  try {
    const response = await categoryClient.getAllFullCategoryClient(language);
    const { data, meta } = response.data;
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

export default { handleGetAllCategory };
